import React, { useState } from 'react';
import { List, ListItem, IconButton, Chip } from '@mui/material';
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
            <List>
                {allTags.map((tag, index) => (
                    <ListItem key={tag.id}>
                        <Chip
                            label={tag.name}
                            sx={{ mr: 1 }}
                            onClick={() => handleTagClick(tag)}
                            color={tag.isSelected ? 'primary' : 'default'}
                        />
                        <IconButton onClick={() => handleEditClick(tag)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteClick(tag)}>
                            <DeleteIcon />
                        </IconButton>
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