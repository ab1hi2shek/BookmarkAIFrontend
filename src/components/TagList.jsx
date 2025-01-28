import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditTagModal from './EditTagModal';
import { getBookmarksList, getTagsList } from '../data/bookmarkData';

const TagList = ({ onTagClick, selectedTags, onEditTag, onDeleteTag }) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState('');
    const { tagList } = getTagsList();

    const handleEditClick = (tag) => {
        setSelectedTag(tag);
        setEditModalOpen(true);
    };

    const handleDeleteClick = (tag) => {
        onDeleteTag(tag);
    };

    const handleSave = (updatedTag) => {
        onEditTag(selectedTag, updatedTag);
        setEditModalOpen(false);
    };

    return (
        <>
            <List>
                {tagList.map((tag, index) => (
                    <ListItem key={index}>
                        <Chip
                            label={tag.name}
                            sx={{ mr: 1 }}
                            onClick={() => onTagClick(tag.name)}
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