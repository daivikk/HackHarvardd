"use client"
import { useEffect, useState } from "react"
import { courseActions } from "@/state/reducers/courseSlice";
import { folderActions } from "@/state/reducers/folderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export const FileCard = (props) => {
    const user = useSelector((state) => state.auth.user)
    const token = useSelector((state) => state.auth.token)
    const folder = useSelector((state) => state.folder.activeFolder)
    const file = props.file;
    
    const dispatch = useDispatch()
    const router = useRouter();
    var selectedFiles = []

    const handleDelete = (e) => {

    }
    
    return (
        <>
                
         </>
    )
}





















































