import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  folders: [],
  activeFolder: {},
  type: "",
};

export const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    setType: (state, action) => {
        state.type = action.payload
    },
    // loadFiles: (state, action) => {
    //   state.folders.files = action.payload;
    // },
    newFile: (state, action) => {
      // console.log("Payload folderID " + action.payload.folderID)
      // console.log("Payload Object " + action.payload.fileObject)
      const index = state.folders.findIndex((folder) => folder.folderID == action.payload.folderID);
      state.folders[index].files.push(action.payload.fileObject);
      // console.log("Updated state.folders " + current(state.folders))
    },
    newSummary: (state, action) => {
      const index = state.folders.findIndex((folder) => folder.folderID == action.payload.folderID);
      state.folders[index].summaries.push(action.payload.summaryObject);
    },
    newQuiz: (state, action) => {
      const index = state.folders.findIndex((folder) => folder.folderID == action.payload.folderID);
      state.folders[index].quizzes.push(action.payload.quizObject);
    },
    newFlashcard: (state, action) => {
      const index = state.folders.findIndex((folder) => folder.folderID == action.payload.folderID);
      state.folders[index].flashcards.push(action.payload.flashcardObject);
    },
    newOutline: (state, action) => {
      const index = state.folders.findIndex((folder) => folder.folderID == action.payload.folderID);
      state.folders[index].outlines.push(action.payload.outlineObject);
    },
    deleteFiles: (state, action) => {
      let removeFiles = action.payload.files;
      const index = state.folders.findIndex((folder) => folder.folderID == action.payload.folderID);
      let files = current(state.folders);
      files = files[index].files;
      console.log(files)
      for(let i = 0; i < removeFiles.length; i++){
        files = files.filter((file) => file.fileID != removeFiles[i].fileID)
      }
      state.folders[index].files = files
      console.log(files)
    },
    setActiveFolder: (state, action) => {
        state.activeFolder = action.payload
    },
    loadFolders: (state, action) => {
      state.folders = action.payload;
    },
    newFolder: (state, action) => {
      // console.log(action.payload)
      // console.log(current(state.folders))
      state.folders.push(action.payload);
      // console.log(current(state.folders))
    },
    deleteFolder: (state, action) => {
        let folders = current(state.folders)

        console.log(folders)

        let updatedFolders = []

        for(let i = 0; i < folders.length; i++){
          if(folders[i].folderID != action.payload){
              updatedFolders.push(folders[i])
          }
        }

        console.log(updatedFolders)

        state.folders = updatedFolders
    },
    resetFolders: (state) => {
      state.folders = []
    },
  },
});

export const folderActions = folderSlice.actions;
export default folderSlice.reducer;
