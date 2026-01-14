import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { firebaseConfig } from "../configs/firebaseConfig";

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

// Firebase 환경 변수 유효성 검사
const isFirebaseConfigValid = () => {
  return firebaseConfig.apiKey && 
         firebaseConfig.apiKey !== 'undefined' && 
         firebaseConfig.projectId && 
         firebaseConfig.projectId !== 'undefined';
};

// Firebase 초기화
if (isFirebaseConfigValid()) {
  try {
    app = initializeApp(firebaseConfig); // Firebase 
    auth = getAuth(app); // Firebase Auth 
    db = getFirestore(app); // Firebase Firestore 
    storage = getStorage(app); // Firebase Storage 
  } catch (error) {
    console.error('Firebase 초기화 오류:', error);
    console.warn('Firebase 환경 변수를 확인해주세요. .env 파일에 Firebase 설정값이 필요합니다.');
  }
} else {
  console.warn('Firebase 환경 변수가 설정되지 않았습니다. .env 파일을 확인해주세요.');
}

export { auth, db, storage };