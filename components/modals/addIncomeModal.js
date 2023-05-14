// React Hooks
const { useRef, useContext } = require("react");

// Finance Context
import { financeContext } from "@/lib/store/finance-context";

// Icons
import { FaRegTrashAlt } from "react-icons/fa";

// Project Imports
import Modal from "@/components/modal";
const { currencyFormatter } = require("@/lib/utils");

function AddIncomeModal({ show, onClose }) {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const { income, addIncomeItem, removeIncomeItem } =
    useContext(financeContext);

// Handlers
  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };

    try {
      await addIncomeItem(newIncome);
      descriptionRef.current.value = "";
      amountRef.current.value = "";
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteIncomeEntryHandler = async (incomeId) => {
    try {
        await removeIncomeItem(incomeId)
    } catch (error) {
        console.log(error.message)
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <form onSubmit={addIncomeHandler} className="flex flex-col gap-4">
        <div className="input-group">
          <label htmlFor="amount">Income Amount</label>
          <input
            type="number"
            min={0.01}
            step={0.01}
            placeholder="Enter income amount"
            required
            name="amount"
            ref={amountRef}
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="Enter item description"
            required
            name="description"
            ref={descriptionRef}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Add entry
        </button>
      </form>

      <div
        style={income.length === 0 ? { display: "none" } : { display: "block" }}
        className="flex flex-col gap-4 mt-6"
      >
        <h3 className="text-2xl font-bold mb-2">Income History</h3>

        {income.map((i) => {
          return (
            <div key={i.id} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{i.description}</p>
                <small className="text-xs">{i.createdAt.toISOString()}</small>
              </div>
              <p className="flex items-center gap-2">
                {currencyFormatter(i.amount)}
                <button
                  onClick={() => {
                    deleteIncomeEntryHandler(i.id);
                  }}
                >
                  <FaRegTrashAlt />
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

export default AddIncomeModal;
