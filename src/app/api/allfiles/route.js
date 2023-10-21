import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Course } from "@/models/Course";
import { Folder } from "@/models/Folder";
import { File } from "@/models/File";
import { Summary } from "@/models/Summary";
import { Quiz } from "@/models/Quiz";
import { Flashcard } from "@/models/Flashcard";
import { Outline } from "@/models/Outline";
import { constants } from "perf_hooks";
import User from "@/models/User";
import { Summarize } from "@mui/icons-material";

export async function GET(req) {
    try {

      const searchParams = req.nextUrl.searchParams;
      const courseId = searchParams.get('query');
    
      await connectMongoDB();
  
      const course = await Course.findById(courseId);
  
      let files = [];
      let folders = [];
      let summaries = [];
      let quizzes = [];
      let flashcards = [];
      let outlines = [];

      for(let i = 0; i < course.folders.length; i++){
        let folder = {
            name: "",
            folderID: "",
            files: [],
            summaries: [],
            quizzes: [],
            flashcards: [],
            outlines: [],
          }
        const currentFolder = await Folder.findById(course.folders[i])
        files = currentFolder.files
        summaries = currentFolder.summaries
        quizzes = currentFolder.quizzes
        flashcards = currentFolder.flashcards
        outlines = currentFolder.outlines

        // console.log(files)
        folder.name = currentFolder.name
        folder.folderID = currentFolder._id

        for (let j = 0; j < files.length; j++) {
            const file = await File.findById(files[j]);
            folder.files.push({
                name: file.title,
                fileID: file._id,
                // content: file.content,
            })
        }

        for (let j = 0; j < summaries.length; j++) {
          const summary = await Summary.findById(summaries[j]);
          folder.summaries.push({
              title: summary.title,
              summaryID: summary._id,
              content: summary.content,
              filesUsed: summary.filesUsed,
          })
        }

        for (let j = 0; j < quizzes.length; j++) {
          const quiz = await Quiz.findById(quizzes[j]);
          folder.quizzes.push({
              name: quiz.name,
              quizID: quiz._id,
              filesUsed: quiz.filesUsed,
              questions: quiz.questions,
          })
        }

        for (let j = 0; j < flashcards.length; j++) {
          const flashcard = await Flashcard.findById(flashcards[j]);
          folder.flashcards.push({
              title: flashcard.title,
              flashcardID: flashcard._id,
              flashcards: flashcard.flashcards,
              filesUsed: flashcard.filesUsed,
          })
        }

        for (let j = 0; j < outlines.length; j++) {
          const outline = await Outline.findById(outlines[j]);
          folder.outlines.push({
              title: outline.title,
              outlineID: outline._id,
              content: outline.content,
              filesUsed: outline.filesUsed,
          })
        }

        folders.push(folder)
      }

      console.log(folders[0].summaries)
  
    //   for(let i = 0; i < folder.files.length; i++){
    //     const fileId = folder.files[i].toString();
    //     const file = await File.findById(fileId);
    //     if (file) {
    //       files.push(file)
    //     };
    //   }
  
      return NextResponse.json(
        { data: folders },
        { status: 200 },
      )
    }
    catch (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
  }