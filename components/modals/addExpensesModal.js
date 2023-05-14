// Projects
import Modal from "@/components/modal";

// React Hooks
import { useContext, useState } from "react";

// Context
import { financeContext } from "@/lib/store/finance-context";

// UUID
import { v4 as uuidv4 } from "uuid";

function AddExpensesModal({ show, onClose }) {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { expenses } = useContext(financeContext);

  //   Handler
  const addExpenseItemHandler = () => {
    const expense = expenses.find((e) => {
      return e.id === selectedCategory;
    });

    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + +expenseAmount,
      item: [
        ...expense.items,
        {
          amount: +expenseAmount,
          createdAt: new Date(),
          id: uuidv4(),
        },
      ],
    };

    console.log(newExpense);

    setExpenseAmount("");
    setSelectedCategory(null);
    onClose();
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <label htmlFor="expense">Enter an amount..</label>
        <input
          type="number"
          name="expense"
          min={0.01}
          step={0.01}
          placeholder="Enter expense amount"
          value={expenseAmount}
          onChange={(e) => {
            setExpenseAmount(e.target.value);
          }}
        />
      </div>

      {/* Expense Categories */}
      {expenseAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
            <h3 className="text-2xl capitalize">Select expense category</h3>
          {expenses.map((expense) => {
            return (
              <button
                key={expense.id}
                onClick={() => {
                  setSelectedCategory(expense.id);
                }}
              >
                <div
                  style={{
                    boxShadow:
                      expense.id === selectedCategory ? "1px 1px 4px" : "none",
                  }}
                  className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-[25px] h-[25px] rounded-full"
                      style={{
                        backgroundColor: expense.color,
                      }}
                    ></div>
                    <h4 className="capitalize">{expense.title}</h4>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {expenseAmount > 0 && selectedCategory && (
        <div className="mt-6">
          <button className="btn btn-primary" onClick={addExpenseItemHandler}>
            Add Expense
          </button>
        </div>
      )}
    </Modal>
  );
}

export default AddExpensesModal;
