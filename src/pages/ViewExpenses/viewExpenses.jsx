import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/SupabaseClient";
import Spinner from "../../components/Spinner/spinner";
import { EditOutlined } from "@mui/icons-material";

// Sample data (replace with API/state later)

const ViewExpenses = () => {
  const navigate = useNavigate();

  const [expensesData, setExpensesData] = useState([]);
  const [loading, setLoading] = useState(false);
  async function getProducts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("money_tracker")
        .select("*")
        .limit(1000);
      if (error) throw error;
      if (data != null) {
        console.log("data", data);
        setExpensesData(data);

        setLoading(false);
      }
    } catch (error) {
      alert(error.message);

      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);
  const sortedExpenses = [...expensesData].sort(
    (a, b) => b.pendingAmount - a.pendingAmount
  );

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          height: "50vh",
        }}
      >
        <Spinner />
      </div>
    );
  }

  return (
    <Box sx={{ p: 1 }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        textAlign="center"
      >
        📊 View Expenses
      </Typography>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        textAlign="center"
        mb={2}
      >
        Expenses sorted by pending amount
      </Typography>

      {/* Expense Cards */}
      <Grid container spacing={1} alignItems="stretch" sx={{ width: "100%" }}>
        {sortedExpenses?.map((expense) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            key={expense.id}
            display="flex"
            sx={{ width: "100%" }}
          >
            <Card
              sx={{
                width: "100%",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
              onClick={() => navigate(`/expense-detail/${expense.id}`)}
            >
              <CardContent sx={{ position: "relative" }}>
                {/* Edit Icon */}
                <IconButton
                  size="small"
                  sx={{ position: "absolute", top: 8, right: 8 }}
                  onClick={(e) => {
                    e.stopPropagation(); // 🔑 prevent card click
                    navigate(`/expense-detail/${expense.id}`);
                  }}
                >
                  <EditOutlined fontSize="small" />
                </IconButton>

                <Typography variant="h6" fontWeight="bold">
                  {expense.title}
                </Typography>

                <Divider sx={{ my: 1 }} />

                <Typography variant="body2">
                  <strong>Total:</strong> ₹{" "}
                  {expense.totalAmount.toLocaleString("en-IN")}
                </Typography>

                <Typography variant="body2" color="success.main">
                  <strong>Paid:</strong> ₹{" "}
                  {expense.paidAmount.toLocaleString("en-IN")}
                </Typography>

                <Typography
                  variant="body2"
                  color={
                    expense.pendingAmount > 0 ? "error.main" : "text.secondary"
                  }
                >
                  <strong>Pending:</strong> ₹{" "}
                  {expense.pendingAmount.toLocaleString("en-IN")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ViewExpenses;
