// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC-vjC7Ocn8UkMCL2XCgAg4Yofiez0trWs',
  authDomain: 'jade-370904.firebaseapp.com',
  projectId: 'jade-370904',
  storageBucket: 'jade-370904.appspot.com',
  messagingSenderId: '199091280635',
  appId: '1:199091280635:web:3066cee91f17b4d2d92e5e',
  measurementId: 'G-YCMD9WS35H'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
