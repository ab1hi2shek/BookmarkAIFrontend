import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Breadcrumbs from "./Breadcrumbs";
import AddBookmark from "./AddBookmark";
import SortMenu from "./SortMenu";

const SecondaryHeader = () => {
    const [selectedSort, setSelectedSort] = useState("Sites (Z-A)");

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Breadcrumbs />
                <AddBookmark />
            </Box>
            {/* Bottom Section: Bookmark Count & Sorting */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                {/* Left side - Bookmark Count */}
                <Typography variant="body1">4 bookmarks found</Typography>

                {/* Right side - Sorting Component */}
                <SortMenu selectedSort={selectedSort} onSortChange={setSelectedSort} />
            </Box>
        </Box>

    );
};

export default SecondaryHeader;
