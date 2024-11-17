import LandingLayout from '@/components/Layouts/LandingLayout'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head';
import ContactUs from "@/components/aboutuscomponents/ContactUs";

export default function MemberShipLayout({member_info, children}) {
    console.log(member_info);
    if (member_info == undefined || member_info.length == 0) {
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
                        <p className='text-center font-poppins text-[#1d3f54] font-medium 2xl:text-3xl xl:text-xl lg:text-lg'>take advantage 
                            {/* <RoughNotation show="true" type="circle" strokeWidth="2" color='#2C8CCC' padding="20px">
                                <nbsp/> advantage <nbsp/>
                            </RoughNotation> */}
                            &nbsp;of our introductory prices, a<span className='bg-[url("/images/image4.png")] bg-no-repeat bg-bottom 2xl:pb-8 xl:pb-5 lg:pb-6 md:pb-6 pb-6 bg-contain'>vailable for a limited tim</span>e. 
                        </p>
                        <div className='mt-10'>
                            {children}
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
                </div>
            </LandingLayout>
        )
    }
    return (
        <AppLayout title="Membership">
            {children}
        </AppLayout>
    )
}