import mongoose, { Document, model, Model, Schema } from "mongoose";

const QuizSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "First Name Required"],
      max: 100,
    },
    folderAffiliation: {
      type: String,
    },
    filesUsed: {
      type: Array,
      default: [],
    },
    questions: {
        type: Array,
        default: [],
    }
  },
  { timestamps: true }
);

export const Quiz = mongoose.models.Quiz || model("Quiz", QuizSchema);
// export const User = mongoose.model("User", UserSchema);
export default Quiz;

// const User = mongoose.model("User", UserSchema)
// export default User;
