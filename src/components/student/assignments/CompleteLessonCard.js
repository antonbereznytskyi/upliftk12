import React from 'react';
import Image from 'next/future/image';
import Link from 'next/link';
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
  } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState } from 'react';
import OpenCompletedLessonModal from '@/components/modal/student/OpenCompletedLessonModal'

export default function ToDoCard({title, percent, imageDescription, cardDescription, imageUrl, gems, pathColor, trailColor, progressBgColor}){
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    
    const [openLessonModalShow, setOpenLessonModalShow] = useState(false)
    
    function openCompletedLesson(){
        setOpenLessonModalShow(true)
    }
    return (
        <div>
            <p className={'text-[#1D3F54] font-bold text-xl mb-7 ' + (title == '' && "opacity-0")}>{title != '' ? title : 'a'}</p>
            <div className='bg-white rounded-lg hover:drop-shadow-[0_5px_10px_rgba(0,0,0,0.35)] transition-all cursor-pointer' onClick={openCompletedLesson}>
                <div className='relative h-[250px]'>
                    <img src={backendUrl + "/media/lessons/images/" + imageUrl} className="mx-auto rounded-t-lg w-auto h-[200px] opacity-70"></img>
                    <div className='absolute backdrop-blur-lg p-4 z-10 bottom-0 w-full h-16'>
                        <div className='flex justify-between items-center'>
                            <p className='font-poppins font-bold text-[#1D3F54] text-lg'>{imageDescription}</p>
                            <div className='flex justify-between items-center'>
                                <p className='mr-3 font-poppins font-bold text-[#1D3F54] text-lg'>{gems}</p>
                                <Image src='/images/student/jewel.png' width={30} height={0} layout="responsive" className="block mx-auto p-1"/>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-full w-24 h-24 drop-shadow-[0_5px_10px_rgba(0,0,0,0.35)] absolute bg-white z-20 top-6 right-6 flex justify-center items-center p-1'>
                        <CircularProgressbarWithChildren
                            value={percent}
                            background
                            styles={buildStyles({
                                pathColor: pathColor,
                                trailColor: trailColor,
                                backgroundColor: progressBgColor
                            })}
                        >
                            <div className='text-center font-poppins font-bold text-sm text-[#1D3F54]'>
                                <p>{percent}%</p>
                                <p>Grade</p>
                            </div>
                        </CircularProgressbarWithChildren>
                    </div>
                </div>
                <div className='flex p-6 justify-between items-center h-[100px]'>
                    <p className='text-[#1D3F54] mr-5'>{cardDescription}</p>
                    <Link href={''}>
                        <button className='text-white bg-[#2F8DCC] px-4 py-2 rounded-md font-bold'>Open</button>
                    </Link>
                </div>
            </div>
            <OpenCompletedLessonModal openLessonModalShow={openLessonModalShow} close = {() => {setOpenLessonModalShow(false)}}/>
        </div>
    )
}