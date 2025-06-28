import React, { useState, useEffect } from "react";
import "./AddExpenseForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddExpenseForm = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    date: "",
    categoryName: "",
  });

  useEffect(() => {
    if (initialData) {
      const prefilledCategory =
        initialData.category?.name || initialData.categoryName || "";

      setForm({
        title: initialData.title || "",
        amount: initialData.amount || "",
        date: initialData.date || "",
        categoryName: prefilledCategory,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, amount, date, categoryName } = form;

    if (!title || !amount || !date || !categoryName) {
      alert("Please fill all fields");
      return;
    }

    onSubmit(form, initialData?.id || null);
    setForm({ title: "", amount: "", date: "", categoryName: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="form-input"
        autoFocus
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        className="form-input"
      />
      <DatePicker
        selected={form.date ? new Date(form.date) : null}
        onChange={(date) => {
          setForm({ ...form, date: date.toISOString().split("T")[0] });
        }}
        className="form-input"
        placeholderText="Select a date"
      />
      {!initialData?.categoryName || initialData?.id ? (
        <input
          type="text"
          name="categoryName"
          placeholder="Category"
          value={form.categoryName}
          onChange={handleChange}
          className="form-input"
        />
      ) : null}
      <button type="submit" className="submit-button">
        {initialData ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
};

export default AddExpenseForm;
