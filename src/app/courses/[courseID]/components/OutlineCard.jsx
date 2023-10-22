"use client";

import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '@/state/reducers/authSlice';
import { courseActions } from '@/state/reducers/courseSlice';
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

export function OutlineCard(outline) {
    const user = useSelector((state) => state.auth.user)
    const courses = useSelector((state) => state.course.courses)
    const token = useSelector((state) => state.auth.token)


  return (
    <>
 <div onClick={()=>document.getElementById(`outlineModal${outline.outlineID}`).showModal()} className="hover:cursor-pointer bg-storm rounded-3xl items-center font-biscuitReg relative mb-2 mt-2 p-2">
 <div className="inline-block flex">
    <div className="colorCircle ml-2 w-8 h-8 sm:w-8 sm:h-8 bg-light-pink rounded-full flex justify-center items-center ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="text-dark-pink w-[1.25rem] h-[1.25rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
    </div>
    <h1 className="flex items-center text-md text-dark-gray font-biscuitReg ml-4">{outline.title}</h1>                    
    </div>
  </div>

<dialog id={`outlineModal${outline.outlineID}`} className="modal w-full h-full bg-off-white rounded-3xl">
  <div className="modal-box">
<div className='flex items-center space-x-5 font-biscuitReg mt-4'>
        <h1 className="flex font-semibold text-dark-gray text-3xl ml-6 border-b border-light-gray">{outline.title}</h1>
    {outline.filesUsed.map((file, index) => {
      return(
        <div key={index} className="bg-blue-md w-fit pl-3 pr-3 h-8 rounded-3xl flex items-center ">
          <h1 className="text-md text-dark-blue">{file.name}</h1>
        </div> 
      )})}
  </div>
  <div className='ml-4 mr-4 mb-4 -mt-3'>
  <div className='font-biscuitReg h-fit w-full bg-storm p-7 mt-7 rounded-3xl'>
    <pre className='font-biscuitReg summaryText text-lg text-justify text-dark-gray whitespace-pre-line'>
      {outline.content}
    </pre>
</div>
  </div>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button, it will close the modal */}
        <button className="btn btn-sm w-[1.7rem] h-[1.7rem] btn-circle btn-ghost absolute top-3 right-3 bg-pastel-red rounded-full justify-center items-center flex inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="text-dark-red hover:text-hover-red hover:scale-105 w-[1.35rem] h-[1.35rem]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
      </form>
    </div>
  </div>
</dialog>
    </>
  )
}