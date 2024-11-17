import React from 'react';
import Head from 'next/head';
import AppLayout from '@/components/student/Layouts/AppLayout';
import { useState } from 'react';
import { useEffect } from 'react';
import Image from 'next/future/image';
import Link from 'next/link';
import ToDoCard from '@/components/student/assignments/ToDoCard'
import axios from '@/lib/axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import Skeleton from 'react-loading-skeleton'
import InviteModal from '@/components/modal/student/InviteModal'

export default function Assignments(){

    const [loading, setLoading] = useState(false)
    const [myLessons, setMyLessons] = useState([])
    const [allLessons, setAllLessons] = useState([])
    const [pageNum, setPageNum] = useState(0)
    const [loadMoreFlag, setLoadMoreFlag] = useState(true)
    const [countByRT, setCountByRT] = useState({})
    const [resourceType, setResourceType] = useState([])
    const [studentInfo, setStudentInfo] = useState({})
    const [inviteModalShow, setInviteModalShow] = useState(false)
    const [selectedLessonId, setSelectedLessonId] = useState(0)

    useEffect(() => {
        axios.get('/api/getStudentInfo')
            .then(res => {
                setStudentInfo(res.data)
            })
        axios.get('/api/getStudentLessons')
            .then((res) => {
                let array = [];
                setMyLessons(res.data)
                let obj = countByRT;
                array.map((lesson) => {
                    if(obj[lesson.lesson_type] == null) obj[lesson.lesson_type] = 1;
                    else obj[lesson.lesson_type] ++;
                })
                setCountByRT(obj)
                axios.post('/api/filterLessons', {pageNum: 0, domainFilterObj: {}, gradeFilterObj: {}, resourceTypeFilterObj: {}})
                    .then(res => {
                        // setTotalLessonCount(res.data.totalLessonCount)
                        setPageNum(1)
                        if(res.data.filteredLessons.length < 20) setLoadMoreFlag(false)
                        setAllLessons(res.data.filteredLessons)
                        let obj = countByRT
                        res.data.filteredLessons.map((lesson) => {
                            if(obj[lesson.lesson_type] == null) obj[lesson.lesson_type] = 1;
                            else obj[lesson.lesson_type] ++;
                        })
                        setResourceType(res.data.resourceType);
                        setCountByRT(obj)
                    })
            })
        
        // axios.get('/api/getStudentlessons')
        //     .then((res) => {
        //         setMyLessons(res.data)
        //     })
        let timer = setTimeout(() => {
            setLoading(true)
        }, 5000)
        return () => {
            clearTimeout(timer)
        }
    }, [])
    function getAllLessons(){
        axios
            .post('/api/filterLessons', {
                searchValue: '',
                domainFilterObj: {},
                gradeFilterObj: {},
                resourceTypeFilterObj: {},
                pageNum: pageNum
            })
            .then(res => {
                setAllLessons([...allLessons, ...res.data.filteredLessons])
                setPageNum(pageNum + 1)
                if(res.data.filteredLessons.length < 20) setLoadMoreFlag(false)
                let obj = {}
                allLessons.map((lesson) => {
                    if(obj[lesson.lesson_type] == null) obj[lesson.lesson_type] = 1;
                    else obj[lesson.lesson_type] ++;
                })
                res.data.filteredLessons.map((lesson) => {
                    if(obj[lesson.lesson_type] == null) obj[lesson.lesson_type] = 1;
                    else obj[lesson.lesson_type] ++;
                })
                setCountByRT(obj)
            })
    }
    function handleInvite(id){
        setSelectedLessonId(id)
        setInviteModalShow(true)
    }
    let todoIndex = 0, completeIndex = 0;
    let skeleton = []
    for (let i = 0; i < 20; i++) {
        skeleton.push(<Skeleton width={350} height={230} key={i}/>)
    }
    return (
        <AppLayout>
            <Head>
                <title>Assignments</title>
            </Head>
            <div className='p-10'>
                <InfiniteScroll
                    dataLength={allLessons.length}
                    next={getAllLessons}
                    hasMore={loadMoreFlag}
                    loader={
                        <div>
                            <Skeleton width={250} height={30}></Skeleton>
                            <div className="grid grid-cols-4 gap-5 pt-10">
                                {skeleton}
                            </div>
                        </div>
                    }>
                        {
                            myLessons.length > 0 &&
                                <p className="text-3xl font-bold my-3">
                                    My Lessons
                                </p>
                        }
                        {
                            myLessons.length > 0 &&                            
                            <div className="grid grid-cols-4 gap-5">
                                {myLessons.map(lesson => {
                                    return <ToDoCard handleInvite={(e) => handleInvite(lesson.id)} title = {todoIndex == 1 ? 'To-Do' : ''} earn = {'5'} imageDescription = {lesson.lesson_name} cardDescription={lesson.lesson_description} imageUrl = {lesson.lesson_image == null ? 'no-lesson-image.jpg' : lesson.lesson_image} disable={false} invite={studentInfo?.invite_allow}/>                                                        
                                })}
                            </div>
                        }
                        {
                            allLessons.length != 0 &&
                                resourceType.map((type) => {
                                    if (countByRT[type.rt_id] == 0 || countByRT[type.rt_id] == null) return
                                    return (
                                        <>
                                            <p className="text-3xl font-bold my-3">
                                                {type.rt_name}
                                            </p>
                                            <div className="grid grid-cols-4 gap-5">
                                                {
                                                    allLessons.map((lesson) => {
                                                        if(myLessons.length > 0){
                                                            return (myLessons.map(mylesson => {
                                                                if(mylesson.id != lesson.id && type.rt_id == lesson.lesson_type){
                                                                    return <ToDoCard  handleInvite={(e) => handleInvite(lesson.id)} lessonId={lesson.id} title = {todoIndex == 1 ? 'To-Do' : ''} earn = {'5'} imageDescription = {lesson.lesson_name} cardDescription={lesson.lesson_description} imageUrl = {lesson.lesson_image == null ? 'no-lesson-image.jpg' : lesson.lesson_image} disable={true}/>
                                                                }
                                                            }))
                                                        }
                                                        else if (
                                                            type.rt_id == lesson.lesson_type
                                                        ) {
                                                            return <ToDoCard handleInvite={(e) => handleInvite(lesson.id)} lessonId={lesson.id} title = {todoIndex == 1 ? 'To-Do' : ''} earn = {'5'} imageDescription = {lesson.lesson_name} cardDescription={lesson.lesson_description} imageUrl = {lesson.lesson_image == null ? 'no-lesson-image.jpg' : lesson.lesson_image} disable={true}/>
                                                        }
                                                    })
                                                }
                                            </div>
                                        </>
                                    )
                                })
                        }
                    </InfiniteScroll>
                    {
                        inviteModalShow && 
                            <InviteModal studentInfo={studentInfo} lessonId={selectedLessonId} inviteModalShow={inviteModalShow} close={() => setInviteModalShow(false)}/>
                    }
                {/* <div>
                    <p className='text-[#1D3F54] font-bold text-xl mb-7'>Explorer</p>
                    <div className='bg-white rounded-lg'>
                        <Image src="/images/student/explorer.png" width={400} height={0} layout='response' className="mx-auto h-[250px]"></Image>
                        <div className='flex p-6 justify-between items-center h-[100px]'>
                            <p className='text-[#1D3F54] mr-5'>Multiplayer games and activities in a digital library.</p>
                            <Link href={''}>
                                <button className='text-white bg-[#2F8DCC] px-4 py-2 rounded-md font-bold'>Explorer</button>
                            </Link>
                        </div>
                    </div>
                </div> */}
                {/* {myLessons && 
                    myLessons.map((lesson) => {
                        if(lesson.student_score == 0){
                            todoIndex++;
                            return (
                                <div>
                                    <ToDoCard title = {todoIndex == 1 ? 'To-Do' : ''} earn = {'5'} imageDescription = {lesson.lesson_name} cardDescription={lesson.lesson_description} imageUrl = {lesson.lesson_image == null ? 'no-lesson-image.jpg' : lesson.lesson_image}/>
                                </div>
                            )
                        }
                        else{
                            completeIndex++;
                            return (
                                <div>
                                    <CompleteLessonCard title = {completeIndex == 1 ? 'Completed Lessons' : ''} percent = {Math.floor(lesson.student_score)} imageDescription = {lesson.lesson_name} cardDescription={lesson.lesson_description} imageUrl = {lesson.lesson_image == null ? 'no-lesson-image.jpg' : lesson.lesson_image} gems={Math.floor(lesson.student_score/100 * 5)} pathColor={'#629738'} trailColor='#BBDAA2' progressBgColor={'#85B75E'}/>
                                </div>
                            )
                        }
                    })
                } */}
            </div>

            <div className={!loading ? 'backdrop-blur-sm bg-white/30 w-full h-full fixed z-50 left-0 top-0' : ''}>
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

