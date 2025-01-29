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
    mainContent: (isLeftSideBarOpen, isRightSideBarOpen) => ({
        flex: 1,
        transition: 'margin-right 0.3s ease, margin-left 0.3s ease',
        marginRight: isRightSideBarOpen ? '250px' : '0px',
        marginLeft: isLeftSideBarOpen ? '250px' : '0px',
    }),
};

export default styles;
