import mongoose, { Document, model, Model, Schema } from "mongoose";

const SummarySchema = new Schema(
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

export const Summary = mongoose.models.Summary || model("Summary", SummarySchema);

// const User = mongoose.model("User", UserSchema)
export default Summary;