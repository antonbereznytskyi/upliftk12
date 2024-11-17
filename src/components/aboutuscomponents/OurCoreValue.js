import React from 'react';

export default function OurCoreValue(){
    
    return (
        <div>
            <p className='font-poppins font-bold 2xl:text-5xl xl:text-3xl lg:text-3xl md:text-xl text-center text-[#1d3f54] 2xl:mt-32 lg:mt-20 sm:mt-12 mt-12'>Our Core Values</p>
            <img src='/images/aboutus/image4.png' className='block mx-auto 2xl:mb-32 lg:mb-20 sm:mb-12 mb-8'/>
            <div className="bg-[#1c3c54] xl:px-40 lg:px-20 md:px-10">
                <div className='grid sm:grid-cols-3 grid-cols-1 sm:gap-10 gap-3 text-center sm:py-20 py-5'>
                    <div>
                        <img src='/images/aboutus/image5.png' className='block mx-auto w-2/5'/>
                        <p className='text-white 2xl:text-3xl xl:text-xl lg:text-base md:text-sm sm:text-xs text-xl sm:px-18 px-10 py-10'>Teachers and students are at the center of what we do. </p>
                    </div>
                    <div>
                        <img src='/images/aboutus/image6.png' className='block mx-auto w-2/5'/>
                        <p className='text-white 2xl:text-3xl xl:text-xl lg:text-base md:text-sm sm:text-xs text-xl sm:px-18 px-4 py-4 sm:mt-4'>Teachers know their students better than any software program. Our tools work hand in hand with teachers. </p>
                    </div>
                    <div>
                        <img src='/images/aboutus/image7.png' className='block mx-auto w-2/5'/>
                        <p className='text-white  2xl:text-3xl xl:text-xl lg:text-base md:text-sm sm:text-xs text-xl sm:px-18 px-10 py-5 lg:mt-0'>Virtual manipulatives are for all students and deserve a place in tier 1 instruction. </p>
                    </div>
                </div>
            </div>
        </div>
    )
}