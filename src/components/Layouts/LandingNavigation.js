import React, { Component } from 'react'
import LessonsModal from '@/components/modal/LessonsModal'
import GamesModal from '@/components/modal/GamesModal'
import LearnMoreModal from '@/components/modal/LearnMoreModal'
import WatchTutorialsModal from '@/components/modal/WatchTutorialsModal'
import Link from 'next/link'
import Swal from 'sweetalert2'
import axios from '@/lib/axios'
import Router, { useRouter } from 'next/router'

export default class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            navbarOpen: false,
            watchTutorialsShow: false,
            learnMoreModalShow: false,
            gamesModalShow: false,
            lessonModalShow: false,
            classCode: ""
        }
        this.handleLessons = this.handleLessons.bind(this)
        this.handleGames = this.handleGames.bind(this)
        this.handleLearnMore = this.handleLearnMore.bind(this)
        this.handleWatchTutorials = this.handleWatchTutorials.bind(this)
        this.signupWithClass = this.signupWithClass.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            navbarOpen: nextProps.navbarOpen,
        })
    }
    signupWithClass(){
        if(this.state.classCode == ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Please input class code",
            })
            return ;
        }
        axios.post('/api/getTeacherForSignup', {boardName: this.state.classCode})
            .then((res) => {
                if(res.data == "incorrect"){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: "Wrong Class Code",
                    })
                    this.setState({classCode: ""})                    
                }else{
                    Router.push({ pathname: '/signup-classcode', query: { board_name: this.state.classCode } })
                }
            })
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
            <div className="w-full h-1/6 font-poppins bg-white">
                <div className="flex 2xl:px-20 xl:px-12 sm:px-7 md:px-3 py-3 lg:py-6 px-2 justify-between items-center">
                    <Link href={'/'}>
                        <img
                            className="2xl:w-56 xl:w-48 lg:w-36 md:w-28 sm:w-24 h-auto md:h-auto w-16 cursor-pointer"
                            src="../logos/logo.png"
                        />
                    </Link>

                    <div className="flex items-center">
                        <div
                            className={
                                'items-center md:relative md:min-w-0 min-w-full flex absolute md:top-0 top-16 left-0 bg-white px-0 justify-around md:visible md:opacity-100 z-50 transition-all duration-500 ' +
                                (this.state.navbarOpen === true
                                    ? 'h-10 visible opacity-100'
                                    : 'invisible h-0 opacity-0')
                            }>
                            <div className="2xl:mr-7 md:mr-2 xl:mr-4 2xl:text-xl lg:text-base sm:text-base md:text-xs text-xs">
                                <button className="peer lg:px-0 lg:py-2 text-black flex items-center">
                                    Whiteboard
                                    <svg xmlns="http://www.w3.org/2000/svg" className="lg:h-6 lg:w-6 w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className="absolute bg-transparent 2xl:w-32 lg:w-28 md:w-20 sm:w-24 lg:h-10 h-3 peer transform -translate-y-1"></div>                                        
                                                                
                                <div className="peer z-50 peer-hover:flex hover:flex lg:w-[300px] w-40 border-t-4 transform lg:-translate-x-24 md:-translate-x-12 translate-x-0 lg:translate-y-8 translate-y-2 border-gray-700 lg:py-7 sm:py-3 flex-col bg-white drop-shadow-lg absolute rounded-lg text-center transition opacity-0 peer-hover:opacity-100 hover:opacity-100 invisible peer-hover:visible hover:visible duration-500">
                                    {/* <button className="lg:px-5 lg:py-3 px-3 py-1 hover:bg-gray-200">Get Started</button> */}
                                    <button className="lg:px-5 lg:py-3 px-3 py-1 hover:bg-gray-200" onClick={this.handleLearnMore}>Learn More</button>
                                    
                                    {/* <button className="lg:px-5 lg:py-3 px-3 py-1 hover:bg-gray-200" onClick={this.handleWatchTutorials}>Watch Tutorials</button> */}
                                </div>
                                <div className="invisible w-0 h-1 transition-all rounded-full bg-green-600 peer-hover:visible 2xl:peer-hover:w-28 lg:peer-hover:w-24 md:peer-hover:w-[70px] sm:peer-hover:w-24 peer-hover:w-[70px] peer-hover:flex absolute transform translate-x-0">
                                </div>
                            </div>
                            {/* <div className="2xl:mr-7 md:mr-2 xl:mr-4 2xl:text-xl lg:text-base sm:text-base md:text-xs text-xs">
                                <Link href="/about-us">
                                    <div className='relative'>
                                        <button className="peer lg:px-0 lg:py-2 text-black flex items-center">About Us</button>
                                        <div className="invisible w-0 h-1 transition-all rounded-full bg-green-600 peer-hover:visible 2xl:peer-hover:w-[90px] lg:peer-hover:w-18 md:peer-hover:w-[55px] sm:peer-hover:w-18 peer-hover:w-[50px] peer-hover:flex absolute transform translate-x-0">
                                        </div>
                                    </div>
                                </Link>
                            </div> */}
                            {/* <div className="2xl:mr-7 lg:mr-3 xl:mr-4  md:mr-2  2xl:text-xl lg:text-base md:text-xs  sm:text-base text-xs cursor-pointer" onClick={this.handleLessons}>
                                <button className="peer">Lessons</button>
                                <div className="invisible w-0 h-1 transition-all rounded-full bg-green-600 peer-hover:visible 2xl:peer-hover:w-20 xl:peer-hover:w-16 lg:peer-hover:w-16 md:peer-hover:w-12 sm:peer-hover:w-16 peer-hover:w-12 peer-hover:flex absolute transform translate-x-0">
                                </div>
                            </div>
                            <div className="2xl:mr-7 lg:mr-3 xl:mr-4  md:mr-2  2xl:text-xl lg:text-base md:text-xs  sm:text-base  text-xs cursor-pointer" onClick={this.handleGames}>
                                <button className="peer">Games</button>
                                <div className="invisible w-0 h-1 transition-all rounded-full bg-green-600 peer-hover:visible 2xl:peer-hover:w-[70px] lg:peer-hover:w-[58px] sm:peer-hover:w-[58px] md:peer-hover:w-[45px] peer-hover:w-[45px] peer-hover:flex absolute transform translate-x-0">
                                </div>
                            </div> */}
                            <div className="2xl:mr-7 lg:mr-3 xl:mr-4  md:mr-0  2xl:text-xl md:text-xs  sm:text-base  lg:text-base text-xs">
                                <button className="peer lg:px-0 lg:py-2 text-black flex items-center">
                                    Sign In
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="lg:h-6 lg:w-6 w-3 h-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                <div className="absolute bg-transparent 2xl:w-20 md:w-12 lg:w-16 sm:w-16 lg:h-10 h-3 peer transform -translate-y-1"></div>
                                <div className="peer z-50 flex hover:flex lg:w-[300px] w-32 border-t-4 transform lg:-translate-x-28 md:-translate-x-8 -translate-x-16 lg:translate-y-8 translate-y-2 border-gray-700 lg:py-7 py-2 flex-col bg-white drop-shadow-lg absolute rounded-lg text-center transition opacity-0 peer-hover:opacity-100 hover:opacity-100 invisible peer-hover:visible hover:visible duration-500">
                                    <Link href="/login">
                                        <button className="lg:px-5 lg:py-3 px-2 py-1 hover:bg-gray-200">
                                            Teachers
                                        </button>
                                    </Link>
                                    <Link href="https://student.upliftk12.com/signin">
                                        <button className="lg:px-5 lg:py-3 px-2 py-1 hover:bg-gray-200">
                                            Students
                                        </button>
                                    </Link>
                                    <Link href="https://principal.upliftk12.com/signin">
                                        <button className="lg:px-5 lg:py-3 px-2 py-1 hover:bg-gray-200">
                                            Principals
                                        </button>
                                    </Link>
                                </div>
                                <div className="invisible w-0 h-1 transition-all rounded-full bg-green-600 peer-hover:visible 2xl:peer-hover:w-16 lg:peer-hover:w-[55px] sm:peer-hover:w-[55px] md:peer-hover:w-[40px] peer-hover:w-10 peer-hover:flex absolute transform translate-x-0"></div>
                            </div>
                        </div>
                        <div className="p-1 lg:p-2 lg:pl-2 lg:mx-2 2xl:text-xl lg:text-base md:text-xs  sm:text-base  text-xs bg-gray-200 rounded-lg flex md:ml-2 ml-2" onClick={() => {this.setState({navbarOpen: false})}}>
                            <input value={this.state.classCode} onChange={(e) => {this.setState({classCode: e.target.value})}} className=" outline-none focus:shadow-none focus:ring-0 border-none sm:text-base bg-gray-200 lg:w-24 lg:text-base sm:w-24 w-16 md:w-20 md:text-xs text-xs" type="text" placeholder="Classes" />
                            
                            <button onClick={this.signupWithClass} className="font-poppins lg:py-3 sm:px-2 md:px-2 p-1 lg:px-4 xl:px-8 bg-sky-500 xl:ml-3 lg:ml-2 rounded-lg text-white hover:bg-sky-600 transition">
                                Enter class
                            </button>
                        </div>
                        <Link href="/register">
                            <button
                                className="m-2 lg:py-3 p-1 py-2 lg:px-4 xl:px-8 sm:px-2 md:px-2 2xl:text-xl lg:text-base  md:text-xs sm:text-base  text-xs rounded-lg text-white bg-[#1BA361] hover:bg-[#2CCA7D] transition"
                                onClick={() => {
                                    this.setState({ navbarOpen: false })
                                }}>
                                Sign Up For Free!
                            </button>
                        </Link>

                        <svg
                            onClick={() => {
                                this.setState({
                                    navbarOpen:
                                        this.state.navbarOpen === true
                                            ? false
                                            : true,
                                })
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 md:hidden"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </div>
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
        )
    }
}
