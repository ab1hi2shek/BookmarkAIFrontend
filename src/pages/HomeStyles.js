const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    contentWrapper: {
        display: 'flex',
        flex: 1,
        marginTop: '64px',
        position: 'relative',
    },
    mainContent: (isRightSideBarOpen) => ({
        flex: 1,
        // transition: 'margin-right 0.1s',
        marginRight: isRightSideBarOpen ? '400px' : '0px', // Adjust for right sidebar
        width: `calc(100% - ${isRightSideBarOpen ? '650px' : '250px'})`, // Adjust width dynamically
        overflow: 'hidden',
        marginLeft: '250px',
        padding: '16px'
    }),
};

export default styles;
