import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  activeCourse: {}
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.activeCourse = action.payload;
    },
    loadCourses: (state, action) => {
      state.courses = action.payload;
    },
    newCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    editCourse: (state, action) => {
    //   let courses = state.courses

    //   for(var i = 0; i < courses.length; i++){
    //     if(courses[i]._id == action.payload._id){
    //         courses[i] = action.payload
    //     }
    //     }
    //     state.courses = courses
    const updatedCourse = action.payload;

    state.courses = state.courses.map(course => 
        course._id === updatedCourse._id ? updatedCourse : course
    );
    },
    deleteCourse: (state, action) => {
        let courses = state.courses

        let updatedCourses = []

        for(var i = 0; i < courses.length; i++){
          if(courses[i]._id != action.payload){
              updatedCourses.push(courses[i])
          }
        }
        state.courses = courses.filter((course) => course._id !== action.payload)
        console.log(state.courses)
        console.log('hello')
    },
    resetCourses: (state) => {
      state.courses = []
    },
  },
});

export const courseActions = courseSlice.actions;
export default courseSlice.reducer;