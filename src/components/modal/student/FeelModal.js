import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import Image from 'next/future/image';
import FeelImageComponent from './FeelImageComponent'

export default function Modal({feelModalShow, close, setFeel, feel}) {
    

    
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
            <div className={`fixed flex items-center justify-center inset-0 z-50 ${feelModalShow ? '' : 'pointer-events-none'}`}>
                {/* backdrop */}
                <div 
                    className={`fixed inset-0 bg-black ${feelModalShow ? 'opacity-70' : 'pointer-events-none opacity-0'} transition-opacity duration-300 ease-in-out`} 
                    onClick={close} 
                />

                {/* content */}
                <div className={`fixed rounded-lg w-2/3 h-auto bg-white shadow-lg max-w-full p-0 ${feelModalShow ? 'opacity-100' : 'pointer-events-none opacity-0'} transition-opacity duration-300 ease-in-out`}>
                    <div className='py-20 px-16'>
                        <div className='absolute top-10 right-10 rounded-full border border-primary p-2 cursor-pointer' onClick = {close}>
                            <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.64 26L12.825 19.025L8.775 26H0.45L8.73 13.175L0.225 0.889999H8.865L13.68 7.82L17.73 0.889999H26.055L17.64 13.535L26.28 26H17.64Z" fill="#1B3F54"/>
                            </svg>
                        </div>
                        <p className='text-center font-bold font-poppins text-5xl'>How are you feeling today?</p>
                        <div className='flex font-poppins justify-around mt-10'>
                            <FeelImageComponent src={'/images/student/face/face-mad.png'} feelStr = 'Mad' onClick={() => {setFeel('mad');close()}} selected={feel == 'mad'}/>
                            <FeelImageComponent src={'/images/student/face/face-frustrated.png'} feelStr = 'Frustrated' onClick={() => {setFeel('frustrated');close()}} selected={feel == 'frustrated'}/>
                            <FeelImageComponent src={'/images/student/face/face-confused.png'} feelStr = 'Confused' onClick={() => {setFeel('confused');close()}} selected={feel == 'confused'}/>
                            <FeelImageComponent src={'/images/student/face/face-slick.png'} feelStr = 'Slick' onClick={() => {setFeel('slick');close()}} selected={feel == 'slick'}/>
                            <FeelImageComponent src={'/images/student/face/face-shy.png'} feelStr = 'Shy' onClick={() => {setFeel('shy');close()}} selected={feel == 'shy'}/>
                            <FeelImageComponent src={'/images/student/face/face-okay.png'} feelStr = 'Okay' onClick={() => {setFeel('okay');close()}} selected={feel == 'okay'}/>
                            <FeelImageComponent src={'/images/student/face/face-cheerful.png'} feelStr = 'Cheerful' onClick={() => {setFeel('cheerful');close()}} selected={feel == 'cheerful'}/>
                            <FeelImageComponent src={'/images/student/face/face-silly.png'} feelStr = 'Silly' onClick={() => {setFeel('silly');close()}} selected={feel == 'silly'}/>
                            <FeelImageComponent src={'/images/student/face/face-happy.png'} feelStr = 'Happy' onClick={() => {setFeel('happy');close()}} selected={feel == 'happy'}/>
                            <FeelImageComponent src={'/images/student/face/face-excited.png'} feelStr = 'Excited' onClick={() => {setFeel('excited');close()}} selected={feel == 'excited'}/>
                        </div>
                    </div>                    
                </div>
            </div>
            ), document.body)
    } else {
        return null
    }
}