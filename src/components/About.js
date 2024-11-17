import React, { Component } from 'react'
import CollaborateCarousel from '@/components/Carousel/CollaborateCarousel'
import LearnCarousel from '@/components/Carousel/LearnCarousel'
import PlayCarousel from '@/components/Carousel/PlayCarousel'
import AboutCarousel from "@/components/Carousel/AboutCarousel"

export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnClicked: 'about',
            slidePos0: "first",
            slidePos1: 'first',
            slidePos2: 'first',
            slidePos3: 'first',
        }
        this.nextCarousel = this.nextCarousel.bind(this);
        this.prevCarousel = this.prevCarousel.bind(this);
    }
    nextCarousel(carouselId){
        if(carouselId == 0) this.setState({btnClicked: 'collaborate'})
        if(carouselId == 1) this.setState({btnClicked: 'learn'})
        if(carouselId == 2) this.setState({btnClicked: 'play'})
        if(carouselId == 3) this.setState({btnClicked: 'about'})
    }
    prevCarousel(carouselId){
        if(carouselId == 0) this.setState({btnClicked: 'play', slidePos3: 'last'})
        if(carouselId == 1) this.setState({btnClicked: 'about', slidePos0: 'last'})
        if(carouselId == 2) this.setState({btnClicked: 'collaborate', slidePos1: 'last'})
        if(carouselId == 3) this.setState({btnClicked: 'learn', slidePos2: 'last'})
    }
    render() {
        return (
            <div className=" 2xl:w-4/5 lg:h-[650px] w-11/12 h-[440px] xl:h-[800px] border-sky-500 rounded-lg border-4 mx-auto lg:mt-[100px] mt-10 z-30 relative md:flex block">
                <div className="md:w-1/5 lg:w-1/4 2xl:w-1/5 md:h-full h-[60px] w-full bg-sky-200 flex items-center text-center">
                    <div className="flex md:block justify-around w-full">
                        <button
                            onClick={() => {
                                this.setState({ btnClicked: 'about' })
                            }}
                            className={
                                'block break-words md:mx-auto rounded-lg xl:text-xl lg:text-base text-xs text-white lg:p-5 md:px-2 md:py-3 lg:my-5 md:my-3 md:w-11/12 w-1/5 p-1 mx-1  font-poppins font-bold hover:bg-sky-700 ' +
                                (this.state.btnClicked === 'about'
                                    ? 'bg-sky-700'
                                    : 'bg-sky-500')
                            }>
                            What is UpliftK12
                        </button>
                        <button
                            onClick={() => {
                                this.setState({ btnClicked: 'collaborate' })
                            }}
                            className={
                                'block break-words md:mx-auto rounded-lg xl:text-xl lg:text-base text-xs text-white lg:p-5 md:px-2 md:py-3 lg:my-5 md:my-3 md:w-11/12 w-1/5 p-1 mx-1  font-poppins font-bold hover:bg-sky-700 ' +
                                (this.state.btnClicked === 'collaborate'
                                    ? 'bg-sky-700'
                                    : 'bg-sky-500')
                            }>
                            Collaborate
                        </button>
                        <button
                            onClick={() => {
                                this.setState({ btnClicked: 'learn' })
                            }}
                            className={
                                'block break-words md:mx-auto rounded-lg xl:text-xl lg:text-base text-xs text-white lg:p-5 md:px-2 md:py-3 lg:my-5 md:my-3  md:w-11/12 w-1/5 p-1 mx-1  font-poppins font-bold hover:bg-sky-700 ' +
                                (this.state.btnClicked === 'learn'
                                    ? 'bg-sky-700'
                                    : 'bg-sky-500')
                            }>
                            Learn
                        </button>
                        <button
                            onClick={() => {
                                this.setState({ btnClicked: 'play' })
                            }}
                            className={
                                'block break-words md:mx-auto rounded-lg xl:text-xl lg:text-base text-xs text-white lg:p-5 md:px-2 md:py-3 lg:my-5 md:my-3  md:w-11/12 w-1/5 p-1 mx-1  font-poppins font-bold hover:bg-sky-700 ' +
                                (this.state.btnClicked === 'play'
                                    ? 'bg-sky-700'
                                    : 'bg-sky-500')
                            }>
                            Play
                        </button>
                    </div>
                </div>
                <div className="md:w-4/5 lg:w-3/4 2xl:w-4/5 w-full lg:h-full h-[100px] bg-white">
                    {this.state.btnClicked === "about" && 
                        <AboutCarousel
                            nextCarousel={(e) => this.nextCarousel(0)}
                            prevCarousel={(e) => this.prevCarousel(0)}
                            slidePos={this.state.slidePos0}
                            changeStateSlidePos={() =>
                                this.setState({ slidePos0: 'first' })
                            }
                        />
                    }
                    {this.state.btnClicked === 'collaborate' && (
                        <CollaborateCarousel
                            nextCarousel={(e) => this.nextCarousel(1)}
                            prevCarousel={(e) => this.prevCarousel(1)}
                            slidePos={this.state.slidePos1}
                            changeStateSlidePos={() =>
                                this.setState({ slidePos1: 'first' })
                            }
                        />
                    )}
                    {this.state.btnClicked === 'learn' && (
                        <LearnCarousel
                            nextCarousel={(e) => this.nextCarousel(2)}
                            prevCarousel={(e) => this.prevCarousel(2)}
                            slidePos={this.state.slidePos2}
                            changeStateSlidePos={() =>
                                this.setState({ slidePos2: 'first' })
                            }
                        />
                    )}
                    {this.state.btnClicked === 'play' && (
                        <PlayCarousel
                            nextCarousel={(e) => this.nextCarousel(3)}
                            prevCarousel={(e) => this.prevCarousel(3)}
                            slidePos={this.state.slidePos3}
                            changeStateSlidePos={() =>
                                this.setState({ slidePos3: 'first' })
                            }
                        />
                    )}
                </div>
            </div>
        )
    }
}