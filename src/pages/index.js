import LandingLayout from '@/components/Layouts/LandingLayout'
import Head from 'next/head'
import About from '@/components/About'
import SayingCarousel from '@/components/Carousel/SayingCarousel'
import { Component, useEffect } from 'react'
import { useAuth } from '@/hooks/auth'
import LessonsModal from '@/components/modal/LessonsModal'
import GamesModal from '@/components/modal/GamesModal'
import LearnMoreModal from '@/components/modal/LearnMoreModal'
import WatchTutorialsModal from '@/components/modal/WatchTutorialsModal'
import { collect } from '@/hooks/collect'
import Link from 'next/link'
import ContactUs from "@/components/aboutuscomponents/ContactUs";

class Dashbord1 extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            lessonModalShow: false,
            gamesModalShow: false,
            learnMoreModalShow: false,
            watchTutorialsShow: false,
        }

        const { updateLandingPageVisit } = collect();
        updateLandingPageVisit();

        this.handleLessons = this.handleLessons.bind(this)
        this.handleGames = this.handleGames.bind(this)
        this.handleLearnMore = this.handleLearnMore.bind(this)
        this.handleWatchTutorials = this.handleWatchTutorials.bind(this)

    }

    handleWatchTutorials() {
        this.setState({
            watchTutorialsShow: true,
        })
    }
    handleLearnMore() {
        this.setState({
            learnMoreModalShow: true,
        })
    }
    handleGames() {
        this.setState({
            gamesModalShow: true,
        })
    }
    handleLessons() {
        this.setState({
            lessonModalShow: true,
        })
    }
    render() {
        return (
            <LandingLayout>
                <Head>
                    <title>Landing Page</title>
                    <link
                        href="https://fonts.googleapis.com/css?family=Poppins"
                        rel="stylesheet"></link>
                    <meta
                        charset="utf-8"
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"></meta>
                </Head>

                <div className="w-full h-full bg-white">
                    {/* -----------------------Body----------------------- */}

                    <div className="select-none">
                        <div className="w-full text-center lg:pb-28 pb-10">
                            <img
                                className="absolute lg:w-full w-[1000px] h-[200px] lg:h-auto lg:-translate-y-20 -translate-y-5 z-0"
                                src="../images/background-1.png"></img>
                            <p className="2xl:text-6xl lg:text-5xl sm:text-3xl md:text-4xl text-2xl font-poppins font-bold text-sky-900 lg:mt-20 mt-5 relative">
                                Welcome to Uplift K12!
                            </p>
                            <img
                                className="lg:mt-7 mt-3 block mx-auto relative lg:w-auto sm:w-2/5 w-40"
                                src="../images/image1.png"
                            />
                            <p className="font-poppins text-sky-900 lg:text-2xl md:text-xl sm:text-base text-lg lg:mt-7 mt-3 relative px-10">
                                Multiplayer games and activities in a digital
                                library for pre-k to 8.
                            </p>
                            <p className="hidden lg:block 2xl:text-9xl lg:text-7xl font-bold font-poppins text-sky-600 absolute rotate-[20deg] z-10 lg:left-[60px] lg:top-[200px] text-5xl left-[10px] top-[100px]">
                                {' '}
                                ={' '}
                            </p>
                            <p className="hidden lg:block 2xl:text-8xl lg:text-6xl font-bold font-poppins text-sky-700 absolute rotate-[10deg] lg:right-24 lg:top-52 text-5xl right-[10px] top-[100px]">
                                5
                            </p>
                            <p className="hidden lg:block 2xl:text-8xl lg:text-6xl font-bold font-poppins text-green-600 absolute z-10 2xl:left-72 lg:left-40 lg:top-[230px] text-5xl left-[40px] top-[110px] animate-rotate-4">
                                4
                            </p>
                            <p className="hidden lg:block 2xl:text-9xl lg:text-7xl text-5xl font-bold font-poppins text-red-500 z-10 absolute 2xl:right-[300px] lg:right-[200px] lg:top-[250px] right-[40px] top-[110px] animate-rotate-pluse">
                                +
                            </p>
                            {/* share image */}
                            <svg
                                className="hidden lg:block z-10 absolute lg:right-[120px] lg:top-[400px] xl:top-[400px] animate-rotate-share 2xl:w-16 2xl:h-16 lg:w-12 lg:h-12 w-8 h-auto right-[30px] top-[170px]"
                                viewBox="0 0 64 64"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M64 24L0 24L0 40L64 40V24Z"
                                    fill="#FAA91C"
                                />
                                <path
                                    d="M24 8C24 12.4183 27.5817 16 32 16C36.4183 16 40 12.4183 40 8C40 3.58172 36.4183 0 32 0C27.5817 0 24 3.58172 24 8Z"
                                    fill="#FAA91C"
                                />
                                <path
                                    d="M24 56C24 60.4183 27.5817 64 32 64C36.4183 64 40 60.4183 40 56C40 51.5817 36.4183 48 32 48C27.5817 48 24 51.5817 24 56Z"
                                    fill="#FAA91C"
                                />
                            </svg>
                            {/* middle triangle */}
                            <svg
                                className="hidden lg:block z-10 absolute lg:left-[30px] lg:top-[420px] animate-rotate-circle 2xl:w-16 lg:w-12 w-7 left-[10px]"
                                viewBox="0 0 56 52"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M52.021 0.959652C54.1024 0.713283 55.6701 2.81255 54.8427 4.73833L35.2961 50.2349C34.4687 52.1607 31.8669 52.4687 30.6128 50.7893L0.984875 11.1131C-0.269216 9.4337 0.764995 7.02647 2.84646 6.7801L52.021 0.959652Z"
                                    fill="#FAA91C"
                                />
                            </svg>
                            {/* small triangle */}
                            <svg
                                className="hidden lg:block z-10 absolute lg:left-[130px] lg:top-[380px] animate-rotate-circle 2xl:w-10 lg:w-6 w-5 left-[50px] top-[180px]"
                                viewBox="0 0 33 35"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.37686 34.1748C1.15689 34.6744 -0.146461 33.666 0.0308263 32.3597L4.21927 1.49739C4.39656 0.191049 5.92151 -0.433496 6.9642 0.373211L31.5975 19.4317C32.6402 20.2384 32.4186 21.8713 31.1986 22.3709L2.37686 34.1748Z"
                                    fill="#FAA91C"
                                />
                            </svg>
                            {/* large triangle */}
                            <svg
                                className="hidden lg:block z-10 absolute lg:left-[100px] lg:top-[430px] xl:top-[440px] animate-rotate-circle 2xl:w-32 lg:w-24 w-12 left-[40px] top-[200px]"
                                viewBox="0 0 111 98"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M50.7412 2.74753C52.8562 -0.915839 58.1438 -0.915844 60.2589 2.74752L110.227 89.2946C112.342 92.9579 109.698 97.5371 105.468 97.5371H5.53206C1.30197 97.5371 -1.34184 92.9579 0.773203 89.2946L50.7412 2.74753Z"
                                    fill="#FAA91C"
                                />
                            </svg>
                            {/* green dot pan */}
                            <img
                                className="hidden lg:block absolute lg:right-7 lg:top-[450px] right-5 animate-dot_pan 2xl:w-auto lg:w-24 w-20"
                                src="../images/image2.png"></img>

                            <About />

                            {/* red dot pan */}
                            <img
                                className="hidden lg:block absolute lg:left-16 lg:top-[1100px] left-5 top-[550px] animate-dot_pan 2xl:w-auto lg:w-24 w-20"
                                src="../images/image3.png"></img>
                            {/* middle triangle */}
                            <svg
                                className="hidden lg:block z-10 absolute 2xl:right-[30px] lg:-right-[10px] lg:top-[1100px] 2xl:w-16 lg:w-12 w-7 right-2 bottom-[50px] animate-rotate-circle"
                                width="56"
                                height="52"
                                viewBox="0 0 56 52"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M52.021 0.959652C54.1024 0.713283 55.6701 2.81255 54.8427 4.73833L35.2961 50.2349C34.4687 52.1607 31.8669 52.4687 30.6128 50.7893L0.984875 11.1131C-0.269216 9.4337 0.764995 7.02647 2.84646 6.7801L52.021 0.959652Z"
                                    fill="#FAA91C"
                                />
                            </svg>
                            {/* small triangle */}
                            <svg
                                className="hidden lg:block z-10 absolute lg:right-[70px] xl:top-[1300px] lg:top-[1180px] animate-rotate-circle 2xl:w-10 lg:w-6 w-5 right-10 bottom-[50px]"
                                width="33"
                                height="35"
                                viewBox="0 0 33 35"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.37686 34.1748C1.15689 34.6744 -0.146461 33.666 0.0308263 32.3597L4.21927 1.49739C4.39656 0.191049 5.92151 -0.433496 6.9642 0.373211L31.5975 19.4317C32.6402 20.2384 32.4186 21.8713 31.1986 22.3709L2.37686 34.1748Z"
                                    fill="#FAA91C"
                                />
                            </svg>
                            {/* large triangle */}
                            <svg
                                className="hidden lg:block z-10 absolute lg:right-[100px] lg:top-[1080px] xl:top-[1200px] animate-rotate-circle 2xl:w-32 lg:w-24 w-12 right-0 bottom-[70px]"
                                width="111"
                                height="98"
                                viewBox="0 0 111 98"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M50.7412 2.74753C52.8562 -0.915839 58.1438 -0.915844 60.2589 2.74752L110.227 89.2946C112.342 92.9579 109.698 97.5371 105.468 97.5371H5.53206C1.30197 97.5371 -1.34184 92.9579 0.773203 89.2946L50.7412 2.74753Z"
                                    fill="#FAA91C"
                                />
                            </svg>
                        </div>

                        <div className="w-full bg-sky-600 lg:py-20 py-5 text-center">
                            <p
                                className="cursor-pointer text-white 2xl:text-6xl lg:text-5xl md:text-3xl sm:text-2xl text-xl lg:px-auto px-6 font-poppins font-bold"
                                onClick={() => {
                                    window.scrollTo({
                                        top: 3350,
                                        left: 0,
                                        behavior: 'smooth',
                                    })
                                }}>
                                Benefits for Schools, Tutors, and Students
                            </p>
                            <img
                                className="block mx-auto lg:my-10 my-3 lg:w-auto md:w-80 sm:w-60 w-40"
                                src="../images/image4.png"></img>
                            <p className="text-white font-poppins lg:text-2xl md:text-xl sm:text-base text-sm px-6 w-3/4 block mx-auto">
                                Uplift K12 gets to the root of math anxiety and
                                boosts students' confidence for improved
                                learning outcomes.
                            </p>
                        </div>
                        <div className="w-3/4 bg-white xl:px-20 block mx-auto lg:pt-16 lg:pb-24 pb-5 font-poppins">
                            <div className="md:flex grid md:items-center">
                                <div className="md:w-1/2 w-full lg:pr-10 md:pt-7 pt-5 md:order-1 order-2 text-center md:text-start">
                                    <p className="lg:text-3xl md:text-xl sm:text-2xl text-xl font-bold text-sky-900">
                                        Teachers and Tutors
                                    </p>
                                    <p className="lg:text-xl md:text-lg sm:text-xl text-base font-bold text-sky-600 lg:mt-5 mt-2">
                                        Keep Students Engaged
                                    </p>
                                    <p className="lg:text-base md:text-sm text-xs sm:text-base lg:mt-3 mt-0 md:leading-6 leading-6 lg:pr-20 md:pl-0 px-6">
                                        When teaching, the educator has the
                                        ability to monitor student engagement to
                                        mimic an in-person experience.
                                    </p>
                                    <div className=" inline-flex lg:flex lg:mt-5 mt-2">
                                        <div className="rounded-full bg-[#1BA361] lg:w-3 lg:h-3 lg:mr-3 sm:w-3 sm:h-3 w-2 h-2 mr-1"></div>
                                        <div className="rounded-full bg-[#FAA91C] lg:w-3 lg:h-3 lg:mr-3 sm:w-3 sm:h-3 w-2 h-2 mr-1"></div>
                                        <div className="rounded-full bg-[#FAA91C] lg:w-3 lg:h-3 sm:w-3 sm:h-3 w-2 h-2"></div>
                                    </div>
                                </div>
                                <div className="md:w-1/2 w-full md:order-2 order-1">
                                    <img
                                        className="lg:w-auto w-3/4 block mx-auto"
                                        src="../images/image5.png"
                                    />
                                </div>
                            </div>
                            <div className="md:flex lg:mt-10 mt-5 grid md:items-center">
                                <div className="md:w-1/2 w-full">
                                    <img
                                        className="lg:w-auto w-3/4 lg:mx-0 block mx-auto"
                                        src="../images/image6.png"></img>
                                </div>
                                <div className="md:w-1/2 w-full lg:pr-10 md:pt-7 pt-5 md:order-1 order-2 text-center md:text-start lg:pl-10">
                                    <p className="lg:text-3xl md:text-xl sm:text-2xl text-xl font-bold text-sky-900">
                                        Schools
                                    </p>
                                    <p className="lg:text-xl md:text-lg sm:text-xl text-base font-bold text-sky-600 lg:mt-5 mt-2">
                                        Budget-Friendly
                                    </p>
                                    <p className="lg:text-base md:text-sm text-xs sm:text-base lg:mt-3 mt-0 md:leading-6 leading-6 lg:pr-0 md:pl-0 px-6">
                                        Our individual educator plans and
                                        enterprise plan ensure that we can
                                        support your school, no matter the
                                        budget. The school plan includes
                                        Professional Development.
                                    </p>
                                    <div className="inline-flex lg:flex lg:mt-5 mt-2">
                                        <div className="rounded-full bg-[#1BA361] lg:w-3 lg:h-3 lg:mr-3 sm:w-3 sm:h-3 w-2 h-2 mr-1"></div>
                                        <div className="rounded-full bg-[#FAA91C] lg:w-3 lg:h-3 lg:mr-3 sm:w-3 sm:h-3 w-2 h-2 mr-1"></div>
                                        <div className="rounded-full bg-[#FAA91C] lg:w-3 lg:h-3 lg:mr-3 sm:w-3 sm:h-3 w-2 h-2 mr-1"></div>
                                        <div className="rounded-full bg-[#FAA91C] lg:w-3 lg:h-3 lg:mr-3 sm:w-3 sm:h-3 w-2 h-2 mr-1"></div>
                                        <div className="rounded-full bg-[#FAA91C] lg:w-3 lg:h-3 lg:mr-3 sm:w-3 sm:h-3 w-2 h-2 mr-1"></div>
                                        <div className="rounded-full bg-[#FAA91C] lg:w-3 lg:h-3 sm:w-3 sm:h-3 w-2 h-2"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="md:flex grid lg:mt-10 mt-5 md:items-center">
                                <div className="md:w-1/2 w-full lg:pr-10 md:pt-7 pt-5 md:order-1 order-2 text-center md:text-start">
                                    <p className="lg:text-3xl md:text-xl sm:text-2xl text-xl font-bold text-sky-900">
                                        Students
                                    </p>
                                    <p className="lg:text-xl md:text-lg sm:text-xl text-base font-bold text-sky-600 lg:mt-5 mt-2">
                                        Eliminates Math Anxiety
                                    </p>
                                    <p className="lg:text-base md:text-sm text-xs sm:text-base lg:mt-3 mt-0 md:leading-6 leading-6 lg:pr-20 md:pl-0 px-6">
                                        This is important to us. We believe that
                                        students, as well as adults, suffer from
                                        math anxiety. Our tool can help relieve
                                        that anxiety by providing multiple
                                        approaches to a single problem.
                                    </p>
                                    <div className=" inline-flex lg:flex lg:mt-5 mt-2">
                                        <div className="rounded-full bg-[#1BA361] lg:w-3 lg:h-3 lg:mr-3 sm:w-3 sm:h-3 w-2 h-2 mr-1"></div>
                                        <div className="rounded-full bg-[#FAA91C] lg:w-3 lg:h-3 lg:mr-3 sm:w-3 sm:h-3 w-2 h-2 mr-1"></div>
                                        <div className="rounded-full bg-[#1BA361] lg:w-3 lg:h-3 sm:w-3 sm:h-3 w-2 h-2"></div>
                                    </div>
                                </div>
                                <div className="md:w-1/2 w-full md:order-2 order-1 md:mt-10">
                                    <img
                                        className="lg:w-auto w-3/4 block mx-auto"
                                        src="../images/image7.png"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full bg-white text-right">
                            <div className=" bg-sky-900 text-center xl:pt-20 lg:pt-12 xl:pb-40 lg:pb-20 pt-5 pb-5 lg:w-11/12 w-full inline-block">
                                <p
                                    className="text-white lg:text-5xl 2xl:text-7xl md:text-4xl sm:text-3xl text-xl font-bold font-poppins cursor-pointer"
                                    onClick={() => {
                                        window.scrollTo({
                                            top:
                                                document.documentElement
                                                    .scrollHeight,
                                            left: 0,
                                            behavior: 'smooth',
                                        })
                                    }}>
                                    What Others are Saying
                                </p>
                                <img
                                    className="inline-block lx:my-16 lg:my-10 my-3 sm:w-2/5 w-1/2 xl:w-1/3"
                                    src="../images/image4.png"></img>
                                <div className=" w-10/12 sm:w-11/12 lg:w-4/5 2xl:w-2/3 z-20 relative block mx-auto">
                                    <SayingCarousel />
                                </div>

                                <p className=" lg:block hidden 2xl:text-8xl xl:text-6xl lg:text-4xl text-8xl font-bold font-poppins text-sky-600 absolute rotate-[10deg] 2xl:left-[350px] 2xl:top-[3450px] xl:left-[200px] xl:top-[3350px] left-[150px] top-[3200px]">
                                    5
                                </p>
                                <img
                                    className="lg:block 2xl:w-auto lg:w-24 hidden absolute 2xl:right-[200px] xl:top-[3350px] right-[40px] top-[3200px] animate-dot_pan"
                                    src="../images/image3.png"></img>
                                <img
                                    className="lg:block 2xl:w-auto lg:w-24 hidden absolute left-[130px] 2xl:left-[350px] xl:top-[3800px] xl:left-[170px] lg:top-[3550px] animate-dot_pan"
                                    src="../images/image8.png"></img>
                                <p className="lg:block hidden 2xl:text-9xl xl:text-7xl lg:text-5xl text-9xl font-bold font-poppins text-red-500 z-10 absolute 2xl:left-52 left-24 xl:top-[3600px] top-[3350px] animate-rotate-pluse">
                                    +
                                </p>
                                <svg
                                    className="lg:block lg:w-8 2xl:w-20 xl:w-10 hidden z-10 absolute 2xl:left-[600px] 2xl:top-[4050px] xl:left-[300px] xl:top-[3950px] left-[200px] lg:top-[3600px] animate-rotate-share"
                                    viewBox="0 0 64 64"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M64 24L0 24L0 40L64 40V24Z"
                                        fill="#FAA91C"
                                    />
                                    <path
                                        d="M24 8C24 12.4183 27.5817 16 32 16C36.4183 16 40 12.4183 40 8C40 3.58172 36.4183 0 32 0C27.5817 0 24 3.58172 24 8Z"
                                        fill="#FAA91C"
                                    />
                                    <path
                                        d="M24 56C24 60.4183 27.5817 64 32 64C36.4183 64 40 60.4183 40 56C40 51.5817 36.4183 48 32 48C27.5817 48 24 51.5817 24 56Z"
                                        fill="#FAA91C"
                                    />
                                </svg>
                                <p className="lg:block hidden 2xl:text-8xl xl:text-6xl text-5xl font-bold font-poppins text-green-600 absolute z-10 2xl:right-[480px] xl:right-40 xl:top-[3950px] lg:right-20 2xl:top-[4050px] lg:top-[3600px] animate-rotate-4">
                                    4
                                </p>
                                <p className="lg:block hidden 2xl:text-9xl xl:text-6xl text-5xl font-bold font-poppins text-sky-600 absolute rotate-[20deg] z-10 2xl:right-[140px] lg:top-[3400px] xl:right-[40px] xl:top-[3700px] right-[20px] top-[3500px]">
                                    {' '}
                                    ={' '}
                                </p>
                            </div>
                        </div>

                        <div className="w-full lg:py-20 py-5 text-center">
                            <p className="font-poppins font-bold lg:text-5xl md:text-4xl sm:text-3xl text-xl text-sky-900">
                                Awards We've Received
                            </p>
                            <div className=" mx-12 xl:mx-20 2xl:mx-60 lg:my-10 my-3 grid grid-cols-4 justify-between text-center gap-8 lg:gap-40">
                                <div className=" col-span-2 lg:col-span-1">
                                    <img
                                        className="lg:h-30 h-auto lg:w-auto w-48 my-2 block mx-auto"
                                        src="../images/landing-awards/award1.jpg"></img>
                                </div>
                                <div className=" col-span-2 lg:col-span-1">
                                    <img
                                        className="lg:h-30 h-auto lg:w-auto w-48 my-2 block mx-auto"
                                        src="../images/landing-awards/award2.jpg"></img>
                                </div>
                                <div className=" col-span-2 lg:col-span-1">
                                    <img
                                        className="lg:h-30 h-auto lg:w-auto w-48 my-2  block mx-auto"
                                        src="../images/landing-awards/award3.png"></img>
                                </div>
                                <div className=" col-span-2 lg:col-span-1">
                                    <img
                                        className="lg:h-30 h-auto lg:w-auto w-48 my-2  block mx-auto"
                                        src="../images/landing-awards/award4.png"></img>
                                </div>
                            </div>
                        </div>
                        <ContactUs/>
                    </div>
                    <LessonsModal
                        lessonModalShow={this.state.lessonModalShow}
                        onClose={() => {
                            this.setState({ lessonModalShow: false })
                        }}
                    />
                    <GamesModal
                        gamesModalShow={this.state.gamesModalShow}
                        onClose={() => {
                            this.setState({ gamesModalShow: false })
                        }}
                    />
                    <LearnMoreModal
                        learnMoreModalShow={this.state.learnMoreModalShow}
                        onClose={() => {
                            this.setState({ learnMoreModalShow: false })
                        }}
                    />
                    <WatchTutorialsModal
                        watchTutorialsShow={this.state.watchTutorialsShow}
                        onClose={() => {
                            this.setState({ watchTutorialsShow: false })
                        }}
                    />
                </div>
            </LandingLayout>
        )
    }
}

export default Dashbord1
