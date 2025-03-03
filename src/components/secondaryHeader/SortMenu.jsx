import React, { useState } from "react";
import { Box, Typography, Menu, MenuItem, IconButton, ListItemIcon } from "@mui/material";
import { KeyboardArrowDown, AccessTime, SortByAlpha, ViewAgenda, ArrowDownward } from "@mui/icons-material";

const sortOptions = [
    { label: "By date ↑", value: "date-asc", icon: <AccessTime /> },
    { label: "By date ↓", value: "date-desc", icon: <AccessTime /> },
    { label: "By name (A-Z)", value: "name-asc", icon: <SortByAlpha /> },
    {
        label: "By name (Z-A)", value: "name-desc", icon: (
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <SortByAlpha />
                <ArrowDownward sx={{ fontSize: 16, ml: 0.5 }} />
            </Box>
        )
    },
    { label: "Sites (A-Z)", value: "sites-asc", icon: <ViewAgenda /> },
    { label: "Sites (Z-A)", value: "sites-desc", icon: <ViewAgenda /> },
];

const SortMenu = ({ selectedSort, onSortChange }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSortChange = (option) => {
        onSortChange(option.label);
        setAnchorEl(null);
    };

    return (
        <Box>
            <IconButton onClick={handleClick} sx={{ color: "inherit" }}>
                <Typography variant="body1">{selectedSort}</Typography>
                <KeyboardArrowDown />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                {sortOptions.map((option) => (
                    <MenuItem key={option.value} onClick={() => handleSortChange(option)}>
                        <ListItemIcon>{option.icon}</ListItemIcon>
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default SortMenu;
