import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, Chip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelectedTags } from '../features/tags/tagsSlice';

const Breadcrumbs = ({ onTagClick }) => {

    const dispatch = useDispatch();
    const allTags = useSelector((state) => state.tags.allTags);

    const handleTagClick = (tag) => {
        dispatch(toggleSelectedTags(tag.id));
    };

    return (
        <MuiBreadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
                <HomeIcon />
            </Link>
            {allTags.map((tag, index) => (
                tag.isSelected && (<Chip
                    key={index}
                    label={tag.name}
                    onDelete={() => handleTagClick(tag)}
                    color="primary"
                    variant="outlined"
                />)
            ))}
        </MuiBreadcrumbs>
    );
};

export default Breadcrumbs;