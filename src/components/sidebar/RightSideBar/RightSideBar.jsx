import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, Box, Typography, Button, TextField, Chip, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { closeRightSideBar } from '../../../features/sidebarSlice';
import { updateBookmarkThunk } from '../../../features/bookmarksSlice';
import EditBookmark from './EditBookmark';

const RightSideBar = () => {
    const dispatch = useDispatch();
    const selectedBookmark = useSelector((state) => state.bookmarks.selectedBookmark);
    const user = useSelector((state) => state.user.user)

    const [title, setTitle] = useState(selectedBookmark?.title || '');
    const [notes, setNotes] = useState(selectedBookmark?.notes || '');
    const [tags, setTags] = useState(selectedBookmark?.tags || []);
    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        setTitle(selectedBookmark?.title || '');
        setNotes(selectedBookmark?.notes || '');
        setTags(selectedBookmark?.tags || []);
    }, [selectedBookmark]);

    const handleWhenCloseRightSideBar = () => {
        dispatch(closeRightSideBar());
    };

    const handleSaveClick = () => {
        const updatedBookmark = {
            ...selectedBookmark,
            title,
            notes,
            tags,
        };
        dispatch(updateBookmarkThunk({ userId: user.uid, updatedBookmark: updatedBookmark }));
        handleWhenCloseRightSideBar();
    };

    const handleTagDelete = (tagToDelete) => {
        setTags(tags.filter(tag => tag !== tagToDelete));
    };

    const handleTagKeyPress = (e) => {
        if (e.key === 'Enter' && newTag.trim() !== '') {
            console.log(tags)
            if (!tags.includes(newTag.trim())) {
                setTags([...tags, newTag.trim()]);
            }
            setNewTag('');
            e.preventDefault();
        }
    };

    return (
        <Drawer
            anchor="right"
            variant="persistent"
            open={true}
            sx={{
                width: 400,
                flexShrink: 0,
                position: "fixed",
                right: 0,
                '& .MuiDrawer-paper': {
                    width: 400,
                    boxSizing: 'border-box',
                    marginTop: '64px',
                    marginBottom: '64px',
                    paddingRight: '8px',
                    position: 'fixed',
                    right: 0,
                    height: 'calc(100vh - 64px)',
                    borderLeft: "1px solid rgb(180, 152, 97)"
                },
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', padding: '8px', marginBottom: '10px' }}>
                <IconButton onClick={handleWhenCloseRightSideBar} sx={{ borderRadius: 0, color: "rgb(176, 127, 29)" }}>
                    <CloseIcon />
                </IconButton>
            </Box>

            {selectedBookmark && <EditBookmark />}
        </Drawer>
    );
};

export default RightSideBar;