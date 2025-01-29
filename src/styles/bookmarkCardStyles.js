const styles = {
    card: {
        display: 'inline-block',
        width: '100%',
        marginBottom: '16px',
        backgroundColor: '#F5F7FA',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '1rem',
        fontWeight: 500,
        marginBottom: '10px',
    },
    notes: {
        fontSize: '0.8rem',
        color: 'gray',
        marginBottom: '8px',
    },
    chip: {
        marginRight: '0.5rem',
        marginBottom: '0.5rem',
        fontSize: '0.6rem',
        padding: '2px 4px',
        borderWidth: '0.5px',
        borderRadius: '0px',
        '& .MuiChip-label': {
            padding: '2px'
        },
    },
    button: {
        backgroundColor: '#e2e4e6',
        color: 'black',
        fontSize: '0.75rem',
        padding: '4px 30px',
        borderRadius: '6px',
        textTransform: 'none',
        minWidth: 'auto',
        '&:hover': { backgroundColor: '#d4dae1' },
    },
    cardFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px',
    },
};

export default styles;
