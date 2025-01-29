import React from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { openLeftSideBar } from '../features/sidebar/sidebarSlice';


const SideBarClosed = () => {

    const dispatch = useDispatch();

    const handleWhenOpenLeftSideBar = (e) => {
        console.log("I ama here", e);
        dispatch(openLeftSideBar());
    }

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
                onClick={e => handleWhenOpenLeftSideBar(e)}
                sx={{
                    position: 'relative',
                    zIndex: 1200,
                }}
            >
                <MenuIcon />
            </IconButton>
        </Drawer>
    );
};

export default SideBarClosed;