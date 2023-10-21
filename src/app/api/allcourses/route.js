import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Course } from "@/models/Course";
import { Folder } from "@/models/Folder";
import { constants } from "perf_hooks";
import User from "@/models/User";

export async function GET(req) {
    try {

      const searchParams = req.nextUrl.searchParams;
      const userId = searchParams.get('query');
    
      await connectMongoDB();
  
      const user = await User.findById(userId);
  
      let courses = [];
  
      for(let i = 0; i < user.courses.length; i++){
        const courseId = user.courses[i].toString();
        const course = await Course.findById(courseId);
        if (course) {
          courses.push(course)
        };
      }
  
      return NextResponse.json(
        { data: courses },
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