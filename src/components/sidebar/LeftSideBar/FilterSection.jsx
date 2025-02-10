import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    List, ListItem, ListItemText, Collapse, Box, Typography, Button
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import TagIcon from '@mui/icons-material/Tag';
import { setSelectedItem } from '../../../redux/features/urlSelectionSlice';

const FilterSection = ({ filterSelected = null }) => {
    const navigate = useNavigate();
    const [filtersVisible, setFiltersVisible] = useState(() => JSON.parse(localStorage.getItem("filtersVisible")) ?? true);

    // Optimize it using reselect.
    const { favoriteBookmarksCount, bookmarksWithNotesCount, bookmarksWithNoTags } = useSelector((state) => {
        let favoriteCount = 0;
        let notesCount = 0;
        let noTagsCount = 0;

        state.bookmarks.allBookmarks.forEach((b) => {
            if (b.isFavorite) favoriteCount++;
            if (b.notes && b.notes.trim() !== "") notesCount++;
            if (!b.tags || b.tags.length === 0) noTagsCount++;
        });

        return {
            favoriteBookmarksCount: favoriteCount,
            bookmarksWithNotesCount: notesCount,
            bookmarksWithNoTags: noTagsCount,
        };
    });

    const handleToggleFilters = () => {
        const newState = !filtersVisible;
        setFiltersVisible(newState);
        localStorage.setItem("filtersVisible", JSON.stringify(newState));
    };

    const filterBookmarksForUI = (filterType) => {
        dispatch(setSelectedItem({ type: 'filter', value: directory.directoryId }))
        navigate(`/bookmarks/filter/${filterType}`);
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '4px 12px',
                    marginTop: '20px',
                    marginBottom: filtersVisible ? '8px' : '0px'
                }}
            >
                <Typography variant="subtitle1" sx={{ fontSize: '0.9rem', fontWeight: 500 }}>Filters</Typography>
                <Button
                    size="small"
                    sx={{
                        backgroundColor: "rgba(219, 194, 143, 0.8)",
                        fontSize: "0.6rem",
                        padding: "1px 6px",
                        borderRadius: "3px",
                        minWidth: "20px",     // 🔹 Ensures button remains compact
                        height: "20px",
                        color: "black",
                        '&:hover': { backgroundColor: "rgba(219, 194, 143, 1)" }
                    }}
                    onClick={handleToggleFilters}
                >
                    {filtersVisible ? "Hide" : "Show"}
                </Button>
            </Box>

            <Collapse in={filtersVisible} timeout="auto" unmountOnExit>
                <List sx={{ paddingLeft: 1 }}>
                    <ListItem
                        button
                        onClick={() => filterBookmarksForUI("favorite")}
                        sx={{
                            padding: '4px 8px',
                            backgroundColor: filterSelected === "favorite" ? "rgba(244, 229, 201, 0.8)" : "transparent",
                            '&:hover': {
                                backgroundColor: "rgba(244, 229, 201, 0.8)" // ✅ Same color on hover
                            }
                        }}
                    >
                        <FavoriteBorderIcon sx={{ color: 'red', fontSize: '0.85rem', marginRight: 1 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <ListItemText primary="Favorites" primaryTypographyProps={{ fontSize: '0.85rem' }} />
                            <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'gray', marginLeft: 1 }}>
                                ({favoriteBookmarksCount})
                            </Typography>
                        </Box>
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => filterBookmarksForUI("with_notes")}
                        sx={{
                            padding: '4px 8px',
                            backgroundColor: filterSelected === "with_notes" ? "rgba(244, 229, 201, 0.8)" : "transparent",
                            '&:hover': {
                                backgroundColor: "rgba(244, 229, 201, 0.8)" // ✅ Same color on hover
                            }
                        }}
                    >
                        <DescriptionOutlinedIcon sx={{ fontSize: '0.85rem', marginRight: 1 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <ListItemText primary="With Notes" primaryTypographyProps={{ fontSize: '0.85rem' }} />
                            <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'gray', marginLeft: 1 }}>
                                ({bookmarksWithNotesCount})
                            </Typography>
                        </Box>
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => filterBookmarksForUI("without_tags")}
                        sx={{
                            padding: '4px 8px',
                            backgroundColor: filterSelected === "without_tags" ? "rgba(244, 229, 201, 0.8)" : "transparent",
                            '&:hover': {
                                backgroundColor: "rgba(244, 229, 201, 0.8)" // ✅ Same color on hover
                            }
                        }}
                    >
                        <TagIcon sx={{ fontSize: '0.85rem', marginRight: 1 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <ListItemText primary="Without Tags" primaryTypographyProps={{ fontSize: '0.85rem' }} />
                            <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'gray', marginLeft: 1 }}>
                                ({bookmarksWithNoTags})
                            </Typography>
                        </Box>
                    </ListItem>
                </List>
            </Collapse>
        </>
    );
};

export default FilterSection;
