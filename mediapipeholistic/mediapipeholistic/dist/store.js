var firebaseConfig = {
    apiKey: "AIzaSyDQZ0uPpEi8tpMF6uTuKbidtj0JUOvH_iE",
    authDomain: "hearingaid-97026.firebaseapp.com",
    projectId: "hearingaid-97026",
    storageBucket: "hearingaid-97026.appspot.com",
    messagingSenderId: "178097420020",
    appId: "1:178097420020:web:982cf0787fe02f652090a1"
  };

firebase.initializeApp(firebaseConfig);
const storage=firebase.storage().ref()

function store(name, results){
var sign=new Signs();
storage.child(name).putString(JSON.stringify(results)).then((snapshot) => {
  console.log('Uploaded a raw string!');
  sign.update(name);

  
}

);}