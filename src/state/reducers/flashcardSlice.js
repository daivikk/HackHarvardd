import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currFlashcard: {}, 
    isFlipped: false
};

export const flashcardSlice = createSlice({
  name: "flashcard",
  initialState,
  reducers: {
    loadNext: (state, action) => {
    },
    loadPrevious: (state, action) => {
    },
    setFlipped: (state, action) => {
        state.isFlipped = action.payload; 
    },
    currFlashcard: (state, action) => {
      state.currFlashcard = action.payload
    },
  },
});

export const flashcardActions = flashcardSlice.actions;
export default flashcardSlice.reducer;
