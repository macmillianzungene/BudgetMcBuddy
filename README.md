#**Budget Mc-Buddy**

###**Project Overview**

Budget Buddy is a minimalist and user-friendly web application designed to help individuals manage their personal finances. It allows users to log daily expenses, set financial goals, and visualize their spending patterns with simple yet effective visualizations like pie charts and bar graphs. The app is designed for those who want quick insights into their finances without the complexity of traditional budgeting tools.

###**What It Does**

- Log Expenses: Users can log their daily expenses and categorize them (e.g., food, transport, entertainment, etc.).
- Track Spending: Visualize spending summaries through bar graphs, pie charts, and potentially a dashboard.
- Set Goals: Users can set spending goals and monitor their progress toward achieving them.
- Edit & Delete: Expenses and goals can be edited or deleted by the user.

###**Why Choose Budget Buddy?**

- Simplicity: The minimalist interface ensures ease of use for individuals who want fast and clear insights into their financial situation.
- Speed: The app is designed to be lightweight and fast, offering an efficient way to track finances without overloading users with complex features.
- Responsiveness: The app is responsive on both desktop and mobile devices, ensuring usability across all platforms.

###**Tech Stack**

- Frontend: React.js, React-Bootstrap (for UI components and responsive design)
- Backend: SQLite (lightweight database)
- Development Environment: Ubuntu 24.04 (WSL)

###**Features**

####**1.Landing Page:**

- Registration and sign-in forms.
- An "About" section explaining the app’s purpose.
- A "Why Choose Budget Buddy" section listing the app’s benefits.

####**2.Dashboard (Post-login):**

- A page to log daily expenses, set financial goals, and track spending.
- Real-time visualization of expenses and goals.
- Charts (Bar Graph, Pie Chart, etc.) to represent spending patterns.
- Editable and deletable goals and expenses.

###**Installation Steps**

####**1. Clone the repository:**
```Bash
git clone https://github.com/your-username/BudgetMcBuddy.git
cd BudgetMcBuddy
```

####**2. Frontend Setup:**

Navigate to the frontend folder:

`cd frontend`

Install dependencies for the frontend:

`npm install`

Start the React development server:

`npm start`

####**3. Backend Setup:**

Create a virtual environment:

```Bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows, use venv\Scripts\activate
```
Install backend dependencies:

`pip install -r requirements.txt`

Start the Flask backend server:

`python app.py` or `flask run`

**Access the app** <http://localhost:3000> for frontend and <http://localhost:5000> for backend

###**Code Overview**

This handles the API routes for user registration, login, and expense management.

```Python
from flask import Flask, request, jsonify
from database import init_db, add_expense, get_expenses

app = Flask(__name__)
init_db()

@app.route('/add_expense', methods=['POST'])
def add_expense_route():
    data = request.get_json()
    add_expense(data['user_id'], data['amount'], data['category'])
    return jsonify({"message": "Expense added successfully!"})

@app.route('/get_expenses/<user_id>', methods=['GET'])
def get_expenses_route(user_id):
    expenses = get_expenses(user_id)
    return jsonify(expenses)

if __name__ == "__main__":
    app.run(debug=True)
```

This component displays the dashboard where users can view and manage their expenses and goals.

```JavaScript
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import axios from 'axios';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('/get_expenses/1')
      .then(response => setExpenses(response.data))
      .catch(error => console.error('Error fetching expenses:', error));
  }, []);

  return (
    <div>
      <h2>Your Expenses</h2>
      <PieChart width={400} height={400}>
        <Pie data={expenses} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={100}>
          {expenses.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28'][index % 3]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default Dashboard;
```

This is the base HTML file that loads the React app.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Budget Buddy</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

Basic styling for the Budget Buddy app, ensuring it’s colorful, welcoming, and responsive.

```css
body {
  background-color: #f0f8ff;
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  color: #333;
  text-align: center;
}

button {
  background-color: #00c49f;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0088fe;
}
```

###**File Structure**

![File Structure]
![Reference Image](/structure/file_structure.png)

###**Contributing**

Feel free to fork the repository and contribute! Here are some ways you can contribute:

- Report bugs.
- Suggest features or improvements.
- Contribute code via pull requests.

###**Authors**

**Mac Millian Zungene**
<Email: macmillianzungene@gmail.com>


