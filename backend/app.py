from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests (useful for frontend/backend communication)

@app.route('/')
def home():
    return " Welcome to Budget Mc- Buddy Backend  <br /> Your easy to use budget"

# Database connection helper function
def get_db():
    conn = sqlite3.connect('budget_buddy.db')
    conn.row_factory = sqlite3.Row  # To access columns by name
    return conn

# ---------------- USER AUTHENTICATION ----------------

# User Registration for clients
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    try:
        username = data['username']
        password = data['password']
    except KeyError as e:
        return jsonify({"error": f"Missing field: {str(e)}"}), 400

    hashed_password = generate_password_hash(password)

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (username, password_hash) VALUES (?, ?)", (username, hashed_password))
    conn.commit()
    conn.close()

    return jsonify({"message": "User registered successfully"}), 201

# User Login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    try:
        username = data['username']
        password = data['password']
    except KeyError as e:
        return jsonify({"error": f"Missing field: {str(e)}"}), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
    user = cursor.fetchone()

    if user and check_password_hash(user['password_hash'], password):        
        return jsonify({"message": "Login successful"}), 200   
    else:
        return jsonify({"message": "Invalid credentials"}), 401

# ---------------- EXPENSE ROUTES ----------------

# Add Expense
@app.route('/add_expense', methods=['POST'])
def add_expense():
    data = request.get_json()

    try:
        amount = data['amount']
        category = data['category']
        date = data['date']
        user_id = data['user_id']
    except KeyError as e:
        return jsonify({"error": f"Missing field: {str(e)}"}), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO expenses (amount, category, date, user_id) VALUES (?, ?, ?, ?)",
                   (amount, category, date, user_id))
    conn.commit()
    conn.close()

    return jsonify({"message": "Expense added successfully"}), 201

# Get Expenses
@app.route('/get_expenses', methods=['GET'])
def get_expenses():
    user_id = request.args.get('user_id')

    if not user_id:
        return jsonify({"error": "Missing field: user_id"}), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, amount, category, date FROM expenses WHERE user_id = ?", (user_id,))
    expenses = cursor.fetchall()
    conn.close()

    expenses_list = [{"id": row["id"], "amount": row["amount"], "category": row["category"], "date": row["date"]} for row in expenses]

    return jsonify(expenses_list), 200

# Edit Expense
@app.route('/edit_expense/<int:expense_id>', methods=['PUT'])
def edit_expense(expense_id):
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM expenses WHERE id = ?", (expense_id,))
    expense = cursor.fetchone()

    if not expense:
        return jsonify({"error": "Expense not found"}), 404

    # Update fields if provided, otherwise keep the old value
    amount = data.get('amount', expense['amount'])
    category = data.get('category', expense['category'])
    date = data.get('date', expense['date'])

    cursor.execute("""
        UPDATE expenses 
        SET amount = ?, category = ?, date = ?
        WHERE id = ?
    """, (amount, category, date, expense_id))

    conn.commit()
    conn.close()

    return jsonify({"message": "Expense updated successfully"}), 200

# Delete Expense
@app.route('/delete_expense/<int:expense_id>', methods=['DELETE'])
def delete_expense(expense_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM expenses WHERE id = ?", (expense_id,))
    expense = cursor.fetchone()

    if not expense:
        return jsonify({"error": "Expense not found"}), 404

    cursor.execute("DELETE FROM expenses WHERE id = ?", (expense_id,))
    conn.commit()
    conn.close()

    return jsonify({"message": "Expense deleted successfully"}), 200

# ---------------- GOAL ROUTES ----------------

# Set Goal
@app.route('/set_goal', methods=['POST'])
def set_goal():
    data = request.json
    try:
        goal_amount = data['goal_amount']
        category = data['category']
        user_id = data['user_id']
    except KeyError as e:
        return jsonify({"error": f"Missing field: {str(e)}"}), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO goals (goal_amount, category, user_id) VALUES (?, ?, ?)",
                   (goal_amount, category, user_id))
    conn.commit()
    conn.close()

    return jsonify({"message": "Goal set successfully"}), 201

# Get Goals
@app.route('/get_goals', methods=['GET'])
def get_goals():
    user_id = request.args.get('user_id')

    if not user_id:
        return jsonify({"error": "Missing field: user_id"}), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, goal_amount, category FROM goals WHERE user_id = ?", (user_id,))
    goals = cursor.fetchall()
    conn.close()

    goals_list = [{"id": row["id"], "goal_amount": row["goal_amount"], "category": row["category"]} for row in goals]

    return jsonify(goals_list), 200

# Edit Goal
@app.route('/edit_goal/<int:goal_id>', methods=['PUT'])
def edit_goal(goal_id):
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM goals WHERE id = ?", (goal_id,))
    goal = cursor.fetchone()

    if not goal:
        return jsonify({"error": "Goal not found"}), 404

    # Update fields if provided, otherwise keep the old value
    goal_amount = data.get('goal_amount', goal['goal_amount'])
    category = data.get('category', goal['category'])

    cursor.execute("""
        UPDATE goals 
        SET goal_amount = ?, category = ?
        WHERE id = ?
    """, (goal_amount, category, goal_id))

    conn.commit()
    conn.close()

    return jsonify({"message": "Goal updated successfully"}), 200

# Delete Goal
@app.route('/delete_goal/<int:goal_id>', methods=['DELETE'])
def delete_goal(goal_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM goals WHERE id = ?", (goal_id,))
    goal = cursor.fetchone()

    if not goal:
        return jsonify({"error": "Goal not found"}), 404

    cursor.execute("DELETE FROM goals WHERE id = ?", (goal_id,))
    conn.commit()
    conn.close()

    return jsonify({"message": "Goal deleted successfully"}), 200

# ---------------- RUN THE APP ----------------
if __name__ == '__main__':
    app.run(debug=True)
