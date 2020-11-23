import React from "react"
import * as firebase from "firebase/app"
import "firebase/storage"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCvJDYnkhnbzc9IsASUKeeCYSyFJJ-52mQ",
  authDomain: "pizza-planet-0920.firebaseapp.com",
  databaseURL: "https://pizza-planet-0920.firebaseio.com",
  projectId: "pizza-planet-0920",
  storageBucket: "pizza-planet-0920.appspot.com",
  messagingSenderId: "665750409750",
  appId: "1:665750409750:web:449041257822bc9ae49b37"
}
// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const storage = firebase.storage()

// const storage = {}

export { firebase, storage }
