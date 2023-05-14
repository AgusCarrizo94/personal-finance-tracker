"use client";

// React Hooks
import { createContext, useState, useEffect } from "react";

// Firebase and Firestore
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

// Context
export const financeContext = createContext({
  income: [],
  expenses: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
  addExpenseItem: async () => {},
  addExpenseCategory: async () => {},
});

// Context Provider
export default function FinanceContextProvider({ children }) {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [expenseCategory, setExpenseCategory] = useState([]);

  // Handlers
  const addIncomeItem = async (newIncome) => {
    const collectionRef = collection(db, "income");

    try {
      const docsSnap = await addDoc(collectionRef, newIncome);

      // Update state
      setIncome((prevState) => {
        return [
          ...prevState,
          {
            id: docsSnap.id,
            ...newIncome,
          },
        ];
      });
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const removeIncomeItem = async (incomeId) => {
    const docRef = doc(db, "income", incomeId);
    try {
      await deleteDoc(docRef);

      // Update state
      setIncome((prevState) => {
        return prevState.filter((i) => i.id !== incomeId);
      });
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const addExpenseItem = async (expenseCategoryId, newExpense) => {
    const docRef = doc(db, "expenses", expenseCategoryId);

    try {
      await updateDoc(docRef, { ...newExpense });

      // Update state
      setExpenses((prevState) => {
        const updatedExpenses = [...prevState];

        const foundIndex = updatedExpenses.find((expense) => {
          return expense.id === expenseCategoryId;
        });

        updatedExpenses[foundIndex] = { id: expenseCategoryId, ...newExpense };

        return updatedExpenses;
      });
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const addExpenseCategory = async (newExpenseCategory) => {
    const collectionRef = collection(db, "expenses");

    try {
      const docsSnap = addDoc(collectionRef, newExpenseCategory);

      // Update state
      setExpenseCategory((prevState) => {
        return [
          ...prevState,
          {
            id: docsSnap.id,
            ...newExpenseCategory,
          },
        ];
      });
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  // Fetch income from Cloud Firestore
  useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, "income");
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });
      setIncome(data);
    };

    const getExpensesData = async () => {
      const collectionRef = collection(db, "expenses");
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setExpenses(data);
    };

    getIncomeData();
    getExpensesData();
  }, [expenses, income]);

  const values = {
    income,
    expenses,
    expenseCategory,
    addIncomeItem,
    removeIncomeItem,
    addExpenseItem,
    addExpenseCategory,
  };

  return (
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
}
