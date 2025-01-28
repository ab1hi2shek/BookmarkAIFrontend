import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditTagModal from './EditTagModal';
import { getBookmarksList, getTagsList } from '../data/bookmarkData';
import { toggleSelectedTags, editTag, deleteTag } from '../features/tags/tagsSlice';

const TagList = () => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState('');

    const dispatch = useDispatch();

    const allTags = useSelector((state) => state.tags.allTags);
    const selectedTags = useSelector((state) => state.tags.selectedTags);

    const handleEditClick = (tag) => {
        setSelectedTag(tag);
        setEditModalOpen(true);
    };

    const handleDeleteClick = (tag) => {
        dispatch(deleteTag(tag));
    };

    const handleSave = (updatedTag) => {
        dispatch(editTag({ oldTag: selectedTag, newTag: updatedTag }));
        setEditModalOpen(false);
    };

    const handleTagClick = (tag) => {
        dispatch(toggleSelectedTags(tag));
    };

    return (
        <>
            <List>
                {allTags.map((tag, index) => (
                    <ListItem key={index}>
                        <Chip
                            label={tag.name}
                            sx={{ mr: 1 }}
                            onClick={() => handleTagClick(tag.name)}
                            color={selectedTags.includes(tag.name) ? 'primary' : 'default'}
                        />
                        <IconButton onClick={() => handleEditClick(tag.name)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteClick(tag.name)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            <EditTagModal
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                tag={selectedTag}
                onSave={handleSave}
            />
        </>
    );
};

export default TagList;