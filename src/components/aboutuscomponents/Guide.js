import React from 'react';

export default function Guide(){
    
    return (
        <div className="2xl:py-20 lg:py-12 py-5 2xl:px-40 xl:px-7 px-2 font-poppins text-[#1d3f54] text-center">
            <p className="xl:text-5xl lg:text-3xl md:text-xl sm:text-xl text-xl">Guided by Research</p>
            <img src='/images/aboutus/image9.png' className='block mx-auto lg:my-10 my-3'/>
            <div className='grid sm:grid-cols-3 grid-cols-1 lg:px-20 px-3 lg:gap-20 md:gap-10 gap-3 text-start'>
                <div className='relative'>
                    <div className='bg-[#1c3c54] 2xl:py-10 xl:py-5 lg:py-3 2xl:px-20 xl:px-10 lg:px-10 md:px-5 px-2 py-2 xl:h-[350px] lg:h-[250px] md:h-[200px] sm:h-[150px] flex items-center'>
                        <img src='/images/aboutus/image10.png' className='block mx-auto md:w-40 w-32'/>
                    </div>
                    <p className='font-medium xl:text-2xl lg:text-lg xl:mt-10 xl:mb-7 lg:mt-6 lg:mb-3'>Research article</p>
                    <p className='2xl:text-xl xl:text-lg lg:text-base text-sm'>
                        Using CRA to Teach Algebra to Students with Math Difficulties in Inclusive Settings
                    </p>
                    <button className="block mx-auto rounded-lg bg-[#2c8ccc] px-7 py-2 text-white underline mt-3 sm:absolute -bottom-20 left-1/2 transform sm:-translate-x-1/2 sm:text-base text-sm">Download</button>
                </div>
                <div className='relative'>
                    <div className='bg-[#1c3c54] 2xl:py-10 xl:py-5 2xl:px-6 xl:px-3 px-2 xl:h-[350px] lg:h-[250px] md:h-[200px] sm:h-[150px] flex items-center'>
                        <img src='/images/aboutus/image11.png' className='block mx-auto'/>
                    </div>
                    <p className='font-medium xl:text-2xl lg:text-lg xl:mt-10 xl:mb-7 lg:mt-6 lg:mb-3'>Research article</p>
                    <p className='2xl:text-xl xl:text-lg lg:text-base text-sm'>
                        Teaching Students to Solve Subtraction Problems Online via the Virtual-Representational-Abstract Instructional Sequence
                    </p>
                    <button className="block mx-auto rounded-lg bg-[#2c8ccc] px-7 py-2 text-white underline mt-3 sm:absolute -bottom-20 left-1/2 transform sm:-translate-x-1/2 sm:text-base text-sm">Download</button>
                </div>
                <div className='relative'>
                    <div className='bg-[#1c3c54] xl:py-5 2xl:px-6 xl:px-3 px-2 xl:h-[350px] lg:h-[250px] md:h-[200px] sm:h-[150px] flex items-center'>
                        <img src='/images/aboutus/image12.png' className='block mx-auto'/>
                    </div>
                    <p className='font-medium xl:text-2xl lg:text-lg xl:mt-10 xl:mb-7 lg:mt-6 lg:mb-3'>Research article</p>
                    <p className='2xl:text-xl xl:text-lg lg:text-base text-sm'>
                    Effects of Mathematical Word Problem–Solving Instruction on Middle School Students with Learning Problems
                    </p>
                    <button className="block mx-auto rounded-lg bg-[#2c8ccc] px-7 py-2 text-white underline mt-3 sm:absolute -bottom-20 left-1/2 transform sm:-translate-x-1/2 sm:text-base text-sm">Download</button>
                </div>
            </div>
        </div>
    )
}