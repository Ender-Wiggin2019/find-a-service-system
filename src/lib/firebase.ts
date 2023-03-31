import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore, collection, DocumentData, CollectionReference } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import {Role, User, ServiceProvider, Customer} from "~/components/types/user"
import { ServiceCreator } from "~/components/types/service"
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
const db = getFirestore(); // database
const storage = getStorage(app);

export const Providers = {
    google: new GoogleAuthProvider(),
    facebook: new FacebookAuthProvider(),
};


const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(db, collectionName) as CollectionReference<T>
}

export { auth, db, storage };

export const roleCol = createCollection<Role>('roles')
export const customerCol = createCollection<Customer>('customer')
export const serviceProviderCol = createCollection<ServiceProvider>('serviceProvider')
export const serviceCreatorCol = createCollection<ServiceCreator>('ServiceCreator')


// TODO(Ender): the following code is from original template, need to be refactored

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
// let storage: ReturnType<typeof getStorage>;

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

// TODO: maybe delete it
export const useStorage = () => {
  if (!storage) {
    if (useEmulator()) {
      connectStorageEmulator(storage, 'localhost', 9199);
    }
  }
  return storage;
};
