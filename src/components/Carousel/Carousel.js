import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React, { Component } from 'react'
import Slider from 'react-slick'
import CarouselItem from './CarouselItem'

function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            style={{
                ...style,
                width: '30px',
                height: '30px',
                position: 'absolute',
                right: '10px',
            }}
            onClick={onClick}
        />
    )
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            style={{
                ...style,
                width: '30px',
                height: '30px',
                position: 'absolute',
                left: '10px',
                zIndex: '9999',
            }}
            onClick={onClick}
        />
    )
}
export default class SimpleSlider extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            appendDots: dots => (
                <div className=" bottom-2">
                    <ul>{dots}</ul>
                </div>
            ),
        }
        return (
            <div>
                <Slider {...settings}>
                    <CarouselItem />
                    <CarouselItem />
                    <CarouselItem />
                    <CarouselItem />
                    <CarouselItem />
                </Slider>
            </div>
        )
    }
}
