import React, { useState } from 'react';
import Breadcrumbs from './Breadcrumbs';
import BookmarkCard from './BookmarkCard';
import { getBookmarksList, getTagsList } from '../data/bookmarkData';

const MainLayout = () => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [bookmarks, setBookmarks] = useState(getBookmarksList());

    const handleTagClick = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleDeleteBookmark = (id) => {
        setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
    };

    const handleEditBookmark = (updatedBookmark) => {
        setBookmarks(
            bookmarks.map((bookmark) =>
                bookmark.id === updatedBookmark.id ? updatedBookmark : bookmark
            )
        );
    };

    const handleEditTag = (oldTag, newTag) => {
        const updatedBookmarks = bookmarks.map((bookmark) => ({
            ...bookmark,
            tags: bookmark.tags.map((tag) => (tag === oldTag ? newTag : tag)),
        }));
        setBookmarks(updatedBookmarks);
    };

    const handleDeleteTag = (tag) => {
        const updatedBookmarks = bookmarks
            .map((bookmark) => ({
                ...bookmark,
                tags: bookmark.tags.filter((t) => t !== tag),
            }))
            .filter((bookmark) => bookmark.tags.length > 0); // Remove bookmarks with no tags
        setBookmarks(updatedBookmarks);
    };

    const filteredBookmarks = selectedTags.length
        ? bookmarks.filter((bookmark) =>
            bookmark.tags.some((tag) => selectedTags.includes(tag))
        )
        : bookmarks;

    return (
        <div style={{ flex: 1, padding: '16px' }}>
            <Breadcrumbs selectedTags={selectedTags} onTagClick={handleTagClick} />
            <BookmarkCard
                bookmarks={filteredBookmarks}
                onDelete={handleDeleteBookmark}
                onEdit={handleEditBookmark}
            />
        </div>
    );
};

export default MainLayout;