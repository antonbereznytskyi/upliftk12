import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React, { Component } from 'react'
import Slider from 'react-slick'

function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return (
        <div
            className="z-20 rounded-lg bg-white absolute lg:px-3 sm:px-3 px-2 lg:py-10 sm:py-9 py-7 lg:top-[20px] 2xl:top-[60px] lg:-right-6 top-[40px] right-1 sm:top-[90px] sm:right-7 md:right-10 md:top-28 shadow-lg cursor-pointer"
            onClick={onClick}>
            <svg
                className="lg:w-3 w-2"
                viewBox="0 0 19 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M3.29417 27L14.3711 15L3.29417 3"
                    stroke="black"
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
            className="z-20 rounded-lg bg-white absolute lg:px-3 sm:px-3 px-2 lg:py-10 sm:py-9 py-7 lg:top-[20px] 2xl:top-[60px] lg:-left-6 top-[40px] sm:top-[90px] sm:left-7 md:left-10 md:top-28 shadow-lg left-1 cursor-pointer"
            onClick={onClick}>
            <svg
                className="lg:w-3 w-2"
                viewBox="0 0 19 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M15.3711 27L4.37109 15L15.3711 3"
                    stroke="black"
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
            windowWidth: 0,
        }
        this.handleResize = this.handleResize.bind(this)
    }
    componentDidMount() {
        this.handleResize()
        window.addEventListener('resize', this.handleResize)
    }
    handleResize() {
        this.setState({ windowWidth: window.innerWidth })
    }
    render() {
        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: this.state.windowWidth < 1024 ? 1 : 3,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
        }
        return (
            <div>
                <Slider {...settings}>
                    <div className="px-5 font-poppins">
                        <img
                            className="block mx-auto sm:w-[450px] h-auto md:w-[550px]"
                            src="../images/tutorial.png"
                        />
                        <p className="font-bold text-md my-2 text-sky-900 sm:text-2xl md:text-3xl md:my-2">
                            Feature-Rich Toolbar
                        </p>
                        <p className="sm:text-base sm:px-10 md:text-lg text-sm lg:px-5 ">
                            Our toolbar allows you to write text, draw with a
                            colored pencil, creates and move shapes, and erase.
                        </p>
                    </div>
                    <div className="px-5 font-poppins">
                        <img
                            className="block mx-auto sm:w-[450px] h-auto md:w-[550px]"
                            src="../images/tutorial.png"
                        />
                        <p className="font-bold text-md my-2 text-sky-900 sm:text-2xl md:text-3xl md:my-2">
                            Feature-Rich Toolbar
                        </p>
                        <p className="sm:text-base sm:px-10 md:text-lg text-sm lg:px-5 ">
                            Our toolbar allows you to write text, draw with a
                            colored pencil, creates and move shapes, and erase.
                        </p>
                    </div>
                    <div className="px-5 font-poppins">
                        <img
                            className="block mx-auto sm:w-[450px] h-auto md:w-[550px]"
                            src="../images/tutorial.png"
                        />
                        <p className="font-bold text-md my-2 text-sky-900 sm:text-2xl md:text-3xl md:my-2">
                            Feature-Rich Toolbar
                        </p>
                        <p className="sm:text-base sm:px-10 md:text-lg text-sm lg:px-5 ">
                            Our toolbar allows you to write text, draw with a
                            colored pencil, creates and move shapes, and erase.
                        </p>
                    </div>
                    <div className="px-5 font-poppins">
                        <img
                            className="block mx-auto sm:w-[450px] h-auto md:w-[550px]"
                            src="../images/tutorial.png"
                        />
                        <p className="font-bold text-md my-2 text-sky-900 sm:text-2xl md:text-3xl md:my-2">
                            Feature-Rich Toolbar
                        </p>
                        <p className="sm:text-base sm:px-10 md:text-lg text-sm lg:px-5 ">
                            Our toolbar allows you to write text, draw with a
                            colored pencil, creates and move shapes, and erase.
                        </p>
                    </div>
                </Slider>
            </div>
        )
    }
}
