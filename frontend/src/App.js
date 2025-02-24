import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import "./App.css";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Budget Mc-Buddy</h1>
          <p>Your easy-to-use financial tracker.<br />Budget Buddy is a minimalist and user-friendly app that helps individuals easily manage their finances by tracking daily expenses, setting goals, and visualizing spending patterns.</p>
          {!isLoggedIn && (
            <div>
              <Link to="/">
                <button>Login</button>
              </Link>
              <Link to="/register">
                <button>Register</button>
              </Link>
            </div>
          )}
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
