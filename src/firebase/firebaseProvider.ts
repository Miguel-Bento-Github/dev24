import { GoogleAuthProvider } from "firebase/auth";

export const firebaseProviderConstructor = {
  google: GoogleAuthProvider,
};

export const firebaseProvider = {
  google: new firebaseProviderConstructor.google(),
};
