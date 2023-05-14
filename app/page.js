"use client";

// React Hooks
import { useState, useContext, useEffect } from "react";

// Finance Context
import { financeContext } from "@/lib/store/finance-context";

// Project
import { currencyFormatter } from "@/lib/utils";
import ExpenseCategoryItem from "@/components/expenseCategoryItem";
import AddIncomeModal from "@/components/modals/addIncomeModal";
import AddExpensesModal from "@/components/modals/addExpensesModal";

// ChartJS
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  // useState Hooks
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpensesModal, setShowAddExpensesModal] = useState(false);
  const [balance, setBalance] = useState(0);

  // useContext Hooks
  const { expenses, income } = useContext(financeContext);

  // useEffect Hooks
  useEffect(() => {
    const newBalance =
      income.reduce((total, i) => {
        return total + i.amount;
      }, 0) -
      expenses.reduce((total, e) => {
        return total + e.total;
      }, 0);

    setBalance(newBalance);
  }, [expenses, income]);

  return (
    <>
      {/* Add Income Modal */}
      <AddIncomeModal
        show={showAddIncomeModal}
        onClose={setShowAddIncomeModal}
      />

      {/* Add Expenses Modal */}
      <AddExpensesModal
        show={showAddExpensesModal}
        onClose={setShowAddExpensesModal}
      />

      {/* Page */}
      <main className="container max-w-2xl px-6 mx-auto">
        {/* My Balance */}
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
        </section>

        {/* Expense and Income Buttons */}
        <section className="flex items-center gap-2 py-3">
          <button
            onClick={() => {
              setShowAddExpensesModal(true);
            }}
            className="btn btn-primary"
          >
            + Expenses
          </button>
          <button
            onClick={() => {
              setShowAddIncomeModal(true);
            }}
            className="btn btn-primary-outline"
          >
            + Income
          </button>
        </section>

        {/* My Expenses */}
        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {expenses.map((expense) => {
              return (
                <ExpenseCategoryItem
                  key={expense.id}
                  color={expense.color}
                  title={expense.title}
                  total={expense.total}
                />
              );
            })}
          </div>
        </section>

        {/* Stats */}
        <section className="py-6">
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: expenses.map((expense) => expense.title),
                datasets: [
                  {
                    data: expenses.map((expense) => expense.total),
                    label: "Expenses",
                    backgroundColor: expenses.map((expense) => expense.color),
                    borderColor: "#000",
                    borderWidth: 0.5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
