import Head from 'next/head'
import Link from 'next/link'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import Navigation from '@/components/Layouts/Navigation'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Swal from 'sweetalert2'
import Alert from '@/components/smallComponents/Alert'
import InfiniteScroll from 'react-infinite-scroll-component'
import {useRouter} from 'next/router'

import PreviewLessonModal from '@/components/modal/PreviewLessonModal'

const Lessons = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const router = useRouter()
    const [grades, setGrades] = useState([])
    const [domains, setDomains] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [checkboxGrade, setCheckboxGrade] = useState({})
    const [checkboxDomain, setCheckboxDomain] = useState({})
    const [checkboxRT, setCheckboxRT] = useState({})
    const [filteredLessons, setFilteredLessons] = useState([])
    const [clickFilterFlag, setClickFilterFlag] = useState(false)
    const [myLessonIds, setMyLessonIds] = useState([])
    const [load, setLoad] = useState(false)
    const [alertShow, setAlertShow] = useState(false)
    const [resourceTypes, setResourceTypes] = useState([])
    const [countByRT, setCountByRT] = useState({})
    const [loading, setLoading] = useState(true)
    const [pageNum, setPageNum] = useState(0);
    const [loadMoreFlag, setLoadMoreFlag] = useState(true)
    const [totalLessonCount, setTotalLessonCount] = useState(0)

    const [previewModalShow, setPreviewModalShow] = useState(false)
    const [previewVideoUrl, setPreviewVideoUrl] = useState('')

    useEffect(() => {
        window.scrollTo(0, 0)
        setLoadMoreFlag(true)
        let obj = {}
        if(router.query.whiteboard == "true"){
            obj['6'] = true
        }
        axios
            .post('/api/filterLessons', {
                searchValue: searchInput ? searchInput : '',
                domainFilterObj: checkboxDomain,
                gradeFilterObj: checkboxGrade,
                resourceTypeFilterObj: obj,
                pageNum: 0
            })
            .then(res => {
                setTotalLessonCount(res.data.totalLessonCount)
                setPageNum(1)
                setLoad(true)
                if(res.data.filteredLessons.length < 20) setLoadMoreFlag(false)
                setFilteredLessons(res.data.filteredLessons)
                let obj = {}
                res.data.filteredLessons.map((lesson) => {
                    if(obj[lesson.lesson_type] == null) obj[lesson.lesson_type] = 1;
                    else obj[lesson.lesson_type] ++;
                })
                setCountByRT(obj)
            })
        setClickFilterFlag(false)
        if (
            Object.keys(checkboxDomain).length == 0 ||
            Object.keys(checkboxGrade).length == 0
        ) {
            axios.get('/api/grades').then(res => {
                if (res.data.membership_type == '1') setAlertShow(true)
                let obj = {}
                setGrades(res.data.grades)
                setMyLessonIds(Object.values(res.data.myLessonIds))
                res.data.grades.map(grade => {
                    obj[grade.id] = false
                })
                setCheckboxGrade(obj)
                axios.get('/api/domains_resourceType').then(res => {
                    let obj = {}
                    setDomains(res.data.domains)
                    setResourceTypes(res.data.resource_type)
                    res.data.resource_type.map(type => {                        
                        if(router.query.whiteboard == "true" && type.rt_id == 6){                            
                            obj[type.rt_id] = true
                        }else obj[type.rt_id] = false
                    })
                    setCheckboxRT(obj)
                    obj = {}
                    res.data.domains.map(domain => {
                        obj[domain.id] = false
                    })
                    setCheckboxDomain(obj)
                })
            })
        }
    }, [router])

    function previewLesson(url) {
        setPreviewVideoUrl(url)
        setPreviewModalShow(true)
    }

    function serchInputChange(e) {
        setClickFilterFlag(false)
        setSearchInput(e.target.value)
    }
    function domainChange(id) {
        setClickFilterFlag(false)
        let obj = checkboxDomain
        obj[id] = !checkboxDomain[id]
        setCheckboxDomain({ ...obj })
    }
    function gradeChange(id) {
        setClickFilterFlag(false)
        let obj = checkboxGrade
        obj[id] = !checkboxGrade[id]
        setCheckboxGrade({ ...obj })
    }
    function resourceTypeChange(id) {
        setClickFilterFlag(false)
        let obj = checkboxRT
        obj[id] = !checkboxRT[id]
        setCheckboxRT({ ...obj })
    }
    function clearFilter() {
        window.scrollTo(0, 0)
        setClickFilterFlag(false)
        setLoadMoreFlag(false)
        setTotalLessonCount(0)
        let obj = checkboxDomain
        Object.keys(obj).map(key => {
            obj[key] = false
        })
        setCheckboxDomain({ ...obj })
        obj = checkboxGrade
        Object.keys(obj).map(key => {
            obj[key] = false
        })
        obj = checkboxRT
        Object.keys(obj).map(key => {
            obj[key] = false
        })
        setCheckboxRT({ ...obj })
        setSearchInput('')
        setFilteredLessons([])
    }
    function getFilteredLessons(){
        axios
            .post('/api/filterLessons', {
                searchValue: searchInput ? searchInput : '',
                domainFilterObj: checkboxDomain,
                gradeFilterObj: checkboxGrade,
                resourceTypeFilterObj: checkboxRT,
                pageNum: pageNum
            })
            .then(res => {
                setFilteredLessons([...filteredLessons, ...res.data.filteredLessons])
                setPageNum(pageNum + 1)
                setLoad(true)
                if(res.data.filteredLessons.length < 20) setLoadMoreFlag(false)
                let obj = {}
                filteredLessons.map((lesson) => {
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
    function filterLessons() {
        window.scrollTo(0, 0)
        setLoadMoreFlag(true)
        setLoad(false)
        setClickFilterFlag(true)
        const timer = setTimeout(() => {
            setLoad(true)
            axios
                .post('/api/filterLessons', {
                    searchValue: searchInput ? searchInput : '',
                    domainFilterObj: checkboxDomain,
                    gradeFilterObj: checkboxGrade,
                    resourceTypeFilterObj: checkboxRT,
                    pageNum: 0
                })
                .then(res => {
                    setTotalLessonCount(res.data.totalLessonCount)
                    setPageNum(1)
                    if(res.data.filteredLessons.length < 20) setLoadMoreFlag(false)
                    setFilteredLessons(res.data.filteredLessons)
                    let obj = {}
                    res.data.filteredLessons.map((lesson) => {
                        if(obj[lesson.lesson_type] == null) obj[lesson.lesson_type] = 1;
                        else obj[lesson.lesson_type] ++;
                    })
                    setCountByRT(obj)
                })
        }, 1000)
        
        return () => clearTimeout(timer)
    }
    function addToLesson(lesson_id) {
        if (alertShow == true && myLessonIds.length >= 5) {
            Swal.fire({
                title: '',
                text: 'Free membership gives you access to 5 lessons. To gain unlimited access, upgrade your account today!',
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
            let updateLessonIds = myLessonIds.filter(function (id) {
                return id != lesson_id
            })
            setMyLessonIds(updateLessonIds)
            setLoading(true)
            Swal.fire({
                title: 'Success',
                text: 'Lesson is removed successfully!',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Yes!',
            })
        })
    }
    let skeleton = []
    for (let i = 0; i < 20; i++) {
        skeleton.push(<Skeleton width={350} height={230} />)
    }
    return (
        <>
            <Head>
                <title>Digital Library</title>
            </Head>
            <Navigation user={user} title="Digital Library" />
            <div className=" w-80 bg-sky-900 max-h-screen top-0 left-0 fixed overflow-y-scroll">
                <div className="pt-5 flex justify-center">
                    <img
                        className="w-[50px] h-auto"
                        src="../logos/small-logo.png"></img>
                    <p className="text-white text-3xl flex items-center ml-5 font-logo">
                        Uplift K12
                    </p>
                </div>
                <div className="pt-3 px-5">
                    <p className="text-white text-xl pb-2">Search</p>
                    <form
                        onSubmit={e => {
                            e.preventDefault()
                            filterLessons()
                        }}>
                        <label className="relative block">
                            <span className="absolute inset-y-0 right-3 flex items-center pl-3">
                                <svg
                                    className="h-6 w-6 fill-black"
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="30"
                                    height="30"
                                    viewBox="0 0 30 30">
                                    <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                                </svg>
                            </span>
                            <input
                                value={searchInput}
                                onChange={serchInputChange}
                                className="w-full bg-white placeholder:font-italitc border border-slate-300 rounded py-1 block mx-auto  focus:outline-none text-center text-base"
                                placeholder="Fractions"
                                type="text"
                            />
                        </label>
                    </form>
                </div>
                <div className="py-1 px-5">
                    <p className="text-white text-xl pb-2">Topics</p>
                    <div>
                        {domains &&
                            domains.map(domain => {
                                return (
                                    <div className="flex items-center mb-2">
                                        <input
                                            type="checkbox"
                                            checked={checkboxDomain[domain.id]}
                                            onClick={e => {
                                                domainChange(domain.id)
                                            }}
                                            className="w-5 h-5 transition-all text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="checked-checkbox"
                                            className="ml-1 text-sm font-medium text-white dark:text-gray-300">
                                            {domain.domain_name}
                                        </label>
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <div className="px-5 pb-1">
                    <p className="text-white text-xl pb-2">Resource Type</p>
                    <div className="grid grid-cols-2">
                        {resourceTypes.map(type => {
                            return (
                                <div className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        checked={checkboxRT[type.rt_id]}
                                        onChange={e => {
                                            resourceTypeChange(type.rt_id)
                                        }}
                                        className="w-5 h-5 transition-all text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="checked-checkbox"
                                        className="ml-1 text-sm font-medium text-white dark:text-gray-300">
                                        {type.rt_name}
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="px-5">
                    <p className="text-white text-xl pb-2">Grades</p>
                    <div className="grid grid-cols-2">
                        {grades &&
                            grades.map(grade => {
                                return (
                                    <div className="flex items-center mb-2">
                                        <input
                                            type="checkbox"
                                            checked={
                                                checkboxGrade[grade.id]
                                            }
                                            onChange={e => {
                                                gradeChange(grade.id)
                                            }}
                                            className="w-5 h-5 transition-all text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="checked-checkbox"
                                            className="ml-1 text-sm font-medium text-white dark:text-gray-300">
                                            {grade.name}
                                        </label>
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <div className=" px-5">
                    <button
                        className="block mx-auto transition-all border text-sky-800 bg-white hover:bg-sky-900 hover:border-white hover:border active:bg-sky-700 hover:text-white rounded w-full py-1 text-xl"
                        onClick={filterLessons}>
                        Filter
                    </button>
                </div>
                <div className=" px-5 my-4">
                    <button
                        className="block mx-auto transition-all border text-sky-800 bg-white hover:bg-sky-900 hover:border-white hover:border active:bg-sky-700 hover:text-white rounded w-full py-1 text-xl"
                        onClick={clearFilter}>
                        Clear Filter
                    </button>
                </div>
            </div>
            <div className="w-[calc(100%-20rem)] h-[calc(100%-5.1rem)] absolute right-0 top-20 z-[1]">
                <div className="w-[calc(100%-20rem)] mt-0 fixed z-10 bg-white border-t">
                    <div className="pt-4 pb-2 px-5 flex justify-between items-center">
                        {clickFilterFlag && !load ? (
                            <Skeleton width={300} height={30} />
                        ) : (
                            <p className="text-xl font-bold font-poppins">
                                Showing Results:{' '}
                                <span>{totalLessonCount}</span>
                            </p>
                        )}
                        {alertShow && (
                            <Alert
                                message="Your account is free membership, so you can only add up to 5 lessons"
                                mode="error"
                                onClose={() => {
                                    setAlertShow(false)
                                }}
                            />
                        )}
                    </div>
                </div>
                <div className="py-3 mt-14 px-5">
                    <InfiniteScroll
                        dataLength={filteredLessons.length}
                        next={getFilteredLessons}
                        hasMore={loadMoreFlag}
                        loader={
                            <div>
                                <Skeleton width={250} height={30}></Skeleton>
                                <div className="grid grid-cols-4 gap-5 pt-10">
                                    {skeleton}
                                </div>
                            </div>
                        }>
                        {filteredLessons.length != 0 &&
                            load &&
                            resourceTypes.map(type => {
                            if (countByRT[type.rt_id] == 0 || countByRT[type.rt_id] == null) return
                            return (
                                <>
                                    <p className="text-3xl font-bold my-3">
                                        {type.rt_name}
                                    </p>
                                    <div className="grid grid-cols-4 gap-5">
                                        {filteredLessons.map(lesson => {
                                            if (
                                                type.rt_id == lesson.lesson_type && lesson.lesson_enabled == 1
                                            ) {
                                                return (
                                                    <div className="w-full h-full border rounded-lg shadow-lg border-gray-400 group flex flex-col relative overflow-hidden">
                                                        <div className="flex items-center h-[300px] w-full bg-gray-300">
                                                            <img
                                                                className="block mx-auto my-3 max-h-[300px] w-auto p-2"
                                                                src={
                                                                    lesson.lesson_image
                                                                }></img>
                                                        </div>
                                                        {myLessonIds.length >
                                                            0 &&
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
                                                                        class="w-6 h-6">
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        <p className="text-center text-xl m-2 font-bold text-sky-700">
                                                            {lesson.lesson_name}
                                                        </p>
                                                        <div className="w-full h-0 bg-green-500 absolute rounded-lg transform bottom-0 transition-all group-hover:h-3/5 opacity-0 group-hover:opacity-100 duration-300">
                                                            <p className="text-white text-xl p-3">
                                                                {
                                                                    lesson.lesson_description
                                                                }
                                                            </p>
                                                            <div className="flex justify-end absolute right-0 bottom-0 m-3">                                                                
                                                                <button className='text-white rounded-full px-2 py-1 transition-all bg-slate-600 mr-2' onClick={(id) => {previewLesson(lesson.lesson_video)}}>Preview</button>
                                                                {myLessonIds.length >
                                                                    0 &&
                                                                myLessonIds.indexOf(
                                                                    lesson.id,
                                                                ) > -1 ? (
                                                                    !alertShow && (
                                                                        <button
                                                                            className="text-white bg-[#1BA361] rounded-full px-2 py-1 transition-all border border-white hover:text-[#1ba361] hover:bg-white"
                                                                            onClick={id => {
                                                                                RemoveLesson(
                                                                                    lesson.id,
                                                                                )
                                                                            }}>
                                                                            Remove
                                                                            From
                                                                            My
                                                                            lesson
                                                                        </button>
                                                                    )
                                                                ) : (
                                                                    <button
                                                                        className="text-white bg-[#1BA361] rounded-full px-2 py-1  transition-all border border-white hover:text-[#1ba361] hover:bg-white"
                                                                        onClick={id => {
                                                                            addToLesson(
                                                                                lesson.id,
                                                                            )
                                                                        }}>
                                                                        Add To
                                                                        My
                                                                        lesson
                                                                    </button>
                                                                )}
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
                        }
                    </InfiniteScroll>
                </div>
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
                
            </div>
            <div
                className={
                    Object.keys(checkboxDomain).length == 0 ||
                    Object.keys(checkboxGrade).length == 0
                        ? 'backdrop-blur-sm bg-white/30 w-full h-full fixed left-0 top-0 z-40'
                        : ''
                }></div>
            {!(
                Object.keys(checkboxDomain).length == 0 ||
                Object.keys(checkboxGrade).length == 0
            ) ? (
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
        </>
    )
}
export default Lessons
