'use client';

import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '@/state/reducers/authSlice';
import { courseActions } from '@/state/reducers/courseSlice';
import { useRouter } from "next/navigation";
import { QuestionCard } from "./QuestionCard";
import { useEffect } from 'react';

export function QuizCard(quiz) {
    // const user = useSelector((state) => state.auth.user)
    // const courses = useSelector((state) => state.course.courses)
    // const token = useSelector((state) => state.auth.token)
  return (
    <>
{/* <button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>open modal</button> */}
<div onClick={()=>document.getElementById(`quizModal${quiz.quizID}`).showModal()} className="hover:cursor-pointer bg-storm rounded-3xl items-center font-biscuitReg relative mb-2 mt-2 p-2">
    <h1 className="flex text-xl text-dark-gray font-biscuitReg ml-4">{quiz.name}</h1>
  </div>
<dialog id={`quizModal${quiz.quizID}`} className="modal w-full h-full bg-off-white rounded-3xl">
  <div className="modal-box">
<div className='flex items-center space-x-5 font-biscuitReg mt-4'>
        <h1 className="flex font-semibold text-dark-gray text-3xl ml-6 border-b border-light-gray">{quiz.name}</h1>
    <div className="bg-blue-md w-fit pl-3 pr-3 h-8 rounded-3xl flex items-center ">
    {quiz.filesUsed.map((file, index) => {
      return(
        <div key={index} className="bg-blue-md w-fit pl-3 pr-3 h-8 rounded-3xl flex items-center">
          <h1 className="text-md text-dark-blue">{file.name}</h1>
        </div> 
      )})}
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
        {quiz.questions.map((question, index) => {
          return(
            <QuestionCard key={index} {...question}/>
          )
        })}
      </form>
    </div>
  </div>
</dialog>
    {/* <div>
    <div className="relative min-h-screen flex">
        <div className="grid m-6 flex-1">
            <div className="bg-off-white p-4 rounded-3xl shadow-md">
            <div className="font-biscuitReg">
                <div className='items-center flex inline-block'>
                    <h1 className="welcomeHeader flex font-semibold text-dark-gray text-5xl mt-2 ml-2 border-b border-light-gray">Test Quiz</h1>
                </div>
            </div>
        </div>
        </div>
        </div>
        </div> */}
    </>
  )
}