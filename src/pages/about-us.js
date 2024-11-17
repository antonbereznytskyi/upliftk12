import React from "react";
import LandingLayout from '@/components/Layouts/LandingLayout'
import Head from "next/head";
import OurMission from '@/components/aboutuscomponents/OurMission'
import OurCoreValue from "@/components/aboutuscomponents/OurCoreValue";
import Leadership from "@/components/aboutuscomponents/Leadership";
import AboutMember from "@/components/aboutuscomponents/AboutMember";
import Guide from "@/components/aboutuscomponents/Guide";
import Advisory from "@/components/aboutuscomponents/Advisory";
import Doctors from "@/components/aboutuscomponents/Doctors";
import ContactUs from "@/components/aboutuscomponents/ContactUs";

export default function AboutUs(){


    return (
        <LandingLayout>
            <Head>
                <title>About Us</title>
                <link
                    href="https://fonts.googleapis.com/css?family=Poppins"
                    rel="stylesheet"></link>
                <meta
                    charset="utf-8"
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"></meta>
            </Head>
            <div>
                <OurMission/>
                <OurCoreValue/>
                <Leadership/>
                <AboutMember/>
                <Guide/>
                <Advisory/>
                <Doctors/>
                <ContactUs/>
            </div>
        </LandingLayout>
    )
}