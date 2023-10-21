import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Course } from "@/models/Course";
import { Folder } from "@/models/Folder";
import { constants } from "perf_hooks";
import User from "@/models/User";
import File from "@/models/File";
import { Summary } from "@/models/Summary";
import { Quiz } from "@/models/Quiz";
import { Outline } from "@/models/Outline";
import { Flashcard } from "@/models/Flashcard";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const { userID, courseName, semester, year, color, type, folder1 } = await req.json();

    await connectMongoDB();

    const newCourse = await Course.create({
      name: courseName,
      userAffiliation: userID,
      semester: semester,
      year: year,
      color: color,
      type: type,
      folders: [],
    });

    const defaultFolder = await Folder.create({
      name: folder1.name,
      courseAffiliation: newCourse._id,
      files: folder1.files,
      summaries: folder1.summaries,
      quizzes: folder1.quizzes,
      outlines: folder1.outlines,
      flashcards: folder1.flashcards
    });

    await Course.findByIdAndUpdate(newCourse._id, {
      $push: {
        folders:
          defaultFolder._id
      },
    });

    await User.findByIdAndUpdate(userID, {
      $push: {
        courses: newCourse._id
      },
    });


    return NextResponse.json(
      { data: newCourse },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while adding new course/default file to user" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
    try {
        const { name, semester, year, color, type, courseID } = await req.json();

        console.log(name)
    
        await connectMongoDB();

        const update = {
          name: name, 
          semester: semester,
          year: year,
          color: color,
          type: type,
          _id: courseID,
        }

        const updatedCourse = await Course.findByIdAndUpdate({_id: courseID}, update, {new: true})
    
        return NextResponse.json(
          { data: updatedCourse },
          { status: 201 }
        );
      } catch (error) {
        return NextResponse.json(
          { message: "An error occurred while updating the course" },
          { status: 500 }
        );
      }
}

export async function DELETE(req) {
  try {
      const { userID, courseID } = await req.json();
  
      await connectMongoDB();

      const course = await Course.findById(courseID)
      
      for(let i = 0; i < course.folders.length; i++){
        const folder = await Folder.findById(course.folders[i]);

        // Deleting all the file documents pertaining to this folder
        for(let i = 0; i < folder.files.length; i++){
          await File.findByIdAndDelete(folder.files[i]);
        }

        // Deleting all the summary documents pertaining to this folder
        for(let i = 0; i < folder.summaries.length; i++){
          await Summary.findByIdAndDelete(folder.summaries[i]);
        }

        // Deleting all the quiz documents pertaining to this folder
        for(let i = 0; i < folder.quizzes.length; i++){
          await Quiz.findByIdAndDelete(folder.quizzes[i]);
        }

        // Deleting all the outline documents pertaining to this folder
        for(let i = 0; i < folder.outlines.length; i++){
          await Outline.findByIdAndDelete(folder.outlines[i]);
        }

        // Deleting all the flashcard documents pertaining to this folder
        for(let i = 0; i < folder.flashcards.length; i++){
          await Flashcard.findByIdAndDelete(folder.flashcards[i]);
        }

        await Folder.findByIdAndDelete(course.folders[i]);
      }

      console.log(courseID)

      await Course.findByIdAndDelete(courseID)

      const user = await User.findById(userID);

      let updatedCourses = []

      for(let i = 0; i < user.courses.length; i++){
        if(courseID != user.courses[i]){
          updatedCourses.push(user.courses[i])
        }
      }

      await User.findByIdAndUpdate(userID, {courses: updatedCourses});

      return NextResponse.json(
        { message: "Course has been deleted" },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: error.message },
        // { status: 500 }
      );
    }
} 
