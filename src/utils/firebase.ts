import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { firebaseConfig } from "../configs/firebaseConfig";

// Firebase 환경 변수 유효성 검사
const requiredKeys = ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"] as const;
const missingKeys = requiredKeys.filter((key) => !firebaseConfig[key]);

if (missingKeys.length > 0) {
  throw new Error(`Firebase 환경 변수가 설정되지 않았습니다: ${missingKeys.join(", ")}`);
}

// Firebase 초기화
const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// let보다는 const로 불변성 확보하는 것이 좋음
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, db, storage, app };
