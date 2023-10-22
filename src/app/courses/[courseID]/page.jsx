'use client';

import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '@/state/reducers/authSlice';
import { courseActions } from '@/state/reducers/courseSlice';
import { folderActions } from '@/state/reducers/folderSlice';
import { homeActions } from '@/state/reducers/homeSlice';
import { useRouter } from "next/navigation";
import { FolderCard } from "./components/FolderCard"
import { useEffect } from 'react';
import AddFolderForm from './components/AddFolderForm';
import TabSystem from './components/TabSystem';
import LoadingScreen from '@/app/dashboard/components/LoadingScreen';
import { tabActions } from '@/state/reducers/tabSlice';

export default function CoursePage({ params }) {
    const user = useSelector((state) => state.auth.user)
    const courses = useSelector((state) => state.course.courses)
    const token = useSelector((state) => state.auth.token)
    const folders = useSelector((state) => state.folder.folders)
    const activeFolder = useSelector((state) => state.folder.activeFolder)
    const isLoading = useSelector((state) => state.home.isLoading)
    const course = useSelector((state) => state.course.activeCourse)
    const courseID = params.courseID

    const router = useRouter();
    const dispatch = useDispatch();

    const routeDash = () => {
        router.push('/dashboard');
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));
    // const navigate = useNavigate();

    // let course;

    // for(var i = 0; i < courses.length; i++){
    //     if(courses[i].dateID == params.courseID){
    //         course = courses[i]
    //     }
    // }


    useEffect(() => {        
        const callLoadFolders = async () => {

            // dispatch(homeActions.setLoading(true))

            // const res = await fetch(
            //     `/api/allfolders/?query=${courseID}`,
            // {
            //     method: "GET",
            //     headers: {
            //         'Authorization': `Bearer ${token}`,
            //         "Content-Type": "application/json",
            //       },
            // }
            // );
            // const loadedFolders = await res.json()

            // console.log(loadedFolders)

            // dispatch(folderActions.loadFolders(loadedFolders.data))

            let activeCourse;

            for(var i = 0; i < courses.length; i++){
                if(courseID == courses[i]._id){
                    activeCourse = courses[i];
                }
            }

            const response = await fetch(`/api/allfiles?query=${courseID}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
            })
            const loadedMaterial = await response.json()
            console.log("Loaded Material: ")
            console.log(loadedMaterial.data)
            
            dispatch(folderActions.loadFolders(loadedMaterial.data))

            console.log(loadedMaterial.data[0].files)

            // dispatch(tabActions.setUploads(loadedMaterial.data[0].files))
            dispatch(courseActions.setActive(activeCourse))
            dispatch(folderActions.setActiveFolder(loadedMaterial.data[0]))
            dispatch(folderActions.setType('uploads'))
            dispatch(homeActions.setLoading(false))
        }
        callLoadFolders()
      }, []); 


    //   console.log("On Load Active Folder" + activeFolder.name)

    const routeChange = () =>{ 
        router.push(`/courses/${courseID}`);
    }

    var type = ""
    const selected = async (tabType) => {
        var elements = document.getElementsByClassName('tab')
        for(let i = 0; i < elements.length; i++){
            if(elements[i].getAttribute('id') != tabType){
                elements[i].classList.remove("bg-folder-blue")
                elements[i].classList.add("bg-storm")
            }
            else{
                elements[i].classList.remove("bg-storm")
                elements[i].classList.add("bg-folder-blue")
            }
        }

        dispatch(folderActions.setType(tabType))
    }

    const folderClick = async (e, index) => {
        dispatch(tabActions.setUploads(folders[index].files))
        dispatch(folderActions.setActiveFolder(folders[index]))

        if(!e.target.classList.contains('btn')){
            var elements = document.getElementsByClassName('folder')
            for(let i = 0; i < elements.length; i++){
                if(i != index){
                    elements[i].classList.remove("bg-folder-blue")
                    elements[i].classList.add("bg-storm")
                } else {
                    console.log(elements[i])
                    elements[i].classList.remove("bg-storm");
                    elements[i].classList.add("bg-folder-blue");
                }
            }

            // console.log("After click active folder" + activeFolder.name)
        }
    }

    const handleDelete = async (e, index) => {

        if(folders.length > 1){
            const res = await fetch(
                "/api/folder",
            {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    userID: user._id,
                    courseID: course._id,
                    folderID: folders[index].folderID,
                }),
            }
            ); 
            console.log(await res.json())
    
            if(folders[index]._id == activeFolder._id){
                dispatch(folderActions.setActiveFolder(null))
            }
    
            dispatch(folderActions.deleteFolder(folders[index].folderID));


            // await delay(500)

            // let first = document.getElementById(folders[0]._id)
            // first.classList.remove('bg-storm')
            // first.classList.add('bg-folder-blue')

            // dispatch(folderActions.setActiveFolder(folders[0]))

        }

    } 

  return (
    <>
        {isLoading ? <LoadingScreen/> : 
  <div>
  <div className="relative min-h-screen flex">
      <div className="grid grid-cols-1 grid-rows-1 sm:grid-rows-6 sm:grid-cols-7 gap-6 m-6 flex-1">
        <div className="bg-off-white p-4 sm:col-span-7 rounded-3xl shadow-md row-span-1">
        <AddFolderForm course={course}/>
        <div className="courseBtns inline-block flex space-x-2 mt-28 absolute right-10">
                <div className="addFilesBtnContainer flex inline-block rounded-3xl flex right-0 z-10">
                    <div onClick={()=>document.getElementById('new_folder_modal').showModal()} className="addFilesBtn w-10 h-10 sm:w-12 sm:h-12 bg-blue-md rounded-full flex justify-center items-center hover:scale-[1.05]">
                        <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10 text-dark-blue hover:cursor-pointer hover:text-hover-blue hover:scale-[1.05]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        </div> 
                    </div>
                </div> 
    </div>
        <div className="gap-4 space-x-4 space-y-4 font-biscuitReg relative">
            <div className='items-center flex space-x-8'>
                <h1 className="welcomeHeader flex font-semibold text-dark-gray text-5xl mt-2 ml-2 border-b border-light-gray">{course.name} </h1>
             </div>
             {/* CLOSE BTN */}
             <button onClick={routeDash} className="btn btn-sm w-[1.75rem] h-[1.75rem] btn-circle btn-ghost absolute top-0 right-2 bg-pastel-red rounded-full justify-center items-center flex inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="text-dark-red hover:text-hover-red hover:scale-105 w-[1.5rem] h-[1.5rem]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>
             <div className='flex space-x-6'>
             {folders.map((folder, index) => {
                const props = {
                    index: index,
                    course: {...course},
                    folder: {...folder}
                }
                return(
                    <FolderCard folderClick={folderClick} handleDelete={handleDelete} key={index} {...props} />
                )
                })}
             </div>
        <div className="flex absolute right-0 mr-4 space-x-16 align-middle justify-center items-center">
            
            </div>
        </div>
    </div>
    
    {activeFolder && <div className="bg-off-white p-4 sm:col-span-7 rounded-3xl shadow-md row-span-2">
    <div className='items-center flex inline-block space-x-2'>
         <div onClick={()=>{selected("uploads")}} id="uploads" className="tab hover:cursor-pointer bg-folder-blue w-2/12 flex h-16 rounded-3xl items-center inline-block font-biscuitReg relative mb-2 mt-2">
                <h1 className="flex text-xl text-dark-gray font-biscuitReg ml-4">Uploads</h1>
         </div>
         <div onClick={()=>{selected("summaries")}} id="summaries" className="tab hover:cursor-pointer bg-storm w-2/12 flex h-16 rounded-3xl items-center inline-block font-biscuitReg relative mb-2 mt-2">
                <h1 className="flex text-xl text-dark-gray font-biscuitReg ml-4">Summaries</h1>
         </div>
         <div onClick={()=>{selected("quizzes")}} id="quizzes" className="tab hover:cursor-pointer bg-storm w-2/12 flex h-16 rounded-3xl items-center inline-block font-biscuitReg relative mb-2 mt-2">
                <h1 className="flex text-xl text-dark-gray font-biscuitReg ml-4">Quizzes</h1>
         </div>
         <div onClick={()=>{selected("flashcards")}} id="flashcards" className="tab hover:cursor-pointer bg-storm w-2/12 flex h-16 rounded-3xl items-center inline-block font-biscuitReg relative mb-2 mt-2">
                <h1 className="flex text-xl text-dark-gray font-biscuitReg ml-4">Flashcards</h1>
         </div>
         <div onClick={()=>{selected("outlines")}} id="outlines" className="tab hover:cursor-pointer bg-storm w-2/12 flex h-16 rounded-3xl items-center inline-block font-biscuitReg relative mb-2 mt-2">
                <h1 className="flex text-xl text-dark-gray font-biscuitReg ml-4">Outlines</h1>
         </div>
    </div>
          <TabSystem/>
          <div className="courseBtns inline-block flex float-right">
                <div className="addFilesBtnContainer flex inline-block rounded-3xl flex right-0 bottom-0 z-10 mt-[9.85rem]">
                    <div className="aiBtn flex inline-block rounded-3xl flex right-0 z-10">
                        <div onClick={()=>document.getElementById('ai_modal').showModal()} className="w-10 h-10 sm:w-12 sm:h-12 bg-light-pink rounded-full flex justify-center items-center hover:cursor-pointer hover:scale-[1.05] hover:text-hover-pink">
                            <svg id="Quiz" xmlns="http://www.w3.org/2000/svg" className="text-dark-pink h-10 w-10 hover:text-hover-pink" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M128,200c16,0,42.5-.2,72.9-17.8s40.3-39.5,43.4-50.8a7.9,7.9,0,0,0-5.7-9.8c-7.3-1.9-20.1-3.6-36.5.3" fill="none" stroke="#FFA1DF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><path d="M53.9,121.8c-16.4-3.8-29.2-2.1-36.5-.2a7.9,7.9,0,0,0-5.7,9.8c3.1,11.3,13,33.3,43.4,50.8S112,200,128,200" fill="none" stroke="#FFA1DF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><path d="M128,200s40-21.8,40-80c0-45.6-24.6-68.8-35.2-76.8a8.1,8.1,0,0,0-9.6,0C112.6,51.2,88,74.4,88,120,88,178.2,128,200,128,200Z" fill="none" stroke="#FFA1DF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><path d="M128,200c12-2.6,44.3-20.8,63.7-54.4s14.6-60.3,10.8-72a7.8,7.8,0,0,0-9.2-5.3,77.1,77.1,0,0,0-31.4,15.1" fill="none" stroke="#FFA1DF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><path d="M94.1,83.4A77.1,77.1,0,0,0,62.7,68.3a7.8,7.8,0,0,0-9.2,5.3c-3.8,11.7-8.6,38.5,10.8,72S116,197.4,128,200" fill="none" stroke="#FFA1DF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/></svg>
                        </div>
                    </div> 
                </div> 
            </div>
    </div>}
    </div>
    </div>
    {/* <div className="grid grid-cols-1 grid-rows-1 sm:grid-rows-6 sm:grid-cols-7 gap-6 m-6 flex-1">
        <div className="bg-off-white p-4 sm:col-span-7 rounded-3xl shadow-md row-span-5 relative">
            <p>Hello</p>
        </div>
    </div> */}

    <dialog id='new_folder_modal' className="modal">
        <div className="modal-box">
            <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"></button>
            </form>
            <div className="form_card">

            <div className="form_container">
                <div className="header">
                <h4 className="headerText">Add</h4>
                <span className="closeCircle" onClick={routeChange}>
                    </span>
                </div>
            </div>
        </div>
        </div>
        </dialog>



        {/* THE FOLLOWING CODE IS FOR THE GENERATE W AI MODAL */}
{/* <button className="btn" onClick={()=>document.getElementById('ai_modal').showModal()}></button>
<dialog id="ai_modal" className="modal w-2/12 h-10/12 bg-off-white rounded-3xl scale-125">
  <div className="modal-box">
<div className='flex items-center justify-center items-center font-biscuitReg mt-4'>
<div className="w-10 h-10 sm:w-12 sm:h-12 bg-light-pink rounded-full justify-center items-center flex inline-block">
<svg xmlns="http://www.w3.org/2000/svg" className="text-dark-pink h-10 w-10 hover:stroke-text-hover-pink" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M128,200c16,0,42.5-.2,72.9-17.8s40.3-39.5,43.4-50.8a7.9,7.9,0,0,0-5.7-9.8c-7.3-1.9-20.1-3.6-36.5.3" fill="none" stroke="#FFA1DF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><path d="M53.9,121.8c-16.4-3.8-29.2-2.1-36.5-.2a7.9,7.9,0,0,0-5.7,9.8c3.1,11.3,13,33.3,43.4,50.8S112,200,128,200" fill="none" stroke="#FFA1DF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><path d="M128,200s40-21.8,40-80c0-45.6-24.6-68.8-35.2-76.8a8.1,8.1,0,0,0-9.6,0C112.6,51.2,88,74.4,88,120,88,178.2,128,200,128,200Z" fill="none" stroke="#FFA1DF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><path d="M128,200c12-2.6,44.3-20.8,63.7-54.4s14.6-60.3,10.8-72a7.8,7.8,0,0,0-9.2-5.3,77.1,77.1,0,0,0-31.4,15.1" fill="none" stroke="#FFA1DF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><path d="M94.1,83.4A77.1,77.1,0,0,0,62.7,68.3a7.8,7.8,0,0,0-9.2,5.3c-3.8,11.7-8.6,38.5,10.8,72S116,197.4,128,200" fill="none" stroke="#FFA1DF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/></svg>
</div>
  </div>
  
    <div className="modal-action">
      <form method="dialog">
        <button className="btn btn-sm w-[1.25rem] h-[1.25rem] btn-circle btn-ghost absolute top-3 right-3 bg-pastel-red rounded-full justify-center items-center flex inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="text-dark-red hover:text-hover-red hover:scale-105 w-[1rem] h-[1rem]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
      </form>
    </div>
  </div>
</dialog> */}

    </div>}
      </>
  )
}