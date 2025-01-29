import React, { useState } from 'react';
import { List, ListItem, IconButton, Chip, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditTagModal from './EditTagModal';
import { toggleSelectedTags, editTag, deleteTag } from '../features/tags/tagsSlice';

const TagList = () => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedTagForUpdate, setSelectedTagForUpdate] = useState(null);

    const dispatch = useDispatch();
    const allTags = useSelector((state) => state.tags.allTags);

    const handleEditClick = (tag) => {
        setSelectedTagForUpdate(tag);
        setEditModalOpen(true);
    };

    const handleDeleteClick = (tag) => {
        dispatch(deleteTag(tag.id));
    };

    const handleSave = (updatedTagName) => {
        dispatch(editTag({ oldTagId: selectedTagForUpdate.id, newTagName: updatedTagName }));
        setEditModalOpen(false);
    };

    const handleTagClick = (tag) => {
        dispatch(toggleSelectedTags(tag.id));
    };

    return (
        <>
            <List sx={{ padding: '12px' }}>
                {allTags.map((tag, index) => (
                    <ListItem key={tag.id} dense sx={{ padding: '6px 0px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <Chip
                                label={tag.name}
                                onClick={() => handleTagClick(tag)}
                                color={tag.isSelected ? 'primary' : 'default'}
                                sx={{ fontSize: '0.8rem', fontWeight: 350 }}
                            />
                            <Box>
                                <IconButton size="small" onClick={() => handleEditClick(tag)}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" onClick={() => handleDeleteClick(tag)}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>
                    </ListItem>
                ))}
            </List>
            <EditTagModal
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                selectedTagForEdit={selectedTagForUpdate}
                onSave={handleSave}
            />
        </>
    );
};

export default TagList;