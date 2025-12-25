import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Stack,
    AppBar,
    Toolbar,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    // Static credentials
    const STATIC_USER = "baloji";
    const STATIC_PASS = "Baloji@1008";

    const handleLogin = () => {
        if (username === STATIC_USER && password === STATIC_PASS) {
            localStorage.setItem("isLoggedIn", "true");
            navigate("/"); // redirect to home
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <Box>
            {/* Top AppBar */}
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
                    >
                        Home Money Tracker
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Login Form */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "80vh",
                }}
            >
                <Box sx={{ width: 300 }}>
                    <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
                        Login
                    </Typography>

                    <Stack spacing={2}>
                        <TextField
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                        />

                        <TextField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {error && (
                            <Typography color="error" variant="body2">
                                {error}
                            </Typography>
                        )}

                        <Button variant="contained" onClick={handleLogin}>
                            Login
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
