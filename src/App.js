import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import Header from "./components/Header/header";
import Footer from './components/Footer/footer';
import CreateExpense from './pages/CreateExpense/createExpense';
import ViewExpenses from './pages/ViewExpenses/viewExpenses';
import ExpenseDetails from './pages/ExpenseDetails/expenseDetails';
import Login from './pages/Login/login';
import PrivateRoute from './utils/privateRoute'
function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{ flex: 1 }}>
        <Router>
          {isLoggedIn && <Header />}

          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/view-expenses"
              element={
                <PrivateRoute>
                  <ViewExpenses />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-expenses"
              element={
                <PrivateRoute>
                  <CreateExpense />
                </PrivateRoute>
              }
            />
            <Route
              path="/expense-detail/:id"
              element={
                <PrivateRoute>
                  <ExpenseDetails />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
