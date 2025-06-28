import React from "react";
import "./ExpenseItem.css";

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  const formattedDate = new Date(expense.date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="expense-item-card">
      <div className="expense-item-header">
        <div>
          <h3 className="expense-title">{expense.title}</h3>
          <div className="expense-meta">
            <span className="expense-date">{formattedDate}</span>
            <span className="expense-category">
              {expense.category?.name || "Uncategorized"}
            </span>
          </div>
        </div>
        <div className="expense-amount">₹{expense.amount}</div>
      </div>

      <div className="expense-actions">
        <button onClick={() => onEdit(expense)} className="edit-btn" title="Edit">
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(expense.id)}
          className="delete-btn"
          title="Delete"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;