import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, IconButton, TextField, Box, Tooltip, Menu, MenuItem, Typography, Modal, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { renameDirectoryThunk, deleteDirectoryThunk, fetchDirectoriesThunk } from '../../features/directorySlice';
import DeleteConfirmationModal from '../others/DeleteConfirmationModal';

const DirectoryList = ({ directorySelected }) => {
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [selectedDirectory, setSelectedDirectory] = useState(null);
    const [directoryIdToDelete, setDirectoryIdToDelete] = useState(null);
    const [editingDirectory, setEditingDirectory] = useState(null);
    const [newDirectoryName, setNewDirectoryName] = useState('');
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const inputRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allDirectorys = useSelector((state) => state.directories.allDirectories);
    const status = useSelector((state) => state.directories.status);
    const user = useSelector((state) => state.user.user)

    // 🟢 Fetch Directorys When Component Mounts
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchDirectoriesThunk({ userId: user?.uid }));
        }
    }, [status, dispatch]);

    useEffect(() => {
    }, [allDirectorys]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setEditingDirectory(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleMenuOpen = (event, directory) => {
        setMenuAnchor(event.currentTarget);
        setSelectedDirectory(directory);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
        setSelectedDirectory(null);
    };

    const handleEditClick = () => {
        setEditingDirectory(selectedDirectory);
        setNewDirectoryName(selectedDirectory.name);
        handleMenuClose();
    };

    const handleDeleteClick = () => {
        setDirectoryIdToDelete(selectedDirectory);
        setDeleteModalOpen(true);
        handleMenuClose();
    };

    const confirmDelete = (moveBookmarks) => {
        if (directoryIdToDelete) {
            dispatch(deleteDirectoryThunk({
                directoryId: directoryIdToDelete,
                userId: user?.uid,
                moveBookmarks: moveBookmarks
            }));
            setDirectoryIdToDelete(null);
        }
        setDeleteModalOpen(false);
    };

    const handleEditSave = (e) => {
        if (e.key === 'Enter' && newDirectoryName.trim() !== '') {
            dispatch(renameDirectoryThunk({
                directoryId: editingDirectory.directoryId,
                name: newDirectoryName,
                userId: user?.uid
            }));
            setEditingDirectory(null);
        }
    };

    const handleDirectoryClick = (directory) => {
        navigate(`/bookmarks/directory/${directory.directoryId}`);
    };

    return (
        <>
            <List sx={{ padding: 1 }}>
                {allDirectorys && allDirectorys
                    .map((directory) => (
                        <ListItem
                            key={directory.directoryId}
                            dense
                            onClick={() => handleDirectoryClick(directory)}
                            sx={{
                                padding: '2px 12px',
                                margin: '4px 0px',
                                display: 'flex',
                                cursor: 'pointer',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: directorySelected == directory.directoryId && editingDirectory?.directoryId !== directory.directoryId ? 'rgba(244, 229, 201, 0.8)' : 'transparent',
                                '&:hover': {
                                    backgroundColor: editingDirectory?.directoryId !== directory.directoryId ? 'rgba(244, 229, 201, 0.8)' : 'transparent'
                                }
                            }}
                        >
                            {editingDirectory?.directoryId === directory.directoryId ? (
                                <TextField
                                    variant="standard"
                                    fullWidth
                                    value={newDirectoryName}
                                    onChange={(e) => setNewDirectoryName(e.target.value)}
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
                                            fontSize: directorySelected == directory.directoryId ? '0.85rem' : '0.8rem',
                                            fontWeight: directorySelected == directory.directoryId ? 550 : 400,
                                            color: 'text.primary',
                                            transition: 'color 0.2s ease-in-out',
                                        }}
                                    >
                                        {directory.name}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{ marginLeft: 1, fontSize: '0.75rem', color: 'text.primary' }}
                                    >
                                        ({directory.bookmarksCount})
                                    </Typography>
                                </Box>

                            )}
                            <Box onClick={(e) => e.stopPropagation()} >
                                <Tooltip>
                                    <IconButton
                                        size="small"
                                        onClick={(event) => handleMenuOpen(event, directory)}
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
}

export default DirectoryList;
