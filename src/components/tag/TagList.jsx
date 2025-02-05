import React, { useState, useRef, useEffect } from 'react';
import { List, ListItem, IconButton, TextField, Box, Tooltip, Menu, MenuItem, Typography, Modal, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateTagThunk, deleteTagThunk, toggleSelectedTagsThunk, fetchTagsThunk } from '../../features/tags/tagsSlice';
import DeleteConfirmationModal from '../others/DeleteConfirmationModal';

const TagList = () => {
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [selectedTag, setSelectedTag] = useState(null);
    const [tagToDelete, setTagToDelete] = useState(null);
    const [editingTag, setEditingTag] = useState(null);
    const [newTagName, setNewTagName] = useState('');
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const inputRef = useRef(null);

    const dispatch = useDispatch();
    const allTags = useSelector((state) => state.tags.allTags);
    const status = useSelector((state) => state.tags.status);
    const user = useSelector((state) => state.user.user)

    // 🟢 Fetch Tags When Component Mounts
    useEffect(() => {
        if (status === "idle" || status === "fetchTags") {
            dispatch(fetchTagsThunk({ userId: user?.uid }));
        }
    }, [status, dispatch]);

    useEffect(() => {
    }, [allTags]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setEditingTag(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleMenuOpen = (event, tag) => {
        setMenuAnchor(event.currentTarget);
        setSelectedTag(tag);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
        setSelectedTag(null);
    };

    const handleEditClick = () => {
        setEditingTag(selectedTag);
        setNewTagName(selectedTag.tagName);
        handleMenuClose();
    };

    const handleDeleteClick = () => {
        setTagToDelete(selectedTag);
        setDeleteModalOpen(true);
        handleMenuClose();
    };

    const confirmDelete = () => {
        if (tagToDelete) {
            dispatch(deleteTagThunk({ tagToDelete: tagToDelete, userId: user?.uid }));
            setTagToDelete(null);
        }
        setDeleteModalOpen(false);
    };

    const handleEditSave = (e) => {
        if (e.key === 'Enter' && newTagName.trim() !== '') {
            dispatch(updateTagThunk({ existingTag: editingTag, tagName: newTagName, userId: user?.uid }));
            setEditingTag(null);
        }
    };

    const handleTagClick = (tag) => {
        dispatch(toggleSelectedTagsThunk({ selectedTagId: tag.tagId, userId: user?.uid }));
    };

    return (
        <>
            <List sx={{ padding: 1 }}>
                {allTags && allTags
                    .filter(tag => tag.bookmarksCount > 0)
                    .map((tag) => (
                        <ListItem
                            key={tag.tagId}
                            dense
                            onClick={() => handleTagClick(tag)}
                            sx={{
                                padding: '2px 12px',
                                margin: '4px 0px',
                                display: 'flex',
                                cursor: 'pointer',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: tag.isSelected && editingTag?.tagId !== tag.tagId ? 'rgba(244, 229, 201, 0.8)' : 'transparent',
                                '&:hover': {
                                    backgroundColor: editingTag?.tagId !== tag.tagId ? 'rgba(244, 229, 201, 0.8)' : 'transparent'
                                }
                            }}
                        >
                            {editingTag?.tagId === tag.tagId ? (
                                <TextField
                                    variant="standard"
                                    fullWidth
                                    value={newTagName}
                                    onChange={(e) => setNewTagName(e.target.value)}
                                    onKeyDown={handleEditSave}
                                    autoFocus
                                    inputRef={inputRef}
                                    sx={{ fontSize: '0.8rem', border: 'none', borderBottom: '2px solid rgba(219, 194, 143, 0.8)', pb: 0.5 }}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                />
                            ) : (
                                <Box
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: tag.isSelected ? '0.85rem' : '0.8rem',
                                            fontWeight: tag.isSelected ? 550 : 400,
                                            color: 'text.primary',
                                            transition: 'color 0.2s ease-in-out',
                                        }}
                                    >
                                        #{tag.tagName}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{ marginLeft: 1, fontSize: '0.75rem', color: 'text.primary' }}
                                    >
                                        ({tag.bookmarksCount})
                                    </Typography>
                                </Box>

                            )}
                            <Box onClick={(e) => e.stopPropagation()} >
                                <Tooltip>
                                    <IconButton
                                        size="small"
                                        onClick={(event) => handleMenuOpen(event, tag)}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'rgba(228, 183, 100, 0.8)',
                                                borderRadius: 0,
                                            },
                                        }}
                                    >
                                        ...
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </ListItem>
                    ))}
            </List >
            <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                <MenuItem
                    onClick={handleEditClick}
                    sx={{
                        fontSize: "0.8rem",
                        padding: "6px 12px",
                        '&:hover': { backgroundColor: "rgba(219, 194, 143, 0.8)" },
                    }}>
                    Edit
                </MenuItem>
                <MenuItem
                    onClick={handleDeleteClick}
                    sx={{
                        fontSize: "0.8rem",
                        padding: "6px 12px",
                        '&:hover': { backgroundColor: "rgba(219, 194, 143, 0.8)" }
                    }}>
                    Delete
                </MenuItem>
            </Menu>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
            />
        </>
    );
};

export default TagList;