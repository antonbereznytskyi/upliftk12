import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { Tooltip } from '@nextui-org/react'
import ViewAllLessons from './ViewAllLessons'

export default function Modal({ lessonModalShow, onClose }) {
    const [filterGradesShow, setFilterGradeShow] = useState(false)
    const [filterLessonsShow, setFilterLessonsShow] = useState(false)
    const [filterTopicShow, setFilterTopicShow] = useState(false)
    const [applyFiltersShow, setApplyFiltersShow] = useState(false)
    const [viewAllLessons, setViewAllLessons] = useState(false)
    function escHandler({ key }) {
        if (key === 'Escape') {
            setViewAllLessons(false)
            onClose()
        }
    }
    function applyFilters() {
        setFilterGradeShow(false)
        setFilterLessonsShow(false)
        setFilterTopicShow(false)
        setApplyFiltersShow(true)
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

    if (typeof document !== 'undefined') {
        if (viewAllLessons) {
            return createPortal(
                <div
                    className={`fixed flex items-center justify-center inset-0 z-50 ${
                        lessonModalShow ? '' : 'pointer-events-none'
                    }`}>
                    {/* backdrop */}
                    <div
                        className={`fixed inset-0 bg-black ${
                            lessonModalShow
                                ? 'opacity-70'
                                : 'pointer-events-none opacity-0'
                        } transition-opacity duration-300 ease-in-out`}
                        onClick={() => {
                            setViewAllLessons(false)
                            onClose()
                        }}
                    />

                    {/* content */}
                    <div
                        className={`fixed md:flex rounded-lg w-11/12 sm:h-5/6 h-[570px] bg-white shadow-lg max-w-full p-0 ${
                            lessonModalShow
                                ? 'opacity-100'
                                : 'pointer-events-none opacity-0'
                        } transition-opacity duration-300 ease-in-out`}>
                        <ViewAllLessons
                            onBack={() => {
                                setViewAllLessons(false)
                            }}
                            onClose={() => {
                                setViewAllLessons(false)
                                onClose()
                            }}
                        />
                    </div>
                </div>,
                document.body,
            )
        } else {
            return createPortal(
                <div
                    className={`fixed flex items-center justify-center inset-0 z-50 ${
                        lessonModalShow ? '' : 'pointer-events-none'
                    }`}>
                    {/* backdrop */}
                    <div
                        className={`fixed inset-0 bg-black ${
                            lessonModalShow
                                ? 'opacity-70'
                                : 'pointer-events-none opacity-0'
                        } transition-opacity duration-300 ease-in-out`}
                        onClick={onClose}
                    />

                    {/* content */}
                    <div
                        className={`fixed md:flex rounded-lg w-11/12 h-[570px] sm:h-5/6 bg-white shadow-lg max-w-full p-0 ${
                            lessonModalShow
                                ? 'opacity-100'
                                : 'pointer-events-none opacity-0'
                        } transition-opacity duration-300 ease-in-out`}>
                        <div className="w-full h-1/2 md:w-1/2 md:h-full pt-2 px-1 xl:px-3 sm:px-5 md:px-1 sm:pt-8 rounded-lg bg-gradient-to-b from-sky-50 to-sky-200">
                            <div className="flex relative rounded-lg pl-1 pr-1 ml-1 mr-3 bg-white font-poppins items-center py-2 justify-between">
                                <div className="flex items-center">
                                    <label className="mr-1 sm:mr-3 md:mr-1 lg:mr-2 text-xs lg:text-base 2xl:text-xl">
                                        Filter By:
                                    </label>
                                    <button
                                        className="flex items-center"
                                        onClick={() => {
                                            setFilterGradeShow(
                                                !filterGradesShow,
                                            )
                                            setFilterLessonsShow(false)
                                            setFilterTopicShow(false)
                                        }}>
                                        <svg
                                            className="w-4 h-4 lg:w-6 lg:h-6 sm:mr-3 2xl:w-8 2xl:h-8 md:mr-0"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M8 6H21"
                                                stroke="#FAA91C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M8 12H21"
                                                stroke="#FAA91C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M8 18H21"
                                                stroke="#FAA91C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M3 6H3.01"
                                                stroke="#FAA91C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M3 12H3.01"
                                                stroke="#FAA91C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M3 18H3.01"
                                                stroke="#FAA91C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <p className="text-xs font-bold lg:text-base 2xl:text-xl sm:mr-3 lg:mx-2 md:mx-0.5 mx-0.5 text-sky-900">
                                            Grades
                                        </p>
                                    </button>
                                    {filterGradesShow && (
                                        <div className="absolute w-full left-0 top-8 font-poppins">
                                            <div className="w-5 h-5 rotate-45 bg-sky-600 z-20 transform translate-x-20 sm:translate-x-28 md:translate-x-20 lg:translate-x-32 translate-y-3"></div>
                                            <div className="bg-white border-sky-600 border-2 rounded-lg shadow-lg p-2 z-50 relative">
                                                <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3">
                                                    <div className="flex items-center pb-1 border-r-2 border-gray-400 mx-2">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            Kindergarten
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center pb-1  mx-2 sm:border-r-2 md:border-r-0 xl:border-r-2 border-gray-400">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            1st Grade
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center pb-1  border-r-2 sm:border-r-0 md:border-r-2 xl:border-r-0 border-gray-400 mx-2">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            2nd Grade
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center pb-1 mx-2 sm:border-r-2 md:border-r-0 xl:border-r-2 border-gray-400 ">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            3rd Grade
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center pb-1  border-r-2 border-gray-400   mx-2">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            4rd Grade
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center pb-1  mx-2">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            5rd Grade
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center pb-1  border-r-2 border-gray-400 mx-2">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            6th Grade
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center pb-1  mx-2 sm:border-r-2 md:border-r-0 xl:border-r-2 border-gray-400">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            7th Grade
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center pb-1  border-r-2 sm:border-r-0 md:border-r-2 xl:border-r-0 border-gray-400 mx-2">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            8th Grade
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    className="w-full bg-sky-400 text-white rounded-md my-1 py-1 text-sm xl:text-lg xl:py-2"
                                                    onClick={applyFilters}>
                                                    Apply Filters
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    <button
                                        className="flex items-center"
                                        onClick={() => {
                                            setFilterLessonsShow(
                                                !filterLessonsShow,
                                            )
                                            setFilterGradeShow(false)
                                            setFilterTopicShow(false)
                                        }}>
                                        <svg
                                            className="w-4 h-4 lg:w-6 lg:h-6 2xl:w-8 2xl:h-8 sm:mr-3 md:mr-0"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M8 6H21"
                                                stroke="#FAA91C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M8 12H21"
                                                stroke="#FAA91C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M8 18H21"
                                                stroke="#FAA91C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M3 6H3.01"
                                                stroke="#FAA91C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M3 12H3.01"
                                                stroke="#FAA91C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M3 18H3.01"
                                                stroke="#FAA91C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <p className="text-xs sm:mr-3 lg:text-base 2xl:text-xl md:mx-0.5 lg:mx-2 font-bold mx-0.5 text-sky-900">
                                            Lessons
                                        </p>
                                    </button>
                                    {filterLessonsShow && (
                                        <div className="absolute w-full left-0 top-8 font-poppins">
                                            <div className="w-5 h-5 rotate-45 bg-sky-600 z-20 transform translate-x-36 sm:translate-x-48 md:translate-x-36 lg:translate-x-52 translate-y-3"></div>
                                            <div className="bg-white border-sky-600 border-2 rounded-lg shadow-lg p-2 z-50 relative">
                                                <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3">
                                                    <div className="flex items-center pb-1 border-r-2 border-gray-400 mx-2">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            Lessons
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center pb-1  mx-2 sm:border-r-2 md:border-r-0 xl:border-r-2 border-gray-400">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            Virtual
                                                            Manipulatives
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center pb-1  border-r-2 sm:border-r-0 md:border-r-2 xl:border-r-0 border-gray-400 mx-2">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            Independent Practice
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center pb-1 mx-2 sm:border-r-2 md:border-r-0 xl:border-r-2 border-gray-400 ">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            Guided Practice
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center pb-1  border-r-2 border-gray-400 mx-2">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            Mini Manipulatives
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center pb-1  mx-2">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            Games
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    className="w-full bg-sky-400 text-white rounded-md my-2 py-1 text-sm xl:text-lg xl:py-2"
                                                    onClick={applyFilters}>
                                                    Apply Filters
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    <button
                                        className="flex items-center"
                                        onClick={() => {
                                            setFilterTopicShow(!filterTopicShow)
                                            setFilterGradeShow(false)
                                            setFilterLessonsShow(false)
                                        }}>
                                        <svg
                                            className="w-4 h-4  lg:w-6 lg:h-6 2xl:w-8 2xl:h-8 sm:mr-3 md:mr-0"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M8 6H21"
                                                stroke="#FAA91C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M8 12H21"
                                                stroke="#FAA91C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M8 18H21"
                                                stroke="#FAA91C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M3 6H3.01"
                                                stroke="#FAA91C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M3 12H3.01"
                                                stroke="#FAA91C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M3 18H3.01"
                                                stroke="#FAA91C"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <p className="text-xs font-bold lg:text-base 2xl:text-xl md:mx-0.5 lg:mx-2 mx-0.5 text-sky-900">
                                            Topic
                                        </p>
                                    </button>
                                    {filterTopicShow && (
                                        <div className="absolute w-full left-0 top-8 font-poppins">
                                            <div className="w-5 h-5 rotate-45 bg-sky-600 z-20 transform translate-x-52 sm:translate-x-64 md:translate-x-52 lg:translate-x-80 translate-y-3"></div>
                                            <div className="bg-white border-sky-600 border-2 rounded-lg shadow-lg p-2 z-50 relative">
                                                <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3">
                                                    <div className="flex items-center pb-1 border-r-2 border-gray-400 mx-2">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            Counting &
                                                            Cardinality
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center pb-1  mx-2 sm:border-r-2 md:border-r-0 xl:border-r-2 border-gray-400">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            Geometry
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center pb-1  border-r-2 sm:border-r-0 md:border-r-2 xl:border-r-0 border-gray-400 mx-2">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            The Number System
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center pb-1 mx-2 sm:border-r-2 md:border-r-0 xl:border-r-2 border-gray-400 ">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            Operation &
                                                            Algebraic Thinking
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center pb-1  border-r-2 border-gray-400 mx-2">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            Number &
                                                            Operatins-Fractions
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center pb-1  mx-2">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            Expressions &
                                                            Equations
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center pb-1  border-r-2 border-gray-400 mx-2">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            Number & Operations
                                                            in Base Ten
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center pb-1  mx-2 sm:border-r-2 md:border-r-0  xl:border-r-2 border-gray-400">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            Radios &
                                                            Proportional
                                                            Relationships
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center pb-1  border-r-2 sm:border-r-0 md:border-r-2 xl:border-r-0 border-gray-400 mx-2">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            Statistics &
                                                            Probablity
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center pb-1  sm:border-r-2 md:border-r-0  xl:border-r-2 border-gray-400 mx-2">
                                                        <input type="checkbox"></input>
                                                        <p className="ml-1 xl:text-lg text-xs">
                                                            Measurement & Data
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center pb-1  sm:border-r-2 border-gray-400 mx-2"></div>
                                                </div>
                                                <button
                                                    className="w-full bg-sky-400 text-white rounded-md my-2 py-1 xl:text-lg xl:py-2"
                                                    onClick={applyFilters}>
                                                    Apply Filters
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {applyFiltersShow && (
                                    <p className="font-poppins font-bold text-xs 2xl:text-xl">
                                        Reset Filters
                                    </p>
                                )}
                            </div>
                            <div className="rounded-lg pl-2 mr-3 ml-1 bg-white font-poppins items-center py-1 mt-2">
                                <p className="text-sky-900 text-base font-bold lg:text-2xl 2xl:text-3xl">
                                    Popular Lessons
                                </p>
                            </div>
                            <div
                                className="rounded-lg bg-sky-200 mr-0 mt-2 h-40 sm:h-3/5 md:h-4/5 lg:h-[75%] font-poppins p-1 xl:px-3 pr-3 scrollbar-thin scrollbar-thumb-sky-500 scrollbar-track-white overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scroll-p-2"
                                onClick={() => {
                                    setFilterGradeShow(false)
                                    setFilterLessonsShow(false)
                                    setFilterTopicShow(false)
                                }}>
                                <div className="rounded-lg bg-white p-2 flex justify-between my-1 items-center cursor-pointer xl:px-3">
                                    <div className="text-sky-900 lg:w-2/3">
                                        <p className="font-bold text-sm lg:text-lg xl:text-xl 2xl:text-xl">
                                            Virtual Manipulative:Hundreds Grid
                                            Skip Counting 6, 7, 8, 9
                                        </p>
                                        <p className="text-xs leading-5 lg:text-md xl:text-lg 2xl:text-lg">
                                            In this game, a student must place
                                            the correct number on one of its
                                            multiples. The tile for 6 goes on 6,
                                            12, 18, etc.
                                        </p>
                                        <div className="flex">
                                            <Tooltip
                                                color="invert"
                                                content="For Grade 1"
                                                placement="right"
                                                contentColor="warning">
                                                <button>
                                                    <svg
                                                        className="w-6 mr-1 md:w-6 md:hover:w-7  lg:w-7 lg:hover:w-8 xl:w-9 xl:hover:w-10  hover:w-7 transition-all"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect
                                                            width="48"
                                                            height="48"
                                                            rx="5"
                                                            fill="#1BA361"
                                                        />
                                                        <path
                                                            d="M22.787 32H26V17H21V20.2671H22.787V32Z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tooltip>
                                            <Tooltip
                                                color="invert"
                                                content="Manipulatives"
                                                placement="right"
                                                contentColor="warning">
                                                <button>
                                                    <svg
                                                        className="w-6 mx-1 md:w-6 md:hover:w-7 lg:w-7 lg:hover:w-8 hover:w-7 xl:w-9 xl:hover:w-10 transition-all"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect
                                                            width="48"
                                                            height="48"
                                                            rx="5"
                                                            fill="#FAA91C"
                                                        />
                                                        <rect
                                                            x="18.1357"
                                                            y="19"
                                                            width="15.8626"
                                                            height="15.0005"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M29.8606 14H13.998V29.0005L18.1361 34.0006"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M29.8594 14L33.9974 19.0002"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M13.998 14L18.1361 19.0002"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tooltip>
                                            <Tooltip
                                                color="invert"
                                                content="Counting"
                                                placement="right"
                                                contentColor="warning">
                                                <button>
                                                    <svg
                                                        className="w-6 mx-1 md:w-6 md:hover:w-7 hover:w-7 lg:w-7 lg:hover:w-8 xl:w-9 xl:hover:w-10  transition-all"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect
                                                            width="48"
                                                            height="48"
                                                            rx="5"
                                                            fill="#ED2426"
                                                        />
                                                        <path
                                                            d="M11.584 35.952H14.432V24.272H10V26.816H11.584V35.952Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M18.192 29.792H26.224V27.568H21.904C23.76 26.144 26.048 24.096 26.048 21.536C26.048 19.568 24.864 18.016 22.208 18.016C20.08 18.016 18.24 19.232 18.16 22.064H20.8C20.8 20.96 21.28 20.32 22.096 20.32C22.928 20.32 23.312 20.864 23.312 21.712C23.312 23.68 20.672 25.712 18.192 27.76V29.792Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M29.384 15.568H32.056C32.104 14.928 32.424 14.288 33.304 14.288C34.04 14.288 34.504 14.72 34.504 15.504C34.504 16.56 33.608 16.784 32.68 16.784H32.168V19.008H32.68C34.104 19.008 34.728 19.424 34.728 20.464C34.728 21.232 34.264 21.776 33.416 21.776C32.408 21.776 31.912 21.168 31.896 20.256H29.24C29.32 22.896 31.08 24.048 33.512 24.048C35.96 24.048 37.368 22.64 37.368 20.672C37.368 19.136 36.568 18.24 35.4 17.856V17.792C36.2 17.52 37.16 16.704 37.16 15.168C37.16 13.408 35.832 12 33.368 12C30.984 12 29.48 13.264 29.384 15.568Z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tooltip>
                                            <Tooltip
                                                color="invert"
                                                content="Independent Study"
                                                placement="right"
                                                contentColor="warning">
                                                <button>
                                                    <svg
                                                        className="w-6 mx-1 md:w-6 md:hover:w-7  lg:w-7 lg:hover:w-8 xl:w-9 xl:hover:w-10  hover:w-7 transition-all"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect
                                                            width="48"
                                                            height="48"
                                                            rx="5"
                                                            fill="#2F8DCC"
                                                        />
                                                        <circle
                                                            cx="24.3448"
                                                            cy="17.3448"
                                                            r="4.34483"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M24.1552 21.6899C20.7558 21.6899 18 23.8333 18 26.4773V34.0003H30.3103V26.4773C30.3103 23.8333 27.5546 21.6899 24.1552 21.6899Z"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tooltip>

                                            <button className="flex items-center font-bold ml-1 group text-sm 2xl:text-xl">
                                                <svg
                                                    className="w-5 md:w-5 lg:w-6 2xl:w-8 mx-1 group-hover:fill-red-600 transition duration-1000"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M20.8401 4.60999C20.3294 4.099 19.7229 3.69364 19.0555 3.41708C18.388 3.14052 17.6726 2.99817 16.9501 2.99817C16.2276 2.99817 15.5122 3.14052 14.8448 3.41708C14.1773 3.69364 13.5709 4.099 13.0601 4.60999L12.0001 5.66999L10.9401 4.60999C9.90843 3.5783 8.50915 2.9987 7.05012 2.9987C5.59109 2.9987 4.19181 3.5783 3.16012 4.60999C2.12843 5.64169 1.54883 7.04096 1.54883 8.49999C1.54883 9.95903 2.12843 11.3583 3.16012 12.39L4.22012 13.45L12.0001 21.23L19.7801 13.45L20.8401 12.39C21.3511 11.8792 21.7565 11.2728 22.033 10.6053C22.3096 9.93789 22.4519 9.22248 22.4519 8.49999C22.4519 7.77751 22.3096 7.0621 22.033 6.39464C21.7565 5.72718 21.3511 5.12075 20.8401 4.60999V4.60999Z"
                                                        stroke="#1A3F54"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                Favorite
                                            </button>
                                            <button className="flex items-center font-bold mx-1 text-sm 2xl:text-xl">
                                                <svg
                                                    className="w-4 md:w-5 mx-1 lg:w-5 2xl:w-6"
                                                    viewBox="0 0 16 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7 13H9V4H11L8 0L5 4H7V13ZM15 7H12V9H14V18H2V9H4V7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8V19C0 19.2652 0.105357 19.5196 0.292893 19.7071C0.48043 19.8946 0.734784 20 1 20H15C15.2652 20 15.5196 19.8946 15.7071 19.7071C15.8946 19.5196 16 19.2652 16 19V8C16 7.73478 15.8946 7.48043 15.7071 7.29289C15.5196 7.10536 15.2652 7 15 7Z"
                                                        fill="#1A3F54"
                                                    />
                                                </svg>
                                                Share
                                            </button>
                                        </div>
                                    </div>
                                    <div className="hidden sm:block md:hidden lg:block lg:w-1/3">
                                        <img
                                            className="h-auto w-32 xl:w-44 float-right"
                                            src="../images/game-image1.png"></img>
                                    </div>
                                </div>
                                <div className="rounded-lg bg-white p-2 flex justify-between my-1 items-center cursor-pointer xl:px-3">
                                    <div className="text-sky-900 lg:w-2/3">
                                        <p className="font-bold text-sm lg:text-lg xl:text-xl 2xl:text-xl">
                                            Virtual Manipulative:Hundreds Grid
                                            Skip Counting 6, 7, 8, 9
                                        </p>
                                        <p className="text-xs leading-5 lg:text-md xl:text-lg 2xl:text-lg">
                                            In this game, a student must place
                                            the correct number on one of its
                                            multiples. The tile for 6 goes on 6,
                                            12, 18, etc.
                                        </p>
                                        <div className="flex">
                                            <Tooltip
                                                color="invert"
                                                content="For Grade 1"
                                                placement="right"
                                                contentColor="warning">
                                                <button>
                                                    <svg
                                                        className="w-6 mr-1 md:w-6 md:hover:w-7  lg:w-7 lg:hover:w-8 xl:w-9 xl:hover:w-10  hover:w-7 transition-all"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect
                                                            width="48"
                                                            height="48"
                                                            rx="5"
                                                            fill="#1BA361"
                                                        />
                                                        <path
                                                            d="M22.787 32H26V17H21V20.2671H22.787V32Z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tooltip>
                                            <Tooltip
                                                color="invert"
                                                content="Manipulatives"
                                                placement="right"
                                                contentColor="warning">
                                                <button>
                                                    <svg
                                                        className="w-6 mx-1 md:w-6 md:hover:w-7 lg:w-7 lg:hover:w-8 hover:w-7 xl:w-9 xl:hover:w-10 transition-all"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect
                                                            width="48"
                                                            height="48"
                                                            rx="5"
                                                            fill="#FAA91C"
                                                        />
                                                        <rect
                                                            x="18.1357"
                                                            y="19"
                                                            width="15.8626"
                                                            height="15.0005"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M29.8606 14H13.998V29.0005L18.1361 34.0006"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M29.8594 14L33.9974 19.0002"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M13.998 14L18.1361 19.0002"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tooltip>
                                            <Tooltip
                                                color="invert"
                                                content="Counting"
                                                placement="right"
                                                contentColor="warning">
                                                <button>
                                                    <svg
                                                        className="w-6 mx-1 md:w-6 md:hover:w-7 hover:w-7 lg:w-7 lg:hover:w-8 xl:w-9 xl:hover:w-10  transition-all"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect
                                                            width="48"
                                                            height="48"
                                                            rx="5"
                                                            fill="#ED2426"
                                                        />
                                                        <path
                                                            d="M11.584 35.952H14.432V24.272H10V26.816H11.584V35.952Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M18.192 29.792H26.224V27.568H21.904C23.76 26.144 26.048 24.096 26.048 21.536C26.048 19.568 24.864 18.016 22.208 18.016C20.08 18.016 18.24 19.232 18.16 22.064H20.8C20.8 20.96 21.28 20.32 22.096 20.32C22.928 20.32 23.312 20.864 23.312 21.712C23.312 23.68 20.672 25.712 18.192 27.76V29.792Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M29.384 15.568H32.056C32.104 14.928 32.424 14.288 33.304 14.288C34.04 14.288 34.504 14.72 34.504 15.504C34.504 16.56 33.608 16.784 32.68 16.784H32.168V19.008H32.68C34.104 19.008 34.728 19.424 34.728 20.464C34.728 21.232 34.264 21.776 33.416 21.776C32.408 21.776 31.912 21.168 31.896 20.256H29.24C29.32 22.896 31.08 24.048 33.512 24.048C35.96 24.048 37.368 22.64 37.368 20.672C37.368 19.136 36.568 18.24 35.4 17.856V17.792C36.2 17.52 37.16 16.704 37.16 15.168C37.16 13.408 35.832 12 33.368 12C30.984 12 29.48 13.264 29.384 15.568Z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tooltip>
                                            <Tooltip
                                                color="invert"
                                                content="Independent Study"
                                                placement="right"
                                                contentColor="warning">
                                                <button>
                                                    <svg
                                                        className="w-6 mx-1 md:w-6 md:hover:w-7  lg:w-7 lg:hover:w-8 xl:w-9 xl:hover:w-10  hover:w-7 transition-all"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect
                                                            width="48"
                                                            height="48"
                                                            rx="5"
                                                            fill="#2F8DCC"
                                                        />
                                                        <circle
                                                            cx="24.3448"
                                                            cy="17.3448"
                                                            r="4.34483"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M24.1552 21.6899C20.7558 21.6899 18 23.8333 18 26.4773V34.0003H30.3103V26.4773C30.3103 23.8333 27.5546 21.6899 24.1552 21.6899Z"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tooltip>

                                            <button className="flex items-center font-bold ml-1 group text-sm 2xl:text-xl">
                                                <svg
                                                    className="w-5 md:w-5 lg:w-6 2xl:w-8 mx-1 group-hover:fill-red-600 transition duration-1000"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M20.8401 4.60999C20.3294 4.099 19.7229 3.69364 19.0555 3.41708C18.388 3.14052 17.6726 2.99817 16.9501 2.99817C16.2276 2.99817 15.5122 3.14052 14.8448 3.41708C14.1773 3.69364 13.5709 4.099 13.0601 4.60999L12.0001 5.66999L10.9401 4.60999C9.90843 3.5783 8.50915 2.9987 7.05012 2.9987C5.59109 2.9987 4.19181 3.5783 3.16012 4.60999C2.12843 5.64169 1.54883 7.04096 1.54883 8.49999C1.54883 9.95903 2.12843 11.3583 3.16012 12.39L4.22012 13.45L12.0001 21.23L19.7801 13.45L20.8401 12.39C21.3511 11.8792 21.7565 11.2728 22.033 10.6053C22.3096 9.93789 22.4519 9.22248 22.4519 8.49999C22.4519 7.77751 22.3096 7.0621 22.033 6.39464C21.7565 5.72718 21.3511 5.12075 20.8401 4.60999V4.60999Z"
                                                        stroke="#1A3F54"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                Favorite
                                            </button>
                                            <button className="flex items-center font-bold mx-1 text-sm 2xl:text-xl">
                                                <svg
                                                    className="w-4 md:w-5 mx-1 lg:w-5 2xl:w-6"
                                                    viewBox="0 0 16 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7 13H9V4H11L8 0L5 4H7V13ZM15 7H12V9H14V18H2V9H4V7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8V19C0 19.2652 0.105357 19.5196 0.292893 19.7071C0.48043 19.8946 0.734784 20 1 20H15C15.2652 20 15.5196 19.8946 15.7071 19.7071C15.8946 19.5196 16 19.2652 16 19V8C16 7.73478 15.8946 7.48043 15.7071 7.29289C15.5196 7.10536 15.2652 7 15 7Z"
                                                        fill="#1A3F54"
                                                    />
                                                </svg>
                                                Share
                                            </button>
                                        </div>
                                    </div>
                                    <div className="hidden sm:block md:hidden lg:block lg:w-1/3">
                                        <img
                                            className="h-auto w-32 xl:w-44 float-right"
                                            src="../images/game-image1.png"></img>
                                    </div>
                                </div>
                                <div className="rounded-lg bg-white p-2 flex justify-between my-1 items-center cursor-pointer xl:px-3">
                                    <div className="text-sky-900 lg:w-2/3">
                                        <p className="font-bold text-sm lg:text-lg xl:text-xl 2xl:text-xl">
                                            Virtual Manipulative:Hundreds Grid
                                            Skip Counting 6, 7, 8, 9
                                        </p>
                                        <p className="text-xs leading-5 lg:text-md xl:text-lg 2xl:text-lg">
                                            In this game, a student must place
                                            the correct number on one of its
                                            multiples. The tile for 6 goes on 6,
                                            12, 18, etc.
                                        </p>
                                        <div className="flex">
                                            <Tooltip
                                                color="invert"
                                                content="For Grade 1"
                                                placement="right"
                                                contentColor="warning">
                                                <button>
                                                    <svg
                                                        className="w-6 mr-1 md:w-6 md:hover:w-7  lg:w-7 lg:hover:w-8 xl:w-9 xl:hover:w-10  hover:w-7 transition-all"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect
                                                            width="48"
                                                            height="48"
                                                            rx="5"
                                                            fill="#1BA361"
                                                        />
                                                        <path
                                                            d="M22.787 32H26V17H21V20.2671H22.787V32Z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tooltip>
                                            <Tooltip
                                                color="invert"
                                                content="Manipulatives"
                                                placement="right"
                                                contentColor="warning">
                                                <button>
                                                    <svg
                                                        className="w-6 mx-1 md:w-6 md:hover:w-7 lg:w-7 lg:hover:w-8 hover:w-7 xl:w-9 xl:hover:w-10 transition-all"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect
                                                            width="48"
                                                            height="48"
                                                            rx="5"
                                                            fill="#FAA91C"
                                                        />
                                                        <rect
                                                            x="18.1357"
                                                            y="19"
                                                            width="15.8626"
                                                            height="15.0005"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M29.8606 14H13.998V29.0005L18.1361 34.0006"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M29.8594 14L33.9974 19.0002"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M13.998 14L18.1361 19.0002"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tooltip>
                                            <Tooltip
                                                color="invert"
                                                content="Counting"
                                                placement="right"
                                                contentColor="warning">
                                                <button>
                                                    <svg
                                                        className="w-6 mx-1 md:w-6 md:hover:w-7 hover:w-7 lg:w-7 lg:hover:w-8 xl:w-9 xl:hover:w-10  transition-all"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect
                                                            width="48"
                                                            height="48"
                                                            rx="5"
                                                            fill="#ED2426"
                                                        />
                                                        <path
                                                            d="M11.584 35.952H14.432V24.272H10V26.816H11.584V35.952Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M18.192 29.792H26.224V27.568H21.904C23.76 26.144 26.048 24.096 26.048 21.536C26.048 19.568 24.864 18.016 22.208 18.016C20.08 18.016 18.24 19.232 18.16 22.064H20.8C20.8 20.96 21.28 20.32 22.096 20.32C22.928 20.32 23.312 20.864 23.312 21.712C23.312 23.68 20.672 25.712 18.192 27.76V29.792Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M29.384 15.568H32.056C32.104 14.928 32.424 14.288 33.304 14.288C34.04 14.288 34.504 14.72 34.504 15.504C34.504 16.56 33.608 16.784 32.68 16.784H32.168V19.008H32.68C34.104 19.008 34.728 19.424 34.728 20.464C34.728 21.232 34.264 21.776 33.416 21.776C32.408 21.776 31.912 21.168 31.896 20.256H29.24C29.32 22.896 31.08 24.048 33.512 24.048C35.96 24.048 37.368 22.64 37.368 20.672C37.368 19.136 36.568 18.24 35.4 17.856V17.792C36.2 17.52 37.16 16.704 37.16 15.168C37.16 13.408 35.832 12 33.368 12C30.984 12 29.48 13.264 29.384 15.568Z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tooltip>
                                            <Tooltip
                                                color="invert"
                                                content="Independent Study"
                                                placement="right"
                                                contentColor="warning">
                                                <button>
                                                    <svg
                                                        className="w-6 mx-1 md:w-6 md:hover:w-7  lg:w-7 lg:hover:w-8 xl:w-9 xl:hover:w-10  hover:w-7 transition-all"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect
                                                            width="48"
                                                            height="48"
                                                            rx="5"
                                                            fill="#2F8DCC"
                                                        />
                                                        <circle
                                                            cx="24.3448"
                                                            cy="17.3448"
                                                            r="4.34483"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M24.1552 21.6899C20.7558 21.6899 18 23.8333 18 26.4773V34.0003H30.3103V26.4773C30.3103 23.8333 27.5546 21.6899 24.1552 21.6899Z"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tooltip>

                                            <button className="flex items-center font-bold ml-1 group text-sm 2xl:text-xl">
                                                <svg
                                                    className="w-5 md:w-5 lg:w-6 2xl:w-8 mx-1 group-hover:fill-red-600 transition duration-1000"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M20.8401 4.60999C20.3294 4.099 19.7229 3.69364 19.0555 3.41708C18.388 3.14052 17.6726 2.99817 16.9501 2.99817C16.2276 2.99817 15.5122 3.14052 14.8448 3.41708C14.1773 3.69364 13.5709 4.099 13.0601 4.60999L12.0001 5.66999L10.9401 4.60999C9.90843 3.5783 8.50915 2.9987 7.05012 2.9987C5.59109 2.9987 4.19181 3.5783 3.16012 4.60999C2.12843 5.64169 1.54883 7.04096 1.54883 8.49999C1.54883 9.95903 2.12843 11.3583 3.16012 12.39L4.22012 13.45L12.0001 21.23L19.7801 13.45L20.8401 12.39C21.3511 11.8792 21.7565 11.2728 22.033 10.6053C22.3096 9.93789 22.4519 9.22248 22.4519 8.49999C22.4519 7.77751 22.3096 7.0621 22.033 6.39464C21.7565 5.72718 21.3511 5.12075 20.8401 4.60999V4.60999Z"
                                                        stroke="#1A3F54"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                Favorite
                                            </button>
                                            <button className="flex items-center font-bold mx-1 text-sm 2xl:text-xl">
                                                <svg
                                                    className="w-4 md:w-5 mx-1 lg:w-5 2xl:w-6"
                                                    viewBox="0 0 16 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7 13H9V4H11L8 0L5 4H7V13ZM15 7H12V9H14V18H2V9H4V7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8V19C0 19.2652 0.105357 19.5196 0.292893 19.7071C0.48043 19.8946 0.734784 20 1 20H15C15.2652 20 15.5196 19.8946 15.7071 19.7071C15.8946 19.5196 16 19.2652 16 19V8C16 7.73478 15.8946 7.48043 15.7071 7.29289C15.5196 7.10536 15.2652 7 15 7Z"
                                                        fill="#1A3F54"
                                                    />
                                                </svg>
                                                Share
                                            </button>
                                        </div>
                                    </div>
                                    <div className="hidden sm:block md:hidden lg:block lg:w-1/3">
                                        <img
                                            className="h-auto w-32 xl:w-44 float-right"
                                            src="../images/game-image1.png"></img>
                                    </div>
                                </div>
                                <div className="rounded-lg bg-white p-2 flex justify-between my-1 items-center cursor-pointer xl:px-3">
                                    <div className="text-sky-900 lg:w-2/3">
                                        <p className="font-bold text-sm lg:text-lg xl:text-xl 2xl:text-xl">
                                            Virtual Manipulative:Hundreds Grid
                                            Skip Counting 6, 7, 8, 9
                                        </p>
                                        <p className="text-xs leading-5 lg:text-md xl:text-lg 2xl:text-lg">
                                            In this game, a student must place
                                            the correct number on one of its
                                            multiples. The tile for 6 goes on 6,
                                            12, 18, etc.
                                        </p>
                                        <div className="flex">
                                            <Tooltip
                                                color="invert"
                                                content="For Grade 1"
                                                placement="right"
                                                contentColor="warning">
                                                <button>
                                                    <svg
                                                        className="w-6 mr-1 md:w-6 md:hover:w-7  lg:w-7 lg:hover:w-8 xl:w-9 xl:hover:w-10  hover:w-7 transition-all"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect
                                                            width="48"
                                                            height="48"
                                                            rx="5"
                                                            fill="#1BA361"
                                                        />
                                                        <path
                                                            d="M22.787 32H26V17H21V20.2671H22.787V32Z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tooltip>
                                            <Tooltip
                                                color="invert"
                                                content="Manipulatives"
                                                placement="right"
                                                contentColor="warning">
                                                <button>
                                                    <svg
                                                        className="w-6 mx-1 md:w-6 md:hover:w-7 lg:w-7 lg:hover:w-8 hover:w-7 xl:w-9 xl:hover:w-10 transition-all"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect
                                                            width="48"
                                                            height="48"
                                                            rx="5"
                                                            fill="#FAA91C"
                                                        />
                                                        <rect
                                                            x="18.1357"
                                                            y="19"
                                                            width="15.8626"
                                                            height="15.0005"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M29.8606 14H13.998V29.0005L18.1361 34.0006"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M29.8594 14L33.9974 19.0002"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M13.998 14L18.1361 19.0002"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tooltip>
                                            <Tooltip
                                                color="invert"
                                                content="Counting"
                                                placement="right"
                                                contentColor="warning">
                                                <button>
                                                    <svg
                                                        className="w-6 mx-1 md:w-6 md:hover:w-7 hover:w-7 lg:w-7 lg:hover:w-8 xl:w-9 xl:hover:w-10  transition-all"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect
                                                            width="48"
                                                            height="48"
                                                            rx="5"
                                                            fill="#ED2426"
                                                        />
                                                        <path
                                                            d="M11.584 35.952H14.432V24.272H10V26.816H11.584V35.952Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M18.192 29.792H26.224V27.568H21.904C23.76 26.144 26.048 24.096 26.048 21.536C26.048 19.568 24.864 18.016 22.208 18.016C20.08 18.016 18.24 19.232 18.16 22.064H20.8C20.8 20.96 21.28 20.32 22.096 20.32C22.928 20.32 23.312 20.864 23.312 21.712C23.312 23.68 20.672 25.712 18.192 27.76V29.792Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M29.384 15.568H32.056C32.104 14.928 32.424 14.288 33.304 14.288C34.04 14.288 34.504 14.72 34.504 15.504C34.504 16.56 33.608 16.784 32.68 16.784H32.168V19.008H32.68C34.104 19.008 34.728 19.424 34.728 20.464C34.728 21.232 34.264 21.776 33.416 21.776C32.408 21.776 31.912 21.168 31.896 20.256H29.24C29.32 22.896 31.08 24.048 33.512 24.048C35.96 24.048 37.368 22.64 37.368 20.672C37.368 19.136 36.568 18.24 35.4 17.856V17.792C36.2 17.52 37.16 16.704 37.16 15.168C37.16 13.408 35.832 12 33.368 12C30.984 12 29.48 13.264 29.384 15.568Z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tooltip>
                                            <Tooltip
                                                color="invert"
                                                content="Independent Study"
                                                placement="right"
                                                contentColor="warning">
                                                <button>
                                                    <svg
                                                        className="w-6 mx-1 md:w-6 md:hover:w-7  lg:w-7 lg:hover:w-8 xl:w-9 xl:hover:w-10  hover:w-7 transition-all"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect
                                                            width="48"
                                                            height="48"
                                                            rx="5"
                                                            fill="#2F8DCC"
                                                        />
                                                        <circle
                                                            cx="24.3448"
                                                            cy="17.3448"
                                                            r="4.34483"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M24.1552 21.6899C20.7558 21.6899 18 23.8333 18 26.4773V34.0003H30.3103V26.4773C30.3103 23.8333 27.5546 21.6899 24.1552 21.6899Z"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tooltip>

                                            <button className="flex items-center font-bold ml-1 group text-sm 2xl:text-xl">
                                                <svg
                                                    className="w-5 md:w-5 lg:w-6 2xl:w-8 mx-1 group-hover:fill-red-600 transition duration-1000"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M20.8401 4.60999C20.3294 4.099 19.7229 3.69364 19.0555 3.41708C18.388 3.14052 17.6726 2.99817 16.9501 2.99817C16.2276 2.99817 15.5122 3.14052 14.8448 3.41708C14.1773 3.69364 13.5709 4.099 13.0601 4.60999L12.0001 5.66999L10.9401 4.60999C9.90843 3.5783 8.50915 2.9987 7.05012 2.9987C5.59109 2.9987 4.19181 3.5783 3.16012 4.60999C2.12843 5.64169 1.54883 7.04096 1.54883 8.49999C1.54883 9.95903 2.12843 11.3583 3.16012 12.39L4.22012 13.45L12.0001 21.23L19.7801 13.45L20.8401 12.39C21.3511 11.8792 21.7565 11.2728 22.033 10.6053C22.3096 9.93789 22.4519 9.22248 22.4519 8.49999C22.4519 7.77751 22.3096 7.0621 22.033 6.39464C21.7565 5.72718 21.3511 5.12075 20.8401 4.60999V4.60999Z"
                                                        stroke="#1A3F54"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                Favorite
                                            </button>
                                            <button className="flex items-center font-bold mx-1 text-sm 2xl:text-xl">
                                                <svg
                                                    className="w-4 md:w-5 mx-1 lg:w-5 2xl:w-6"
                                                    viewBox="0 0 16 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7 13H9V4H11L8 0L5 4H7V13ZM15 7H12V9H14V18H2V9H4V7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8V19C0 19.2652 0.105357 19.5196 0.292893 19.7071C0.48043 19.8946 0.734784 20 1 20H15C15.2652 20 15.5196 19.8946 15.7071 19.7071C15.8946 19.5196 16 19.2652 16 19V8C16 7.73478 15.8946 7.48043 15.7071 7.29289C15.5196 7.10536 15.2652 7 15 7Z"
                                                        fill="#1A3F54"
                                                    />
                                                </svg>
                                                Share
                                            </button>
                                        </div>
                                    </div>
                                    <div className="hidden sm:block md:hidden lg:block lg:w-1/3">
                                        <img
                                            className="h-auto w-32 xl:w-44 float-right"
                                            src="../images/game-image1.png"></img>
                                    </div>
                                </div>
                                <div className="rounded-lg bg-white p-2 flex justify-between my-1 items-center cursor-pointer xl:px-3">
                                    <div className="text-sky-900 lg:w-2/3">
                                        <p className="font-bold text-sm lg:text-lg xl:text-xl 2xl:text-xl">
                                            Virtual Manipulative:Hundreds Grid
                                            Skip Counting 6, 7, 8, 9
                                        </p>
                                        <p className="text-xs leading-5 lg:text-md xl:text-lg 2xl:text-lg">
                                            In this game, a student must place
                                            the correct number on one of its
                                            multiples. The tile for 6 goes on 6,
                                            12, 18, etc.
                                        </p>
                                        <div className="flex">
                                            <Tooltip
                                                color="invert"
                                                content="For Grade 1"
                                                placement="right"
                                                contentColor="warning">
                                                <button>
                                                    <svg
                                                        className="w-6 mr-1 md:w-6 md:hover:w-7  lg:w-7 lg:hover:w-8 xl:w-9 xl:hover:w-10  hover:w-7 transition-all"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect
                                                            width="48"
                                                            height="48"
                                                            rx="5"
                                                            fill="#1BA361"
                                                        />
                                                        <path
                                                            d="M22.787 32H26V17H21V20.2671H22.787V32Z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tooltip>
                                            <Tooltip
                                                color="invert"
                                                content="Manipulatives"
                                                placement="right"
                                                contentColor="warning">
                                                <button>
                                                    <svg
                                                        className="w-6 mx-1 md:w-6 md:hover:w-7 lg:w-7 lg:hover:w-8 hover:w-7 xl:w-9 xl:hover:w-10 transition-all"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect
                                                            width="48"
                                                            height="48"
                                                            rx="5"
                                                            fill="#FAA91C"
                                                        />
                                                        <rect
                                                            x="18.1357"
                                                            y="19"
                                                            width="15.8626"
                                                            height="15.0005"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M29.8606 14H13.998V29.0005L18.1361 34.0006"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M29.8594 14L33.9974 19.0002"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M13.998 14L18.1361 19.0002"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tooltip>
                                            <Tooltip
                                                color="invert"
                                                content="Counting"
                                                placement="right"
                                                contentColor="warning">
                                                <button>
                                                    <svg
                                                        className="w-6 mx-1 md:w-6 md:hover:w-7 hover:w-7 lg:w-7 lg:hover:w-8 xl:w-9 xl:hover:w-10  transition-all"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect
                                                            width="48"
                                                            height="48"
                                                            rx="5"
                                                            fill="#ED2426"
                                                        />
                                                        <path
                                                            d="M11.584 35.952H14.432V24.272H10V26.816H11.584V35.952Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M18.192 29.792H26.224V27.568H21.904C23.76 26.144 26.048 24.096 26.048 21.536C26.048 19.568 24.864 18.016 22.208 18.016C20.08 18.016 18.24 19.232 18.16 22.064H20.8C20.8 20.96 21.28 20.32 22.096 20.32C22.928 20.32 23.312 20.864 23.312 21.712C23.312 23.68 20.672 25.712 18.192 27.76V29.792Z"
                                                            fill="white"
                                                        />
                                                        <path
                                                            d="M29.384 15.568H32.056C32.104 14.928 32.424 14.288 33.304 14.288C34.04 14.288 34.504 14.72 34.504 15.504C34.504 16.56 33.608 16.784 32.68 16.784H32.168V19.008H32.68C34.104 19.008 34.728 19.424 34.728 20.464C34.728 21.232 34.264 21.776 33.416 21.776C32.408 21.776 31.912 21.168 31.896 20.256H29.24C29.32 22.896 31.08 24.048 33.512 24.048C35.96 24.048 37.368 22.64 37.368 20.672C37.368 19.136 36.568 18.24 35.4 17.856V17.792C36.2 17.52 37.16 16.704 37.16 15.168C37.16 13.408 35.832 12 33.368 12C30.984 12 29.48 13.264 29.384 15.568Z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tooltip>
                                            <Tooltip
                                                color="invert"
                                                content="Independent Study"
                                                placement="right"
                                                contentColor="warning">
                                                <button>
                                                    <svg
                                                        className="w-6 mx-1 md:w-6 md:hover:w-7  lg:w-7 lg:hover:w-8 xl:w-9 xl:hover:w-10  hover:w-7 transition-all"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <rect
                                                            width="48"
                                                            height="48"
                                                            rx="5"
                                                            fill="#2F8DCC"
                                                        />
                                                        <circle
                                                            cx="24.3448"
                                                            cy="17.3448"
                                                            r="4.34483"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M24.1552 21.6899C20.7558 21.6899 18 23.8333 18 26.4773V34.0003H30.3103V26.4773C30.3103 23.8333 27.5546 21.6899 24.1552 21.6899Z"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tooltip>

                                            <button className="flex items-center font-bold ml-1 group text-sm 2xl:text-xl">
                                                <svg
                                                    className="w-5 md:w-5 lg:w-6 2xl:w-8 mx-1 group-hover:fill-red-600 transition duration-1000"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M20.8401 4.60999C20.3294 4.099 19.7229 3.69364 19.0555 3.41708C18.388 3.14052 17.6726 2.99817 16.9501 2.99817C16.2276 2.99817 15.5122 3.14052 14.8448 3.41708C14.1773 3.69364 13.5709 4.099 13.0601 4.60999L12.0001 5.66999L10.9401 4.60999C9.90843 3.5783 8.50915 2.9987 7.05012 2.9987C5.59109 2.9987 4.19181 3.5783 3.16012 4.60999C2.12843 5.64169 1.54883 7.04096 1.54883 8.49999C1.54883 9.95903 2.12843 11.3583 3.16012 12.39L4.22012 13.45L12.0001 21.23L19.7801 13.45L20.8401 12.39C21.3511 11.8792 21.7565 11.2728 22.033 10.6053C22.3096 9.93789 22.4519 9.22248 22.4519 8.49999C22.4519 7.77751 22.3096 7.0621 22.033 6.39464C21.7565 5.72718 21.3511 5.12075 20.8401 4.60999V4.60999Z"
                                                        stroke="#1A3F54"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                Favorite
                                            </button>
                                            <button className="flex items-center font-bold mx-1 text-sm 2xl:text-xl">
                                                <svg
                                                    className="w-4 md:w-5 mx-1 lg:w-5 2xl:w-6"
                                                    viewBox="0 0 16 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7 13H9V4H11L8 0L5 4H7V13ZM15 7H12V9H14V18H2V9H4V7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8V19C0 19.2652 0.105357 19.5196 0.292893 19.7071C0.48043 19.8946 0.734784 20 1 20H15C15.2652 20 15.5196 19.8946 15.7071 19.7071C15.8946 19.5196 16 19.2652 16 19V8C16 7.73478 15.8946 7.48043 15.7071 7.29289C15.5196 7.10536 15.2652 7 15 7Z"
                                                        fill="#1A3F54"
                                                    />
                                                </svg>
                                                Share
                                            </button>
                                        </div>
                                    </div>
                                    <div className="hidden sm:block md:hidden lg:block lg:w-1/3">
                                        <img
                                            className="h-auto w-32 xl:w-44 float-right"
                                            src="../images/game-image1.png"></img>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="block mx-auto text-sm lg:text-xl bg-sky-400 rounded-lg px-3 py-1 md:px-3 md:py-1 lg:py-2 sm:py-2 text-white font-poppins mt-1 sm:mt-2 hover:bg-sky-700 transition-all"
                                onClick={() => {
                                    setViewAllLessons(true)
                                }}>
                                View All Lessons
                            </button>
                        </div>
                        <div
                            className="w-full h-1/2 md:w-1/2 px-3 sm:px-10 md:px-3 md:h-full text-center font-poppins text-sky-900"
                            onClick={() => {
                                setFilterGradeShow(false)
                                setFilterLessonsShow(false)
                                setFilterTopicShow(false)
                            }}>
                            <p className="text-base sm:text-lg my-1 sm:my-2 md:my-12 md:text-xl lg:text-3xl xl:text-4xl text-sky-900 font-bold">
                                View Our Available Lessons
                            </p>
                            <div className="bg-sky-100 flex justify-between p-0 pl-5 md:p-0 md:pl-5 rounded-lg relative">
                                <input
                                    className="peer bg-sky-100 w-full focus:border-none focus:outline-none text-sm"
                                    placeholder="Search For Lesson Plans..."></input>
                                <div className="text-sm absolute peer-focus:visible invisible w-full bg-sky-100 max-h-0 h-0 peer-focus:max-h-64 overflow-hidden peer-focus:h-32 transition-all duration-500 md:top-12 top-10 rounded-lg px-5 right-0 z-50 text-start">
                                    <p className="font-bold my-1">
                                        POPULAR SEARCHES
                                    </p>
                                    <p className="my-1">Addtion Games</p>
                                    <p className="my-1">Subtraction Games</p>
                                    <p className="my-1">Multiplication</p>
                                    <p className="my-1">Division Games</p>
                                </div>
                                <button className="bg-sky-400 rounded-lg p-1 m-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 md:w-6 md:h-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="rounded-lg w-full h-2/5 bg-blue-400 my-1 xl:my-5 lg:my-5 sm:my-3">
                                <img
                                    className="h-full w-full"
                                    src="../images/game-image2.png"></img>
                            </div>
                            <p className="mx-2 text-xs sm:text-base xl:text-2xl lg:text-2xl font-bold xl:mb-3 lg:mb-1">
                                Teaching Is Made Easy With Pre-Made Lessons
                            </p>
                            <p className="text-xs xl:mx-12 sm:text-sm xl:text-lg lg:text-xl">
                                Uplift K12 comes with pre-made lessons to get
                                you up and running easily! Select from our
                                digital library of pre-made lessons and start
                                teaching today.
                            </p>
                            <button
                                className="text-white text-sm flex absolute bottom-0 right-0 rounded-tl-lg rounded-br-lg bg-sky-900 items-center p-1 sm:p-2 xl:p-4"
                                onClick={() => {
                                    setViewAllLessons(false)
                                    onClose()
                                }}>
                                <svg
                                    className="w-5 h-5"
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
                    </div>
                </div>,
                document.body,
            )
        }
    } else {
        return null
    }
}
