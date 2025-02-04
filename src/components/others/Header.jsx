import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from "@mui/material";
import { auth, logout } from "../../firebaseConfig";

const Header = () => {
    const [user, setUser] = useState(null);

    // 🔹 Check Firebase Authentication Status
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AppBar position="fixed" sx={{ height: 64, backgroundColor: "rgba(248, 237, 214, 0.8)" }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "black" }}>
                    BookmarkAI
                </Typography>

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
                            onClick={logout}
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
