// ExpenseList.js (updated)
import React from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const formattedTotal = new Intl.NumberFormat('en-IN').format(totalExpenses.toFixed(2));

  return (
    <div className="expense-list-container">
      <div className="expense-summary-card">
        <div className="summary-header">
          <h2 className="expenses-heading">Your Expenses</h2>
          <div className="summary-badge">
            {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}
          </div>
        </div>
        <div className="total-amount">
          <span className="total-label">Total:</span>
          <span className="total-value">₹{formattedTotal}</span>
        </div>
      </div>
      
      {expenses.length === 0 ? (
        <div className="empty-state">
          <img src="/images/no-expenses.svg" alt="No expenses" className="empty-state-image" />
          <p className="empty-state-text">No expenses recorded yet</p>
          <p className="empty-state-hint">Add your first expense to get started</p>
        </div>
      ) : (
        <ul className="expense-items-list">
          {expenses.map((expense) => (
            <li key={expense.id}>
              <ExpenseItem
                expense={expense}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;