import React from 'react';
import AppLayout from '@/components/student/Layouts/AppLayout';
import Image from 'next/future/image';
import { useState } from 'react';
import { useEffect } from 'react';
import FeelModal from '@/components/modal/student/FeelModal'
import Link from 'next/link';
import Head from 'next/head';
import { useAuth } from '@/hooks/auth'

export default function dashboard(){
    const { user } = useAuth({ middleware: 'auth' })
    let date = new Date();
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const month = ['January', 'February', 'March', 'April', 'May',  'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const [feelModalShow, setFeelModalShow] =useState(false)
    const [loading, setLoading] = useState(false)
    const [feel, setFeel] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])
    function handleFeel(){
        setFeelModalShow(true);
    }
    return (
        <AppLayout>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className='absolute top-[380px]'>
                <Image src={'/images/student/Yasmin the Yeti.png'} width={350} height={0} layout="responsive"/>
            </div>
            <div className='absolute top-32 left-32'>
                <Image src={'/images/student/Speech Bubble.png'} width={500} height={0} layout="responsive" className='fixed z-0 h-64'/>
                <div className='z-10 relative p-8 text-primary font-poppins'>
                    <p className='text-4xl font-bold'>Hello, {user?.fname + " " + user?.lname}!</p>
                    <p className='py-5'>Today is {dayOfWeek[date.getDay()]}, {month[date.getMonth()]} {date.getDate()}th!</p>
                    <p className='text-lg font-bold'>What would you like to do today?</p>
                </div>
            </div>
            <div className='ml-96 mr-80 mt-[250px] grid grid-cols-2 gap-x-32 gap-y-10 px-20 font-poppins'>
                <div className='rounded-lg border border-[#5DADEC] border-opacity-60 py-7 bg-white relative'>
                    <Image src={'/images/student/assignment.png'} width={100} height={0} layout='responsive' className='block mx-auto'/>
                    <button className='text-xl block mx-auto text-white bg-[#2F8DCC] rounded-md px-5 py-1 mt-5'>Join Lesson</button>
                    <div className='absolute rounded-full w-10 h-10 bg-[#D34949] top-4 right-4 flex items-center justify-center'>
                        <p className='text-white text-2xl text-center font-bold'>2</p>
                    </div>
                </div>
                <div className='rounded-lg cursor-pointer border text-primary border-[#5DADEC] border-opacity-60 py-7 bg-white relative text-center' onClick={handleFeel}>
                    <p className='font-bold'>How are you feeling today?</p>                    
                    <Image src={'/images/student/face/face-' + (feel == '' ? 'default': feel) + '.png'} width={100} height={0} layout='responsive' className='block mx-auto'/>
                    <p className='font-bold'>Today I am feeling {feel == '' ? 'happy' : feel}.</p>
                </div>
                <div className='rounded-lg border border-[#5DADEC] border-opacity-60 py-7 bg-white relative'>
                    <Image src={'/images/student/assignment.png'} width={100} height={0} layout='responsive' className='block mx-auto'/>
                    <Link href={'/student/assignments'}>
                        <button className='text-xl block mx-auto text-white bg-[#2F8DCC] rounded-md px-5 py-1 mt-5'>My Assignments</button>
                    </Link>
                    <div className='absolute rounded-full w-10 h-10 bg-[#D34949] top-4 right-4 flex items-center justify-center'>
                        <p className='text-white text-2xl text-center font-bold'>2</p>
                    </div>
                </div>
                <div className='rounded-lg border border-[#5DADEC] border-opacity-60 py-7 bg-white relative'>
                    <Image src={'/images/student/awards.png'} width={200} height={0} layout='responsive' className='block mx-auto'/>
                    <Link href={'/student/awards'}>
                        <button className='text-xl block mx-auto text-white bg-[#2F8DCC] rounded-md px-5 py-1 mt-5'>FeedBack & Rewards</button>
                    </Link>
                    <div className='absolute rounded-full w-10 h-10 bg-[#D34949] top-4 right-4 flex items-center justify-center'>
                        <p className='text-white text-2xl text-center font-bold'>1</p>
                    </div>
                </div>
                <FeelModal feelModalShow={feelModalShow} close={() => {setFeelModalShow(false)}} setFeel = {(e) => setFeel(e)} feel = {feel}/>
            </div>
            
            <div className={!loading ? 'backdrop-blur-sm bg-white/30 w-full h-full fixed z-40 left-0 top-0' : ''}>
            </div>
            {loading ?  '' : 
                <div className="text-center fixed transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 z-50">
                    <div role="status">
                        <svg className="inline mr-2 w-36 h-36 text-gray-200 animate-spin dark:text-gray-600 fill-green-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className='absolute left-[0.6rem] top-[0.6rem]'>
                        <Image src="/logos/small-logo.png" width={124} height={0} layout='response' className="mx-auto"></Image>
                    </div>
                </div>
            }
        </AppLayout>
    )
}