import Head from "next/head"
import React, { useState, useEffect } from "react"
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import TreeView from '@/components/TreeView'
import LessonsLibrary from "../../components/LessonsLibrary"

const Library = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const [domainId, setDomainId] = useState(1);
    const [selectedGrade, setSelectedGrade] = useState('Kindergarten');
    return (
        <div className="w-full min-h-screen">
            <Head>
                <title>Digital Library</title>
            </Head>
            <div className="min-h-screen">
                <div className="flex justify-between border-b px-10 py-5 items-center h-[80px] fixed w-full bg-white top-0 z-50">
                    <p className="text-3xl font-bold">Digital Library</p>
                    <div className="flex">
                        <Link href = '/mylessons/advanced-search-library'>
                            <button className="text-white bg-green-500 hover:bg-green-600 rounded-lg py-2 px-3 mx-3">Advanced Search</button>
                        </Link>
                        <Link href="/mylessons">
                            <button className="text-white bg-sky-500 hover:bg-sky-600 rounded-lg py-2 px-3">Back To Home</button>
                        </Link>
                    </div>
                </div>
                <div className="flex h-[calc(100vh-80px)] mt-[80px]">
                    <div className = "w-1/5 border-r p-3 fixed  h-[calc(100vh-80px)]">
                        <TreeView onClick = {(domainId) => {setDomainId(domainId)}} onClickGrade = {(grade) => setSelectedGrade(grade)}/>
                    </div>
                    <div className = "w-4/5 p-5 ml-[20%]">
                        <LessonsLibrary domainId={domainId} grade = {selectedGrade}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Library
