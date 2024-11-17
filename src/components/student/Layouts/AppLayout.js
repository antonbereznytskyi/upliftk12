import React from "react";
import Navigation from "@/components/student/Layouts/Navigation";

export default function AppLayout({children}){
    return (
        <div className="w-full min-h-screen bg-[#F6FCFF]">
            <Navigation/>
            <div className="pt-28">
                {children}
            </div>
        </div>
    )
}