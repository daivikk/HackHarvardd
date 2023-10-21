"use client"
import { useEffect, useState } from "react"
import { courseActions } from "@/state/reducers/courseSlice";
import { folderActions } from "@/state/reducers/folderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export const FolderCard = (props) => {
    const user = useSelector((state) => state.auth.user)
    const token = useSelector((state) => state.auth.token)
    const folder = props.folder;
    const course = props.course;
    const folderClick = props.folderClick;
    const handleDelete = props.handleDelete;
    const index = props.index;
    
    const dispatch = useDispatch()
    const router = useRouter();


    // const selected = async (e) => {
    //     if(e.target.classList.contains('folder')){
    //         var elements = document.getElementsByClassName('folder')
    //         for(let i = 0; i < elements.length; i++){
    //             elements[i].classList.remove("bg-folder-blue")
    //             elements[i].classList.add("bg-storm")
    //         }
            
    //         e.target.classList.remove("bg-storm");
    //         e.target.classList.add("bg-folder-blue");
    //         dispatch(folderActions.setActiveFolder(folder))
    //     }
    // }
    return (
        <>
        
        <div id={folder._id} onClick={(e)=>{folderClick(e, index)}} className={`folder ${(index == 0) ? 'bg-folder-blue' : 'bg-storm'} w-2/12 flex h-16 rounded-3xl items-center inline-block font-biscuitReg relative mb-2 mt-2 hover:cursor-pointer`}>
                <div className="colorCircle ml-4 w-10 h-10 sm:w-10 sm:h-10 bg-blue-md rounded-full flex justify-center items-center ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="text-dark-blue w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
                </div>
                <h1 className="flex text-xl text-dark-gray font-biscuitReg ml-4">{folder.name}</h1>
                <button onClick={(e)=>{handleDelete(e, index)}} className="btn btn-sm w-[1.6rem] h-[1.6rem] btn-circle btn-ghost absolute right-4 bg-pastel-red rounded-full justify-center items-center flex inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-dark-red hover:cursor-pointer hover:text-hover-red hover:scale-105">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                </button>
         </div>
         </>
    )
}






















































