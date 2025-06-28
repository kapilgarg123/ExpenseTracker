import "./App.css";
import HomePage from "./HomePage.jsx";
import { LoginSignup } from "./LoginSignup/LoginSignup.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import CategoryPage from "./CategoryPage.jsx";
import EditCategoryPage from "./EditCategoryPage.jsx";
import ViewExpenseWithCat from "./ViewExpenseWithCat.jsx";
import Navbar from "./Navbar.jsx";
import { useEffect, useState } from "react";

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

const AppLayout = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/";

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/category"
          element={
            <PrivateRoute>
              <CategoryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/category/:id/edit"
          element={
            <PrivateRoute>
              <EditCategoryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/category/:id/expenses"
          element={
            <PrivateRoute>
              <ViewExpenseWithCat />
            </PrivateRoute>
          }
        />
        <Route
          path="/category/add"
          element={
            <PrivateRoute>
              <EditCategoryPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
