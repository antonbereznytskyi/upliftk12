import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { Tooltip } from '@nextui-org/react'
import ViewAllGames from './ViewAllGames'

export default function Modal({ gamesModalShow, onClose }) {
    const [viewAllGamesShow, setViewAllGamesShow] = useState(false)
    function escHandler({ key }) {
        if (key === 'Escape') {
            onClose()
        }
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
        if (viewAllGamesShow) {
            return createPortal(
                <div
                    className={`fixed flex items-center justify-center inset-0 z-50 ${
                        gamesModalShow ? '' : 'pointer-events-none'
                    }`}>
                    {/* backdrop */}
                    <div
                        className={`fixed inset-0 bg-black ${
                            gamesModalShow
                                ? 'opacity-70'
                                : 'pointer-events-none opacity-0'
                        } transition-opacity duration-300 ease-in-out`}
                        onClick={() => {
                            setViewAllGamesShow(false)
                            onClose()
                        }}
                    />

                    {/* content */}
                    <div
                        className={`fixed md:flex rounded-lg w-11/12 sm:h-5/6 h-[570px] bg-white shadow-lg max-w-full p-0 ${
                            gamesModalShow
                                ? 'opacity-100'
                                : 'pointer-events-none opacity-0'
                        } transition-opacity duration-300 ease-in-out`}>
                        <ViewAllGames
                            onBack={() => {
                                setViewAllGamesShow(false)
                            }}
                            onClose={() => {
                                setViewAllGamesShow(false)
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
                        gamesModalShow ? '' : 'pointer-events-none'
                    }`}>
                    {/* backdrop */}
                    <div
                        className={`fixed inset-0 bg-black ${
                            gamesModalShow
                                ? 'opacity-70'
                                : 'pointer-events-none opacity-0'
                        } transition-opacity duration-300 ease-in-out`}
                        onClick={onClose}
                    />

                    {/* content */}
                    <div
                        className={`fixed md:flex rounded-lg w-11/12 sm:h-5/6 h-[570px] bg-white shadow-lg max-w-full p-0 ${
                            gamesModalShow
                                ? 'opacity-100'
                                : 'pointer-events-none opacity-0'
                        } transition-opacity duration-300 ease-in-out`}>
                        <div className="w-full h-1/2 md:w-1/2 md:h-full pt-2 px-2 sm:px-5 md:px-2 sm:pt-8 md:pt-4 rounded-lg bg-gradient-to-b from-sky-50 to-sky-200">
                            <div className="rounded-lg pl-7 mr-5 ml-2 bg-white font-poppins items-center py-1 mt-2 md:mt-10">
                                <p className="text-sky-900 text-xl font-bold lg:text-2xl 2xl:text-4xl">
                                    Popular Games
                                </p>
                            </div>
                            <div className="rounded-lg bg-sky-200 mr-1 mt-2 h-[77%] sm:h-4/5 md:h-4/5 font-poppins p-2 pr-4 scrollbar-thin scrollbar-thumb-sky-500 scrollbar-track-white overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scroll-p-2">
                                <div className="rounded-lg bg-white p-2 flex justify-between my-1 items-center cursor-pointer">
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
                                <div className="rounded-lg bg-white p-2 flex justify-between my-1 items-center cursor-pointer">
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
                                <div className="rounded-lg bg-white p-2 flex justify-between my-1 items-center cursor-pointer">
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
                                <div className="rounded-lg bg-white p-2 flex justify-between my-1 items-center cursor-pointer">
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
                        </div>
                        <div className="w-full h-1/2 md:w-1/2 md:h-full text-center font-poppins text-sky-900">
                            <p className="text-xl sm:text-2xl my-1 sm:my-1 md:my-7 md:text-2xl lg:text-3xl lg:mt-20 xl:text-4xl text-sky-900 font-bold">
                                View Our Math Games
                            </p>
                            <div className="flex justify-around px-1 sm:px-5 md:px-1 xl:px-4">
                                <button className="bg-sky-400 hover:bg-sky-500 rounded-md text-white py-1 w-16 text-xs mr-1 sm:w-24 sm:text-sm sm:py-2 sm:mr-auto md:text-xs md:w-20 md:mr-0 lg:text-sm lg:w-24 xl:w-28 xl:py-3">
                                    Addition
                                </button>
                                <button className="bg-sky-400 hover:bg-sky-500 rounded-md text-white py-1 w-16 text-xs mr-1 sm:w-24 sm:text-sm sm:py-2 sm:mr-auto md:text-xs md:w-20 md:mr-0 lg:text-sm lg:w-24 xl:w-28 xl:py-3">
                                    Subtraction
                                </button>
                                <button className="bg-sky-400 hover:bg-sky-500 rounded-md text-white py-1 w-16 text-xs mr-1 sm:w-24 sm:text-sm sm:py-2 sm:mr-auto md:text-xs md:w-20 md:mr-0 lg:text-sm lg:w-24 xl:w-28 xl:py-3">
                                    Division
                                </button>
                                <button className="bg-sky-400 hover:bg-sky-500 rounded-md text-white py-1 w-16 text-xs mr-1 sm:w-24 sm:text-sm sm:py-2 sm:mr-auto md:text-xs md:w-20 md:mr-0 lg:text-sm lg:w-24 xl:w-28 xl:py-3">
                                    Multiplication
                                </button>
                                <button
                                    className="bg-green-400 hover:bg-green-500 rounded-md text-white py-1 w-16 text-xs sm:w-24 sm:text-sm sm:py-2 sm:mr-auto md:text-xs md:w-20 md:mr-0 lg:text-sm lg:w-24 xl:w-28 xl:py-3"
                                    onClick={() => {
                                        setViewAllGamesShow(true)
                                    }}>
                                    All Games
                                </button>
                            </div>
                            <div className="rounded-lg w-auto h-2/5 md:h-1/3 bg-blue-400 mx-7 my-1 md:my-5 md:mx-2 xl:my-3 sm:my-3">
                                <img
                                    className="h-full w-full"
                                    src="../images/game-image2.png"></img>
                            </div>
                            <p className="mx-7 text-sm sm:text-base xl:text-2xl lg:text-xl font-bold md:mb-2 xl:mb-3">
                                Math Is Made Fun With Our Math Games
                            </p>
                            <p className="mx-7 xl:mx-10 sm:text-sm text-xs leading-3 xl:text-lg lg:text-base md:leading-6">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Urna at mi, et magna pretium
                                nibh. Et egestas sed amet, egestas.Malesuada et
                                mattis enim mauris. Suspendisse tellus.
                            </p>
                            <button
                                className="text-white flex absolute bottom-0 right-0 rounded-tl-lg rounded-br-lg bg-sky-900 items-center p-1 sm:p-2 xl:p-4"
                                onClick={onClose}>
                                <svg
                                    width="24"
                                    height="24"
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
