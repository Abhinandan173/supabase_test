import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/SupabaseClient";

const CreateExpense = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    totalAmount: "",
    paidAmount: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const total = Number(form.totalAmount);
    const paid = Number(form.paidAmount);
    const pending = total - paid;

    if (!form.title || total <= 0) return;

    await supabase.from("money_tracker").insert([
      {
        id: Math.floor(100000 + Math.random() * 900000),
        title: form.title,
        totalAmount: total,
        paidAmount: Number(paid) || 0,
        pendingAmount: pending,
      },
    ]);

    navigate("/");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ maxWidth: 500, mx: "auto" }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            ➕ Create Expense
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <TextField
              label="Total Amount"
              name="totalAmount"
              type="number"
              value={form.totalAmount}
              onChange={handleChange}
              required
            />

            <TextField
              label="Paid Amount"
              name="paidAmount"
              type="number"
              value={form.paidAmount}
              onChange={handleChange}
            />

            <Typography variant="body2" color="text.secondary">
              Pending Amount: ₹{" "}
              {Math.max(
                0,
                Number(form.totalAmount || 0) - Number(form.paidAmount || 0)
              )}
            </Typography>

            <Button variant="contained" onClick={handleCreate}>
              Save Expense
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateExpense;
