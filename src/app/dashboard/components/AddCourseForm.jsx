"use client";

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
// import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useRouter } from "next/navigation";
import { courseActions } from "@/state/reducers/courseSlice";

// import routeChange from "../helpers/navigateHome";

export const AddCourseForm = () => {
    const user = useSelector((state) => state.auth.user)
    const token = useSelector((state) => state.auth.token)

    const dispatch = useDispatch()
    const router = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // const folderID = Date.now();

        const rawCourse = await fetch(
        "/api/course",
        {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                userID: user._id,
                courseName: e.target.courseName.value,
                semester: e.target.semester.value,
                year: e.target.year.value,
                color: "#E0DBFF",
                type: e.target.courseType.value,
                folder1:
                    {
                        name: "Unit 1",
                        files: [],
                        quizzes: [],
                        summaries: [],
                        flashcards: [],
                        outlines: [],
                    },
            }),
        }
        );
        const res = await rawCourse.json()
        // dispatch(courseActions.resetCourses())
        dispatch(courseActions.newCourse(res.data));
        // navigate(`/${roadmap.roadmap._id}`);
        document.getElementById('new_course_modal').close();
    }

    return (
        <>
        <div className="addFilesBtnContainer absolute inset-x-0 bottom-8 rounded-3xl flex justify-center items-center mt-1.5 z-10">
                <div onClick={()=>document.getElementById('new_course_modal').showModal()} className="addFilesBtn w-10 h-10 sm:w-12 sm:h-12 bg-blue-md rounded-full flex justify-center items-center hover:scale-[1.05]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10 text-dark-blue hover:cursor-pointer hover:text-hover-blue hover:scale-[1.05]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                     </svg>
                </div>
        </div>
        {/* <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button> */}
        <dialog id="new_course_modal" className="modal font-biscuitReg rounded-3xl h-[10.35rem] bg-off-white">
        <div className="modal-box">
            <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm w-[1.5rem] h-[1.5rem] btn-circle btn-ghost absolute top-3 right-3 bg-pastel-red rounded-full justify-center items-center flex inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="text-dark-red hover:text-hover-red hover:scale-105 w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            </form>
            <div className="form_card">

            <div className="form_container ml-5 mr-5">
                <div className="header ">
                <h4 className="headerText text-dark-gray text-xl font-biscuitMed mt-3">Create New Course</h4>
                <hr className="text-light-gray mb-4"></hr>
                {/* <span className="closeCircle" onClick={routeChange}></span> */}
                </div>
                <form className="newRoadmapForm" onSubmit={handleSubmit}>
                    <input required className="inputField rounded-3xl bg-blue-md border-none text-dark-gray" id="courseName" name="courseName" type="text" placeholder="Course Name"></input>
                    <select required id="semester" className="rounded-3xl bg-blue-md border-none text-dark-gray ml-4">
                        <option value="Fall">Fall</option>
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                        <option value="Winter">Winter</option>
                    </select>
                    <input required className="inputField rounded-3xl bg-blue-md border-none text-dark-gray ml-4 w-16" id="year" type="text" placeholder="Year"></input>
                    <select required id="courseType" className="rounded-3xl bg-blue-md text-dark-gray border-none ml-4">
                        <option value="Math">Math</option>
                        <option value="Science">Science</option>
                        <option value="Humanities">Humanities</option>
                    </select>
                
                <input required className="form-submit rounded-3xl pl-4 pr-4 pt-2 pb-2 bg-pastel-green text-dark-green right-5 mt-4 mb-4 flex absolute hover:cursor-pointer hover:scale-105 hover:text-hover-green" type="submit" value="Create"></input>
            </form>
            </div>

        </div>
        </div>
        </dialog>
        </>
    )
}

export default AddCourseForm;