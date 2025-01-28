import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, Chip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const Breadcrumbs = ({ selectedTags, onTagClick }) => {
    return (
        <MuiBreadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
                <HomeIcon />
            </Link>
            {selectedTags.map((tag, index) => (
                <Chip
                    key={index}
                    label={tag}
                    onDelete={() => onTagClick(tag)}
                    color="primary"
                    variant="outlined"
                />
            ))}
        </MuiBreadcrumbs>
    );
};

export default Breadcrumbs;