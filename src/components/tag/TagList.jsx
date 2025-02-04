import React, { useState, useRef, useEffect } from 'react';
import { List, ListItem, IconButton, TextField, Box, Tooltip, Menu, MenuItem, Typography, Modal, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { updateTagThunk, deleteTagThunk, toggleSelectedTagsThunk, fetchTagsThunk } from '../../features/tags/tagsSlice';
import styles from '../sidebar/SideBarStyles';
import DeleteConfirmationModal from '../others/DeleteConfirmationModal';

const TagList = () => {
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [selectedTag, setSelectedTag] = useState(null);
    const [tagToDelete, setTagToDelete] = useState(null);
    const [editingTag, setEditingTag] = useState(null);
    const [newTagName, setNewTagName] = useState('');
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const inputRef = useRef(null);
    const [forceRender, setForceRender] = useState(false);

    const dispatch = useDispatch();
    const allTags = useSelector((state) => state.tags.allTags);
    const status = useSelector((state) => state.tags.status);

    // 🟢 Fetch Tags When Component Mounts
    useEffect(() => {
        if (status === "idle" || status === "fetchTags") {
            dispatch(fetchTagsThunk());
        }
    }, [status, dispatch]);

    useEffect(() => {
        console.log("Updated Tags:", allTags);
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
        console.log("i am here", selectedTag);
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
            dispatch(deleteTagThunk(tagToDelete));
            setTagToDelete(null);
        }
        setDeleteModalOpen(false);
    };

    const handleEditSave = (e) => {
        if (e.key === 'Enter' && newTagName.trim() !== '') {
            dispatch(updateTagThunk({ existingTag: editingTag, tagName: newTagName }));
            setEditingTag(null);
        }
    };

    const handleTagClick = (tag) => {
        dispatch(toggleSelectedTagsThunk(tag.tagId));
    };

    return (
        <>
            <List sx={{ padding: 1 }}>
                {allTags && allTags
                    .filter(tag => tag.bookmarksCount > 0)
                    .map((tag) => (
                        <ListItem key={tag.tagId} dense sx={{ padding: '2px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {editingTag?.tagId === tag.tagId ? (
                                <TextField
                                    variant="standard"
                                    fullWidth
                                    value={newTagName}
                                    onChange={(e) => setNewTagName(e.target.value)}
                                    onKeyDown={handleEditSave}
                                    autoFocus
                                    inputRef={inputRef}
                                    sx={{ fontSize: '0.8rem', border: 'none', borderBottom: '1px solid #ccc', pb: 0.5 }}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                />
                            ) : (
                                <Box
                                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                                    onClick={() => handleTagClick(tag)}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: tag.isSelected ? '0.85rem' : '0.8rem',
                                            fontWeight: tag.isSelected ? 600 : 400,
                                            color: tag.isSelected ? 'rgba(192, 137, 27, 0.8)' : 'text.primary',
                                            transition: 'color 0.2s ease-in-out',
                                            '&:hover': { color: 'rgba(192, 137, 27, 0.8)' },
                                        }}
                                    >
                                        #{tag.tagName}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{ marginLeft: 1, fontSize: '0.75rem', color: 'gray' }}
                                    >
                                        ({tag.bookmarksCount})
                                    </Typography>
                                </Box>

                            )}
                            <Box sx={styles.moreIconContainer}>
                                <Tooltip>
                                    <IconButton size="small" onClick={(event) => handleMenuOpen(event, tag)}>
                                        ...
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </ListItem>
                    ))}
            </List>
            <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                <MenuItem
                    onClick={handleEditClick}
                    sx={{
                        fontSize: "0.8rem",
                        padding: "6px 12px",
                        '&:hover': { backgroundColor: "rgba(219, 194, 143, 0.8)" }
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