import mongoose, { Document, model, Model, Schema } from "mongoose";

const FolderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 70,
      default: "Unit 1"
    },
    courseAffiliation: {
      type: String,
      required: true,
    },
    files: {
      type: Array,
      default: [],
    },
    summaries: {
        type: Array,
        default: [],
      },
    quizzes: {
        type: Array,
        default: [],
    },
    flashcards: {
      type: Array,
      default: [],
  },
    outlines: {
      type: Array,
      default: [],
    }
  },
  { timestamps: true }
);

export const Folder = mongoose.models.Folder || model("Folder", FolderSchema);

// const User = mongoose.model("User", UserSchema)
export default Folder;
