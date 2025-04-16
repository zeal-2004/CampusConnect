import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMoneyBill } from "react-icons/fa";

function BudgetTracker({ eventId }) {
  const [budgetItems, setBudgetItems] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [message, setMessage] = useState("");
  const [eventBudget, setEventBudget] = useState(null);

  // Fetch existing budget for the selected event
  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const res = await axios.get(`http://localhost:5020/budget/${eventId}`);
        setEventBudget(res.data);
        if (res.data) {
          setBudgetItems(res.data.items);
        }
      } catch (err) {
        console.error("Failed to fetch event budget", err);
      }
    };
    if (eventId) {
      fetchBudget();
    }
  }, [eventId]);

  // Add a new budget item
  const handleAddBudgetItem = (e) => {
    e.preventDefault();
    if (newCategory && newAmount > 0) {
      setBudgetItems([
        ...budgetItems,
        { category: newCategory, amount: parseFloat(newAmount) },
      ]);
      setNewCategory("");
      setNewAmount("");
      setMessage("");
    } else {
      setMessage("Please enter a valid category and amount.");
    }
  };

  // Finalize the budget
  const handleFinalizeBudget = async () => {
    if (budgetItems.length === 0) {
      setMessage("Please add at least one budget item.");
      return;
    }
    try {
      const res = await axios.post(`http://localhost:5020/budget/${eventId}`, {
        items: budgetItems,
      });
      setEventBudget(res.data);
      setMessage("Budget finalized successfully!");
    } catch (err) {
      setMessage("Failed to finalize budget.");
    }
  };

  return (
    <div className="glass-card mt-4">
      <h5 className="mb-3 text-white">
        <FaMoneyBill className="me-2" />
        Event Budget Tracker
      </h5>

      <form onSubmit={handleAddBudgetItem}>
        <div className="d-flex gap-2 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Category (e.g., Guest)"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            required
          />
          <input
            type="number"
            className="form-control"
            placeholder="Amount"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            required
            min="1"
          />
          <button type="submit" className="btn btn-danger">
            Add
          </button>
        </div>
      </form>

      {message && <div className="alert alert-info">{message}</div>}

      {budgetItems.length === 0 ? (
        <p className="text-white">No budget items added yet.</p>
      ) : (
        <ul className="list-group mb-3">
          {budgetItems.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between"
            >
              <strong>{item.category}</strong>
              <span>₹ {item.amount.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="text-end text-white fw-bold fs-5">
        Total: ₹{" "}
        {budgetItems
          .reduce((total, item) => total + item.amount, 0)
          .toLocaleString()}
      </div>

      {eventBudget && (
        <div className="mt-3">
          <h6 className="text-white">Budget already set: </h6>
          <ul className="list-group">
            {eventBudget.items.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between"
              >
                <strong>{item.category}</strong>
                <span>₹ {item.amount.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        className="btn btn-success mt-3"
        onClick={handleFinalizeBudget}
        style={{ width: "100%" }}
      >
        Finalize Budget
      </button>
    </div>
  );
}

export default BudgetTracker;
