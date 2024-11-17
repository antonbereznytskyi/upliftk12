import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Router from 'next/router'

export default function Modal({ modalShow, close }) {

    const [classCode, setClassCode] = useState("")
    const [error, setError] = useState("")

    function onClose(){
        setClassCode("")
        setError("")
        close();
    }
    function escHandler({ key }) {
        if (key === 'Escape') {
            onClose()
        }
    }
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', escHandler)
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('keydown', escHandler)
            }
        }
    }, [])

    function changeClassCode(e){
        if(e.target.value != "") setError("")
        else setError("Class Code required!")
        setClassCode(e.target.value)
    }
    function changeTeacher(){
        if(classCode == "") {setError("Class Code required!"); return;}
        axios.post('/api/getTeacherForSignup', {boardName: classCode})
            .then((res) => {
                if(res.data == "incorrect"){
                    setError("Wrong class code! try again.")
                    setClassCode("")
                }else{                    
                    onClose()
                    Router.push({ pathname: '/signup-classcode', query: { board_name: classCode } })
                }
            })
    }
    if (typeof document !== 'undefined') {
        return createPortal(
            <div
                className={`fixed flex items-center justify-center inset-0 z-30 ${
                    modalShow ? '' : 'pointer-events-none'
                }`}>
                {/* backdrop */}
                <div
                    className={`fixed inset-0 bg-black ${
                        modalShow
                            ? 'opacity-70'
                            : 'pointer-events-none opacity-0'
                    } transition-opacity duration-300 ease-in-out`}
                    onClick={onClose}
                />

                {/* content */}
                <div
                    className={`fixed rounded-lg w-[500px] h-auto bg-white shadow-lg max-w-full p-0 ${
                        modalShow
                            ? 'opacity-100'
                            : 'pointer-events-none opacity-0'
                    } transition-opacity duration-300 ease-in-out`}>
                    <div className='p-10 font-poppins text-[#1d3f54]'>
                        <div className='flex items-center justify-between relative'>
                            <p className='font-medium'>Class Code: </p>
                            <input onChange={(e) => {changeClassCode(e)}} value={classCode} className='w-[300px] ml-5 rounded-md' type='text'/>
                            <p className='absolute text-red-500 text-sm -bottom-5 left-32'>{error}</p>
                        </div>
                        <div className='mt-6 flex justify-end'>
                            <button className='rounded-md px-5 py-2 bg-[#0078D0] hover:bg-[#316d97] text-white' onClick={changeTeacher}>Change Teacher</button>
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
