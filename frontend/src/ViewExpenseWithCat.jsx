import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ExpenseList from "./Components/ExpenseList";
import AddExpenseForm from "./Components/AddExpenseForm";
import "./ViewExpenseWithCat.css";
import { BASE_URL } from "./config";

const ViewCategoryExpensesPage = () => {
  const { id } = useParams();
  const [expenses, setExpenses] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`${BASE_URL}/category/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setCategoryName(data.name);
        } else {
          console.error("Failed to fetch category name");
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    const fetchExpenses = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/category/${id}/expenses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setExpenses(data);
        } else {
          console.error("Failed to fetch expenses");
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchCategory();
    fetchExpenses();
  }, [id, token]);

  const handleDeleteCategory = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete category "${categoryName}"?`
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${BASE_URL}/category/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const msg = await res.text();
      alert(msg);
      if (res.ok) {
        navigate("/category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Something went wrong while deleting the category.");
    }
  };

  const handleFormSubmit = async (expenseData) => {
    try {
      const method = editingExpense ? "PUT" : "POST";
      const url = editingExpense
        ? `${BASE_URL}/expense/${editingExpense.id}`
        : `${BASE_URL}/expense/add`;
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: expenseData.title,
          amount: parseFloat(expenseData.amount),
          date: expenseData.date,
          category: {
            name: expenseData.categoryName.trim(),
          },
        }),
      });
      if (res.ok) {
        const updatedExpense = await res.json();
        if (editingExpense) {
          setExpenses((prev) =>
            prev.map((exp) =>
              exp.id === updatedExpense.id ? updatedExpense : exp
            )
          );
        } else {
          setExpenses((prev) => [...prev, updatedExpense]);
        }
        setShowForm(false);
        setEditingExpense(null);
      } else {
        const msg = await res.text();
        alert("Failed to save expense: " + msg);
      }
    } catch (error) {
      console.error("Error saving expense:", error);
      alert("Something went wrong while saving the expense.");
    }
  };

  const handleDelete = async (expenseId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${BASE_URL}/expense/${expenseId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setExpenses((prev) => prev.filter((exp) => exp.id !== expenseId));
      } else {
        const msg = await res.text();
        alert("Failed to delete expense: " + msg);
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      alert("Something went wrong while deleting the expense.");
    }
  };

  return (
    <div className="view-category-container">
      <h2 className="view-category-title">
        Expenses for Category:{" "}
        <span className="view-category-highlight">
          {categoryName || `#${id}`}
        </span>
      </h2>

      {!showForm && (
        <button
          className="add-expense-button"
          onClick={() => {
            setShowForm(true);
            setEditingExpense(null);
          }}
        >
          Add new expense
        </button>
      )}

      {showForm ? (
        <>
          <AddExpenseForm
            onSubmit={handleFormSubmit}
            initialData={
              editingExpense || {
                title: "",
                amount: "",
                date: "",
                categoryName: categoryName,
              }
            }
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
          onEdit={(expense) => {
            setEditingExpense(expense);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      )}

      <div className="button-group">
        {expenses.length === 0 && (
          <button
            className="delete-button"
            onClick={handleDeleteCategory}
            title="Delete this category"
          >
            Delete Category
          </button>
        )}

        <Link to="/category" className="back-link">
          ← Back to Categories
        </Link>
      </div>
    </div>
  );
};

export default ViewCategoryExpensesPage;
