import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/SupabaseClient";

const ExpenseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expense, setExpense] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExpense();
  }, []);

  const fetchExpense = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("money_tracker")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) setExpense(data);
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedExpense = {
      ...expense,
      [name]: value,
    };

    // 🔑 Auto calculate pending
    if (name === "totalAmount" || name === "paidAmount") {
      const total = Number(
        name === "totalAmount" ? value : expense.totalAmount
      );
      const paid = Number(name === "paidAmount" ? value : expense.paidAmount);
      updatedExpense.pendingAmount = Math.max(total - paid, 0);
    }

    setExpense(updatedExpense);
  };

  const handleUpdate = async () => {
    setLoading(true);

    await supabase
      .from("money_tracker")
      .update({
        title: expense?.title,
        totalAmount: expense?.totalAmount,
        paidAmount: Number(expense?.paidAmount) || 0,
        pendingAmount: expense?.pendingAmount,
      })
      .eq("id", id);

    setLoading(false);
    navigate("/");
  };

  const confirmDelete = async () => {
    setLoading(true);
    await supabase.from("money_tracker").delete().eq("id", id);
    setLoading(false);
    navigate("/");
  };

  if (!expense) return null;

  return (
    <Box sx={{ p: 3, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h5" mb={4} fontWeight="bold" gutterBottom>
        ✏️ Update Expense
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Title"
          name="title"
          value={expense.title}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Total Amount"
          name="totalAmount"
          type="number"
          value={expense.totalAmount}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Paid Amount"
          name="paidAmount"
          type="number"
          value={expense.paidAmount}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Pending Amount"
          name="pendingAmount"
          type="number"
          value={expense.pendingAmount}
          disabled
          fullWidth
        />

        <Button variant="contained" onClick={handleUpdate} disabled={loading}>
          Update Expense
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={() => setOpenDeleteDialog(true)}
          disabled={loading}
        >
          Delete Expense
        </Button>
      </Stack>

      {/* 🗑 Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Expense</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>{expense.title}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExpenseDetails;
