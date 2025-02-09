import React from "react";
import { useDispatch } from "react-redux";
import { Box, Typography, Avatar, Card } from "@mui/material";
import { signInWithGoogle, signInWithGithub } from "../../firebaseConfig";
import { checkAuthStatus } from "../../redux/features/userSlice";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import ButtonBase from "@mui/material/ButtonBase";

const SocialLogin = () => {
    const dispatch = useDispatch();

    const handleGoogleLogin = async () => {
        const user = await signInWithGoogle();
        if (user) {
            dispatch(checkAuthStatus()); // Update Redux state
        }
    };

    const handleGithubLogin = async () => {
        const user = await signInWithGithub();
        if (user) {
            dispatch(checkAuthStatus());
        }
    };

    return (
        <Card
            sx={{
                width: 300,
                p: 4,
                borderRadius: 3,
                boxShadow: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
            }}
        >
            {/* Title */}
            <Typography variant="h6" sx={{ fontWeight: 600, textAlign: "center" }}>
                SIGN IN
            </Typography>

            {/* Social Login Icons */}
            <Box sx={{ display: "flex", gap: 3 }}>
                <Avatar component={ButtonBase} onClick={handleGoogleLogin} sx={{ bgcolor: "#DB4437", width: 50, height: 50 }} variant="rounded">
                    <GoogleIcon sx={{ color: "white" }} />
                </Avatar>
                <Avatar component={ButtonBase} onClick={handleGithubLogin} sx={{ bgcolor: "#333", width: 50, height: 50 }} variant="rounded">
                    <GitHubIcon sx={{ color: "white" }} />
                </Avatar>
            </Box>
        </Card>
    );
};

export default SocialLogin;
