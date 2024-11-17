import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Router ,{useRouter} from 'next/router'
import { useState } from "react";
import axios from "@/lib/axios";
import Image from "next/image";
import ChangeTeacherModal from '@/components/modal/ChangeTeacherModal'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Swal from "sweetalert2";


const schema = z.object({
    fname: z.string().min(1, { message: 'Required' }),
    lname: z.string().min(1, {message:"Required"}),
    password: z.string().min(6, {message: "Required"}),
    password_confirm: z.string().min(6, {message: "Required"}),
  }).refine((data) => data.password === data.password_confirm, {
    message: "Password doesn't match",
    path: ["password_confirm"]
  });

export default function SignupWithClasscode(){

    

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(schema),
      });

    

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [boardName, setBoardName] = useState("")
    const [teacherInfo, setTeacherInfo] = useState({})
    const [changeTeacherModalShow, setChangeTeacherModalShow] = useState(false)

    useEffect(() => {
        let timer = setTimeout(()=> {
            setLoading(true)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])
    useEffect(() => {
        let board_name = router.query.board_name
        setBoardName(board_name)
        if(board_name){
            axios.post('/api/getTeacherForSignup', {boardName: board_name})
                .then((res) => {
                    if(res.data == "incorrect") Router.push('/')
                    setTeacherInfo(res.data)
                })
        }
    }, [router])
    function SignupWithClasscode(d){
        axios.post('/api/signUpWithClassCode', {...d, 'teacher_id': teacherInfo.id})
            .then((res) => {
                if(res.data.status == "error"){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.data.message,
                    })
                }
                else{
                    router.push('/student/assignments')
                }
                reset({fname:"", lname: "", password: "", password_confirm: ""})
            })
    }
    return (
        <div>
            <div className="text-[#1d3f54] font-poppins text-center">
                <p className="mt-16 text-5xl font-bold">{teacherInfo.fname + " " + teacherInfo.lname}</p>
                <p className="text-3xl font-medium mt-10">{boardName}</p>
                <button className="mt-10 rounded-md px-5 py-2 bg-[#0078D0] hover:bg-[#316d97] text-white" onClick={() => {setChangeTeacherModalShow(true)}}>Change Teacher</button>
                <div className="bg-[#316d97] p-2 block w-[400px] mx-auto mt-10">
                    <div className="rounded-lg p-8 bg-white text-start">
                        <p className="font-bold text-xl">SIGN UP</p>
                        <form className="mt-5" onSubmit={handleSubmit((d) => SignupWithClasscode(d))}>
                            <div className="relative mt-5">
                                <p>First Name</p>
                                <input type="text" className="w-full border border-gray-400 rounded-md" {...register('fname')}/>
                                {errors.fname?.message && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.fname?.message}</p>}
                            </div>
                            <div className="relative mt-5">
                                <p>Last Name</p>
                                <input type="text" className="w-full border border-gray-400 rounded-md" {...register('lname')}/>
                                {errors.lname?.message && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.lname?.message}</p>}
                            </div>
                            <div className="relative mt-5">
                                <p>Password</p>
                                <input className="w-full rounded-md" type="password" {...register('password')}/>
                                {errors.password?.message && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.password?.message}</p>}
                            </div>
                            <div className="relative mt-5">
                                <p>Confirm Password</p>
                                <input className="w-full rounded-md" type="password" {...register('password_confirm')}/>
                                {errors.password_confirm?.message && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.password_confirm?.message}</p>}
                            </div>
                            <button className="mt-10 bg-pink-500 hover:bg-pink-400 rounded-lg w-full py-2 text-white">SIGN UP</button>
                        </form>
                    </div>
                </div>
                <ChangeTeacherModal modalShow={changeTeacherModalShow} close={() => {setChangeTeacherModalShow(false)}}/>
            </div>

            <div
                className={
                    !loading
                        ? 'backdrop-blur-sm bg-white/30 w-full h-full fixed z-40 left-0 top-0'
                        : ''
                }></div>
            {loading ? (
                ''
            ) : (
                <div className="text-center fixed transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 z-50">
                    <div role="status">
                        <svg
                            className="inline mr-2 w-36 h-36 text-gray-200 animate-spin dark:text-gray-600 fill-green-300"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="absolute left-[0.6rem] top-[0.6rem]">
                        <Image
                            src="/logos/small-logo.png"
                            width={'124px'}
                            height={'124px'}
                            className="mx-auto"></Image>
                    </div>
                </div>
            )}
        </div>
    )
}