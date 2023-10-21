import mongoose, { Document, model, Model, Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name Required"],
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: [true, "Last Name Required"],
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: [true, "Email Name Required"],
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password Required"],
      min: 5,
    },
    courses: {
      type: Array,
      default: [],
      // nested title, color, completed status, folder array (has summary and quiz objects)
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || model("User", UserSchema);
// export const User = mongoose.model("User", UserSchema);
export default User;

// const User = mongoose.model("User", UserSchema)
// export default User;