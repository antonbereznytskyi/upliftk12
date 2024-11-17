import React from 'react'
import Link from 'next/link'

export default function ContactUs(){
    return (
        <div className="grid place-items-center w-full bg-sky-100 md:pt-32 pt-0 md:px-10 px-10 lg:pb-20 md:pb-10 pb-2">
            <div className="grid place-items-center w-full">
                <div className="md:flex block w-full md:justify-around 2xl:justify-center">
                    <div className="text-center justify-between">
                        <img
                            className="w-44 md:w-60 sm:w-52 xl:w-80 h-auto pb-10 md:pt-10 pt-5 block mx-auto md:mx-0"
                            src="../logos/logo.png"></img>
                        <p className="ml-2 text-center xl:text-2xl lg:text-xl md:text-lg sm:text-lg text-lg text-[#FAA91C] font-poppins font-bold">
                            Collaborate.{' '}
                            <span className="text-green-600">
                                Learn.{' '}
                            </span>
                            <span className="text-sky-600">
                                Play.
                            </span>
                        </p>
                    </div>

                    <div className="flex text-center justify-between">
                        <div className="lg:mx-32 md:mx-20 mx-5">
                            <p className="text-start font-poppins font-bold text-sky-900 xl:text-2xl md:text-2xl text-xl md:py-5 py-3">
                                Home
                            </p>
                            <Link href="/membership">
                                <p className="text-start font-poppins font-bold text-sky-900 xl:text-2xl md:text-2xl text-xl md:py-5 py-3 cursor-pointer">
                                    Pricing
                                </p>
                            </Link>
                            <Link href="/about-us">
                                <p className="text-start font-poppins font-bold text-sky-900 xl:text-2xl md:text-2xl text-xl md:py-5 py-3 cursor-pointer">
                                    About Us
                                </p>
                            </Link>
                            <Link href="/contact-us">
                                <p className="text-start font-poppins font-bold text-sky-900 xl:text-2xl md:text-2xl text-xl md:py-5 py-3 cursor-pointer">
                                    Contact Us
                                </p>
                            </Link>
                        </div>
                        <div>
                            <p className="text-start font-poppins font-bold text-sky-900 xl:text-3xl md:text-2xl md:py-5 text-xl py-3">
                                Email
                            </p>
                            <p className="text-start font-poppins lg:text-xl text-xs">
                                teach@upliftk12.com
                            </p>
                            <p className="text-start font-poppins font-bold text-sky-900 xl:text-3xl md:text-2xl md:py-5 text-xl py-3">
                                Phone
                            </p>
                            <p className="text-start font-poppins lg:text-xl md:text-xs">
                                +1(469) 431-0809
                            </p>
                            <p className="text-start font-poppins font-bold text-sky-900 xl:text-3xl md:text-2xl md:py-5 text-xl py-3">
                                Address
                            </p>
                            <p className="text-start font-poppins text-xs">
                                945 McKinney St #12524
                                <br />
                                Houston, TX 77002
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:flex items-center grid text-center place-items-center pt-40">
                <p className="font-poppins tracking-wide 2xl:text-xl lg:text-lg md:text-base sm:text-lg text-xs text-sky-900 lg:mr-20 lg:ml-0 mx-auto lg:my-0 my-3 order-2 md:order-1">
                    Copyright ©2022{' '}
                    <span className="font-bold">
                        Uplift K12.
                    </span>{' '}
                    All Rights Reserved
                </p>
                <div className="flex md:order-2 order-1 md:mt-0 mt-3 justify-between">
                    <Link href="https://www.tiktok.com/@upliftk12">
                        <img className="mx-3 lg:w-12 md:w-10 sm:w-9 w-7 lg:h-12 md:h-10 sm:h-9 h-7 cursor-pointer rounded-md" src='/images/tiktok-icon.jpg'/>
                    </Link>
                    <Link href="https://www.pinterest.com/UpliftK12/">
                        <svg
                            className="mx-3 lg:w-12 md:w-10 sm:w-9 w-7  lg:h-12 md:h-10 sm:h-9 h-7 cursor-pointer"
                            width="49"
                            height="48"
                            viewBox="0 0 49 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M40.8633 0H7.86328C3.72115 0 0.363281 3.35786 0.363281 7.5V40.5C0.363281 44.6421 3.72115 48 7.86328 48H40.8633C45.0054 48 48.3633 44.6421 48.3633 40.5V7.5C48.3633 3.35786 45.0054 0 40.8633 0Z"
                                fill="#E60023"
                            />
                            <path
                                d="M24.3633 12C17.7633 12 12.3633 17.4 12.3633 24C12.3633 28.95 15.3633 33.15 19.5633 34.95C19.5633 34.05 19.5633 33.15 19.7133 32.25C20.0133 31.2 21.2133 25.65 21.2133 25.65C21.2133 25.65 20.7633 24.9 20.7633 23.7C20.7633 21.9 21.8133 20.55 23.0133 20.55C24.0633 20.55 24.6633 21.3 24.6633 22.35C24.6633 23.4 23.9133 25.05 23.6133 26.55C23.3133 27.75 24.2133 28.8 25.5633 28.8C27.8133 28.8 29.3133 25.95 29.3133 22.35C29.3133 19.65 27.5133 17.7 24.3633 17.7C20.7633 17.7 18.5133 20.4 18.5133 23.4C18.5133 24.45 18.8133 25.2 19.2633 25.8C19.4133 26.1 19.5633 26.1 19.4133 26.4C19.4133 26.55 19.2633 27.15 19.1133 27.3C18.9633 27.6 18.8133 27.75 18.5133 27.6C16.8633 26.85 16.1133 25.05 16.1133 22.95C16.1133 19.5 18.9633 15.45 24.6633 15.45C29.3133 15.45 32.3133 18.75 32.3133 22.35C32.3133 27 29.7633 30.6 25.8633 30.6C24.5133 30.6 23.3133 29.85 22.8633 29.1C22.8633 29.1 22.1133 31.8 21.9633 32.4C21.6633 33.3 21.2133 34.2 20.7633 34.95C21.8133 35.25 23.0133 35.4 24.2133 35.4C30.8133 35.4 36.2133 30 36.2133 23.4C36.3633 17.4 30.9633 12 24.3633 12Z"
                                fill="white"
                            />
                        </svg>
                    </Link>
                    <Link href="https://www.instagram.com/upliftk12/">
                        <img className="mx-3 lg:w-12 md:w-10 sm:w-9 w-7 lg:h-12 md:h-10 sm:h-9 h-7 cursor-pointer rounded-md" src='/images/Instagram-icon.png'/>
                    </Link>
                    <Link href="https://twitter.com/upliftk12">
                        <svg
                            className="mx-3 lg:w-12 md:w-10 sm:w-9 w-7 lg:h-12 md:h-10 sm:h-9 h-7 cursor-pointer"
                            width="49"
                            height="48"
                            viewBox="0 0 49 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M40.8633 0H7.86328C3.72115 0 0.363281 3.35786 0.363281 7.5V40.5C0.363281 44.6421 3.72115 48 7.86328 48H40.8633C45.0054 48 48.3633 44.6421 48.3633 40.5V7.5C48.3633 3.35786 45.0054 0 40.8633 0Z"
                                fill="#1DA1F2"
                            />
                            <path
                                d="M36.3633 16.5C35.4633 16.95 34.5633 17.1 33.5133 17.25C34.5633 16.65 35.3133 15.75 35.6133 14.55C34.7133 15.15 33.6633 15.45 32.4633 15.75C31.5633 14.85 30.2133 14.25 28.8633 14.25C25.7133 14.25 23.3133 17.25 24.0633 20.25C20.0133 20.1 16.4133 18.15 13.8633 15.15C12.5133 17.4 13.2633 20.25 15.3633 21.75C14.6133 21.75 13.8633 21.45 13.1133 21.15C13.1133 23.4 14.7633 25.5 17.0133 26.1C16.2633 26.25 15.5133 26.4 14.7633 26.25C15.3633 28.2 17.1633 29.7 19.4133 29.7C17.6133 31.05 14.9133 31.8 12.3633 31.5C14.6133 32.85 17.1633 33.75 19.8633 33.75C29.0133 33.75 34.1133 26.1 33.8133 19.05C34.8633 18.45 35.7633 17.55 36.3633 16.5Z"
                                fill="white"
                            />
                        </svg>
                    </Link>
                    <Link href="https://www.linkedin.com/company/uplift-k12/">
                        <img className="mx-3 lg:w-12 md:w-10 sm:w-9 w-7 lg:h-12 md:h-10 sm:h-9 h-7 cursor-pointer rounded-md" src='/images/linkedin-icon.png'/>
                    </Link>
                </div>
            </div>

            <button
                className="absolute right-0 transform translate-y-44 xl:translate-y-28 lg:translate-y-32 md:translate-y-32 rounded-l-full text-white font-poppins bg-sky-600 2xl:py-5 2xl:px-10 lg:py-3 sm:py-3 py-2 lg:px-6 sm:px-5 px-3 text-center"
                onClick={() => {
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth',
                    })
                }}>
                <div className="rounded-full bg-white lg:w-12 lg:h-12 sm:w-8 sm:h-8 w-5 h-5 lg:mb-2 mb-1 mx-auto flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 lg:w-8 lg:h-8 text-sky-900 block mx-auto"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                    </svg>
                </div>
                <div className="md:block hidden">
                    Return To Top
                </div>
            </button>
        </div>
    )
}