import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    uploads: [],
    summaries: [],
    quizzes: []
}; 

export const tabSlice = createSlice({
    name: "tab",
    initialState,
    reducers: {
        setTabs: (state, action) => {
            state.uploads = action.payload
        },
        addUpload: (state, action) => {
            state.uploads.push(action.payload);
        },
        setUploads: (state, action) => {
            state.uploads = action.payload;
        },
        addSummary: (state, action) => {
            state.summaries.push(action.payload);
        },
        addQuiz: (state, action) => {
            state.quizzes.push(action.payload);
        },
    }
})

export const tabActions = tabSlice.actions;
export default tabSlice.reducer;

// Retrieves user state for the current logged in user

// export global state. 