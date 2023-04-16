import { FirebaseApp, initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import {
    connectFirestoreEmulator,
    getFirestore,
    collection,
    DocumentData,
    CollectionReference,
} from 'firebase/firestore'
import { connectStorageEmulator, getStorage } from 'firebase/storage'
import { Role, ServiceProvider, Customer } from '~/services/types/user'
import { ServiceCreator, Comment } from '~/services/types/service'
import { RequestCreator } from '~/services/types/request'
import { FirebasePath } from '~/services/lib/constants'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_FIREBASE_APPID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore() // database
const storage = getStorage(app)

export const Providers = {
    google: new GoogleAuthProvider(),
    facebook: new FacebookAuthProvider(),
}

const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(db, collectionName) as CollectionReference<T>
}

// test subcollection situation
// const createCollection = <T = DocumentData>(...collectionNames: string[]): CollectionReference<T> => {
//     const fullPath = collectionNames.join("/");
//     return collection(db, fullPath) as CollectionReference<T>;
// };
const createCollectionFactory = <T = DocumentData>(collectionPath: string) => {
    return (serviceId: string): CollectionReference<T> => {
        const fullPath = `${collectionPath}/${serviceId}/${FirebasePath.COMMENT}`
        // return collection(db, fullPath) as CollectionReference<T>;
        return collection(db, fullPath) as CollectionReference<T>
    }
}

export { auth, db, storage }

export const roleCol = createCollection<Role>('roles')
export const customerCol = createCollection<Customer>(FirebasePath.CUSTOMER)
export const serviceProviderCol = createCollection<ServiceProvider>(FirebasePath.SERVICE_PROVIDER)
export const serviceCreatorCol = createCollection<ServiceCreator>(FirebasePath.SERVICE)
export const commentColFactory = createCollectionFactory<Comment>(FirebasePath.SERVICE)
export const requestCreatorCol = createCollection<RequestCreator>(FirebasePath.REQUEST)

// TODO(Ender): the following code is from original template, need to be refactored

let firebaseApp: FirebaseApp
const useEmulator = () => import.meta.env.VITE_USE_FIREBASE_EMULATOR

export const setupFirebase = () => {
    try {
        firebaseApp = initializeApp(firebaseConfig)
    } catch (error) {
        console.error({ error })
    }
}

let firestore: ReturnType<typeof getFirestore>
// let storage: ReturnType<typeof getStorage>;

export const useAuth = () => {
    if (useEmulator()) {
        connectAuthEmulator(auth, 'http://localhost:9099')
    }
    return auth
}

export const useFirestore = () => {
    if (!firestore) {
        firestore = getFirestore()
        if (useEmulator()) {
            connectFirestoreEmulator(firestore, 'localhost', 8080)
        }
    }
    return firestore
}

// TODO: maybe delete it
export const useStorage = () => {
    if (!storage) {
        if (useEmulator()) {
            connectStorageEmulator(storage, 'localhost', 9199)
        }
    }
    return storage
}
