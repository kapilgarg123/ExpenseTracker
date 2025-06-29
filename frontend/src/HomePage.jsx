import React, { useState, useEffect } from "react";
import AddExpenseForm from "./Components/AddExpenseForm";
import ExpenseList from "./Components/ExpenseList";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./config";

const HomePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();
  

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await fetch(`${BASE_URL}/expense`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setExpenses(data);
      } else {
        console.error("Failed to fetch expenses");
      }
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${BASE_URL}/category`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
        setShowCategories(true);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleAddExpenseClick = () => {
    setEditingExpense(null);
    setShowForm(true);
  };

  const addExpense = async (formData) => {
    const payload = {
      title: formData.title,
      amount: parseFloat(formData.amount),
      date: formData.date,
      category: { name: formData.categoryName.trim() },
    };

    try {
      const res = await fetch(`${BASE_URL}/expense/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await res.json();
        setShowForm(false);
        fetchExpenses();
      } else {
        console.error("Failed to add expense");
      }
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  const editExpense = async (expenseId, updatedData) => {
    const payload = {
      title: updatedData.title,
      amount: parseFloat(updatedData.amount),
      date: updatedData.date,
      category: { name: updatedData.categoryName.trim() },
    };

    try {
      const res = await fetch(`${BASE_URL}/expense/${expenseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await res.json();
        setShowForm(false);
        setEditingExpense(null);
        fetchExpenses();
      } else {
        console.error("Failed to update expense");
      }
    } catch (err) {
      console.error("Error updating expense:", err);
    }
  };

  const handleFormSubmit = (formData, expenseId = null) => {
    if (expenseId) {
      editExpense(expenseId, formData);
    } else {
      addExpense(formData);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/expense/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (res.ok) {
        setExpenses((prev) => prev.filter((e) => e.id !== id));
      } else {
        console.error("Delete failed");
      }
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-heading">Expense Tracker</h1>

      <div className="button-group">
        <button className="add-expense-button" onClick={handleAddExpenseClick}>
          + Add Expense
        </button>
        <button
          className="view-category-button"
          onClick={() => navigate("/category")}
        >
          📂 View All Categories
        </button>
      </div>

      {showCategories && (
        <div className="category-list">
          <h2>Categories</h2>
          <ul>
            {categories.map((cat) => (
              <li key={cat.id} style={{ marginBottom: "10px" }}>
                <span>{cat.name}</span>

                <button
                  onClick={() => navigate(`/category/${cat.id}`)}
                  style={{ marginLeft: "10px" }}
                >
                  View Expenses
                </button>

                <button
                  onClick={() => navigate(`/category/${cat.id}/edit`)}
                  style={{ marginLeft: "10px" }}
                >
                  Edit Category
                </button>
              </li>
            ))}
          </ul>
          <button
            className="close-category-button"
            onClick={() => setShowCategories(false)}
          >
            ❌ Close
          </button>
        </div>
      )}

      {showForm ? (
        <>
          <AddExpenseForm
            onSubmit={handleFormSubmit}
            initialData={editingExpense}
          />
          <button
            className="back-button"
            onClick={() => {
              setShowForm(false);
              setEditingExpense(null);
            }}
          >
            ← Back to Expenses
          </button>
        </>
      ) : (
        <ExpenseList
          expenses={expenses}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default HomePage;
