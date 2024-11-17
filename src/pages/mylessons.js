import AppLayout from '../components/Layouts/AppLayout'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from '@/lib/axios'
import AssignLessonModal from '@/components/modal/AssignLessonModal'
import Alert from '@/components/smallComponents/Alert'
import PreviewLessonModal from '@/components/modal/PreviewLessonModal'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
const myLessons = () => {
    const [mylesson, setMylesson] = useState([])
    const [assignModalShow, setAssignModalShow] = useState(false)
    const [assignLessonId, setAssignLessonId] = useState(0)
    const [loading, setLoading] = useState(false)
    const [resourceTypes, setResourceTypes] = useState([])
    const [countByRT, setCountByRT] = useState({})
    const [errors, setTerms] = useState(false)
    const [alertShow, setAlertShow] = useState(false)

    const [previewModalShow, setPreviewModalShow] = useState(false)
    const [previewVideoUrl, setPreviewVideoUrl] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true)
        }, 2000)
        axios.get('/api/getMylessons').then(res => {
            setMylesson(res.data.my_lessons)
            setResourceTypes(res.data.resourceTypes)
            setCountByRT(res.data.countByRT)
            if (res.data.membership_type == '1') setAlertShow(true)
        })
        return () => clearTimeout(timer)
    }, [])
    function assignLesson(lesson_id) {
        setAssignLessonId(lesson_id)
        setAssignModalShow(true)
    }
    function previewLesson(url) {
        setPreviewVideoUrl(url)
        setPreviewModalShow(true)
    }
    return (
        <div>
            <AppLayout title="My Lessons">
                <Head>
                    <title>My lessons</title>
                </Head>
                <div className="py-5 px-11 h-full w-full relative">
                    <div
                        className={
                            'flex items-center ' +
                            (alertShow ? 'justify-between' : 'justify-end')
                        }>
                        {alertShow && (
                            <Alert
                                message="Your account is free membership, so you can only launch up to 5 lessons"
                                mode="error"
                                onClose={() => {
                                    setAlertShow(false)
                                }}
                            />
                        )}
                        {/* <p className="font-poppins text-xl mr-5">Click the green button to add your first activity.</p> */}
                        {
                            mylesson && mylesson.length > 0 &&
                                <Link href="mylessons/advanced-search-library">
                                    <button className="bg-green-400 hover:bg-green-500 text-white rounded-md px-3 py-2 transition-all">
                                        Import From Library
                                    </button>
                                </Link>
                        }
                    </div>
                    {mylesson &&
                        mylesson.length > 0 ?
                        resourceTypes.map(type => {
                            if(countByRT[type.rt_name] == 0) return
                            return(
                                <>                                    
                                    <p className="text-3xl font-bold my-3">
                                        {type.rt_name}
                                    </p>                                    
                                    <div className="grid grid-cols-4 gap-10 my-5">
                                    {mylesson.map(lesson => {
                                        if (type.rt_id == lesson.lesson_type && lesson.lesson_enabled == 1){
                                            return (
                                                <div className="w-full h-full border rounded-lg shadow-lg border-gray-400 group flex flex-col relative overflow-hidden">
                                                    <div className="flex items-center h-[300px] w-full bg-gray-300">
                                                        <img
                                                            className="block mx-auto  my-3 max-h-[300px] w-auto  p-2"
                                                            src={lesson.lesson_image}></img>
                                                    </div>
                                                    <p className="text-center text-xl m-2 font-bold text-sky-700">
                                                        {lesson.lesson_name}
                                                    </p>
                                                    <div className="w-full h-3/5 bg-green-500 absolute rounded-lg transform -bottom-40 transition-all group-hover:bottom-0 opacity-0 group-hover:opacity-100 duration-300">
                                                        <p className="text-white text-xl p-3">
                                                            {lesson.lesson_description}
                                                        </p>
                                                        <div className="flex justify-end absolute right-0 bottom-0 m-3">
                                                            <button className='text-white rounded-full px-2 py-1 transition-all bg-slate-600' onClick={(id) => {previewLesson(lesson.lesson_video)}}>Preview</button>
                                                            <Link
                                                                href={
                                                                    process.env
                                                                        .NEXT_PUBLIC_BACKEND_URL +
                                                                    '?lid=' +
                                                                    lesson.lesson_uuid +
                                                                    '&origin=' +
                                                                    'mylessons'
                                                                }>
                                                                <a className="text-white bg-sky-600 rounded-full px-2 py-1 mx-2  transition-all">
                                                                    Launch
                                                                </a>
                                                            </Link>
                                                            <button
                                                                className="text-white bg-green-600 rounded-full px-2 py-1 transition-all"
                                                                onClick={id => {
                                                                    assignLesson(lesson.id)
                                                                }}>
                                                                Assign
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })}
                                    </div>
                                </>
                            )
                        })  
                        :
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border px-14 py-40 border-dashed text-center rounded-lg">
                            <p className="font-poppins text-xl mr-5 text-red-600 mb-5">Click the green button to add your first activity.</p>
                            <Link href="mylessons/advanced-search-library" className="block mx-auto">
                                <button className="bg-green-400 hover:bg-green-500 text-white rounded-md px-3 py-2 transition-all">
                                    Import From Library
                                </button>
                            </Link>
                        </div>  
                    }
                    {
                        previewModalShow &&
                            <PreviewLessonModal
                                previewModalShow = {previewModalShow}
                                previewVideoUrl = {previewVideoUrl}
                                onClose = {() => {
                                    setPreviewVideoUrl('')
                                    setPreviewModalShow(false)
                                }}
                            />
                    }
                    <AssignLessonModal
                        assignModalShow={assignModalShow}
                        assignLessonId={assignLessonId}
                        onClose={() => {
                            setAssignLessonId(0)
                            setAssignModalShow(false)
                        }}
                    />
                </div>
                <div
                    className={
                        !loading
                            ? 'backdrop-blur-sm bg-white/30 w-full h-full fixed z-40 left-0 top-0'
                            : ''
                    }></div>
                {loading ? (
                    ''
                ) : (
                    <div className="text-center fixed transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 z-50">
                        <div role="status">
                            <svg
                                className="inline mr-2 w-36 h-36 text-gray-200 animate-spin dark:text-gray-600 fill-green-300"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="absolute left-[0.6rem] top-[0.6rem]">
                            <Image
                                src="/logos/small-logo.png"
                                width={'124px'}
                                height={'124px'}
                                className="mx-auto"></Image>
                        </div>
                    </div>
                )}
            </AppLayout>
        </div>
    )
}
export default myLessons
