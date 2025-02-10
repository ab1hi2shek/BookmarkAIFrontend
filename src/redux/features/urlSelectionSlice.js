import { createSlice } from '@reduxjs/toolkit';

const urlSelectionSlice = createSlice({
    name: 'urlSelection',
    initialState: {
        selectedItem: { type: null, value: null }
    },
    reducers: {
        setSelectedItem: (state, action) => {
            const { type, value } = action.payload;
            state.selectedItem = { type: type, value: value };
        },
        resetSelection: (state) => {
            state.selectedItem = { type: null, value: null };
        }
    },
});

export const { setSelectedItem, resetSelection } = urlSelectionSlice.actions;

export default urlSelectionSlice.reducer;