import React, { useState, useRef, useEffect } from 'react';
import { List, ListItem, IconButton, TextField, Box, Tooltip, Menu, MenuItem, Typography, Modal, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useDispatch, useSelector } from 'react-redux';
import { editTag, deleteTag, toggleSelectedTags } from '../../features/tags/tagsSlice';
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

    const dispatch = useDispatch();
    const allTags = useSelector((state) => state.tags.allTags);

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
        setNewTagName(selectedTag.name);
        handleMenuClose();
    };

    const handleDeleteClick = () => {
        setTagToDelete(selectedTag);
        setDeleteModalOpen(true);
        handleMenuClose();
    };

    const confirmDelete = () => {
        if (tagToDelete) {
            dispatch(deleteTag(tagToDelete.id));
            setTagToDelete(null);
        }
        setDeleteModalOpen(false);
    };

    const handleEditSave = (e) => {
        if (e.key === 'Enter' && newTagName.trim() !== '') {
            dispatch(editTag({ oldTagId: editingTag.id, newTagName }));
            setEditingTag(null);
        }
    };

    const handleTagClick = (tag) => {
        dispatch(toggleSelectedTags(tag.id));
    };

    return (
        <>
            <List sx={{ padding: '4px' }}>
                {allTags.map((tag) => (
                    <ListItem key={tag.id} dense sx={{ padding: '2px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {editingTag?.id === tag.id ? (
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
                                    disableUnderline: true, // <== added this
                                }}
                            />
                        ) : (
                            <Typography
                                variant="body2"
                                onClick={() => handleTagClick(tag)}
                                sx={{
                                    fontSize: tag.isSelected ? '0.85rem' : '0.8rem',
                                    fontWeight: tag.isSelected ? 600 : 400,
                                    color: tag.isSelected ? 'primary.main' : 'text.primary',
                                    cursor: 'pointer',
                                }}
                            >
                                {tag.name}
                            </Typography>
                        )}
                        <Box sx={styles.moreIconContainer}>
                            <Tooltip title="More">
                                <IconButton size="small" onClick={(event) => handleMenuOpen(event, tag)}>
                                    <MoreVertIcon sx={styles.moreIcon} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </ListItem>
                ))}
            </List>
            <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
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