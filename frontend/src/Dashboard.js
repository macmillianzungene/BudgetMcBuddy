import React, { useState, useEffect } from "react";
import {
  addExpense,
  setGoal,
  getExpenses,
  getGoals,
  editExpense,
  deleteExpense,
  editGoal,
  deleteGoal,
} from "./api";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import {
  FaShoppingCart,
  FaBus,
  FaUtensils,
  FaFilm,
  FaHome,
  FaQuestionCircle,
} from "react-icons/fa";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [goals, setGoals] = useState([]);
  const [newExpense, setNewExpense] = useState({
    amount: "",
    category: "",
    date: "",
  });
  const [newGoal, setNewGoal] = useState({ goal_amount: "", category: "" });

  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [editedExpense, setEditedExpense] = useState({});
  const [editedGoal, setEditedGoal] = useState({});

  const getUserId = () => 1;

  useEffect(() => {
    const userId = getUserId();

    getExpenses(userId)
      .then((response) => setExpenses(response.data))
      .catch((error) => console.error("Error fetching expenses:", error));

    getGoals(userId)
      .then((response) => setGoals(response.data))
      .catch((error) => console.error("Error fetching goals:", error));
  }, []);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      const user_id = getUserId();
      await addExpense({ ...newExpense, user_id });
      refreshExpenses();
      setNewExpense({ amount: "", category: "", date: "" });
    } catch (error) {
      console.error("Error adding the expense", error);
    }
  };

  const handleSetGoal = async (e) => {
    e.preventDefault();
    try {
      const user_id = getUserId();
      await setGoal({ ...newGoal, user_id });
      refreshGoals();
      setNewGoal({ goal_amount: "", category: "" });
    } catch (error) {
      console.error("Error setting the goal", error);
    }
  };

  const handleEditExpense = async (expenseId) => {
    try {
      await editExpense(expenseId, editedExpense);
      setEditingExpenseId(null);
      refreshExpenses();
    } catch (error) {
      console.error("Error editing expense:", error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await deleteExpense(expenseId);
      refreshExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEditGoal = async (goalId) => {
    try {
      await editGoal(goalId, editedGoal);
      setEditingGoalId(null);
      refreshGoals();
    } catch (error) {
      console.error("Error editing goal:", error);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      await deleteGoal(goalId);
      refreshGoals();
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const refreshExpenses = () => {
    getExpenses(getUserId())
      .then((response) => setExpenses(response.data))
      .catch((error) => console.error("Error fetching expenses:", error));
  };

  const refreshGoals = () => {
    getGoals(getUserId())
      .then((response) => setGoals(response.data))
      .catch((error) => console.error("Error fetching goals:", error));
  };

  const calculateProgress = (goal) => {
    const totalExpensesInCategory = expenses
      .filter((exp) => exp.category === goal.category)
      .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

    const progressPercentage =
      (totalExpensesInCategory / goal.goal_amount) * 100;
    return Math.min(progressPercentage, 100); // Cap at 100%
  };

  // Map categories to icons
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "groceries":
        return <FaShoppingCart className="me-2" />;
      case "transport":
        return <FaBus className="me-2" />;
      case "dining":
        return <FaUtensils className="me-2" />;
      case "entertainment":
        return <FaFilm className="me-2" />;
      case "housing":
        return <FaHome className="me-2" />;
      default:
        return <FaQuestionCircle className="me-2" />;
    }
  };

  return (
    <div className="container mt-4">
      <h2>Your Dashboard</h2>

      {/* Add Expense Form */}
      <h3>Log a New Expense</h3>
      <form onSubmit={handleAddExpense} className="mb-4">
        <input
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) =>
            setNewExpense({ ...newExpense, amount: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={newExpense.category}
          onChange={(e) =>
            setNewExpense({ ...newExpense, category: e.target.value })
          }
          required
        />
        <input
          type="date"
          value={newExpense.date}
          onChange={(e) =>
            setNewExpense({ ...newExpense, date: e.target.value })
          }
          required
        />
        <button type="submit" className="btn btn-primary mt-2">
          Add Expense
        </button>
      </form>

      {/* Set Goal Form */}
      <h3>Set a New Goal</h3>
      <form onSubmit={handleSetGoal} className="mb-4">
        <input
          type="number"
          placeholder="Target Amount"
          value={newGoal.goal_amount}
          onChange={(e) =>
            setNewGoal({ ...newGoal, goal_amount: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={newGoal.category}
          onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
          required
        />
        <button type="submit" className="btn btn-success mt-2">
          Set Goal
        </button>
      </form>

      {/* Display Goals with Updated Progress Bars */}
      <h3>Your Goals</h3>
      <ul className="list-group">
        {goals.map((goal) => (
          <li key={goal.id} className="list-group-item">
            {editingGoalId === goal.id ? (
              <>
                <input
                  type="number"
                  value={editedGoal.goal_amount || goal.goal_amount}
                  onChange={(e) =>
                    setEditedGoal({
                      ...editedGoal,
                      goal_amount: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  value={editedGoal.category || goal.category}
                  onChange={(e) =>
                    setEditedGoal({ ...editedGoal, category: e.target.value })
                  }
                />
                <button
                  onClick={() => handleEditGoal(goal.id)}
                  className="btn btn-primary btn-sm mt-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingGoalId(null)}
                  className="btn btn-secondary btn-sm mt-2"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <strong>
                  {getCategoryIcon(goal.category)} {goal.category}
                </strong>
                : ${goal.goal_amount}
                <ProgressBar
                  now={calculateProgress(goal)}
                  label={`${Math.round(calculateProgress(goal))}%`}
                  className="mt-2"
                  variant={calculateProgress(goal) >= 100 ? "success" : "info"}
                  style={{ height: "30px", fontSize: "16px" }}
                />
                <button
                  onClick={() => {
                    setEditingGoalId(goal.id);
                    setEditedGoal(goal);
                  }}
                  className="btn btn-warning btn-sm mt-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="btn btn-danger btn-sm mt-2"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Display Expenses */}
      <h3 className="mt-4">Your Expenses</h3>
      <ul className="list-group">
        {expenses.map((expense) => (
          <li key={expense.id} className="list-group-item">
            {editingExpenseId === expense.id ? (
              <>
                <input
                  type="number"
                  value={editedExpense.amount || expense.amount}
                  onChange={(e) =>
                    setEditedExpense({
                      ...editedExpense,
                      amount: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  value={editedExpense.category || expense.category}
                  onChange={(e) =>
                    setEditedExpense({
                      ...editedExpense,
                      category: e.target.value,
                    })
                  }
                />
                <input
                  type="date"
                  value={editedExpense.date || expense.date}
                  onChange={(e) =>
                    setEditedExpense({ ...editedExpense, date: e.target.value })
                  }
                />
                <button
                  onClick={() => handleEditExpense(expense.id)}
                  className="btn btn-primary btn-sm mt-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingExpenseId(null)}
                  className="btn btn-secondary btn-sm mt-2"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                {getCategoryIcon(expense.category)} {expense.category}: $
                {expense.amount} on {expense.date}
                <button
                  onClick={() => {
                    setEditingExpenseId(expense.id);
                    setEditedExpense(expense);
                  }}
                  className="btn btn-warning btn-sm mt-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteExpense(expense.id)}
                  className="btn btn-danger btn-sm mt-2"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
