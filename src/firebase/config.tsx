import React from "react"
import firebase from "firebase/app"
import "firebase/storage"
import "firebase/firestore"
import "firebase/auth"

var firebaseConfig = {
  apiKey: "AIzaSyAkWMnIFZhdea7obegh6ked-Kcl9Yoz0pw",
  authDomain: "sherenote-0920.firebaseapp.com",
  databaseURL: "https://sherenote-0920-default-rtdb.firebaseio.com",
  projectId: "sherenote-0920",
  storageBucket: "sherenote-0920.appspot.com",
  messagingSenderId: "366733885061",
  appId: "1:366733885061:web:abd1767f95da2514a0f3ec"
}
// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const storage = firebase.storage()

// const storage = {}

export { firebase, storage }
