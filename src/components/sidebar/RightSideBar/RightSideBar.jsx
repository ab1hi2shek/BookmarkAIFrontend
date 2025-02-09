import React, { } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { closeRightSideBar } from '../../../features/sidebarSlice';
import EditBookmark from './EditBookmark';

const RightSideBar = () => {
    const dispatch = useDispatch();
    const isRightSideBarOpen = useSelector((state) => state.sidebar.isRightSidebarOpen === true);

    const handleWhenCloseRightSideBar = () => {
        dispatch(closeRightSideBar());
    };

    return (
        <Drawer
            anchor="right"
            variant="persistent"
            open={true}
            sx={{
                width: 400,
                flexShrink: 0,
                position: "fixed",
                right: 0,
                '& .MuiDrawer-paper': {
                    width: 400,
                    boxSizing: 'border-box',
                    marginTop: '64px',
                    marginBottom: '64px',
                    paddingRight: '8px',
                    position: 'fixed',
                    right: 0,
                    height: 'calc(100vh - 64px)',
                    borderLeft: "1px solid rgb(180, 152, 97)"
                },
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', padding: '8px', marginBottom: '10px' }}>
                <IconButton onClick={handleWhenCloseRightSideBar} sx={{ borderRadius: 0, color: "rgb(176, 127, 29)" }}>
                    <CloseIcon />
                </IconButton>
            </Box>

            {isRightSideBarOpen && <EditBookmark />}
        </Drawer>
    );
};

export default RightSideBar;