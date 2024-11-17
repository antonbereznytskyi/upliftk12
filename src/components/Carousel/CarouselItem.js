import React, { Component } from 'react'

export default class CarouselItem extends Component {
    render() {
        return (
            <div
                className="group relative overflow-hidden"
                style={{ minWidth: '33.33%' }}>
                <div className="bg-gray-200 rounded-md px-8">
                    <div className="pt-5 flex justify-center px-8">
                        <img
                            src="../images/asd.png"
                            className=" w-3/4 rounded-md"
                        />
                    </div>
                    <div className="flex justify-center py-5 px-16">
                        <p className="text-2xl line-clamp-3 text-center">
                            Hundreds Grid Skip Counting Hundreds Grid Skip
                            Counting
                        </p>
                    </div>
                </div>
                <div className="bg-green-600 px-10 pt-10 absolute -top-4 -left-12 -rotate-45">
                    <p className="text-white text-3xl">New</p>
                </div>
                <div className="bg-gray-500 rounded-full p-1 z-50 absolute top-5 right-7 cursor-pointer hover:bg-yellow-600 opacity-60 hover:opacity-100 transition-all duration-300">
                    <svg
                        className=" fill-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24">
                        <path fill="none" d="M0 0H24V24H0z" />
                        <path d="M20.243 4.757c2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228 2.349-2.109 5.979-2.039 8.242.228zM5.172 6.172c-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454-1.487-1.49-3.881-1.562-5.453-.186l-4.202 4.203-1.415-1.414 2.825-2.827-.082-.069c-1.575-1.265-3.877-1.157-5.328.295z" />
                    </svg>
                </div>
                <div className="absolute rounded-md bg-sky-900 z-10 -top-20 group-hover:top-0 group-hover:opacity-100 w-full h-full p-7 transition-all duration-500 opacity-0">
                    <div className="flex justify-center">
                        <p className="text-white text-4xl text-center leading-relaxed">
                            Launch a blank whiteboard with a feature rich
                            toolbar where you can write text, draw shapes, to
                            collaborate with your students
                        </p>
                    </div>
                    <div className="my-2 inset-x-0 bottom-3 absolute right-10">
                        <button className="text-blue-600 bg-white rounded-full px-5 py-3 text-2xl float-right">
                            Assign
                        </button>
                        <button className="text-white rounded-full bg-blue-600 px-5 py-3 text-2xl mx-3 float-right">
                            Launch
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
