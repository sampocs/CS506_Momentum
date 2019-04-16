import firebase from 'firebase'
const config = {
	apiKey: "AIzaSyAT_Bhbv7xU6eJQbSAuS0imH8rgSQahMdE",
    authDomain: "cs506-momentum.firebaseapp.com",
    databaseURL: "https://cs506-momentum.firebaseio.com",
    projectId: "cs506-momentum",
    storageBucket: "cs506-momentum.appspot.com",
    messagingSenderId: "699994337239"
};
firebase.initializeApp(config);
export default firebase;