import React from 'react';
import { Skeleton, Box } from '@mui/material';

const LoadingSkeleton = () => {
    return (
        <Box sx={{ padding: "20px" }}>
            <Skeleton variant="text" width={200} height={30} />
            <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: 2, marginY: 2 }} />
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton variant="text" width="60%" height={20} />
        </Box>
    );
};

export default LoadingSkeleton;
