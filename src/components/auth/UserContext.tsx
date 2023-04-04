// UserContext.tsx
import { createContext, ReactNode, useContext, useReducer, useEffect } from "react";
import {User as FirebaseUser, signInWithPopup, onAuthStateChanged, updateProfile} from "firebase/auth";
import { auth, useAuth, serviceProviderCol, Providers, customerCol} from "~/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import {Role, User, ServiceProvider, Customer} from "../types/user"

// import { collection } from "firebase/firestore";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
type AuthActions =
    | { type: "SIGN_IN"; payload: { user: FirebaseUser } }
    | { type: "SIGN_OUT" };

type AuthState =
    | {
  state: "SIGNED_IN";
  currentUser: FirebaseUser;
}
    | {
  state: "SIGNED_OUT";
}
    | {
  state: "UNKNOWN";
};

const AuthReducer = (state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        state: "SIGNED_IN",
        currentUser: action.payload.user,
      };
    case "SIGN_OUT":
      return {
        state: "SIGNED_OUT",
      };
    default:
      return state;
  }
};

type AuthContextProps = {
  state: AuthState;
  dispatch: (value: AuthActions) => void;
};

export const AuthContext = createContext<AuthContextProps>({
  state: { state: "UNKNOWN" },
  dispatch: (val) => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [state, dispatch] = useReducer(AuthReducer, { state: "UNKNOWN" });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "SIGN_IN", payload: { user } });
      } else {
        dispatch({ type: "SIGN_OUT" });
      }
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);

  return (
      <AuthContext.Provider value={{ state, dispatch }}>
        {children}
      </AuthContext.Provider>
  );
};

const useAuthState = () => {
  const { state } = useContext(AuthContext);
  return {
    state,
  };
};

const useSignIn = () => {
  const auth = useAuth();
  const { dispatch } = useContext(AuthContext);
  return {
    signIn: async (email: string, password: string) => {
      // const { user } = await auth.signInWithEmailAndPassword(email, password);
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      if (user) {
        console.log('sign in')
        dispatch({ type: "SIGN_IN", payload: { user } });
      }
    },
  };
};

const useGoogleSignIn = () => {
  const auth = useAuth();
  const { dispatch } = useContext(AuthContext);
  return {
    signInWithGoogle: async () => {
      try {
        const userCredential = await signInWithPopup(auth, Providers.google);
        const { user } = userCredential;
        if (user) {
          dispatch({ type: "SIGN_IN", payload: { user } });
        }
      } catch (error) {
        console.error("signInWithGoogle error:", error);
      }
    },
  };
};

const useSignOut = () => {
  const auth = useAuth();
  const { dispatch } = useContext(AuthContext);
  return {
    signOut: async () => {
      await auth.signOut();
      dispatch({ type: "SIGN_OUT" });
    },
  };
};

const useRegister = () => {
  const auth = useAuth();
  // const firestore = useFirestore();
  return {
    register: async (
        email: string,
        name: string,
        password: string,
        role: Role,
        address?: string,
        description?: string
    ): Promise<boolean> => {
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(user, {
          displayName: name,
        });

        console.log(role);
        if (user && role === "serviceProvider") { // case: service provider
          console.log('check')
          await setDoc(doc(serviceProviderCol, user.uid),
              JSON.parse(JSON.stringify(new ServiceProvider(user.uid, name, email, address, description)))
          );
          return true;
        } else if (user && role === "customer") { // case: customer
            await setDoc(doc(customerCol, user.uid),
                JSON.parse(JSON.stringify(new Customer(user.uid, name, email)))
        );
            return true;
        }else {
          return false;
        }
      } catch (error) {
        console.error("Registration failed:", error);
        return false;
      }
    },
  };
};


export { useAuthState, useSignIn, useGoogleSignIn, useSignOut, useRegister, AuthProvider };
