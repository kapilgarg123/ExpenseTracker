import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditCategoryPage.css";
import { BASE_URL } from "./config";

const EditCategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({ name: "" });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (id !== "new") {
      fetch(`${BASE_URL}/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setCategory(data))
        .catch((err) => console.error("Error loading category:", err));
    }
  }, [id, token]);

  const handleChange = (e) => {
    setCategory({ ...category, name: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      id === "new"
        ? `${BASE_URL}/category/add`
        : `${BASE_URL}/category/${id}`;
    const method = id === "new" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });

    if (res.ok) {
      navigate("/category");
      if (id === "new") alert("Category added successfully");
    } else {
      alert(`Failed to ${id === "new" ? "add" : "update"} category`);
    }
  };

  return (
    <div className="edit-category-container">
      <h2>{id === "new" ? "Add New Category" : "Edit Category"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={category.name}
          onChange={handleChange}
          placeholder="Category Name"
          required
        />
        <button type="submit">{id === "new" ? "Add" : "Update"}</button>
      </form>
    </div>
  );
};

export default EditCategoryPage;