import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CategoryPage.css";
import { BASE_URL } from "./config";

const AllCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/category`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [token]);

  if (loading) {
    return (
      <div className="all-categories-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="all-categories-container">
        <div className="error-message">
          <p>Error loading categories: {error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="all-categories-container">
      <div className="header-section">
        <h2>Expense Categories</h2>
        <p className="subtitle">Manage your spending categories</p>
      </div>

      <div className="actions-section">
        <Link to="/category/new/edit" className="add-category-btn">
          <span className="plus-icon">+</span> Create New Category
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="empty-state">
          <img src="/images/no-categories.svg" alt="No categories" className="empty-state-image" />
          <p className="empty-state-text">No categories created yet</p>
          <p className="empty-state-hint">Create your first category to organize expenses</p>
        </div>
      ) : (
        <ul className="category-list">
          {categories.map((cat) => (
            <li key={cat.id} className="category-item">
              <div className="category-info">
                <span className="category-name">{cat.name}</span>
                {cat.description && (
                  <p className="category-description">{cat.description}</p>
                )}
              </div>
              
              <div className="category-actions">
                <Link 
                  to={`/category/${cat.id}/expenses`} 
                  className="view-btn"
                  title="View expenses in this category"
                >
                  <span className="btn-icon">👁️</span> View
                </Link>
                
                <Link 
                  to={`/category/${cat.id}/edit`} 
                  className="edit-btn"
                  title="Edit this category"
                >
                  <span className="btn-icon">✏️</span> Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="footer-section">
        <Link to="/home" className="back-home-link">
          <span className="arrow-icon">←</span> Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AllCategoriesPage;