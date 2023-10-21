import mongoose, { Document, model, Model, Schema } from "mongoose";

const FileSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      min: 2,
      max: 70,
    },
    userAffiliation: {
      type: String,
      required: true,
    },
    topics: {
      type: Array,
      default: [],
    },
    folderAffiliation: {
      type: String,
      default: '',
      // nested title, color, completed status, folder array (has summary and quiz objects)
    },
    content: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export const File = mongoose.models.File || model("File", FileSchema);

// const User = mongoose.model("User", UserSchema)
export default File;
