import React from "react";

export default function OurMission(){
    return (
        <div className="pt-20 w-full bg-[url('/images/aboutus/background1.png')] bg-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)] bg-repeat-round 2xl:h-[800px] xl:h-[800px] lg:h-[700px] sm:h-[500px] h-[400px] text-center 2xl:px-[400px] xl:px-[300px] lg:px-[150px] md:px-[100px] sm:px-[100px] px-[50px] font-poppins text-[#1d3f54] overflow-hidden">
            <p className="lg:text-5xl sm:text-2xl text-xl font-medium">Our Mission</p>
            <img src="/images/aboutus/image1.png" className="lg:mt-10 md:mt-5"/>
            <p className="lg:text-2xl sm:text-lg text-sm sm:leading-10 leading-7 lg:mt-10 md:mt-5">We are an enthusiastic group of people with a passion for education and a commitment to improved learning outcomes. Uplift K12 gets to the root of math anxiety and boosts students' confidence through the use of  virtual manipulatives, interactive collaboration, and multiplayer games.  </p>
        </div>
    )
}