var app_firebase = {};

(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDnX1abKMAdsBoJForZ93i3CyqCrqU9O0c",
    authDomain: "shu-match.firebaseapp.com",
    databaseURL: "https://shu-match.firebaseio.com",
    projectId: "shu-match",
    storageBucket: "shu-match.appspot.com",
    messagingSenderId: "82692188699"
  };
  firebase.initializeApp(config);
  app_firebase = firebase;
})()