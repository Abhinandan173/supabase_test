import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/SupabaseClient";
import Spinner from "../../components/Spinner/spinner";

const Home = () => {
  const currentBalance = 32000;
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

  const totalPendingAmount = expensesData?.reduce(
    (sum, item) => sum + Number(item.pendingAmount || 0),
    0
  );

  const formattedPendingAmount = totalPendingAmount.toLocaleString("en-IN");

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
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
      >
        🏡 Home Money Tracker
      </Typography>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        textAlign="center"
        mb={4}
      >
        Track your household expenses and balance easily
      </Typography>

      {/* Cards */}
      <Grid container spacing={3} alignItems="stretch" sx={{ width: "100%" }}>
        <Grid item xs={12} sm={12} md={4} display="flex" sx={{ width: "100%" }}>
          <Card
            sx={{
              flexGrow: 1,
              textAlign: "center",
              backgroundColor: "#fff4e5",
            }}
          >
            <CardContent>
              <MoneyOffIcon color="warning" fontSize="large" />
              <Typography variant="h6" mt={2}>
                Total Pending to Pay
              </Typography>
              <Typography
                variant="h5"
                fontWeight="bold"
                color="warning.main"
                mt={1}
              >
                ₹ {formattedPendingAmount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} display="flex" sx={{ width: "100%" }}>
          <Card
            sx={{
              flexGrow: 1,
              textAlign: "center",
              backgroundColor: "#e8f5e9",
            }}
            onClick={() => navigate("/view-expenses")}
          >
            <CardContent>
              <AccountBalanceWalletIcon color="success" fontSize="large" />
              <Typography variant="h6" mt={2}>
                View All
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
