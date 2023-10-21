import mongoose, { Document, model, Model, Schema } from "mongoose";

const FlashcardSchema = new Schema(
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
    flashcards: {
      type: Array,
      default: [],
    },
    filesUsed: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export const Flashcard = mongoose.models.Flashcard || model("Flashcard", FlashcardSchema);

// const User = mongoose.model("User", UserSchema)
export default Flashcard;
