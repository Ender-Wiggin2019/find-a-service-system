import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore, collection, DocumentData, CollectionReference } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { Role, User, ServiceProvider } from "~/components/types/user"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
      databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL,
      projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
      appId: import.meta.env.VITE_FIREBASE_APPID,
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export const Providers = {
    google: new GoogleAuthProvider(),
    facebook: new FacebookAuthProvider(),
};


const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(db, collectionName) as CollectionReference<T>
}

export { auth, db };

export const roleCol = createCollection<Role>('roles')
export const userCol = createCollection<User>('users')
export const serviceProviderCol = createCollection<ServiceProvider>('serviceProviders')




let firebaseApp: FirebaseApp;
const useEmulator = () => import.meta.env.VITE_USE_FIREBASE_EMULATOR;

export const setupFirebase = () => {
  try {
    firebaseApp = initializeApp(firebaseConfig);
  } catch (error) {
    console.error({error})
  }
};

let firestore: ReturnType<typeof getFirestore>;
let storage: ReturnType<typeof getStorage>;

export const useAuth = () => {
  if (useEmulator()) {
    connectAuthEmulator(auth, 'http://localhost:9099');
  }
  return auth;
};

export const useFirestore = () => {
  if (!firestore) {
    firestore = getFirestore();
    if (useEmulator()) {
      connectFirestoreEmulator(firestore, 'localhost', 8080);
    }
  }
  return firestore;
};

export const useStorage = () => {
  if (!storage) {
    storage = getStorage();
    if (useEmulator()) {
      connectStorageEmulator(storage, 'localhost', 9199);
    }
  }
  return storage;
};
