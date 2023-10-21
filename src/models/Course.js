import mongoose, { Document, model, Model, Schema } from "mongoose";

const CourseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      max: 100,
    },
    userAffiliation: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      default: '#E0DBFF',
      required: true,
    },
    type: {
        type: String,
        required: true,
    },
    folders: {
        type: Array,
        default: [],
    }
  },
  { timestamps: true }
);

export const Course = mongoose.models.Course || model("Course", CourseSchema);

export default Course;