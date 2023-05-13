// UserContext.tsx
import { createContext, ReactNode, useContext, useReducer, useEffect } from 'react'
import { User as FirebaseUser, signInWithPopup, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { db, auth, useAuth, serviceProviderCol, Providers, customerCol } from '~/services/lib/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, getDocs, setDoc, where, query, getDoc } from 'firebase/firestore'
import { Role, ServiceProvider, Customer, ServiceProviderStatus } from '~/services/types/user'
import { FirebasePath } from '~/services/lib/constants'
import { FirebaseError } from '@firebase/util'

type AuthActions =
    | { type: 'SIGN_IN'; payload: { user: FirebaseUser; userType: Role } }
    | { type: 'SIGN_OUT' }
    | { type: 'LOADING'; payload: { isLoading: boolean } }

type AuthState =
    | {
          state: 'SIGNED_IN'
          currentUser: FirebaseUser
          userType: Role
          isLoading: boolean
      }
    | {
          state: 'SIGNED_OUT'
          userType: Role
          isLoading: boolean
      }
    | {
          state: 'UNKNOWN'
          userType: Role
          isLoading: boolean
      }

export const CheckUidExistsInDoc = async (uid: string, docPath: FirebasePath): Promise<boolean> => {
    try {
        const serviceCollection = collection(db, docPath)
        const q = query(serviceCollection, where('uid', '==', uid))
        const snapshot = await getDocs(q)
        return !snapshot.empty
    } catch (error) {
        console.error(error)
    }
    return false
}

export const GetUserType = async (uid: string): Promise<Role> => {
    if (await CheckUidExistsInDoc(uid, FirebasePath.SERVICE_PROVIDER)) {
        if (
            await getDoc(doc(db, FirebasePath.SERVICE_PROVIDER, uid)).then((doc) => doc.data()?.status !== 'accepted')
        ) {
            return 'nonVerifiedProvider'
        } else {
            return 'serviceProvider'
        }
    } else if (await CheckUidExistsInDoc(uid, FirebasePath.CUSTOMER)) {
        return 'customer'
    } else if (await CheckUidExistsInDoc(uid, FirebasePath.ADMIN)) {
        return 'admin'
    } else {
        return 'anonymous'
    }
}

const AuthReducer = (state: AuthState, action: AuthActions): AuthState => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                state: 'SIGNED_IN',
                currentUser: action.payload.user,
                userType: action.payload.userType,
                isLoading: false,
            }
        case 'SIGN_OUT':
            return {
                ...state,
                state: 'SIGNED_OUT',
                userType: 'anonymous',
                isLoading: false,
            }
        case 'LOADING':
            return {
                ...state,
                isLoading: action.payload.isLoading,
            }
        default:
            return state
    }
}

type AuthContextProps = {
    state: AuthState
    dispatch: (value: AuthActions) => void
}

export const AuthContext = createContext<AuthContextProps>({
    state: { state: 'UNKNOWN', userType: 'anonymous', isLoading: false },
    dispatch: (val) => {},
})

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(AuthReducer, { state: 'UNKNOWN', userType: 'anonymous', isLoading: false })

    useEffect(() => {
        dispatch({ type: 'LOADING', payload: { isLoading: true } })

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userType = await GetUserType(user.uid)
                if (userType !== 'anonymous') {
                    dispatch({ type: 'SIGN_IN', payload: { user, userType } })
                } else {
                    dispatch({ type: 'SIGN_OUT' })
                }
            } else {
                dispatch({ type: 'SIGN_OUT' })
            }
        })

        // Cleanup function
        return () => {
            unsubscribe()
        }
    }, [])

    return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
}

const useAuthState = () => {
    const { state } = useContext(AuthContext)
    return {
        state,
    }
}

const useSignIn = () => {
    const auth = useAuth()
    const { dispatch } = useContext(AuthContext)
    return {
        signIn: async (email: string, password: string) => {
            const { user } = await signInWithEmailAndPassword(auth, email, password)
            const userType = await GetUserType(user.uid)
            if (user && userType !== 'anonymous') {
                console.log('sign in')
                dispatch({ type: 'SIGN_IN', payload: { user, userType } })
            } else if (userType === 'anonymous') {
                throw new Error('User has been removed')
            }
        },
    }
}

const useGoogleSignIn = () => {
    const auth = useAuth()
    const { dispatch } = useContext(AuthContext)
    return {
        signInWithGoogle: async () => {
            try {
                const userCredential = await signInWithPopup(auth, Providers.google)
                const { user } = userCredential
                const email = user.email || "N/A";
                const displayName = user.displayName || "N/A";
                await setDoc(
                    doc(customerCol, user.uid),
                    JSON.parse(JSON.stringify(new Customer(user.uid, displayName, email))),
                )

                const userType = await GetUserType(user.uid)
                console.log(user)
                console.log(userType)
                if (user && userType !== 'anonymous') {
                    console.log("Here")
                    dispatch({ type: 'SIGN_IN', payload: { user, userType } })
                }
            } catch (error) {
                console.error('signInWithGoogle error:', error)
            }
        },
    }
}

const useSignOut = () => {
    const auth = useAuth()
    const { dispatch } = useContext(AuthContext)
    return {
        signOut: async () => {
            await auth.signOut()
            dispatch({ type: 'SIGN_OUT' })
        },
    }
}

const useRegister = () => {
    const auth = useAuth()
    // const firestore = useFirestore();
    return {
        register: async (
            email: string,
            name: string,
            password: string,
            role: Role,
            address?: string,
            description?: string,
            lat?: number,
            lng?: number,
        ): Promise<boolean> => {
            try {
                // find user by email in auth
                const { user } = await createUserWithEmailAndPassword(auth, email, password)

                await updateProfile(user, {
                    displayName: name,
                })

                console.log(role)
                if (user && role === 'serviceProvider') {
                    // case: service provider
                    console.log('check')
                    await setDoc(
                        doc(serviceProviderCol, user.uid),
                        JSON.parse(
                            JSON.stringify(
                                new ServiceProvider(
                                    user.uid,
                                    name,
                                    email,
                                    address,
                                    description,
                                    ServiceProviderStatus.NEED_TO_VERIFY,
                                    undefined,
                                    lat,
                                    lng,
                                ),
                            ),
                        ),
                    )
                    return true
                } else if (user && role === 'customer') {
                    // case: customer
                    await setDoc(
                        doc(customerCol, user.uid),
                        JSON.parse(JSON.stringify(new Customer(user.uid, name, email))),
                    )
                    return true
                } else {
                    return false
                }
            } catch (error) {
                if (error instanceof FirebaseError) {
                    if (error.code === 'auth/email-already-in-use') alert('Email already in use')
                }
                console.error('Registration failed:', error)
                return false
            }
        },
    }
}

const useRegisterByGoogle = () => {
    const auth = useAuth()
    // const firestore = useFirestore();
    return {
        register: async (
            email: string,
            name: string,
            password: string,
            role: Role,
            address?: string,
            description?: string,
        ): Promise<boolean> => {
            try {
                // find user by email in auth
                const { user } = await createUserWithEmailAndPassword(auth, email, password)

                await updateProfile(user, {
                    displayName: name,
                })

                console.log(role)
                if (user && role === 'serviceProvider') {
                    // case: service provider
                    console.log('check')
                    await setDoc(
                        doc(serviceProviderCol, user.uid),
                        JSON.parse(
                            JSON.stringify(
                                new ServiceProvider(
                                    user.uid,
                                    name,
                                    email,
                                    address,
                                    description,
                                    ServiceProviderStatus.NEED_TO_VERIFY,
                                    undefined,
                                ),
                            ),
                        ),
                    )
                    return true
                } else if (user && role === 'customer') {
                    // case: customer
                    await setDoc(
                        doc(customerCol, user.uid),
                        JSON.parse(JSON.stringify(new Customer(user.uid, name, email))),
                    )
                    return true
                } else {
                    return false
                }
            } catch (error) {
                if (error instanceof FirebaseError) {
                    if (error.code === 'auth/email-already-in-use') alert('Email already in use')
                }
                console.error('Registration failed:', error)
                return false
            }
        },
    }
}

export { useAuthState, useSignIn, useGoogleSignIn, useSignOut, useRegister, AuthProvider }
