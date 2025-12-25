import './App.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import Header from "./components/Header/header";
import Footer from './components/Footer/footer';
import CreateExpense from './pages/CreateExpense/createExpense';
import ViewExpenses from './pages/ViewExpenses/viewExpenses';
import ExpenseDetails from './pages/ExpenseDetails/expenseDetails';

function App() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{ flex: 1 }}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/view-expenses" element={<ViewExpenses />} />
            <Route path="/create-expenses" element={<CreateExpense />} />
            <Route path="/expense-detail/:id" element={<ExpenseDetails />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
