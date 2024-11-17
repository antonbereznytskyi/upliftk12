import { useEffect, useState } from "react"
import { createPortal } from 'react-dom'

let backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Modal({ previewModalShow, previewVideoUrl, onClose }) {

    function escHandler({ key }) {
        if (key === 'Escape') {
            onClose()
        }
    }
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', escHandler)
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('keydown', escHandler)
            }
        }
    }, [])

    if (typeof document !== 'undefined') {
        return createPortal(
            <div
                className={`fixed flex items-center justify-center inset-0 z-50 ${
                    previewModalShow ? '' : 'pointer-events-none'
                }`}>
                {/* backdrop */}
                <div
                    className={`fixed inset-0 bg-black ${
                        previewModalShow
                            ? 'opacity-70'
                            : 'pointer-events-none opacity-0'
                    } transition-opacity duration-300 ease-in-out`}
                    onClick={onClose}
                />
                {/* content */}
                <div
                    className={`fixed md:flex rounded-lg w-[700px] h-[500px] bg-white shadow-lg max-w-full p-0 ${
                        previewModalShow
                            ? 'opacity-100'
                            : 'pointer-events-none opacity-0'
                    } transition-opacity duration-300 ease-in-out`}>
                    <div className=" text-center w-full flex items-center justify-center relative">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" onClick={onClose} stroke="currentColor" class="w-6 h-6 absolute right-5 top-5 cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>

                        {
                            previewVideoUrl == null ?
                                <p className="text-5xl font-poppins text-primary font-bold">No Video</p>
                                :
                                <video src={backendUrl + '/media/lessons/videos/' + previewVideoUrl} controls onEnded={onClose}/>
                        }
                    </div>
                </div>
                
            </div>,
            document.body,
        )
    } else {
        return null
    }
}
