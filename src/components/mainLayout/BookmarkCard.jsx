import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Chip, Box, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteFilledIcon from '@mui/icons-material/Favorite';
import { setSelectedBookmark, toggleFavoriteBookmarkThunk } from '../../features/bookmarksSlice';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../styles/bookmarkCardStyles';
import { openRightSideBar } from '../../features/sidebarSlice';

const truncateText = (text, limit) => {
    if (text.length <= limit) return text;
    const truncated = text.slice(0, limit);
    return truncated.slice(0, truncated.lastIndexOf(' ')) + ' ...';
};

const BookmarkCard = ({ bookmark, setBookmarkIdToDelete, setDeleteModalOpen }) => {
    const dispatch = useDispatch();
    const [hoveredCard, setHoveredCard] = useState(null);
    const { user } = useSelector((state) => state.user)

    const handleDeleteClick = (bookmarkId) => {
        setBookmarkIdToDelete(bookmarkId);
        setDeleteModalOpen(true);
    };

    const handleEditBookmark = (updatedBookmark) => {
        dispatch(setSelectedBookmark(updatedBookmark));
        dispatch(openRightSideBar());
    };

    const toggleFavorite = (bookmarkId) => {
        dispatch(toggleFavoriteBookmarkThunk({ userId: user.uid, bookmarkId: bookmarkId }))
    };

    return (
        <Card
            key={bookmark.bookmarkId}
            sx={{
                ...styles.card,
                position: 'relative',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                border: '2px solid transparent',
                '&:hover': {
                    transform: 'scale(1.02)',
                    border: '2px solid #dbc28f', // Border width increases & changes color on hover
                    boxShadow: '0px 0px 12px rgba(219, 194, 143, 0.8)',
                },
            }}
            onMouseEnter={() => setHoveredCard(bookmark.bookmarkId)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => window.open(bookmark.url, '_blank')}
        >
            {/* Bookmark Image */}
            {bookmark?.imageUrl && (
                <Box sx={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: '100px' }}>
                    <img
                        src={bookmark.imageUrl}
                        alt={bookmark.title}
                        style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain' }}
                    />
                </Box>
            )}

            {/* Icons (Only Show on Hover) */}
            {hoveredCard === bookmark.bookmarkId && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        display: 'flex',
                        gap: 1,
                        borderRadius: '8px',
                        padding: '4px',
                    }}
                    onClick={(e) => e.stopPropagation()} // Prevent triggering the visit on icon click
                >
                    {/* Favorite Button */}
                    <Tooltip title="Favorite">
                        <IconButton
                            size="small"
                            onClick={() => toggleFavorite(bookmark.bookmarkId)}
                            sx={{
                                backgroundColor: '#1d1e1f',
                                color: '#e5e5e6',
                                width: 32,
                                height: 32,
                                borderRadius: 0, // Square shape
                                '&:hover': { backgroundColor: '#292a2b' },
                            }}
                        >
                            {bookmark.isFavorite ? (
                                <FavoriteFilledIcon sx={{ color: 'red' }} fontSize="small" />
                            ) : (
                                <FavoriteIcon fontSize="small" />
                            )}
                        </IconButton>
                    </Tooltip>

                    {/* Edit Button */}
                    <Tooltip title="Edit">
                        <IconButton
                            size="small"
                            onClick={() => handleEditBookmark(bookmark)}
                            sx={{
                                backgroundColor: '#1d1e1f',
                                color: '#e5e5e6',
                                width: 32,
                                height: 32,
                                borderRadius: 0, // Square shape
                                '&:hover': { backgroundColor: '#292a2b' },
                            }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    {/* Delete Button */}
                    <Tooltip title="Delete">
                        <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(bookmark.bookmarkId)}
                            sx={{
                                backgroundColor: '#1d1e1f',
                                color: '#e5e5e6',
                                width: 32,
                                height: 32,
                                borderRadius: 0, // Square shape
                                '&:hover': { backgroundColor: '#292a2b' },
                            }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}

            <CardContent>
                <Typography variant="h6" sx={styles.title}>
                    {bookmark?.title}
                </Typography>
                <Typography variant="body2" sx={styles.notes}>
                    {truncateText(bookmark?.notes, 150)}
                </Typography>

                {/* Tags */}
                <Box sx={{ mt: 1 }}>
                    {bookmark?.tags.map((tag, index) => (
                        <Chip key={index} label={`#${tag}`} sx={styles.chip} />
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default BookmarkCard;
