import React from 'react';

export default function AboutMember(){
    
    return (
        <div className='2xl:py-32 lg:py-24 sm:py-16 py-10 2xl:px-56 xl:px-32 lg:px-16 md:px-10 sm:px-3 px-5'>
            <div className='sm:flex grid'>
                <div className='bg-[#2c8ccc] sm:w-2/5 w-full 2xl:py-40 xl:py-28 lg:py-10 md:py-5 sm:py-3 py-5'>
                    <img src='/images/aboutus/photo1.png' className='w-4/5 block mx-auto'/>
                </div>
                <div className='sm:w-3/5 w-full text-center xl:pt-28 lg:pt-10 md:pt-5 sm:pt-2 font-poppins text-[#1d3f54]'>
                    <p className='xl:text-5xl lg:text-2xl md:text-xl sm:text-lg text-xl font-extrabold'>Michelle Garces </p>
                    <p className='xl:text-3xl lg:text-lg md:text-base sm:text-sm text-base font-medium xl:mb-10 lg:mb-4 xl:mt-6 lg:mt-3 sm:mt-1'>Managing Director</p>
                    <p className='xl:text-xl lg:text-base md:text-sm sm:text-xs text-sm 2xl:px-28 xl:px-10 lg:px-10 md:px-6 sm:px-2 text-start'>
                        Michelle Garces is a founding member and the Managing Director of Uplift K12.  She is a product of Houston public schools and a graduate of UT Austin. Her full circle moment was becoming a teacher at inner city Houston schools, where her primary focus was Montessori education. Michelle credits her Montessori experience for her love of math manipulatives and hands on instruction. 
                    </p>
                </div>
            </div>
            <div className='sm:flex grid 2xl:-mt-20 xl:-mt-10 lg:-mt-10 md:-mt-6'>
                <div className='sm:w-3/5 w-full text-center 2xl:pt-40 xl:pt-28 lg:pt-16 md:pt-6 sm:pt-3 font-poppins text-[#1d3f54] sm:order-1 order-2'>
                    <p className='xl:text-5xl lg:text-2xl md:text-xl sm:text-lg text-xl font-extrabold'>John  Gatica </p>
                    <p className='xl:text-3xl lg:text-lg md:text-base sm:text-sm text-base font-medium xl:mb-10 lg:mb-4 xl:mt-6 lg:mt-3 md:mt-3'>Sales</p>
                    <p className='xl:text-xl lg:text-base md:text-sm sm:text-xs text-sm 2xl:px-28 lg:px-16 md:px-16 sm:px-6 text-start'>
                        John leads sales at Uplift K12 with over 30 years of experience as a school administrator and sales lead. John is passionate about student equity and helping students reach their full potential. During his free time he serves as a college and career readiness mentor for students in under served rural communities.
                    </p>
                </div>
                <div className='bg-[#fcac1c] sm:w-2/5 w-full 2xl:pt-60 xl:pt-32 lg:pt-20 md:pt-16 sm:pt-10 lg:pb-20 md:pb-10 py-5 sm:pb-6 sm:order-2 order-1'>
                    {/* <video src='/movie/sun.mp4' autoPlay  type="/video/mp4" className='absolute'/> */}
                    <img src='/images/aboutus/photo2.png' className='w-4/5 block mx-auto'/>
                </div>
            </div>
            <div className='sm:flex grid 2xl:-mt-20 xl:-mt-10 lg:-mt-10 md:-mt-6'>
                <div className='bg-[#1ca464] sm:w-2/5 w-full 2xl:py-40 xl:py-28 lg:py-10 md:py-5 sm:py-3 py-5'>
                    <img src='/images/aboutus/photo6.png' className='w-4/5 block mx-auto'/>
                </div>
                <div className='sm:w-3/5 w-full text-center xl:pt-36 lg:pt-20 md:pt-16 sm:pt-10 font-poppins text-[#1d3f54]'>
                    <p className='xl:text-5xl lg:text-2xl md:text-xl sm:text-lg text-xl font-extrabold'>Jin</p>
                    <p className='xl:text-3xl lg:text-lg md:text-base sm:text-sm text-base font-medium xl:mb-10 lg:mb-4 xl:mt-6 lg:mt-3 sm:mt-1'>Technology</p>
                    <p className='xl:text-xl lg:text-base md:text-sm sm:text-xs text-sm 2xl:px-28 xl:px-10 lg:px-10 md:px-6 sm:px-2 text-start'>
                        Jin leads technology and software development at Uplift K12. He enjoys tinkering, building, and problem solving while he codes.  
                    </p>
                </div>
            </div>
        </div>
    )
}