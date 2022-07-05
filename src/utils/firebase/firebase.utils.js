import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCkE5I7nXq6b2OnAotllwCR89cuOTw9hc0",
	authDomain: "e-com-db-3d7f0.firebaseapp.com",
	projectId: "e-com-db-3d7f0",
	storageBucket: "e-com-db-3d7f0.appspot.com",
	messagingSenderId: "523142667892",
	appId: "1:523142667892:web:59518bbe04ce4ab2fabb21",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, "users", userAuth.uid);
	console.log(userDocRef);
	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (err) {
			console.log("error creating user", err);
		}
	}
	return userDocRef;
};
