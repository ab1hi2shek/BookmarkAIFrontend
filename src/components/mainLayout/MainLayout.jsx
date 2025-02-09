import React, { useState, useEffect } from 'react';
import { Box, Divider } from '@mui/material';
import { deleteBookmarkThunk, fetchBookmarksThunk } from '../../redux/features/bookmarksSlice';
import { useSelector, useDispatch } from 'react-redux';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal';
import BookmarkCard from './BookmarkCard';

const MainLayout = ({ bookmarks = [] }) => {
    const dispatch = useDispatch();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [bookmarkIdToDelete, setBookmarkIdToDelete] = useState(null);

    const status = useSelector((state) => state.bookmarks.status);
    const { user } = useSelector((state) => state.user)

    // 🟢 Fetch Bookmarks When Component Mounts
    useEffect(() => {
        if (status === "idle" && user?.uid) {

            console.log("user?.uid", user?.uid);
            dispatch(fetchBookmarksThunk({ userId: user.uid }));
        }
    }, [status, dispatch]);

    const confirmDelete = () => {
        if (bookmarkIdToDelete) {
            dispatch(deleteBookmarkThunk({ userId: user.uid, bookmarkId: bookmarkIdToDelete }));
        }
        setDeleteModalOpen(false);
        setBookmarkIdToDelete(null);
    };

    return (
        <>
            <Divider sx={{ marginTop: '20px' }} />
            <Box sx={{ columnCount: { xs: 1, sm: 3, md: 4 }, columnGap: '16px', marginTop: '10px' }}>
                {bookmarks?.map((bookmark) => (
                    <BookmarkCard
                        key={bookmark.bookmarkId}
                        bookmark={bookmark}
                        setBookmarkIdToDelete={setBookmarkIdToDelete}
                        setDeleteModalOpen={setDeleteModalOpen}
                    />
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

export default MainLayout;
