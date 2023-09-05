import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FooterState {
  selectedPath: string;
}

const initialState: FooterState = {
  selectedPath: '/business',
};

const footerSlice = createSlice({
  name: 'footer',
  initialState,
  reducers: {
    setSelectedPath(state, action: PayloadAction<string>) {
      state.selectedPath = action.payload;
    },
  },
});

export const { setSelectedPath } = footerSlice.actions;
export default footerSlice.reducer;
