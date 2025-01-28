import React from 'react';
import { IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


const SideBarClosed = ({ onOpenSidebar }) => {
    return (
        <Drawer
            variant="persistent"
            open={true}
            sx={{
                width: 60, // Fixed width for the sidebar
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 60, // Fixed width for the sidebar
                    boxSizing: 'border-box',
                    marginTop: '64px', // Adjust based on header height
                },
            }}
        >
            <IconButton
                onClick={onOpenSidebar}
                sx={{
                    position: 'relative',
                    top: 0, // Adjust based on header height
                    left: 0,
                    zIndex: 1200,
                }}
            >
                <MenuIcon />
            </IconButton>
        </Drawer>
    );
};

export default SideBarClosed;