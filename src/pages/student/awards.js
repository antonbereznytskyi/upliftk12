import AppLayout from "@/components/student/Layouts/AppLayout";
import { useEffect, useState } from "react";
import Image from "next/future/image";
import Head from "next/head";
import { useAuth } from '@/hooks/auth'

export default function Awards(){

    
    const { user } = useAuth({ middleware: 'auth' })
    const [loading, setLoading ] = useState(false);

    useEffect(() => {
        let timer = setTimeout(() => {
            setLoading(true);
        }, 2000)
        return () => {
            clearTimeout(timer);
        }
    }, []);

    return (
        <div>
            <AppLayout>
                <Head>
                    <title>Awards</title>
                </Head>
                <div  className="absolute top-[350px] left-28">
                    <Image src={'/images/student/Yasmin the Yeti 2.png'} width={350} height={0} layout="responsive"/>
                </div>
                <div className='absolute top-44 left-80'>
                    <Image src={'/images/student/Speech Bubble2.png'} width={400} height={0} layout="responsive" className='fixed z-0'/>
                    <div className='z-10 relative px-7 p-5 text-primary font-poppins'>
                        <p className='text-3xl font-bold'>Hi {user?.lname}!</p>
                        <p className='py-5 text-2xl font-medium flex'>You're Doing Great!
                            <span>
                                <Image src={'/images/student/emojione_fire.png'} width={30} height={0} layout="responsive" className='ml-5 z-0'/>
                            </span>
                        </p>
                    </div>
                </div>
                <div className="absolute top-44 right-96 bg-white rounded-lg border border-[#2F8DCC] py-6 px-14">
                    <Image src={'/images/student/Gem con.png'} width={50} height={0} layout="responsive" className="block mx-auto"/>
                    <p className="text-center font-bold text-2xl text-[#1B3F54]">You have 80 Gems</p>
                </div>

                <div className="grid grid-cols-2 mt-64 ml-[500px] mr-96 gap-5">
                    <div className="rounded-lg bg-white border border-[#2F8DCC] border-opacity-50 p-5">
                        <p className="text-2xl font-bold text-[#1B3F54] mb-2">Awards</p>
                        <div className="grid grid-cols-3 gap-5">
                            <div>
                                <Image src={'/images/student/Good Citzen.png'} width={100} height={0} layout="responsive" className="block mx-auto w-full"/>
                                <p className="text-center text-lg text-[#1B3F54]">Top in Class</p>
                            </div>
                            <div>
                                <Image src={'/images/student/Leadership.png'} width={100} height={0} layout="responsive" className="block mx-auto w-full"/>
                                <p className="text-center text-lg text-[#1B3F54]">Top in Class</p>
                            </div>
                            <div>
                                <Image src={'/images/student/Help icon.png'} width={100} height={0} layout="responsive" className="block mx-auto w-full"/>
                                <p className="text-center text-lg text-[#1B3F54]">Top in Class</p>
                            </div>
                            <div>
                                <Image src={'/images/student/Friendship.png'} width={100} height={0} layout="responsive" className="block mx-auto w-full"/>
                                <p className="text-center text-lg text-[#1B3F54]">Top in Class</p>
                            </div>
                            <div>
                                <Image src={'/images/student/Frame 34784.png'} width={100} height={0} layout="responsive" className="block mx-auto w-full"/>
                                <p className="text-center text-lg text-[#1B3F54]">Top in Class</p>
                            </div>
                            <div>
                                <Image src={'/images/student/Frame 157.png'} width={100} height={0} layout="responsive" className="block mx-auto w-full"/>
                                <p className="text-center text-lg text-[#1B3F54]">Top in Class</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white border border-[#2F8DCC] border-opacity-50 p-5">
                        <p className="text-2xl font-bold text-[#1B3F54] mb-2">Strengths</p>
                        <div className="grid grid-cols-3 gap-5">
                            <div>
                                <Image src={'/images/student/Organized.png'} width={100} height={0} layout="responsive" className="block mx-auto w-full"/>
                                <p className="text-center text-lg text-[#1B3F54]">Organized</p>
                            </div>
                            <div>
                                <Image src={'/images/student/Math.png'} width={100} height={0} layout="responsive" className="block mx-auto w-full"/>
                                <p className="text-center text-lg text-[#1B3F54]">Problem Solver</p>
                            </div>
                            <div>
                                <Image src={'/images/student/Team work.png'} width={100} height={0} layout="responsive" className="block mx-auto w-full"/>
                                <p className="text-center text-lg text-[#1B3F54]">Good Team Player </p>
                            </div>
                            <div>
                                <Image src={'/images/student/Help.png'} width={100} height={0} layout="responsive" className="block mx-auto w-full"/>
                                <p className="text-center text-lg text-[#1B3F54]">Asks for Help</p>
                            </div>
                            <div>
                                <Image src={'/images/student/Frame 34783.png'} width={100} height={0} layout="responsive" className="block mx-auto w-full"/>
                                <p className="text-center text-lg text-[#1B3F54]">Respectful</p>
                            </div>
                            <div>
                                <Image src={'/images/student/Computer.png'} width={100} height={0} layout="responsive" className="block mx-auto w-full"/>
                                <p className="text-center text-lg text-[#1B3F54]">Computer Wiz</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>

            <div className={!loading ? 'backdrop-blur-sm bg-white/30 w-full h-full fixed z-50 left-0 top-0' : ''}>
            </div>
            {loading ?  '' : 
                <div className="text-center fixed transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 z-50">
                    <div role="status">
                        <svg className="inline mr-2 w-36 h-36 text-gray-200 animate-spin dark:text-gray-600 fill-green-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className='absolute left-[0.6rem] top-[0.6rem]'>
                        <Image src="/logos/small-logo.png" width={124} height={0} layout='response' className="mx-auto"></Image>
                    </div>
                </div>
            }
        </div>
    )
}