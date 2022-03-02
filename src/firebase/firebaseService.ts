import {
  browserLocalPersistence,
  getRedirectResult,
  GoogleAuthProvider,
  setPersistence,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { firebaseAuth } from "./firebaseConfig";
import { firebaseProviderConstructor } from "./firebaseProvider";

const Provider =
  firebaseProviderConstructor[
    sessionStorage.provider as keyof typeof firebaseProviderConstructor
  ];

const login = (provider: GoogleAuthProvider, providerKey: string) => {
  setPersistence(firebaseAuth, browserLocalPersistence).then(() => {
    signInWithRedirect(firebaseAuth, provider);
  });
  provider.addScope("profile");
  provider.addScope("email");
  sessionStorage.provider = providerKey;
  sessionStorage.isLoggingIn = true;
};

const logout = () => signOut(firebaseAuth);

if (sessionStorage.isLoggingIn) {
  getRedirectResult(firebaseAuth)
    .then((result) => {
      if (!result) return;

      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = Provider.credentialFromResult(result);
      credential?.accessToken;
      // The signed-in user info.
      result?.user;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;

      // The AuthCredential type that was used.
      const credential = Provider.credentialFromError(error);
      throw new Error(`
      ${errorCode}: ${errorMessage}
      ${email}
      ${credential}
      `);
    })
    .finally(() => {
      ["isLoggingIn", "provider"].forEach((item) => {
        sessionStorage.removeItem(item);
      });
    });
}

export const firebaseService = {
  login,
  logout,
};
