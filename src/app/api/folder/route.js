import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { User } from "@/models/User";
import { Course } from "@/models/Course";
import { Folder } from "@/models/Folder";
import { File } from "@/models/File";
import { Summary } from "@/models/Summary";
import { Quiz } from "@/models/Quiz";
import { Outline } from "@/models/Outline";
import { Flashcard } from "@/models/Flashcard";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const { userID, courseID, name, files, quizzes, summaries, flashcards, outlines} = await req.json()
    
    let user = User.findById(userID);
    let course = Course.findById(courseID)

    await connectMongoDB();

    const newFolder = await Folder.create({
      name: name,
      courseAffiliation: courseID,
      files: files,
      quizzes: quizzes,
      summaries: summaries,
      flashcards: flashcards,
      outlines: outlines,
    });

    await Course.findByIdAndUpdate(courseID, {
      $push: {
        folders:
          newFolder._id
      },
    }, {new: true});2

    return NextResponse.json(
      { data: {
        name: newFolder.name,
        folderID: newFolder._id,
        files: [],
        summaries: [],
        quizzes: [],
        flashcards: [],
        outlines: []
      } },
      { message: "New folder added to user" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while adding new folder to user" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
      const { userID, courseID, folderID } = await req.json();

      console.log(courseID)
      console.log(folderID)
  
      await connectMongoDB();

      const folder = await Folder.findById(folderID)


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

      await Folder.findByIdAndDelete(folderID);

      const course = await Course.findById(courseID);

      let updatedFolders = []
      console.log(course.folders)

      for(let i = 0; i < course.folders.length; i++){
        if(folderID != course.folders[i]){
          updatedFolders.push(course.folders[i])
        }
      }

      await Course.findByIdAndUpdate(courseID, {folders: updatedFolders});
  
      return NextResponse.json(
        { message: "Folder has been deleted" },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: error.message },
        // { status: 500 }
      );
    }
} 
