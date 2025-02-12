import React from "react";
import { Box } from "@mui/material";
import Breadcrumbs from "./Breadcrumbs";
import AddBookmark from "./AddBookmark";

const SecondaryHeader = () => {

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Breadcrumbs />
            <AddBookmark />
        </Box>
    );
};

export default SecondaryHeader;
