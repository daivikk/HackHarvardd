"use client";

import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '@/state/reducers/authSlice';
import { courseActions } from '@/state/reducers/courseSlice';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import React from 'react';
import { Flashcard } from 'src/app/courses/[courseID]/components/Flashcard.jsx'
import FadeIn from 'src/app/dashboard/components/css/FadeIn.css';
import { flashcardActions } from '@/state/reducers/flashcardSlice';


export function FlashcardCard(flashcard) {
    const data = flashcard.flashcards
    const dispatch = useDispatch()
    const isFlipped = useSelector((state) => state.flashcard.isFlipped)
    const [index, setIndex] = useState(0);

    const handleClick = (e) => {
      e.preventDefault();
        if(isFlipped) {
            dispatch(flashcardActions.setFlipped(false));
        }
        else {
            dispatch(flashcardActions.setFlipped(true));
        }
    }

    const openListView = () => {
        document.getElementById(`flashcardListView`).showModal()
        document.getElementById(`flashcardModal${flashcard.flashcardID}`).close()
    }

    const openCardView = () => {
        document.getElementById(`flashcardModal${flashcard.flashcardID}`).showModal()
        document.getElementById(`flashcardListView`).close()
    }

    console.log(data.length)

    const prevClick = () => {
        dispatch(flashcardActions.setFlipped(false));

        if (index > 0) {
            setIndex(index-1)
        }
        else if (index == 0) {
            setIndex(data.length - 1)
        }
    }

    const nextClick = () => {
        dispatch(flashcardActions.setFlipped(false));

        if (index < data.length -1) {
            setIndex(index+1)
        }
        else if (index == data.length -1){
            setIndex(0)
        }
    }

      return (
<>
<div onClick={()=>document.getElementById(`flashcardModal${flashcard.flashcardID}`).showModal()} className="hover:cursor-pointer bg-storm rounded-3xl items-center font-biscuitReg relative mb-2 mt-2 p-2">
<div className="inline-block flex">
    <div className="colorCircle ml-2 w-8 h-8 sm:w-8 sm:h-8 bg-light-pink rounded-full flex justify-center items-center ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="text-dark-pink w-[1.25rem] h-[1.25rem]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" />
        </svg>
    </div>
    <h1 className="flex items-center text-md text-dark-gray font-biscuitReg ml-4">{flashcard.title}</h1>                    
    </div>  
</div>
    <dialog id={`flashcardModal${flashcard.flashcardID}`} className="modal w-10/12 h-full bg-off-white rounded-3xl">
    <div className="modal-box ">
    <div className='flex items-center space-x-5 font-biscuitReg mt-4'>
            <h1 className="flex font-semibold text-dark-gray text-3xl ml-6 border-b border-light-gray">{flashcard.title}</h1>
    {flashcard.filesUsed.map((file, index) => {
      return(
        <div key={index} className="bg-blue-md w-fit pl-3 pr-3 h-8 rounded-3xl flex items-center ">
          <h1 className="text-md text-dark-blue">{file.name}</h1>
        </div> 
      )})}
    </div>
    <div className='flex items-center justify-center font-biscuitReg text-light-gray mt-5 text-md'>View</div>
        <div className="inline-block flex space-x-2 items-center justify-center">
                        <div onClick={openCardView} className="cardView w-10 h-10 sm:w-10 sm:h-10 bg-blue-md rounded-full justify-center items-center flex inline-block hover:cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6 text-dark-blue hover:text-hover-blue hover:scale-105">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" />
                        </svg>

                        </div>
                        <div onClick={openListView} className="listView w-10 h-10 sm:w-10 sm:h-10 bg-blue-md rounded-full justify-center items-center flex inline-block hover:cursor-pointer">
                        <svg className="h-[1.6rem] w-[1.6rem] text-dark-blue hover:text-hover-blue hover:scale-105"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.9" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                        </svg>

                        </div>
            </div>
    {/* {data.map((pair, index) => {
        let front = String(pair.front)
        let back = String(pair.back)
        front = front.split(":")[1]
        back = back.split(":")[1]
        return(
            <div className='mt-8' key={index}>
                <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                    <div onClick={handleClick}>
                        <Flashcard key={index} data={front}/>
                    </div>
                    <div onClick={handleClick}>
                        <Flashcard key={index} data={back}/>
                    </div>
                </ReactCardFlip>
            </div>
        )
    })} */}
    <div className='mt-8'>
                <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                    <div onClick={handleClick}>
                        <Flashcard data={String(data[index].front).split(':')[1]}/>
                    </div>
                    <div onClick={handleClick}>
                        <Flashcard data={String(data[index].back).split(':')[1]}/>
                    </div>
                </ReactCardFlip>
            </div>
    
    {/* ARROW BUTTONS */}
    <div className='flex flex-row justify-between ml-20 mr-20 -mt-64'>
        <div className='justify-start z-10'>
            <button onClick={prevClick} className="btn btn-sm w-[4rem] h-[4rem] btn-circle btn-ghost bg-blue-md rounded-full justify-center items-center flex inline-block hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-dark-blue hover:scale-110 hover:cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
            </button>
        </div>
        <div className='justify-end z-10'>
            <button onClick={nextClick} className="btn btn-sm w-[4rem] h-[4rem] btn-circle btn-ghost bg-blue-md rounded-full justify-center items-center flex inline-block hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-dark-blue hover:scale-110 hover:cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
            </button>
        </div>
    </div>
        <div className="modal-action">
        <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button className="btn btn-sm w-[1.7rem] h-[1.7rem] btn-circle btn-ghost absolute top-3 right-3 bg-pastel-red rounded-full justify-center items-center flex inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="text-dark-red hover:text-hover-red hover:scale-105 w-[1.35rem] h-[1.35rem]">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </form>
        </div>
    </div>
    </dialog>

    { /* FLASHCARD GRID VIEW */ }

    <button className="btn" onClick={()=>document.getElementById('flashcardListView').showModal()}></button>
    <dialog id="flashcardListView" className="modal w-10/12 h-full bg-off-white rounded-3xl">
    <div className="modal-box">
    <div className='flex items-center space-x-5 font-biscuitReg mt-4'>
            <h1 className="flex font-semibold text-dark-gray text-3xl ml-6 border-b border-light-gray">{flashcard.title}</h1>
        <div className="bg-blue-md w-fit pl-3 pr-3 h-8 rounded-3xl flex items-center ">
        {flashcard.filesUsed.map((file, index) => {
            return(
                <div key={index} className="bg-blue-md w-fit pl-3 pr-3 h-8 rounded-3xl flex items-center ">
                <h1 className="text-md text-dark-blue">{file.name}</h1>
                </div> 
            )})}
        </div> 
    </div>
        <>
        <div className='flex items-center justify-center font-biscuitReg text-light-gray text-md'>View</div>
        <div className="inline-block flex space-x-2 items-center justify-center">
                        <div onClick={openCardView} className="flashcardsBtn w-10 h-10 sm:w-10 sm:h-10 bg-blue-md rounded-full justify-center items-center flex inline-block hover:cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6 text-dark-blue hover:text-hover-blue hover:scale-105">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" />
                        </svg>

                        </div>
                        <div onClick={openListView} className="listViewBtn w-10 h-10 sm:w-10 sm:h-10 bg-blue-md rounded-full justify-center items-center flex inline-block hover:cursor-pointer">
                        <svg className="h-[1.6rem] w-[1.6rem] text-dark-blue hover:text-hover-blue hover:scale-105"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.9" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                        </svg>

                        </div>
            </div>
            <div className='mt-4 mb-6'>
            <div className='ml-16 mr-16 justify-center items-center flex'>
                <div className='font-biscuitReg bg-storm rounded-3xl w-full p-4 space-y-2'>
                {data.map((pair, index) => {
                     let front = String(pair.front)
                     let back = String(pair.back)
                     front = front.split(":")[1]
                     back = back.split(":")[1]
                        return(
                            <div key={index} className='items-center rounded-3xl bg-off-white w-full text-dark-gray'>
                            <div className='whitespace-normal'>
                                <div className='inline-block w-6/12 p-2 border-r-[.0625rem] border-light-gray'>
                                        <p className='flex w-full ml-1 mr-1'>{front}</p>
                                </div>
                                <div className='inline-block p-2 w-6/12 whitespace-normal border-l-[.0625rem] border-light-gray'>
                                    <p className='flex w-full whitespace-normal break-words break-all'>{back}</p>
                                </div>
                            </div>
                        </div>
                            )
                        })}
                </div>
            </div>
            </div>
        </>
        <div className="modal-action">
        <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button className="btn btn-sm w-[1.7rem] h-[1.7rem] btn-circle btn-ghost absolute top-3 right-3 bg-pastel-red rounded-full justify-center items-center flex inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="text-dark-red hover:text-hover-red hover:scale-105 w-[1.35rem] h-[1.35rem]">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </form>
        </div>
    </div>
    </dialog>
    </>
      )
  }
