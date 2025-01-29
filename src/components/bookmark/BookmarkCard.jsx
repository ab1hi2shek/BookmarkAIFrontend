import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, IconButton, Chip, Box, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteBookmark, editBookmark, updateSelectedBookmark } from '../../features/bookmarks/bookmarksSlice';
import { selectFilteredBookmarks } from '../../features/bookmarks/bookmarksSelectors';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../styles/bookmarkCardStyles';
import { openRightSideBar } from '../../features/sidebar/sidebarSlice';

const truncateText = (text, limit) => {
    if (text.length <= limit) return text;
    const truncated = text.slice(0, limit);
    return truncated.slice(0, truncated.lastIndexOf(' ')) + ' ...';
};

const BookmarkCard = () => {
    const dispatch = useDispatch();
    const filteredBookmarks = useSelector(selectFilteredBookmarks);

    const handleDeleteBookmark = (id) => {
        dispatch(deleteBookmark(id));
    };

    const handleEditBookmark = (updatedBookmark) => {
        dispatch(updateSelectedBookmark(updatedBookmark));
        dispatch(openRightSideBar());
    };

    return (
        <>
            <Box sx={{ columnCount: { xs: 1, sm: 3, md: 3 }, columnGap: '16px', marginTop: '20px' }}>
                {filteredBookmarks.map((bookmark) => (
                    <Card key={bookmark.id} sx={styles.card}>
                        {bookmark.imageUrl && (
                            <>
                                <Box sx={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src={bookmark.imageUrl} alt={bookmark.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
                                </Box>
                            </>
                        )}
                        <CardContent>
                            <Typography variant="h6" sx={styles.title}>
                                {bookmark.title}
                            </Typography>
                            <Typography variant="body2" sx={styles.notes}>
                                {truncateText(bookmark.notes, 150)}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                                {bookmark.tags.map((tag, index) => (
                                    <Chip key={index} label={tag.split("-")[1]} sx={styles.chip} />
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
                                <IconButton onClick={() => handleDeleteBookmark(bookmark.id)} size="small">
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>
                    </Card>
                ))}
            </Box>
        </>
    );
};

export default BookmarkCard;
