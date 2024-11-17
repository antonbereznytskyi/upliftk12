import React from "react";
import Image from "next/future/image";

export default function FeelImage({src, feelStr, onClick, selected}){
    return (
        <div className="cursor-pointer group" onClick={onClick}>
            <div className='rounded-full w-10 h-10 border-2 border-gray-400 flex justify-center items-center mx-auto group-hover:shadow-lg group-hover:border-primary transition-all'>
                <div className={'rounded-full w-5 h-5 border border-gray-400 group-hover:border-primary transition-all duration-300 ' + (selected && 'bg-[#2F8DCC]')}>
                </div>
            </div>
            <div className="py-3">
                <Image src={src} width={50} height={0} layout="response" className="block mx-auto"/>
            </div>
            <div>
                <p className="text-center text-primary font-bold">{feelStr}</p>
            </div>
        </div>
    )
}