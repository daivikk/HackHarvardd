import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Course } from "@/models/Course";
import { Folder } from "@/models/Folder";
import { constants } from "perf_hooks";
import User from "@/models/User";

export async function GET(req) {
    try {

      const searchParams = req.nextUrl.searchParams;
      const courseId = searchParams.get('query');
    
      await connectMongoDB();
  
      const course = await Course.findById(courseId);
  
      let folders = [];
  
      for(let i = 0; i < course.folders.length; i++){
        const folderId = course.folders[i].toString();
        const folder = await Folder.findById(folderId);
        console.log(folder)
        if (folder) {
          folders.push(folder)
        };
      }
  
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