// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBecK4B1HONNfVDpiIT0HZtuxlRCs0ZXd8",
  authDomain: "financial-fellows.firebaseapp.com",
  projectId: "financial-fellows",
  storageBucket: "financial-fellows.appspot.com",
  messagingSenderId: "501557858874",
  appId: "1:501557858874:web:37f85213e7083c2ead9b03",
  measurementId: "G-K4X2KRSGBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const db = getFirestore(app)
export const auth = getAuth(app)


export const expensesRef = collection(db, 'expenses')
export const incomeRef = collection(db, 'incomes')
export const transactionRef = collection(db, 'transactions')
export const budgetRef = collection(db, 'budgets')

export default app;