import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC-vjC7Ocn8UkMCL2XCgAg4Yofiez0trWs',
  authDomain: 'jade-370904.firebaseapp.com',
  projectId: 'jade-370904',
  storageBucket: 'jade-370904.appspot.com',
  messagingSenderId: '199091280635',
  appId: '1:199091280635:web:3066cee91f17b4d2d92e5e',
  measurementId: 'G-YCMD9WS35H'
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
