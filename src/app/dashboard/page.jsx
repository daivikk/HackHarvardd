'use client';

import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../state/reducers/authSlice';
import { courseActions } from '@/state/reducers/courseSlice';
import { homeActions } from '@/state/reducers/homeSlice';
import { tabActions } from '@/state/reducers/tabSlice';
import { useRouter } from "next/navigation";
import { folderActions } from '@/state/reducers/folderSlice';
import { AddCourseForm } from './components/AddCourseForm';
import { CourseCard } from './components/CourseCard';
import { useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Link from 'next/link';


export default function Dashboard() {
    const user = useSelector((state) => state.auth.user)
    const courses = useSelector((state) => state.course.courses)
    const token = useSelector((state) => state.auth.token)
    const uploads = useSelector((state) => state.tab.uploads)

    const router = useRouter();
    
    const isLoading = useSelector((state) => state.home.isLoading)
    const dispatch = useDispatch()

    // useEffect(() => {

    // }, [courses]);

    var weekday;

    const today = new Date();
    if (today.getDay() == 0) {
        weekday = "Sunday"
    }
    if (today.getDay() == 1) {
         weekday = "Monday"
    }
    if (today.getDay() == 2) {
         weekday = "Tuesday"
    }
    if (today.getDay() == 3) {
         weekday = "Wednesday"
    }
    if (today.getDay() == 4) {
         weekday = "Thursday"
    }
    if (today.getDay() == 5) {
         weekday = "Friday"
    }
    if (today.getDay() == 6) {
         weekday = "Saturday"
    }

    var month;

    if (today.getMonth() == 0) {
        month = "January"
    }
    if (today.getMonth() == 1) {
         month = "February"
    }
    if (today.getMonth() == 2) {
         month = "March"
    }
    if (today.getMonth() == 3) {
         month = "April"
    }
    if (today.getMonth() == 4) {
         month = "May"
    }
    if (today.getMonth() == 5) {
         month = "June"
    }
    if (today.getMonth() == 6) {
         month = "July"
    }
    if (today.getMonth() == 7) {
        month = "August"
   }
   if (today.getMonth() == 8) {
    month = "September"
    }
    if (today.getMonth() == 9) {
        month = "October"
    }
    if (today.getMonth() == 10) {
        month = "November"
    }
    if (today.getMonth() == 11) {
        month = "December"
    }

    useEffect(() => {
        const callLoadCourses = async () => {

            dispatch(homeActions.setLoading(true))

            const res = await fetch(
                `/api/allcourses/?query=${user._id}`,
            {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                  }
            }
            );
            const loadedCourses = await res.json();
            dispatch(courseActions.loadCourses(loadedCourses.data))
            console.log(loadedCourses.data)

            dispatch(homeActions.setLoading(false))
        }
        callLoadCourses()
      }, []); 

    const ROUTE_COURSE_DATEID = "/courses/[dateID]"

    const handleDelete = async (e, course) => {
        const res = await fetch(
            "/api/course",
        {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                userID: user._id,
                courseID: course._id,
            }),
        }
        );

        console.log(await res.json())

        dispatch(courseActions.deleteCourse(course._id));
    }

    const handleSubmit = async (e, course) => {
        e.preventDefault();

        const rawCourse = await fetch(
            "/api/course",
            {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    userID: user._id,
                    name: e.target.name.value,
                    semester: e.target.semester.value,
                    year: e.target.year.value,
                    color: "#E0DBFF",
                    type: e.target.courseType.value,
                    courseID: course._id,
                    folders: course.folders,
                }),
            }
            );

        let updatedCourse = await rawCourse.json();

        dispatch(courseActions.editCourse(updatedCourse.data));

        document.getElementById(course._id).close();
        
    }

    console.log(courses)

  return (
  <div>
    {isLoading ? <LoadingScreen/> : 
  <div className="relative min-h-screen flex">
      <div className="grid grid-cols-1 grid-rows-7 sm:grid-rows-7 sm:grid-cols-7 gap-6 m-6 flex-1">
        <div className="bg-off-white p-4 sm:col-span-7 rounded-3xl shadow-md row-span-2">
        <AddCourseForm />
        {/* <img src='app/dashboard/imgs/biscuit.PNG'></img> */}
        <div className="gap-4 space-x-4 space-y-4 font-biscuitReg relative">
            <div className='items-center flex inline-block space-x-8 mb-4'>
                <h1 className="welcomeHeader flex font-semibold text-dark-gray text-5xl mt-2 ml-2 border-b border-light-gray">Welcome {user.firstName}. </h1>
                <div className='absolute right-0 inline-block flex space-x-8'>
                    <div className="bg-pastel-purple w-fit pl-8 pr-8 h-11 rounded-3xl font-biscuitReg justify-center items-center flex inline-block">
                        <h1 className="text-xl text-dark-purple"> {weekday} </h1>
                    </div>
                    <div className="bg-pastel-purple w-fit pl-8 pr-8 h-11 inline-block rounded-3xl align-middle font-biscuitReg justify-center items-center flex">
                        <h1 className="text-xl text-dark-purple">{month}</h1>
                    </div>
                    <div className="bg-pastel-purple w-fit pl-4 pr-4 h-11 inline-block rounded-3xl align-middle font-biscuitReg justify-center items-center flex">
                        <h1 className="text-xl text-dark-purple">{today.getDate()}</h1>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-blue-md -mb-8 w-fit pl-3 pr-3 h-8 inline-block rounded-3xl font-biscuitReg justify-center items-center align-middle flex">
                <h1 className="text-lg text-dark-blue">Fall Semester</h1>
            </div>
        </div>
        <div className="bg-off-white p-4 sm:col-span-7 rounded-3xl shadow-md row-span-5 relative">
        <h1 className="coursesHeader font-semibold text-dark-gray text-2xl mt-2 ml-2 font-biscuitReg align-middle">{user.firstName}&apos;s Courses</h1>
        <hr className="courseLine ml-2 text-light-gray mb-4"></hr>
        {courses.map((course, index) => {
        return(
            <div key={`${course._id}`}>
            <div key={`${index}`} className="bg-storm w-full flex h-16 rounded-3xl items-center inline-block font-biscuitReg relative mb-2">
            <Link className="flex justify-center items-center hover:cursor-pointer hover:scale-[1.025]" href={`courses/${course._id}`}>
                <div className="colorCircle ml-4 w-10 h-10 sm:w-10 sm:h-10 bg-blue-md rounded-full ml-2"></div>
                <h1 className="flex text-xl text-dark-gray font-biscuitReg ml-4">{course.name}</h1>
            </Link>
                <div className="flex absolute right-0 mr-4 space-x-16 align-middle justify-center items-center">
                    <div className="bg-blue-md pl-4 pr-4 h-8 inline-block rounded-3xl align-middle font-biscuitReg justify-center items-center flex">
                        <h2 className="text-lg text-dark-blue">{course.semester} {course.year}</h2>
                    </div>
                    <div className="courseBtns inline-block flex space-x-2">
                        <div onClick={()=>document.getElementById(course._id).showModal()} className="editBtn w-10 h-10 sm:w-10 sm:h-10 bg-purple-md rounded-full justify-center items-center flex inline-block">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-dark-purple hover:cursor-pointer hover:text-hover-purple hover:scale-105">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </div>
                        <div onClick={(e)=>{handleDelete(e, course)}} className="deleteBtn w-10 h-10 sm:w-10 sm:h-10 bg-pastel-red rounded-full justify-center items-center flex inline-block">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-dark-red hover:cursor-pointer hover:text-hover-red hover:scale-105">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </div>
                    </div>
                </div>
         </div>

         <dialog id={course._id} className="modal font-biscuitReg rounded-3xl h-[10.35rem] bg-off-white z-50">
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
                <h4 className="headerText text-dark-gray text-xl font-biscuitMed mt-3">Edit Course</h4>
                <hr className="text-light-gray mb-4"></hr>
                {/* <span className="closeCircle" onClick={routeChange}></span> */}
                </div>
                <form className="newRoadmapForm" onSubmit={(e)=>{handleSubmit(e, course)}}>
                    <input required className="inputField rounded-3xl bg-blue-md border-none text-dark-gray" id="name" type="text" placeholder="Course Name" defaultValue={course.name}></input>
                    <select required id="semester" className="rounded-3xl bg-blue-md border-none text-dark-gray ml-4" defaultValue={course.semester}>
                        <option value="Fall">Fall</option>
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                        <option value="Winter">Winter</option>
                    </select>
                    <input required className="inputField rounded-3xl bg-blue-md border-none text-dark-gray ml-4 w-16" id="year" type="text" placeholder="Year" defaultValue={course.year}></input>
                    <select required id="courseType" className="rounded-3xl bg-blue-md text-dark-gray border-none ml-4" defaultValue={course.courseType}>
                        <option value="Math">Math</option>
                        <option value="Science">Science</option>
                        <option value="Humanities">Humanities</option>
                    </select>
                
                <input required className="form-submit rounded-3xl pl-4 pr-4 pt-2 pb-2 bg-pastel-green text-dark-green right-5 mt-4 mb-4 flex absolute hover:cursor-pointer hover:scale-105 hover:text-hover-green" type="submit" value="Edit"></input>
                </form>
            </div>

        </div>
        </div>
        </dialog>
            </div>
        )
        })}
        </div>
      </div>

  </div>
}
  </div> 
  )
}