"use client"
import { useEffect, useState } from "react"
import { courseActions } from "@/state/reducers/courseSlice";
import { folderActions } from "@/state/reducers/folderSlice";
import { tabActions } from "@/state/reducers/tabSlice";
import { homeActions } from "@/state/reducers/homeSlice";
import { authActions } from "@/state/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FileCard } from "./FileCard";
import { QuizCard } from "./QuizCard";
import { SummaryCard } from "./SummaryCard"
import { FlashcardCard } from "./FlashcardCard";
import 'filepond/dist/filepond.min.css';


export const TabSystem = (props) => {
    const user = useSelector((state) => state.auth.user)
    const token = useSelector((state) => state.auth.token)
    const course = useSelector((state) => state.course.activeCourse)
    const folder = useSelector((state) => state.folder.activeFolder)
    // const uploads = useSelector((state) => state.tab.uploads)
    const type = useSelector((state) => state.folder.type)
    const folders = useSelector((state) => state.folder.folders)
    const folderIndex = folders.findIndex((folderrr) => folderrr.folderID == folder.folderID);


    const router = useRouter()


    useEffect(()=>{
        if(activeFiles){
            activeFiles = []
        }
        let fileDom = document.getElementsByClassName('file')
        for(let i = 0; i < fileDom.length; i++){
            if(fileDom[i].classList.contains('bg-folder-blue')){
                fileDom[i].classList.remove('bg-folder-blue')
                fileDom[i].classList.add('bg-storm')
            }
        }
        
    }, [folder])

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const file = e.target.file.files[0]
        if (!file) return
        try {
          const data = new FormData()
          data.set('file', file)
          data.set('userAffiliation', user._id)
          data.set('courseID', course._id)
          data.set('folderID', folder.folderID)
    
          const res = await fetch('/api/input', {
            method: 'POST',
            body: data
          })
          // handle the error
        //   if (!res.ok) throw new Error(await res.text())
          const newFile = await res.json()

          console.log(newFile.data)
        //   console.log(newFile.data._id)

        //   dispatch(tabActions.setTabs([...uploads, {name: file.name, fileID: newFile.data._id}]))
        //   dispatch(tabActions.addUpload({name: file.name, fileID: newFile.data._id}))
        // console.log(folders)
        // console.log(folder)
        dispatch(folderActions.newFile({folderID:newFile.data.folderAffiliation, fileObject:{name: file.name, fileID: newFile.data._id}}))
        console.log("Updated Folders Frontend: " + folders)
          
        } catch (error) {
          // Handle errors here
          console.error(error)
        }
    }

    let activeFiles = []

    const selected = (file, index) => {

        let fileDom = document.getElementsByClassName('file')[index]
        console.log(fileDom.classList)
        console.log(index)
        if(fileDom.classList.contains("bg-storm")){
            fileDom.classList.remove("bg-storm");
            fileDom.classList.add("bg-folder-blue");
            activeFiles.push(file);
        }
        else {
            fileDom.classList.remove("bg-folder-blue");
            fileDom.classList.add("bg-storm");
            activeFiles.splice(index, 1)
        }
        console.log(activeFiles)
        // dispatch(folderActions.setFilesActive(activeFiles))
        
    }

    // console.log(folder)

    // console.log(uploads)

    function Sublevel({type}) {
        if (type == "uploads") {
            return (
                <>
                {folders[folderIndex].files.map((file, index) => {
                    return(
                        <div key={index} onClick={() => {selected(file, index)}} className="file hover:cursor-pointer bg-storm rounded-3xl items-center font-biscuitReg relative mb-2 mt-2 p-2">
                            <h1 className="flex text-xl text-dark-gray font-biscuitReg ml-4">{file.name}</h1>
                        </div>
                    )
                    })}
                    <form onSubmit={handleSubmit}>
                        <div className="space-x-4 mt-4">
                        <input className="rounded-3xl bg-storm p-4"
                        type="file"
                        name="file"
                        />
                        <input className="rounded-3xl bg-blue-md text-dark-blue p-3 hover:cursor-pointer hover:scale-105 hover:text-hover-blue" type="submit" value="Upload" />
                        </div>
                    </form>
                </>
            )
        }

        if (type == "summaries") {
            return (
                folders[folderIndex].summaries.map((summary, index) => {
                    return(
                        <SummaryCard key={index} {...summary}/>
                    )
                    })
            )
        }

        if (type == "quizzes") {
            return (
                folders[folderIndex].quizzes.map((quiz, index) => {
                    return(
                        <QuizCard key={index} {...quiz} />
                    )
                    })
            )
        }

        if (type == "outlines") {
            return (
                folders[folderIndex].outlines.map((outline, index) => {
                    return(
                        <OutlineCard key={index} {...outline} />
                    )
                    })
            )
        }

        if (type == "flashcards") {
            return (
                folders[folderIndex].flashcards.map((flashcard, index) => {
                    return(
                        <FlashcardCard key={index} {...flashcard} />
                    )
                    })
            )
        }
    }

    const handleClick = async (btn) => {
        if(btn == "Summary"){
            dispatch(homeActions.setLoading(true))
            
            const res = await fetch('/api/output', {
                method: 'POST',
                body: JSON.stringify({folderID: folder.folderID, files: activeFiles, type: "Summary", subject: course.type}),
                headers: {'Content-Type': "application/json"}
            })
            const newSummary = await res.json();

            dispatch(folderActions.newSummary({folderID:newSummary.data.folderAffiliation, summaryObject:{title: newSummary.data.title, summaryID: newSummary.data._id, content: newSummary.data.content, filesUsed: newSummary.data.filesUsed}}))
            dispatch(homeActions.setLoading(false))
        }
        else if(btn == "Quiz"){
            dispatch(homeActions.setLoading(true))

            const res = await fetch('/api/output', {
                method: 'POST',
                body: JSON.stringify({folderID: folder.folderID, files: activeFiles, type: "Quiz", subject: course.type}),
                headers: {'Content-Type': "application/json"}
            })
            const newQuiz = await res.json();

            dispatch(folderActions.newQuiz({folderID:newQuiz.data.folderAffiliation, quizObject:{name: newQuiz.data.name, quizID: newQuiz.data._id, questions: newQuiz.data.questions, filesUsed: newQuiz.data.filesUsed}}))
            dispatch(homeActions.setLoading(false))
        }
        else if(btn == "Flashcards"){
            dispatch(homeActions.setLoading(true))

            const res = await fetch('/api/output', {
                method: 'POST',
                body: JSON.stringify({folderID: folder.folderID, files: activeFiles, type: "Flashcard", subject: course.type}),
                headers: {'Content-Type': "application/json"}
            })
            const newFlashcard = await res.json();

            dispatch(folderActions.newFlashcard({folderID:newFlashcard.data.folderAffiliation, flashcardObject:{title: newFlashcard.data.title, flashcardID: newFlashcard.data._id, flashcards: newFlashcard.data.flashcards, filesUsed: newFlashcard.data.filesUsed}}))
            dispatch(homeActions.setLoading(false))
        }
        else if(btn == "Outline"){
            dispatch(homeActions.setLoading(true))

            const res = await fetch('/api/output', {
                method: 'POST',
                body: JSON.stringify({folderID: folder.folderID, files: activeFiles, type: "Outline", subject: course.type}),
                headers: {'Content-Type': "application/json"}
            })
            const newOutline = await res.json();

            dispatch(folderActions.newOutline({folderID:newOutline.data.folderAffiliation, outlineObject:{title: newOutline.data.title, outlineID: newOutline.data._id, content: newOutline.data.content, filesUsed: newOutline.data.filesUsed}}))
            dispatch(homeActions.setLoading(false))
        }

    }

    const handleFileDelete = async (e) => {
        const res = await fetch('/api/input',{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                files: activeFiles,
                folderID: folder.folderID
            })
        })
        console.log(await res.json())
        dispatch(folderActions.deleteFiles({files: activeFiles, folderID: folder.folderID}))
        activeFiles = []
    }
    
    return (
        <>
        <button onClick={handleFileDelete} className="btn btn-sm rounded-3xl btn-circle btn-ghost bg-pastel-red rounded-full justify-center items-center flex inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-dark-red hover:cursor-pointer hover:text-hover-red hover:scale-105">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
        </button>

        <div className='ml-2 mr-2 mb-4 -mt-6 flex space-x-4 p-2'>
            <button onClick={()=>{handleClick("Summary")}} className='font-biscuitReg h-24 w-24 bg-purple-md p-7 mt-7 rounded-3xl justify-center flex inline-block hover:cursor-pointer hover:scale-105'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="text-hover-purple w-10 h-10 absolute -mt-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                <p className='text-sm text-hover-purple absolute mt-8'>Summary</p>
            </button>
            <button onClick={()=>{handleClick("Quiz")}} className='font-biscuitReg h-24 w-24 bg-blue-md p-7 mt-7 rounded-3xl justify-center flex inline-block hover:cursor-pointer hover:scale-105'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="text-dark-blue w-9 h-9 absolute -mt-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
                </svg>
                <p className='text-sm text-dark-blue absolute mt-8'>Quiz</p>
            </button>
            <button onClick={()=>{handleClick("Flashcards")}} className='font-biscuitReg h-24 w-24 bg-purple-md p-7 mt-7 rounded-3xl justify-center flex inline-block hover:cursor-pointer hover:scale-105'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="text-hover-purple w-10 h-10 absolute -mt-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                <p className='text-sm text-hover-purple absolute mt-8'>Flashcards</p>
            </button>
            <button onClick={()=>{handleClick("Outline")}} className='font-biscuitReg h-24 w-24 bg-blue-md p-7 mt-7 rounded-3xl justify-center flex inline-block hover:cursor-pointer hover:scale-105'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="text-dark-blue w-9 h-9 absolute -mt-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
                </svg>
                <p className='text-sm text-dark-blue absolute mt-8'>Outline</p>
            </button>
        </div>

        <dialog id="my_modal_4" className="modal w-full h-full bg-off-white rounded-3xl">
            <div className="modal-box">
                <div className='flex items-center space-x-5 font-biscuitReg mt-4'>
                    <h1 className="flex font-semibold text-dark-gray text-3xl ml-6 border-b border-light-gray">{folder.name}</h1>
                    <div className="bg-blue-md w-fit pl-3 pr-3 h-8 rounded-3xl flex items-center ">
                        <h1 className="text-md text-dark-blue">{course.name}</h1>
                    </div> 
                </div>
                <div className='ml-4 mr-4 mb-4 -mt-3'>
                    <div className='font-biscuitReg h-fit w-full bg-storm p-7 mt-7 rounded-3xl'>
                        <p className='summaryText text-lg text-justify text-dark-gray'>hi</p>
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
       
        <Sublevel type={type} />
        {/* <FilePond server={{process: '/api/input', fetch: null, revert: null}}/> */}
        {/* <div onClick={selected} id={folder.folderID} className="folder bg-storm w-2/12 flex h-16 rounded-3xl items-center inline-block font-biscuitReg relative mb-2 mt-2">
                <div className="colorCircle ml-4 w-10 h-10 sm:w-10 sm:h-10 bg-blue-md rounded-full flex justify-center items-center ml-2"></div>
                <h1 className="flex text-xl text-dark-gray font-biscuitReg ml-4">{folder.name}</h1>
         </div>
         <button onClick={handleDelete}>x</button> */}
         </>
    )
}

export default TabSystem;






















































