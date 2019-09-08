import * as fire from "firebase";
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDJ4KP_1ORRx7vf-a5hMWL6_RZp7m4pMyw",
  authDomain: "saylani-final-hackathon.firebaseapp.com",
  databaseURL: "https://saylani-final-hackathon.firebaseio.com",
  projectId: "saylani-final-hackathon",
  storageBucket: "saylani-final-hackathon.appspot.com",
  messagingSenderId: "283965223324"
};

fire.initializeApp(config);

module.exports = fire;
