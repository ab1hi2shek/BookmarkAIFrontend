import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, Chip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelectedTags } from '../features/tags/tagsSlice';

const Breadcrumbs = ({ onTagClick }) => {

    const dispatch = useDispatch();
    const selectedTags = useSelector((state) => state.tags.selectedTags);

    const handleTagClick = (tag) => {
        dispatch(toggleSelectedTags(tag));
    };

    return (
        <MuiBreadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
                <HomeIcon />
            </Link>
            {selectedTags.map((tag, index) => (
                <Chip
                    key={index}
                    label={tag}
                    onDelete={() => handleTagClick(tag)}
                    color="primary"
                    variant="outlined"
                />
            ))}
        </MuiBreadcrumbs>
    );
};

export default Breadcrumbs;