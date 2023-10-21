'use client';

import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '@/state/reducers/authSlice';
import { courseActions } from '@/state/reducers/courseSlice';
import { folderActions } from '@/state/reducers/folderSlice';
import { useRouter } from "next/navigation";
import { FolderCard } from "./FolderCard"
import { useEffect } from 'react';

export const AddFolderForm = (props) => {
    const user = useSelector((state) => state.auth.user)
    const courses = useSelector((state) => state.course.courses)
    const token = useSelector((state) => state.auth.token)
    const folders = useSelector((state) => state.folder.folders)

    const router = useRouter();
    const dispatch = useDispatch()
    let course = props.course

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(
        "/api/folder",
        {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                userID: user._id,
                courseID: course._id,
                name: e.target.folderName.value,
                files: [],
                quizzes: [],
                summaries: [],
                flashcards: [],
                outlines: [],
            }),
        }
        )

        const newFolder = await res.json();

        dispatch(folderActions.newFolder(newFolder.data));

        document.getElementById('new_folder_modal').close();
    }

    const routeChange = () =>{ 
        router.push(`/courses/${params.courseID}`);
    }

  return (
  <div>
        <dialog id="new_folder_modal" className="modal font-biscuitReg rounded-3xl h-[10.35rem] w-[20.35rem] bg-off-white">
        <div className="modal-box">
            <form method="dialog">
            <button className="btn btn-sm w-[1.5rem] h-[1.5rem] btn-circle btn-ghost absolute top-3 right-3 bg-pastel-red rounded-full justify-center items-center flex inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="text-dark-red hover:text-hover-red hover:scale-105 w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            </form>
            <div className="form_card">

            <div className="form_container ml-5 mr-5">
                <div className="header ">
                <h4 className="headerText text-dark-gray text-xl font-biscuitMed mt-3">Add New Folder</h4>
                <hr className="text-light-gray mb-4"></hr>
                </div>
                <form className="newRoadmapForm" onSubmit={handleSubmit}>
                    <input required className="inputField w-full rounded-3xl bg-blue-md border-none text-dark-gray" id="folderName" name="folderName" type="text" placeholder="Folder Name"></input>
                <input required className="form-submit rounded-3xl pl-4 pr-4 pt-2 pb-2 bg-pastel-green text-dark-green right-5 mt-4 mb-4 flex absolute hover:cursor-pointer hover:scale-105 hover:text-hover-green" type="submit" value="Add"></input>
            </form>
            </div>

        </div>
        </div>
        </dialog>
    </div>
      
  )
}

export default AddFolderForm;
