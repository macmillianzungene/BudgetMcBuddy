Budget Buddy
Project Overview
Budget Buddy is a minimalist and user-friendly web application designed to help individuals manage their personal finances. It allows users to log daily expenses, set financial goals, and visualize their spending patterns with simple yet effective visualizations like pie charts and bar graphs. The app is designed for those who want quick insights into their finances without the complexity of traditional budgeting tools.

What It Does
Log Expenses: Users can log their daily expenses and categorize them (e.g., food, transport, entertainment, etc.).
Track Spending: Visualize spending summaries through bar graphs, pie charts, and potentially a dashboard.
Set Goals: Users can set spending goals and monitor their progress toward achieving them.
Edit & Delete: Expenses and goals can be edited or deleted by the user.
Why Choose Budget Buddy?
Simplicity: The minimalist interface ensures ease of use for individuals who want fast and clear insights into their financial situation.
Speed: The app is designed to be lightweight and fast, offering an efficient way to track finances without overloading users with complex features.
Responsiveness: The app is responsive on both desktop and mobile devices, ensuring usability across all platforms.
Tech Stack
Frontend: React.js, React-Bootstrap (for UI components and responsive design)
Backend: Python (Flask), SQLite (lightweight database)
Development Environment: Ubuntu 24.04 (WSL)
Features
Landing Page:

Registration and sign-in forms.
An "About" section explaining the app’s purpose.
A "Why Choose Budget Buddy" section listing the app’s benefits.
Dashboard (Post-login):

A page to log daily expenses, set financial goals, and track spending.
Real-time visualization of expenses and goals.
Charts (Bar Graph, Pie Chart, etc.) to represent spending patterns.
Editable and deletable goals and expenses.
Getting Started
Prerequisites
Ensure you have the following installed on your development environment:

Node.js (latest version)
npm (Node Package Manager)
Python 3.x and Flask for the backend
SQLite for database management
Virtualenv for managing Python dependencies
Installation Steps
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/BudgetMcBuddy.git
cd BudgetMcBuddy
Frontend Setup:

Navigate to the frontend folder:
bash
Copy
Edit
cd frontend
Install dependencies for the frontend:
bash
Copy
Edit
npm install
Start the React development server:
bash
Copy
Edit
npm start
Backend Setup:

Create a virtual environment:
bash
Copy
Edit
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows, use venv\Scripts\activate
Install backend dependencies:
bash
Copy
Edit
pip install -r requirements.txt
Start the Flask backend server:
bash
Copy
Edit
python app.py
Access the app at http://localhost:3000 for the frontend and http://localhost:5000 for the backend.

File Structure
plaintext
Copy
Edit
BUDGETMCBUDDY
├── backend
│   ├── __pycache__              # Python bytecode files
│   ├── app.py                   # Flask backend main application file
│   ├── budget_buddy.db          # SQLite database file
│   ├── database.py              # Database connection and setup
├── frontend
│   ├── node_modules             # Node.js modules
│   ├── public
│   │   ├── favicon.ico          # App favicon
│   │   ├── index.html           # Main HTML template
│   │   ├── logo192.png          # Logo for the app (192x192)
│   │   ├── logo512.png          # Logo for the app (512x512)
│   │   ├── manifest.json        # Web app manifest file
│   │   ├── robots.txt           # Robots file for search engines
│   ├── src
│   │   ├── api.js               # API call methods
│   │   ├── App.css              # Main styling file
│   │   ├── App.js               # Root React component
│   │   ├── App.test.js          # Unit tests for App component
│   │   ├── Dashboard.js         # Dashboard page (expenses & goals)
│   │   ├── index.css            # Global CSS styles
│   │   ├── index.js             # Entry point for React app
│   │   ├── Login.js             # Login page component
│   │   ├── logo.svg             # App logo SVG file
│   │   ├── Register.js          # Registration page component
│   │   ├── reportWebVitals.js   # Web performance report file
│   │   ├── setupTests.js        # Test setup for frontend testing
├── venv                          # Python virtual environment
├── .gitattributes                # Git attributes configuration
├── .gitignore                    # Git ignore configuration
├── .gitmodules                   # Git submodules configuration
├── package-lock.json             # npm package lock file
├── package.json                  # npm configuration file
└── README.md                     # Project documentation
Contributing
Feel free to fork the repository and contribute! Here are some ways you can contribute:
 
Report bugs.
Suggest features or improvements.
Contribute code via pull requests.
Authors
Mac Millian Zungene
Email: macmillianzungene@gmail.com
License
This project is open source and available under the MIT License.
