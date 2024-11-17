import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React, { Component } from 'react'
import Slider from 'react-slick'

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
            arrows: false,
            infinite: true,
            slidesToShow: this.state.windowWidth < 639 ? 1 : 3,
            slidesToScroll: 1,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 7000,
        }
        return (
            <div>
                <Slider {...settings}>
                    <div>
                        <div className="rounded-lg mx-2 2xl:mx-5">
                            <div className="flex bg-green-600 xl:p-5 lg:p-5 md:p-3 p-5 sm:p-2 rounded-t-lg items-center">
                                <img
                                    className=" w-16 xl:w-16 xl:h-16 md:w-12 md:h-12 sm:w-10 sm:h-10 h-16"
                                    src="../images/photo1.png"></img>
                                <div className="items-center ml-5 2xl:ml-2 text-left my-auto">
                                    <p className="text-white 2xl:text-3xl xl:text-2xl md:text-lg sm:text-base text-xl font-poppins block">
                                        Patricia H.
                                    </p>
                                    <p className="text-white 2xl:text-base xl:text-base md:text-sm text-sm sm:text-xs font-poppins font-bold block">
                                        3rd Grade Teacher
                                    </p>
                                </div>
                            </div>
                            <div className="text-start bg-white xl:px-7 md:px-4 sm:px-2 px-6 md:leading-7 font-poppins lg:pt-3 pt-5 xl:h-[400px] 2xl:h-[400px] md:h-[300px] h-60 rounded-b-lg">
                                <p className="xl:text-lg lg:text-base md:text-sm sm:text-xs text-sm ">
                                    We really enjoyed using this platform today
                                    and loved how the expanded form place value
                                    activity had a variety of activities for the
                                    students (different ways they needed to
                                    demonstrate mastery).
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="rounded-lg mx-2 2xl:mx-5">
                            <div className="flex bg-green-600 xl:p-5 lg:p-5 md:p-3 p-5 sm:p-2 rounded-t-lg items-center">
                                <img
                                    className=" w-16 xl:w-16 xl:h-16 md:w-12 md:h-12 sm:w-10 sm:h-10 h-16"
                                    src="../images/photo2.png"></img>
                                <div className="items-center ml-5 2xl:ml-2 text-left my-auto">
                                    <p className="text-white 2xl:text-3xl xl:text-2xl md:text-lg sm:text-base text-xl font-poppins block">
                                        Tammy T.
                                    </p>
                                    <p className="text-white 2xl:text-base xl:text-base md:text-sm text-sm sm:text-xs font-poppins font-bold block">
                                        5th Grade Teacher
                                    </p>
                                </div>
                            </div>
                            <div className="text-start bg-white xl:px-7 md:px-4 sm:px-2 px-6 md:leading-7 font-poppins lg:pt-3 pt-5 xl:h-[400px] 2xl:h-[400px] md:h-[300px] h-60 rounded-b-lg">
                                <p className="xl:text-lg lg:text-base md:text-sm sm:text-xs text-sm ">
                                    The kids loved this new interactive platform
                                    and I saw a great level of engagement within
                                    my students. All the students remained
                                    engaged because they knew we would be
                                    accountable for sharing their responses.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="rounded-lg mx-2 2xl:mx-5">
                            <div className="flex bg-green-600 xl:p-5 lg:p-5 md:p-3 p-5 sm:p-2 rounded-t-lg items-center">
                                <img
                                    className=" w-16 xl:w-16 xl:h-16 md:w-12 md:h-12 sm:w-10 sm:h-10 h-16"
                                    src="../images/photo3.png"></img>
                                <div className="items-center ml-5 2xl:ml-2 text-left my-auto">
                                    <p className="text-white 2xl:text-3xl xl:text-2xl md:text-lg sm:text-base text-xl font-poppins block">
                                        Hector G.
                                    </p>
                                    <p className="text-white 2xl:text-base xl:text-base md:text-sm text-sm sm:text-xs font-poppins font-bold block">
                                        4th Grade Teacher
                                    </p>
                                </div>
                            </div>
                            <div className="text-start bg-white xl:px-7 md:px-4 sm:px-2 px-6 md:leading-7 font-poppins lg:pt-3 pt-5 xl:h-[400px] 2xl:h-[400px] md:h-[300px] h-60 rounded-b-lg">
                                <p className="xl:text-lg lg:text-base md:text-sm sm:text-xs text-sm ">
                                    I haven't seen this kind of interactivity
                                    before, especially with STAAR practice.
                                </p>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        )
    }
}
