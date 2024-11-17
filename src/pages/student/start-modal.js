import React from 'react'
import Router, { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'
import {useEffect, useState} from 'react'
import { createPortal } from 'react-dom'
import axios from '@/lib/axios'

export default function Modal() {
    const modalShow = true
    const router = useRouter()
    const { logout } = useAuth();

    const [classCode, setClassCode] = useState('')

    function onClose(){
        logout({loginUrl: '/student/login'})
    }
    function escHandler({ key }) {
        if (key === 'Escape') {
            onClose()
        }
    }
    function joinClass(){
        axios.post('/api/joinLesson', {classCode: classCode})
            .then((res) => {
                if(res.data == 'success'){
                    router.push('/student/dashboard')
                }
            })
    }
    useEffect(() => {
        axios.get('/api/getStudentInfo')
            .then((res) => {
                if(res.data.class_id == 0 || res.data.class_id == null){
                    console.log("asdf")
                }else{
                    router.push('/student/dashboard')
                }
            })
        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', escHandler)
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('keydown', escHandler)
            }
        }
    }, [])

    
    if (typeof document !== 'undefined') {
        return createPortal(
            <div
                className={`fixed flex items-center justify-center inset-0 z-50 ${
                    modalShow ? '' : 'pointer-events-none'
                }`}>
                {/* backdrop */}
                <div
                    className={`fixed inset-0 bg-black ${
                        modalShow
                            ? 'opacity-40'
                            : 'pointer-events-none opacity-0'
                    } transition-opacity duration-300 ease-in-out`}
                    onClick={onClose}
                />
                {/* content */}
                <div
                    className={`fixed md:flex rounded-md w-2/5 h-auto  bg-white shadow-lg max-w-full p-0 ${
                        modalShow
                            ? 'opacity-100'
                            : 'pointer-events-none opacity-0'
                    } transition-opacity duration-300 ease-in-out`}>
                    <div className="text-center py-20 block mx-auto font-poppins w-3/5">
                        <p className="text-2xl text-[#2f8dcc]">Join a lesson</p>
                        <p className="text-gray-600 my-5">Your teacher will give you a 5 letter CODE to enter</p>
                        <div className="text-start flex-column items-center">
                            <p className="text-sm">Enter code</p>
                            <div className="flex justify-center mt-2">
                                <input className="border border-gray-500 rounded-l-md focus:outline-none text-center w-full" onChange={(e) => {setClassCode(e.target.value)}}/>
                                <button className="p-5 bg-[#2f8dcc] text-white rounded-r-md" onClick={joinClass}>Join</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>,
            document.body,
        )
    } else {
        return null
    }
}
