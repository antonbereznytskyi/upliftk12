import React from 'react'
import LandingLayout from '@/components/Layouts/LandingLayout'
import Head from "next/head";
import HubspotForm from "react-hubspot-form"
import ContactUs from "@/components/aboutuscomponents/ContactUs";
import Image from 'next/image';
import { useEffect } from 'react';
import { useState } from 'react';
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";

export default function(){

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        let timer = setTimeout(()=> {
            setLoading(true)
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <LandingLayout>
            <Head>
                <title>Pricing</title>
                <link
                    href="https://fonts.googleapis.com/css?family=Poppins"
                    rel="stylesheet"></link>
                <meta
                    charset="utf-8"
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"></meta>
            </Head>
            <div>
                <div className='xl:py-60 md:py-40 py-20 font-poppins text-[#1d3f54] text-center'>
                    <p className='2xl:text-5xl xl:text-3xl lg:text-2xl md:text-lg font-extrabold'>Ease math anxiety with over 500 digital math resources. </p>
                    <p className='2xl:text-3xl xl:text-xl lg:text-lg font-medium mt-5'>Collaborate, Learn, and Play with Uplift K12. </p>
                    <img className='block mx-auto h-auto w-1/3 sm:mt-12 mt-6' src='/images/image1.png'/>
                </div>
                <div className='pt-16 pb-20'>
                    <p className='text-center font-poppins text-[#1d3f54] font-medium 2xl:text-3xl xl:text-xl lg:text-lg'>take 
                        <RoughNotation show="true" type="circle" strokeWidth="2" color='#2C8CCC' padding="20px">
                            <nbsp/> advantage <nbsp/>
                        </RoughNotation>
                         of our introductory prices, a<span className='bg-[url("/images/image4.png")] bg-no-repeat bg-bottom 2xl:pb-16 xl:pb-10 lg:pb-6 md:pb-6 pb-6 bg-contain'>vailable for a limited tim</span>e. 
                    </p>
                    <div>

                        {/* payment */}


                    </div>
                </div>
                <div>

                    {/* FAQ WILL GO HERE */}


                </div>
                <div className='py-12 font-poppins font-medium text-[#1d3f54] text-center'>
                    <p className='2xl:text-3xl xl:text-xl lg:text-lg'>Questions?</p>
                    <p className='2xl:text-xl xl:text-lg lg:text-base 2xl:mt-16 xl:mt-10'>Call us at 469.431.0809 or email us at teach@upliftk12.com</p>
                </div>
                <ContactUs/>
                {/* <div
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
                )} */}
            </div>
        </LandingLayout>
    )
}