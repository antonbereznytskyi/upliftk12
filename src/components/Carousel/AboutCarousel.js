import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React, { Component } from 'react'
import Slider from 'react-slick'
import Image from 'next/future/image'

function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return (
        <div
            className="z-20 rounded-lg bg-green-500 absolute lg:px-3 px-1 lg:py-10 py-7 xl:top-[390px] lg:top-[350px] lg:right-12 md:top-[215px] sm:right-16 sm:top-[180px] top-[190px] right-3  cursor-pointer"
            onClick={onClick}>
            <svg
                className="lg:w-5 w-3"
                viewBox="0 0 19 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M3.29417 27L14.3711 15L3.29417 3"
                    stroke="white"
                    strokeWidth="6"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    )
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props
    return (
        <div
            className="z-20 rounded-lg bg-green-500 absolute lg:px-3 px-1 lg:py-10 py-7 xl:top-[390px] lg:top-[350px] lg:left-12 md:top-[215px] sm:left-16 sm:top-[180px] top-[190px] left-3 cursor-pointer"
            onClick={onClick}>
            <svg
                className="lg:w-5 w-3"
                viewBox="0 0 19 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M15.3711 27L4.37109 15L15.3711 3"
                    stroke="white"
                    strokeWidth="6"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    )
}
export default class SimpleSlider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gotoLastFlag: false,
        }
    }
    componentDidMount() {
        if (this.props.slidePos == 'last') {
            this.props.changeStateSlidePos()
            this.setState({ gotoLastFlag: true })
            this.slider.slickGoTo(3)
        }
    }
    render() {
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            customPaging: i => (
                <div className="rounded-full bg-yellow-500 lg:w-3 lg:h-3 lg:mt-2 sm:w-2.5 sm:h-2.5 w-2 h-2 md:mt-2 mt-1 dot transition duration-500"></div>
            ),
            beforeChange: (current, next) => {
                console.log(current, next)
                if (this.state.gotoLastFlag == true) {
                    this.setState({ gotoLastFlag: false })
                    return
                }
                if (current == 3 && next == 0) this.props.nextCarousel()
                if (current == 0 && next == 3) this.props.prevCarousel()
            },
        }
        return (
            <div>
                <Slider ref={slider => (this.slider = slider)} {...settings} fade>
                    <div className="px-2 lg:px-0 xl:h-[660px] h-[320px] sm:h-[314px] md:h-[370px] lg:h-[570px] lg:h-[570px] relative">
                        <p className="font-poppins font-bold xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-lg lg:mt-20 md:mt-5 mt-2 text-sky-900">
                            What is Uplift K12?
                        </p>
                        <p className="font-poppins text-sky-900 lg:mt-5 md:mt-2 mt-0 lg:text-xl sm:text-base text-sm lg:px-14 sm:px-10 px-2">
                            Uplift K12 is a digital online-platform that
                            includes digital games and activities for students
                            to learn, collaborate, and play while learning about
                            math.
                        </p>
                        <div className="absolute bottom-0 w-full">
                            <div className="lg:mt-7 mt-3 rounded-lg flex border-2 border-gray-300 lg:mx-10 mx-0 sm:mx-10 h-48 md:h-56 lg:h-80 xl:h-[420px] items-center">
                                <Image 
                                    src="/images/about/image1.png"
                                    width={0}
                                    height={0}
                                    sizes="100vh"
                                    className="w-auto h-full mx-auto"/>
                            </div>
                        </div>
                    </div>
                    <div className="px-2 lg:px-0 xl:h-[660px] h-[320px] sm:h-[314px] md:h-[370px] lg:h-[570px] relative">
                        <p className="font-poppins font-bold xl:text-3xl lg:text-2xl md:text-xl sm:text-2xl text-sm lg:mt-20 md:mt-5 mt-2 text-sky-900">
                            Built for True Collaboration and Engagement
                        </p>
                        <p className="font-poppins text-sky-900 xl:mt-5 xl:mt-0 lg:mt-0 md:mt-2 mt-0 lg:text-sm sm:text-xs leading-[12px] sm:leading-4 text-xs lg:px-14 sm:px-10 px-2">
                            Video conferencing platforms were built for corporate environments.
                            Not Uplift K12. We were built to imitate the hands-on table top instruction you will find in most classrooms.
                            Choose from a variety of interactive resources that enable student and teachers to drag & drop, type, draw, roll dice and play games together.
                            True collaboration and engagement for the K12 classroom. Finally
                        </p>
                        <div className="absolute bottom-0 w-full">
                            <div className="lg:mt-7 mt-3 rounded-lg flex border-2 border-gray-300 lg:mx-10 mx-0 sm:mx-10 h-48 md:h-56 lg:h-80 xl:h-[420px] items-center">
                                <Image 
                                    src="/images/about/image2.png"
                                    width={0}
                                    height={0}
                                    sizes="100vh"
                                    className="w-auto h-full mx-auto"/>
                            </div>
                        </div>
                    </div>
                    <div className="px-2 lg:px-0 xl:h-[660px] h-[320px] sm:h-[314px] md:h-[370px] lg:h-[570px] relative">
                        <p className="font-poppins font-bold xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-lg lg:mt-20 md:mt-5 mt-2 text-sky-900">
                            Access Ready Made Resources
                        </p>
                        <p className="font-poppins text-sky-900 lg:mt-5 md:mt-2 mt-0 lg:text-xl sm:text-base text-sm lg:px-14 sm:px-10 px-2">
                            Our digital library has over 500 resources to choose from.
                            Filter by keyword, topic, resource, or grade level.
                        </p>
                        <div className="absolute bottom-0 w-full">
                            <div className="lg:mt-7 mt-3 rounded-lg flex border-2 border-gray-300 lg:mx-10 mx-0 sm:mx-10 h-48 md:h-56 lg:h-80 xl:h-[420px] items-center">
                                <Image 
                                    src="/images/about/image3.png"
                                    width={0}
                                    height={0}
                                    sizes="100vh"
                                    className="w-auto h-full mx-auto"/>
                            </div>
                        </div>
                    </div>
                    <div className="px-2 lg:px-0 xl:h-[660px] h-[320px] sm:h-[314px] md:h-[370px] lg:h-[570px] relative">
                        <p className="font-poppins font-bold xl:text-3xl lg:text-3xl md:text-lg sm:text-base text-sm lg:mt-20 md:mt-5 mt-2 text-sky-900">
                            Research Based Math Resources Improve learning Outcomes
                        </p>
                        <p className="font-poppins text-sky-900 xl:mt-2 2xl:mt-5 lg:mt-2 md:mt-0 mt-0 lg:text-xl sm:text-base text-sm lg:px-14 sm:px-10 px-2">
                            Our supplemental math resources are based on the CRA/ VRA pedagogy, which is well known as an effective method for teaching math to students at all levels.
                        </p>
                        <div className="absolute bottom-0 w-full">
                            <div className="lg:mt-7 mt-3 rounded-lg flex border-2 border-gray-300 lg:mx-10 mx-0 sm:mx-10 h-48 md:h-56 lg:h-80 xl:h-[420px] items-center">
                                <Image 
                                    src="/images/about/image4.png"
                                    width={0}
                                    height={0}
                                    sizes="100vh"
                                    className="w-auto h-full mx-auto"/>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        )
    }
}
