import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  TextField,
  LinearProgress,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/SupabaseClient";
import Spinner from "../../components/Spinner/spinner";
import { EditOutlined } from "@mui/icons-material";

const ViewExpenses = () => {
  const navigate = useNavigate();
  const [expensesData, setExpensesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  async function getProducts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("money_tracker")
        .select("*")
        .limit(1000);
      if (error) throw error;
      if (data) setExpensesData(data);
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const filteredExpenses = expensesData
    .filter((expense) =>
      expense.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.pendingAmount - a.pendingAmount);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Spinner />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <TextField
          label="Search Expenses"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: "100%", maxWidth: 400 }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredExpenses.map((expense) => {
          const progress =
            expense.totalAmount > 0
              ? (expense.paidAmount / expense.totalAmount) * 100
              : 0;

          return (
            <Grid sx={{ width: '100%' }} item xs={12} sm={12} md={4} key={expense.id}>
              <Card
                sx={{
                  height: "100%",
                  width: '100%',
                  position: "relative",
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
                  boxShadow:
                    "0 8px 20px rgba(0,0,0,0.12), 0 6px 6px rgba(0,0,0,0.08)",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow:
                      "0 12px 24px rgba(0,0,0,0.2), 0 8px 12px rgba(0,0,0,0.1)",
                  },
                }}
                onClick={() => navigate(`/expense-detail/${expense.id}`)}
              >
                {/* Edit Button */}
                <IconButton
                  size="small"
                  sx={{ position: "absolute", top: 8, right: 8 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/expense-detail/${expense.id}`);
                  }}
                >
                  <EditOutlined />
                </IconButton>

                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {expense.title}
                  </Typography>

                  <Stack spacing={1}>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: "#e0e0e0",
                        "& .MuiLinearProgress-bar": {
                          background:
                            progress === 100
                              ? "linear-gradient(90deg, #4caf50, #81c784)"
                              : "linear-gradient(90deg, #ff9800, #ffc107)",
                        },
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 14,
                        mt: 0.5,
                      }}
                    >
                      <Typography color="text.secondary">
                        Total: ₹ {expense.totalAmount.toLocaleString("en-IN")}
                      </Typography>
                      <Typography color="success.main">
                        Paid: ₹ {expense.paidAmount.toLocaleString("en-IN")}
                      </Typography>
                    </Box>
                  </Stack>

                  <Typography
                    variant="body2"
                    color={expense.pendingAmount > 0 ? "error" : "text.secondary"}
                    sx={{ mt: 1, fontWeight: 600 }}
                  >
                    Pending: ₹ {expense.pendingAmount.toLocaleString("en-IN")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ViewExpenses;
