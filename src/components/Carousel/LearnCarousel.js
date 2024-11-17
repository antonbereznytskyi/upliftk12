import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React, { Component } from 'react'
import Slider from 'react-slick'
import Image from 'next/future/image'

function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return (
        <div
            className="z-20 rounded-lg bg-green-landing absolute lg:px-3 px-1 lg:py-10 py-7 xl:top-[390px] lg:top-[350px] lg:right-12 md:top-[215px] sm:right-16 sm:top-[180px] top-[190px] right-3  cursor-pointer"
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
            className="z-20 rounded-lg bg-green-landing absolute lg:px-3 px-1 lg:py-10 py-7 xl:top-[390px] lg:top-[350px] lg:left-12 md:top-[215px] sm:left-16 sm:top-[180px] top-[190px] left-3 cursor-pointer"
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
            this.slider.slickGoTo(4)
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
                <div className="rounded-full bg-yellow-landing lg:w-3 lg:h-3 lg:mt-2 sm:w-2.5 sm:h-2.5 w-2 h-2 md:mt-2 mt-1 dot transition duration-500"></div>
            ),
            beforeChange: (current, next) => {
                if (this.state.gotoLastFlag == true) {
                    this.setState({ gotoLastFlag: false })
                    return
                }
                if (current == 4 && next == 0) this.props.nextCarousel()
                if (current == 0 && next == 4) this.props.prevCarousel()
            },
        }
        return (
            <div>
                <Slider
                    ref={slider => (this.slider = slider)}
                    {...settings}
                    fade>
                    <div className="px-2 lg:px-0 xl:h-[660px] h-[320px] sm:h-[314px] md:h-[370px] lg:h-[570px] relative">
                        <p className="font-poppins font-bold xl:text-5xl lg:text-4xl md:text-3xl sm:text-xl text-lg lg:mt-20 md:mt-8 mt-2 text-sky-900">
                            English Read Aloud For Accessibility
                        </p>
                        <p className="font-poppins text-sky-900 lg:mt-5 md:mt-2 mt-0 lg:text-xl sm:text-base text-sm lg:px-14 sm:px-10 px-2">
                            Click on the reader icon on the top right corner to access this feature.
                        </p>
                        <div className="absolute bottom-0 w-full">
                            <div className="lg:mt-7 mt-3 rounded-lg flex border-2 border-gray-300 lg:mx-10 mx-0 sm:mx-10 h-48 md:h-56 lg:h-80 xl:h-[420px] items-center">
                                <Image 
                                    src="/images/assignments/image1.png"
                                    width={0}
                                    height={0}
                                    sizes="100vh"
                                    className="w-auto h-full mx-auto"/>
                            </div>
                        </div>
                    </div>
                    <div className="px-2 lg:px-0 xl:h-[660px] h-[320px] sm:h-[314px] md:h-[370px] lg:h-[570px] relative">
                        <p className="font-poppins font-bold xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-lg lg:mt-20 md:mt-5 mt-2 text-sky-900">
                            Auto Checking and Auto Grading
                        </p>
                        <p className="font-poppins text-sky-900 lg:mt-5 md:mt-2 mt-0 lg:text-xl sm:text-base text-sm lg:px-14 sm:px-10 px-2">
                            Students recieve immediate feedback on correct and incorrect answers, as well as access to graded assignments
                        </p>
                        <div className="absolute bottom-0 w-full">
                            <div className="lg:mt-7 mt-3 rounded-lg flex border-2 border-gray-300 lg:mx-10 mx-0 sm:mx-10 h-48 md:h-56 lg:h-80 xl:h-[420px] items-center">
                                <Image 
                                    src="/images/assignments/image2.png"
                                    width={0}
                                    height={0}
                                    sizes="100vh"
                                    className="w-auto h-full mx-auto"/>
                            </div>
                        </div>
                    </div>
                    <div className="px-2 lg:px-0 xl:h-[660px] h-[320px] sm:h-[314px] md:h-[370px] lg:h-[570px] relative">
                        <p className="font-poppins font-bold xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-lg lg:mt-20 md:mt-5 mt-2 text-sky-900">
                            Visualize Math
                        </p>
                        <p className="font-poppins text-sky-900 lg:mt-5 md:mt-2 mt-0 lg:text-xl sm:text-base text-sm lg:px-14 sm:px-10 px-2">
                            Combine worksheets with minature versions of our virtual manipulatives for a deeper, more visual understanding.
                        </p>
                        <div className="absolute bottom-0 w-full">
                            <div className="lg:mt-7 mt-3 rounded-lg flex border-2 border-gray-300 lg:mx-10 mx-0 sm:mx-10 h-48 md:h-56 lg:h-80 xl:h-[420px] items-center">
                                <Image 
                                    src="/images/assignments/image3.png"
                                    width={0}
                                    height={0}
                                    sizes="100vh"
                                    className="w-auto h-full mx-auto"/>
                            </div>
                        </div>
                    </div>
                    <div className="px-2 lg:px-0 xl:h-[660px] h-[320px] sm:h-[314px] md:h-[370px] lg:h-[570px] relative">
                        <p className="font-poppins font-bold xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-lg lg:mt-20 md:mt-5 mt-2 text-sky-900">
                            Virtual Manipulatives
                        </p>
                        <p className="font-poppins text-sky-900 lg:mt-5 md:mt-2 mt-0 lg:text-xl sm:text-base text-sm lg:px-14 sm:px-10 px-2">
                            Access hundreds of ready math virtual manipulatives that take students from a representational to an abstract understanding of math.
                        </p>
                        <div className="absolute bottom-0 w-full">
                            <div className="lg:mt-7 mt-3 rounded-lg flex border-2 border-gray-300 lg:mx-10 mx-0 sm:mx-10 h-48 md:h-56 lg:h-80 xl:h-[420px] items-center">
                                <Image 
                                    src="/images/assignments/image4.png"
                                    width={0}
                                    height={0}
                                    sizes="100vh"
                                    className="w-auto h-full mx-auto"/>
                            </div>
                        </div>
                    </div>
                    <div className="px-2 lg:px-0 xl:h-[660px] h-[320px] sm:h-[314px] md:h-[370px] lg:h-[570px] relative">
                        <p className="font-poppins font-bold 2xl:text-5xl xl:text-3xl lg:text-4xl md:text-3xl sm:text-xl text-lg lg:mt-20 md:mt-5 mt-2 text-sky-900">
                            Independent Math Practice
                        </p>
                        <p className="font-poppins text-sky-900 2xl:mt-5 xl:mt-2 lg:mt-5 md:mt-2 mt-0 xl:text-xl lg:text-base sm:text-xs text-xs lg:px-14 sm:px-10 px-2">
                            Follow up your whole group lessons by assigning graded math Practice.
                            All student practice is combined with our drag and drop virtual manipulatives.
                            Students can also use the toolbar to draw representational models or solve the problems inthe traditional abstract form.
                        </p>
                        <div className="absolute bottom-0 w-full">
                            <div className="lg:mt-7 mt-3 rounded-lg flex border-2 border-gray-300 lg:mx-10 mx-0 sm:mx-10 h-48 md:h-56 lg:h-80 xl:h-[420px] items-center">
                                <Image 
                                    src="/images/assignments/image5.png"
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
