import React from "react";
import { Breadcrumbs as MuiBreadcrumbs, Link, Chip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useSelector } from "react-redux";

const Breadcrumbs = () => {
    const allTags = useSelector((state) => state.tags.allTags);

    const handleTagClick = (tag) => {
        console.log("handleTagClick");
    };

    const handleHomeClick = () => {
        console.log("handleHomeClick");
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
