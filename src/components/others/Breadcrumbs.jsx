import React from "react";
import { Breadcrumbs as MuiBreadcrumbs, Link, Chip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import { toggleSelectedTagsThunk, clearSelectedTags } from "../../features/tags/tagsSlice";
import { fetchBookmarksThunk } from "../../features/bookmarks/bookmarksSlice";

const Breadcrumbs = () => {
    const dispatch = useDispatch();
    const allTags = useSelector((state) => state.tags.allTags);

    const handleTagClick = (tag) => {
        dispatch(toggleSelectedTagsThunk(tag.tagId));
    };

    const handleHomeClick = () => {
        dispatch(clearSelectedTags()); // 🔹 Reset all selected tags
        dispatch(fetchBookmarksThunk([])); // 🔹 Fetch all bookmarks (no filters)
    };

    return (
        <MuiBreadcrumbs aria-label="breadcrumb" separator="">
            <Link color="inherit" onClick={handleHomeClick} style={{ cursor: "pointer", color: 'rgba(192, 137, 27, 0.8)' }}>
                <HomeIcon size="small" />
            </Link>
            {allTags && allTags.map((tag) =>
                tag.isSelected ? (
                    <Chip
                        key={tag.tagId}
                        label={`#${tag.tagName}`}
                        onDelete={() => handleTagClick(tag)}
                        color="primary"
                        variant="outlined"
                        size="small"
                        sx={{ borderColor: 'rgba(192, 137, 27, 0.8)' }}
                    />
                ) : null
            )}
        </MuiBreadcrumbs>
    );
};

export default Breadcrumbs;
