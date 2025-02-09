import React, { } from 'react';
import {
    Drawer
} from '@mui/material';
import FilterSection from './FilterSection';
import DirectorySection from './DirectorySection';
import TagsSection from './TagsSection';

const LeftSideBar = ({ directorySelected = null, tagSelected = null, filterSelected = null }) => {
    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={true}
            sx={{
                width: 250,
                flexShrink: 0,
                position: "fixed",
                right: 0,
                '& .MuiDrawer-paper': {
                    width: 250,
                    boxSizing: 'border-box',
                    marginTop: '64px',
                    marginBottom: '64px',
                    paddingRight: '8px',
                    position: 'fixed',
                    right: 0,
                    borderRight: "1px solid rgb(180, 152, 97)"
                },
            }}
        >
            {/* Filters Section */}
            <FilterSection filterSelected={filterSelected} />
            {/* Directory Section */}
            <DirectorySection directorySelected={directorySelected} />
            {/* Tags Section */}
            <TagsSection tagSelected={tagSelected} />
        </Drawer>
    );
};

export default LeftSideBar;
