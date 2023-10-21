import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: true,
};

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
       setLoading: (state, action) => {
            state.isLoading = action.payload;
       },
    }
})

export const homeActions = homeSlice.actions;
export default homeSlice.reducer;

// Retrieves user state for the current logged in user

// export global state. 