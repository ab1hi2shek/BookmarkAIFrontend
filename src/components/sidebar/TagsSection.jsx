import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Collapse, Typography } from '@mui/material';
import TagsMenu from './TagsMenu';
import TagList from './LeftSideBar/TagList';

const TagsSection = ({ tagsVisible, onToggleTags }) => {
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [sortedTags, setSortedTags] = useState([]);
    const tagsMenuButtonRef = useRef(null);

    const handleTagsMenuOpen = (event) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleTagsMenuClose = () => {
        setMenuAnchor(null);
    };

    return (
        <>
            {/* Tags Header & Options Button */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', marginTop: '8px' }}>
                <Typography variant="subtitle1" sx={{ fontSize: '0.9rem', fontWeight: 500 }}>Tags</Typography>

                <Button
                    size="small"
                    ref={tagsMenuButtonRef}
                    sx={{
                        backgroundColor: "rgba(219, 194, 143, 0.8)",
                        fontSize: "0.6rem",
                        padding: "1px 6px",
                        borderRadius: "3px",
                        minWidth: "20px",
                        height: "20px",
                        color: "black",
                        '&:hover': { backgroundColor: "rgba(219, 194, 143, 1)" }
                    }}
                    onClick={handleTagsMenuOpen}
                >
                    options
                </Button>
            </Box>

            {/* Tags Menu */}
            <TagsMenu
                anchorEl={tagsMenuButtonRef.current}
                menuAnchor={menuAnchor}
                onClose={handleTagsMenuClose}
                onToggleTags={onToggleTags} // ✅ Pass toggle function
                setSortedTags={setSortedTags}
            />

            {/* Collapsible Tags List */}
            <Collapse in={tagsVisible} timeout="auto" unmountOnExit>
                <TagList sortedTags={sortedTags} />
            </Collapse>
        </>
    );
};

export default TagsSection;
