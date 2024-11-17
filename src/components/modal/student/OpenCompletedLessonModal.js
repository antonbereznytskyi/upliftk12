import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import Image from 'next/future/image';

export default function Modal({openLessonModalShow, close}) {
    

    
    function escHandler({ key }) {
        if (key === 'Escape') {
            close()
        }
    }
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', escHandler);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('keydown', escHandler);
            }
        };
    }, []); 

    if (typeof document !== 'undefined') {        
            return createPortal((
            <div className={`fixed flex items-center justify-center inset-0 z-50 ${openLessonModalShow ? '' : 'pointer-events-none'}`}>
                {/* backdrop */}
                <div 
                    className={`fixed inset-0 bg-black ${openLessonModalShow ? 'opacity-70' : 'pointer-events-none opacity-0'} transition-opacity duration-300 ease-in-out`} 
                    onClick={close} 
                />

                {/* content */}
                <div className={`fixed rounded-lg w-auto h-auto bg-white shadow-lg max-w-full p-0 ${openLessonModalShow ? 'opacity-100' : 'pointer-events-none opacity-0'} transition-opacity duration-300 ease-in-out`}>
                    <div className='relative'>
                        <Image src={'/images/student/Grey and BLur.png'} width={800} height={0} layout={'response'} className="rounded-t-lg absolute"/>
                        <Image src={'/images/student/open-lesson.png'} width={800} height={0} layout={'response'} className="rounded-t-lg"/>
                        <div className='flex justify-between items-center px-10 py-4 font-poppins font-bold text-[#1D3F54] text-xl absolute bottom-0 w-full'>
                            <div className='w-full h-full absolute  bg-[#EBF9FF] left-0 bottom-0'></div>
                            <p className="z-10">Fraction Identify Matching Bakery</p>
                            <div className='flex items-center z-10'>
                                <p className='mr-5'>5</p>
                                <Image src={'/images/student/Gem con.png'} width={30} height={0} layout="response"/>
                            </div>
                        </div>
                    </div>
                    
                    <div className='py-6 px-10 font-poppins text-[#1D3F54]'>
                        <div className='flex justify-between'>
                            <div className='w-3/5'>
                                <p className='text-xl font-bold'>Objective</p>
                                <p>Drag the images on the left to match the correct fraction on the right</p>
                            </div>
                            <div className='w-2/5'>
                                <p className='text-xl font-bold'>Grade</p>
                                <p>100% Great Job!</p>
                            </div>
                        </div>
                        <div className='flex justify-between mt-6 mb-3'>
                            <div className='w-3/5'>
                                <p className='text-xl font-bold'>Feedback</p>
                                <p>Posted Yesterday</p>
                            </div>
                            <div className='w-2/5'>
                                <button className='text-white rounded-md py-2 px-10 bg-[#2F8DCC] font-bold text-xl'>Start</button>
                            </div>
                        </div>
                        <div className='flex mb-10'>
                            <div>
                                <Image src={'/images/student/photo.png'} width={50} height={0} layout="response"/>
                            </div>
                            <div className='rounded-md p-5 bg-[#F6FCFF] w-2/5'>
                                <i>Hi Ben, I wanted to say great job on yesterdays session! </i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ), document.body)
    } else {
        return null
    }
}