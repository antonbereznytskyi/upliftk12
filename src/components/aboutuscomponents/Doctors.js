import React from 'react';

export default function Doctors(){
    
    return (
        <div className="2xl:py-20 xl:py-12 sm:py-6 py-3 2xl:px-40 xl:px-20 lg:px-10 md:px-5 px-2">
            <div className='grid sm:grid-cols-3 grid-cols-1 lg:gap-10 gap-3 2xl:px-20 px-12 font-poppins text-[#1d3f54] text-center '>
                <div>
                    <div className='px-10 py-16 bg-[#2c8ccc] relative'>
                        <img src='/images/aboutus/photo3.png' className='mx-auto block z-20 relative'/>
                        <img src='/images/aboutus/image14.png' className='absolute top-0 w-full left-0 h-40'/>
                        <img src='/images/aboutus/image14.png' className='absolute bottom-0 w-full left-0 h-40'/>
                    </div>    
                    <p className="font-medium xl:text-3xl lg:text-xl text-xl 2xl:my-10 xl:my-5 lg::my-2">Dr. Yan Ping Xin</p>
                    <p className='xl:text-xl lg:text-base sm:text-xs text-base 2xl:mb-14 xl:mb-6 lg:mb-6 xl:px-5 px-2'>Expertise: special education, mathematics problem solving</p>
                    <p className='xl:text-xl lg:text-base sm:text-xs text-base xl:px-10 px-3'>Professor of Education Purdue University</p>
                </div>
                <div>
                    <div className='px-10 py-16 bg-[#fcac1c] relative'>
                        <img src='/images/aboutus/photo4.png' className='mx-auto block z-20 relative'/>
                        <img src='/images/aboutus/image15.png' className='absolute top-0 w-1/6 right-5 h-20'/>
                        <img src='/images/aboutus/image16.png' className='absolute bottom-0 w-1/6 left-5 h-20'/>
                    </div>
                    <p className="font-medium xl:text-3xl lg:text-xl text-xl 2xl:my-10 xl:my-5 lg::my-2">Dr. Emily Bouck</p>
                    <p className='xl:text-xl lg:text-base sm:text-xs 2xl:mb-14 xl:mb-6 lg:mb-3  xl:px-5 px-2'>Expertise: mathematical interventions, virtual manipulatives </p>
                    <p className='xl:text-xl lg:text-base sm:text-xs xl:px-10 px-3'>Associate Dean of Research Michigan State University</p>
                </div>
                <div>
                    <div className='px-10 py-16 bg-[#1ca464] relative'>
                        <img src='/images/aboutus/photo5.png' className='mx-auto block z-20 relative'/>
                        <img src='/images/aboutus/image17.png' className='absolute top-0 w-full left-0 h-40'/>
                        <img src='/images/aboutus/image17.png' className='absolute bottom-0 w-full left-0 h-40'/>
                    </div>
                    <p className="font-medium xl:text-3xl lg:text-xl text-xl 2xl:my-10 xl:my-5 lg::my-2">Dr. Brad Witzel</p>
                    <p className='xl:text-xl lg:text-base sm:text-xs 2xl:mb-14 xl:mb-6 lg:mb-3  xl:px-5 px-2'>Expertise: special education, mathematics instruction and interventions </p>
                    <p className='xl:text-xl lg:text-base sm:text-xs xl:px-10 px-3'>Professor of Education Western Carolina University</p>
                </div>
            </div>
        </div>
    )
}