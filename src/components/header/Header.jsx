import React from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from "@mui/material";
import { handleLogoutThunk } from "../../redux/features/userSlice";

const Header = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    };

    return (
        <AppBar position="fixed" sx={{ height: 64, backgroundColor: "rgba(248, 237, 214, 0.8)" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "inline-block" }}>
                    <Typography
                        onClick={goToHome}
                        variant="h6"
                        component="div"
                        sx={{ color: "black", cursor: "pointer", userSelect: "none" }}
                        aria-label="Go to Home"
                    >
                        BookmarkAI
                    </Typography>
                </Box>

                {/* 🔹 Show User Info Box & Log out button if user is logged in */}
                {user && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {/* User Info Box */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                backgroundColor: "#dbc28f",
                                padding: "2px 8px",
                                borderRadius: "6px",
                            }}
                        >
                            <Avatar
                                src={user.photoURL}
                                alt={user.displayName}
                                sx={{ width: 28, height: 28 }}
                            />
                            <Typography variant="body1" sx={{ color: "black", fontWeight: 500 }}>
                                {user.displayName}
                            </Typography>
                        </Box>

                        {/* Log out Button */}
                        <Button
                            sx={{
                                backgroundColor: "#dbc28f",
                                color: "black",
                                textTransform: "none",
                                padding: "6px 12px",
                                borderRadius: "6px",
                                "&:hover": { backgroundColor: "#c1aa7e" },
                            }}
                            onClick={() => dispatch(handleLogoutThunk())}
                        >
                            Log out
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
