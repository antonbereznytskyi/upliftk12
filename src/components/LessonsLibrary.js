import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import InfiniteScroll from 'react-infinite-scroll-component'
import Swal from 'sweetalert2'
import Image from 'next/image'
import Alert from './smallComponents/Alert'

const LessonsLibrary = ({ domainId, grade }) => {
    const [lessonsLibrary, setLessonsLibrary] = useState([])
    const [domainName, setDomainName] = useState()
    const [pageNum, SetPageNum] = useState(0)
    const [loadMoreFlag, setLoadMoreFlag] = useState(true)
    const [lessonsType, setLessonsType] = useState([])
    const [myLessonIds, setMyLessonIds] = useState([])
    const [loading, setLoading] = useState(true)
    const [alertShow, setAlertShow] = useState(false)

    function getLessons() {
        axios
            .post('/api/lessonsLibrary', {
                domainId: domainId,
                pageNum: pageNum,
            })
            .then(res => {
                if (res.data.lessons.length < 20) setLoadMoreFlag(false)
                SetPageNum(pageNum + 1)
                setLessonsLibrary([...lessonsLibrary, ...res.data.lessons])
                setDomainName(res.data.domainName)
            })
            .catch(error => {
                console.log(error)
            })
    }
    useEffect(() => {
        setLoading(false)
        setLoadMoreFlag(true)
        window.scrollTo(0, 0)
        axios
            .post('/api/lessonsLibrary', {
                domainId: domainId,
                pageNum: 0,
            })
            .then(res => {
                if (res.data.lessons.length < 20) setLoadMoreFlag(false)
                if (res.data.membership_type == '1') setAlertShow(true)
                setMyLessonIds(Object.values(res.data.mylesson_ids))
                setLessonsType(res.data.lessons_type)
                setLessonsLibrary(res.data.lessons)
                setDomainName(res.data.domainName)
                SetPageNum(1)
                setLoading(true)
            })
            .catch(error => {
                console.log(error)
            })
    }, [domainId])
    useEffect(() => {
        setLoadMoreFlag(true)
        setLessonsLibrary([])
        setDomainName('')
        SetPageNum(0)
    }, [grade])

    let skeleton = []
    for (let i = 0; i < 20; i++) {
        skeleton.push(<Skeleton width={350} height={230} />)
    }

    let library = {}
    let filterdLessonsType = []
    lessonsType.map(type => {
        let flag = false
        lessonsLibrary.map(lesson => {
            if (type.rt_id == lesson.lesson_type) flag = true
        })
        if (flag == true) filterdLessonsType.push(type)
    })
    function addToLesson(lesson_id) {
        if (myLessonIds.length == 5) {
            Swal.fire({
                title: '',
                text:
                    'Free membership gives you access to 5 lessons. To gain unlimited access, upgrade your account today!',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Yes!',
            })
            return
        }
        setLoading(false)
        axios.post('/api/addLesson', { lesson_id: lesson_id }).then(res => {
            setMyLessonIds([...myLessonIds, lesson_id])
            setLoading(true)
            Swal.fire({
                title: 'Success',
                text: 'Lesson is added successfully!',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Yes!',
            })
        })
    }
    function RemoveLesson(lesson_id) {
        setLoading(false)
        axios.post('/api/remove-lesson', { lesson_id: lesson_id }).then(res => {
            setLoading(true)
            let updateLessonIds = myLessonIds.filter(function (id) {
                return id != lesson_id
            })
            setMyLessonIds(updateLessonIds)
            Swal.fire({
                title: 'Success',
                text: 'Lesson is removed successfully!',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Yes!',
            })
        })
    }
    return (
        <div className="pb-10">
            {alertShow && (
                <Alert
                    message="Your account is free membership, so you can only add up to 5 lessons"
                    mode="error"
                    onClose={() => {
                        setAlertShow(false)
                    }}
                />
            )}
            <p className="mt-3 text-2xl font-bold">
                {grade}/{domainName}
            </p>
            {library && (
                <InfiniteScroll
                    dataLength={lessonsLibrary.length}
                    next={getLessons}
                    hasMore={loadMoreFlag}
                    loader={
                        <div>
                            <Skeleton width={250} height={30}></Skeleton>
                            <div className="grid grid-cols-4 gap-5 pt-10">
                                {skeleton}
                            </div>
                        </div>
                    }>
                    {filterdLessonsType.map(type => {
                        return (
                            <>
                                <p className="text-xl py-5 font-bold">
                                    Lessons Type: {type.rt_name}
                                </p>
                                <div className="grid grid-cols-4 gap-5">
                                    {lessonsLibrary.map(lesson => {
                                        if (lesson.lesson_type == type.rt_id) {
                                            return (
                                                <div className="w-full h-full border rounded-lg shadow-lg border-gray-400 group flex flex-col relative">
                                                    <img
                                                        className="block mx-auto my-3 h-[300px] w-full p-2"
                                                        src={
                                                            lesson.lesson_image
                                                        }></img>
                                                    <p className="text-center text-xl m-2 font-bold text-sky-700">
                                                        {lesson.lesson_name}
                                                    </p>
                                                    {myLessonIds.length > 0 &&
                                                        myLessonIds.indexOf(
                                                            lesson.id,
                                                        ) > -1 && (
                                                            <div className="absolute top-3 right-3">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="red"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth="0"
                                                                    stroke="currentColor"
                                                                    className="w-6 h-6">
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                                                    />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    <div className="w-full h-0 bg-sky-500 absolute rounded-lg bottom-0 transition-all group-hover:h-3/5 opacity-0 group-hover:opacity-100 duration-300">
                                                        <p className="text-white text-2xl p-3 hidden group-hover:block">
                                                            {
                                                                lesson.lesson_description
                                                            }
                                                        </p>
                                                        <div className="flex justify-end absolute right-0 bottom-0 m-3">
                                                            {myLessonIds.length >
                                                                0 &&
                                                            myLessonIds.indexOf(
                                                                lesson.id,
                                                            ) > -1 ? (
                                                                !alertShow && (
                                                                    <button
                                                                        className="text-white bg-[#1BA361] rounded-full px-3 py-1"
                                                                        onClick={id => {
                                                                            RemoveLesson(
                                                                                lesson.id,
                                                                            )
                                                                        }}>
                                                                        Remove
                                                                        From My
                                                                        lesson
                                                                    </button>
                                                                )
                                                            ) : (
                                                                <button
                                                                    className="text-white bg-[#1BA361] rounded-full px-3 py-1"
                                                                    onClick={id => {
                                                                        addToLesson(
                                                                            lesson.id,
                                                                        )
                                                                    }}>
                                                                    Add To My
                                                                    lesson
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        return
                                    })}
                                </div>
                            </>
                        )
                    })}
                </InfiniteScroll>
            )}
            <div
                className={
                    !loading
                        ? 'backdrop-blur-sm bg-white/30 w-full h-full fixed left-0 top-0 z-40'
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
        </div>
    )
}
export default LessonsLibrary
