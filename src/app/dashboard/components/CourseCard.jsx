"use client"
import { useEffect, useState } from "react"
import { courseActions } from "@/state/reducers/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export const CourseCard = (props) => {
    const user = useSelector((state) => state.auth.user)
    const token = useSelector((state) => state.auth.token)

    const courses = useSelector((state) => state.course.courses)

    // let index = props.index;
    // // console.log(index)
    // let course = courses[index];
    // // console.log(course)

    // useEffect(()=>{
    //     course = courses[index]
    // }, [courses])

    // let course = props.course

    const handleSubmit = props.handleSubmit;
    const dispatch = useDispatch()
    const router = useRouter();
    
    // const handleDelete = async (e) => {
    //     await fetch(
    //         "http://localhost:3000/api/course",
    //     {
    //         method: "DELETE",
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //             "Content-Type": "application/json",
    //           },
    //         body: JSON.stringify({
    //             userID: user._id,
    //             dateID: course.dateID,
    //         }),
    //     }
    //     );

    //     dispatch(courseActions.deleteCourse(course.dateID));
    // }

    

    return (
        <>
        </>
    )
}

export default CourseCard;





















































