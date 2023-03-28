// UserContext.tsx
import { createContext, ReactNode, useContext, useReducer } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { useAuth, useFirestore } from "~/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { collection } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
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
        dispatch({ type: "SIGN_IN", payload: { user } });
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
  const firestore = useFirestore();
  return {
    register: async (
        email: string,
        password: string,
        role: "service_provider" | "user",
        address?: string,
        description?: string
    ) => {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      if (user) {
        await firebase.firestore().collection("users").doc(user.uid).set({
          role,
          address: address ?? "",
          description: description ?? "",
        });
      }
    },
  };
};

export { useAuthState, useSignIn, useSignOut, useRegister, AuthProvider };
