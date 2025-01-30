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
        marginRight: isRightSideBarOpen ? '500px' : '0px',
        marginLeft: '250px'
    }),
};

export default styles;
