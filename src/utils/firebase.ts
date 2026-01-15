import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { firebaseConfig } from "../configs/firebaseConfig";

// Firebase 환경 변수 유효성 검사
const isConfigValid = firebaseConfig.apiKey !== undefined && firebaseConfig.projectId !== undefined;

if (!isConfigValid) {
  throw new Error('Firebase 환경 변수가 설정되지 않았습니다. .env 파일을 확인해주세요.');
}

// Firebase 초기화
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

try {
  app = initializeApp(firebaseConfig); // Firebase 
  auth = getAuth(app); // Firebase Auth 
  db = getFirestore(app); // Firebase Firestore 
  storage = getStorage(app); // Firebase Storage 
} catch (error) {
  console.error('Firebase 초기화 오류:', error);
  throw new Error('Firebase 초기화에 실패했습니다. Firebase 환경 변수를 확인해주세요.');
}

export { auth, db, storage };