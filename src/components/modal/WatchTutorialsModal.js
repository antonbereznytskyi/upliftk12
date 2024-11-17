import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import TutorialCarousel from '../Carousel/TutorialCarousel'

export default function Modal({ watchTutorialsShow, onClose }) {
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
                    watchTutorialsShow ? '' : 'pointer-events-none'
                }`}>
                {/* backdrop */}
                <div
                    className={`fixed inset-0 bg-black ${
                        watchTutorialsShow
                            ? 'opacity-70'
                            : 'pointer-events-none opacity-0'
                    } transition-opacity duration-300 ease-in-out`}
                    onClick={onClose}
                />

                {/* content */}
                <div
                    className={`fixed md:flex rounded-lg w-11/12 h-[350px] sm:h-[500px] md:h-[550px] lg:h-[670px] xl:h-[750px] 2xl:w-4/5 2xl:h-[820px] bg-white shadow-lg max-w-full p-0 ${
                        watchTutorialsShow
                            ? 'opacity-100'
                            : 'pointer-events-none opacity-0'
                    } transition-opacity duration-300 ease-in-out`}>
                    <div className="w-full h-full rounded-lg pt-2 bg-gradient-to-b from-sky-100 to-white font-poppins text-center">
                        <p className="text-2xl sm:text-3xl text-sky-900 font-bold my-2 sm:my-5 md:text-5xl lg:mb-10 lg:mt-20 xl:mt-36">
                            Watch Our Tutorials
                        </p>
                        <div className="block mx-auto lg:mx-10">
                            <TutorialCarousel />
                        </div>
                    </div>

                    <button
                        className="text-white flex absolute bottom-0 right-0 rounded-tl-lg rounded-br-lg bg-sky-900 items-center p-1 sm:p-2 xl:p-4"
                        onClick={onClose}>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9 9L15 15"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M15 9L9 15"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Close Screen
                    </button>
                </div>
            </div>,
            document.body,
        )
    } else {
        return null
    }
}
