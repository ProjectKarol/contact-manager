import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
// reducer
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

const firebaseConfig = {
  apiKey: "AIzaSyABKhWIQl-tajZuApdGPrTmYx4jVPEQXmY",
  authDomain: "contct-manager.firebaseapp.com",
  databaseURL: "https://contct-manager.firebaseio.com",
  projectId: "contct-manager",
  storageBucket: "contct-manager.appspot.com",
  messagingSenderId: "356053948900"
};

//react reduc firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};
// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

//inidial y firestroe
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  notify: notifyReducer,
  settings: settingsReducer
});
//check for setting in local storage
if (localStorage.getItem("settings") == null) {
  // defaulsettins
  const defaultSettins = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };

  // set tu localstorag
  localStorage.setItem("settings", JSON.stringify(defaultSettins));
}

// create inital state
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };

// create store

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
