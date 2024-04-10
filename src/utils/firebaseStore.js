import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, addDoc, deleteDoc } from 'firebase/firestore';

const db = firebase.firestore();

// Function to add a favorite city for the current user
const addFavoriteCity = (city) => {
  const user = firebase.auth().currentUser;
  if (user) {
    db.collection('users').doc(user.uid).collection('favorites').add({ city });
  }
};

// Function to remove a favorite city for the current user
const removeFavoriteCity = (favoriteId) => {
  const user = firebase.auth().currentUser;
  if (user) {
    db.collection('users').doc(user.uid).collection('favorites').doc(favoriteId).delete();
  }
};
