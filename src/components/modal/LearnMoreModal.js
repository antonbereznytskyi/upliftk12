import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { Tooltip } from '@nextui-org/react'
import Image from 'next/future/image';

const frontendUrl = process.env.NEXT_PUBLIC_AUTH_URL
export default function Modal({ learnMoreModalShow, onClose }) {
    const [current, setCurrent] = useState(1)
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

    function prev(){
        if(current == 1) setCurrent(10)
        else setCurrent(current - 1)
    }
    function next(){
        if(current == 10) setCurrent(1)
        else setCurrent(current + 1)
    }
    if (typeof document !== 'undefined') {
        return createPortal(
            <div
                className={`fixed flex items-center justify-center inset-0 z-50 ${
                    learnMoreModalShow ? '' : 'pointer-events-none'
                }`}>
                {/* backdrop */}
                <div
                    className={`fixed inset-0 bg-black ${
                        learnMoreModalShow
                            ? 'opacity-70'
                            : 'pointer-events-none opacity-0'
                    } transition-opacity duration-300 ease-in-out`}
                    onClick={onClose}
                />

                {/* content */}
                <div
                    className={`fixed md:flex rounded-lg w-1/2 aspect-16/9 2xl:w-1/2 bg-white shadow-lg max-w-full p-0 ${
                        learnMoreModalShow
                            ? 'opacity-100'
                            : 'pointer-events-none opacity-0'
                    } transition-opacity duration-300 ease-in-out`}>
                    <div className="w-full h-full rounded-lg px-4 pt-10 md:pt-5 xl:px-20 bg-gradient-to-b from-sky-100 to-white">
                        <div className="rounded-lg border-gray-300 border-2 w-full h-auto">
                            {/* <Image src={"/images/learn-more/image" + current + ".png"} width={500} height={200} layout="responsive" className='w-full h-auto'/>    */}
                            <img
                                className="w-full h-auto"
                                src={frontendUrl + "/images/learn-more/image" + current + ".png"}></img>                         
                        </div>
                        <div className="flex items-center my-3">
                            <div
                                className="mr-3 cursor-pointer"
                                onClick={prev}>
                                <svg
                                    className="w-5 lg:w-7"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M19 20L9 12L19 4V20Z"
                                        stroke="#1A3F54"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M5 19V5"
                                        stroke="#1A3F54"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div className="mr-3 cursor-pointer">
                                <svg
                                    className="w-3 lg:w-5"
                                    viewBox="0 0 16 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1 1L15 10L1 19V1Z"
                                        stroke="#1A3F54"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div
                                className="mr-3 cursor-pointer"
                                onClick={next}>
                                <svg
                                    className="w-5 lg:w-7"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5 4L15 12L5 20V4Z"
                                        stroke="#1A3F54"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M19 5V19"
                                        stroke="#1A3F54"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <p className="text-xl lg:text-3xl font-poppins text-sky-900">
                                {current} of 10
                            </p>
                        </div>
                    </div>

                    <button
                        className="text-white flex absolute bottom-0 right-0 rounded-tl-lg rounded-br-lg bg-sky-900 items-center p-1 sm:p-2 xl:p-3"
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
