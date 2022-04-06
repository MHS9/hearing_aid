// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQZ0uPpEi8tpMF6uTuKbidtj0JUOvH_iE",
  authDomain: "hearingaid-97026.firebaseapp.com",
  projectId: "hearingaid-97026",
  storageBucket: "hearingaid-97026.appspot.com",
  messagingSenderId: "178097420020",
  appId: "1:178097420020:web:982cf0787fe02f652090a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
//const pathReference = ref(storage, 'images/stars.jpg');

export const getResult = async(word)=>{
    const pathReference = ref(storage, word);
    let url=await getDownloadURL(pathReference)
    let data= await fetch(url)
    let json=await data.json()
    //console.log(json)
    return json;
   
    
   

    
}
