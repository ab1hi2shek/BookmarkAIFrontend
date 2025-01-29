const styles = {
    drawer: {
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
            backgroundColor: '#1E1E1E', // Dark theme similar to screenshot
            color: 'white',
            padding: '8px',
        },
    },
    container: {
        padding: '8px',
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 12px',
        borderRadius: '4px',
        '&:hover': {
            backgroundColor: '#2A2A2A',
        },
    },
    icon: {
        marginRight: '8px',
        color: '#B0B0B0',
    },
    sectionHeader: {
        marginTop: '10px',
        marginBottom: '4px',
        paddingLeft: '12px',
        fontWeight: 'bold',
        color: '#B0B0B0',
    },
    // moreIconContainer: {
    //     visibility: 'hidden',
    //     '&:hover': {
    //         visibility: 'visible',
    //     },
    // },
    moreIcon: {
        color: '#B0B0B0',
        '&:hover': {
            color: '#FFFFFF',
        },
    },
};

export default styles;
