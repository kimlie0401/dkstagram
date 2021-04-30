import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// here I want to import the seed file
// import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyD9urldGyf0DXCwRStUJu05wiSh-a5oojY",
  authDomain: "dkstagram-2f160.firebaseapp.com",
  projectId: "dkstagram-2f160",
  storageBucket: "dkstagram-2f160.appspot.com",
  messagingSenderId: "626838486788",
  appId: "1:626838486788:web:737e5a2811780926499a51",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// here is where I want to call the seed file (only ONCE!)
// seedDatabase(firebase);

export { firebase, FieldValue };
