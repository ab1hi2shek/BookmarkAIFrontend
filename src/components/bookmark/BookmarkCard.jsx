import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, IconButton, Chip, Box, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteBookmarkThunk, setSelectedBookmark, fetchBookmarksThunk } from '../../features/bookmarks/bookmarksSlice';
import { toggleSelectedTagsThunk } from '../../features/tags/tagsSlice';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../styles/bookmarkCardStyles';
import { openRightSideBar } from '../../features/sidebar/sidebarSlice';
import DeleteConfirmationModal from '../others/DeleteConfirmationModal';

const truncateText = (text, limit) => {
    if (text.length <= limit) return text;
    const truncated = text.slice(0, limit);
    return truncated.slice(0, truncated.lastIndexOf(' ')) + ' ...';
};

const BookmarkCard = () => {
    const dispatch = useDispatch();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [bookmarkIdToDelete, setBookmarkIdToDelete] = useState(null);


    const filteredBookmarks = useSelector((state) => state.bookmarks.allBookmarks);
    const status = useSelector((state) => state.bookmarks.status);

    // 🟢 Fetch Tags When Component Mounts
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchBookmarksThunk());
        }
    }, [status, dispatch]);

    const handleDeleteClick = (bookmarkId) => {
        setBookmarkIdToDelete(bookmarkId);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (bookmarkIdToDelete) {
            dispatch(deleteBookmarkThunk(bookmarkIdToDelete));
        }
        setDeleteModalOpen(false);
        setBookmarkIdToDelete(null);
    };

    const handleEditBookmark = (updatedBookmark) => {
        dispatch(setSelectedBookmark(updatedBookmark));
        dispatch(openRightSideBar());
    };

    return (
        <>
            <Divider sx={{ marginTop: '20px' }} />
            <Box sx={{ columnCount: { xs: 1, sm: 3, md: 3 }, columnGap: '16px', marginTop: '10px' }}>
                {filteredBookmarks?.map((bookmark) => (
                    <Card key={bookmark.bookmarkId} sx={styles.card}>
                        {bookmark?.imageUrl && (
                            <Box sx={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={bookmark.imageUrl} alt={bookmark.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
                            </Box>
                        )}
                        <CardContent>
                            <Typography variant="h6" sx={styles.title}>
                                {bookmark?.title}
                            </Typography>
                            <Typography variant="body2" sx={styles.notes}>
                                {truncateText(bookmark?.notes, 150)}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                                {bookmark?.tags.map((tag, index) => (
                                    <Chip
                                        key={index}
                                        label={`#${tag}`}
                                        sx={styles.chip}
                                    />
                                ))}
                            </Box>
                        </CardContent>
                        <Box sx={styles.cardFooter}>
                            <Button variant="contained" sx={styles.button} target="_blank" href={bookmark.url}>
                                Visit
                            </Button>
                            <Box>
                                <IconButton onClick={() => handleEditBookmark(bookmark)} size="small">
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteClick(bookmark.bookmarkId)} size="small">
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>
                    </Card>
                ))}
            </Box>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
            />
        </>
    );
};

export default BookmarkCard;
