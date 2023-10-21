import mongoose, { Document, model, Model, Schema } from "mongoose";

const OutlineSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      min: 2,
      max: 70,
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
      
    },
    filesUsed: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export const Outline = mongoose.models.Outline || model("Outline", OutlineSchema);

// const User = mongoose.model("User", UserSchema)
export default Outline;
