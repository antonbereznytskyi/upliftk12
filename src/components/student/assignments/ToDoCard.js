import React from 'react';
import Image from 'next/future/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ToDoCard({handleInvite, title, earn, imageDescription, cardDescription, imageUrl, disable, invite}){
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


    

    return (
        <div>
            {/* <p className={'text-[#1D3F54] font-bold text-xl mb-7 ' + (title == '' && "opacity-0")}>{title != '' ? title : 'a'}</p> */}
            <div className='bg-white rounded-lg hover:drop-shadow-[0_5px_10px_rgba(0,0,0,0.35)] transition-all cursor-pointer'>
                <div className='relative h-[250px]'>
                    <img src={imageUrl} className="mx-auto rounded-t-lg w-auto h-[200px] opacity-70"></img>
                    <div className='absolute backdrop-blur-lg p-4 z-10 bottom-0 w-full h-16'>
                        <p className='font-poppins font-bold text-[#1D3F54] text-lg'>{imageDescription}</p>
                    </div>
                    <div className='rounded-full w-24 h-24 drop-shadow-[0_5px_10px_rgba(0,0,0,0.35)] absolute bg-white z-10 top-6 right-6 flex justify-center items-center'>
                        <div className='rounded-full w-20 h-20 bg-[#F6ECFB] flex justify-center items-center'>
                            <div>
                                <p className='text-[#1D3F54] font-poppins font-bold text-center'>Earn {earn}</p>
                                <Image src={"/images/student/jewel.png"} width={30} height={0} layout='response' className="mx-auto"></Image>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex p-6 justify-between items-center h-[100px]'>
                    <p className='text-[#1D3F54] mr-5 text-sm'>{cardDescription}</p>
                    {
                        !disable &&
                        <Link href={''}>
                            <button className={'text-white bg-[#D34949] hover:bg-[#d87171] transition-all px-4 py-2 rounded-md font-bold '}>Launch</button>
                        </Link>
                    }  
                    {
                        !disable &&
                            <button onClick={handleInvite} className={'text-white bg-[#2f8dcc]  transition-all px-4 py-2 rounded-md font-bold ml-3 ' + (invite == 1 ? 'hover:bg-[#659ec4]' : "opacity-60")} disabled={invite == 1 ? false : true}>Invite</button>
                    }                    
                </div>
            </div>
            
        </div>
    )
}