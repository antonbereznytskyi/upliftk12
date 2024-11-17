import React, { useEffect, useState } from "react";
import Image from 'next/future/image';
import {useRouter} from "next/router";
import Link from "next/link";
import axios from '@/lib/axios'
import { useAuth } from '@/hooks/auth'
import CustomDropdown from '@/components/smallComponents/Dropdown'
import { DropdownButton } from '@/components/smallComponents/DropdownLink'
import socketIO from 'socket.io-client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dropdown } from "@nextui-org/react";

const nodeserverUrl = process.env.NEXT_PUBLIC_NODESERVER_URL

export default function Navigation(){

    const { logout } = useAuth()
    const socket = socketIO(nodeserverUrl);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [studentInfo, setStudentInfo] = useState({})
    const [messages, setMessages] = useState([])
    const [uncheckCount, setUncheckCount] = useState(0);


    useEffect(() => {
        axios.get('/api/getStudentInfo')
            .then(res => {
                socket.emit('studentLogin', {id: res.data.id})
                setStudentInfo(res.data)
            })
        axios.get('/api/message')
            .then(res => {
                setMessages(res.data)
            })
    }, [])

    useEffect(() => {  

        socket.on('getInviteMessage', (data) => {
            console.log(messages); 
            let student = data.sendStudent;
            let lesson_id = data.lessonId;
            let formData = new FormData()
            formData.append('text', `${data.sendStudent.fname} ${data.sendStudent.lname} invited you to his lesson!`)
            formData.append('lesson_id', lesson_id);
            formData.append('from_student_id', student.id)
            axios.post('/api/message', formData)
                .then((res) => {
                    setMessages(res.data)
                })
            toast.success(`${data.sendStudent.fname} ${data.sendStudent.lname} invited you to his lesson!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        })
    }, [socket])
    useEffect(() => {
        let num = 0;
        messages.map(msg => {
            if(msg.check == 0) num++;
        })
        setUncheckCount(num)
    }, [messages])
    function log_out(){
        socket.emit('studentLogout', {userId: studentInfo.id});
        logout({loginUrl:'/student/login'})
    }

    function checkMessage(){
        axios.post('/api/checkAllMessage', {messages: messages})
            .then(res => {
                setMessages(res.data)
            })
    }
    const router = useRouter();

    function selectMessage(key){
        console.log(key)
    }
    messages.map(msg => {
        let date = new Date(msg.updated_at)
        let month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : "" + month;
        let day = date.getDate();
        day = day < 10 ? "0" + day : "" + day;
        let hour = date.getHours();
        hour = hour < 10 ? "0" + hour : "" + hour;
        let minute = date.getMinutes();
        minute = minute < 10 ? "0" + minute : "" + minute;
        msg.updated_at = date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute
    })
    return (
        <div className="h-28 flex justify-between items-center px-20 py-6 text-primary fixed w-full bg-[#F6FCFF] z-20 border-b">
            <div>
                <Image src='/logos/logo.png' width={100} height={0} layout="responsive" className="w-auto h-full mx-auto"/>                
                <ToastContainer/>
            </div>
            {
                router.pathname !=  '/student/dashboard' &&
                <div className="flex font-poppins">
                    <Link href={'/student/dashboard'}>
                        <div className="text-center bg-[#E6E7E8] rounded-lg py-2 px-4 cursor-pointer hover:bg-[#D7F0FF] transition-all">
                            <svg className="block mx-auto" width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M20.231 20.5H14.0771V14.3462H7.92326V20.5H1.76942V11.2692C0.919659 11.2692 0.230956 10.5804 0.230956 9.73077L11.0002 0.5L15.6156 4.45604V2.03846H18.6925V7.09341L21.7694 9.73077C21.7694 10.5804 21.0802 11.2692 20.2313 11.2692L20.231 20.5Z" fill="#2F8DCC"/>
                            </svg>
                            <p className="font-bold">Home</p>
                        </div>
                    </Link>
                    <div className="text-center bg-[#E6E7E8] rounded-lg py-2 px-4 ml-3 cursor-pointer hover:bg-[#D7F0FF] transition-all">
                        <svg className="block mx-auto" width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.8106 0.500037H5.18924C4.01181 0.500037 2.88276 0.935918 2.05014 1.71182C1.21768 2.48761 0.75 3.53997 0.75 4.6371V12.1565C0.75 13.2538 1.21772 14.306 2.05014 15.0819C2.88276 15.8577 4.01181 16.2936 5.18924 16.2936H11.8336L17.2717 20.0679C18.489 20.9065 19.1438 20.4872 18.7252 19.1326L17.8501 16.2935H18.8085C19.9863 16.2941 21.116 15.8584 21.9489 15.0826C22.782 14.3067 23.25 13.254 23.25 12.1565V4.63706C23.25 3.53993 22.7823 2.48758 21.9499 1.71179C21.1172 0.935843 19.9882 0.5 18.8108 0.5L18.8106 0.500037Z" fill="#2F8DCC"/>
                        </svg>
                        <p className="font-bold">Lesson</p>
                    </div>
                    <Link href={'/student/assignments'}>
                        <div className={"text-center rounded-lg py-2 px-4 ml-3 cursor-pointer hover:bg-[#D7F0FF]  transition-all " + (router.pathname == '/student/assignments' ? 'bg-[#D7F0FF]' :  'bg-[#E6E7E8]')}>
                            <svg className="block mx-auto" width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.768555 0.5V20.5H17.232V5.37805H12.2929C11.99 5.37805 11.7442 5.1596 11.7442 4.89029V0.500044L0.768555 0.5ZM12.8417 0.987761V4.40231H16.6831L12.8417 0.987761ZM3.78685 4.15854H8.17719C8.48037 4.15854 8.72592 4.37699 8.72592 4.6463C8.72592 4.91579 8.48017 5.13406 8.17719 5.13406H3.78685C3.48367 5.13406 3.23812 4.91561 3.23812 4.6463C3.23812 4.37681 3.48387 4.15854 3.78685 4.15854ZM3.78685 8.06106H14.2137C14.5169 8.06106 14.7624 8.27951 14.7624 8.54882C14.7624 8.81831 14.5167 9.03659 14.2137 9.03659H3.78685C3.48367 9.03659 3.23812 8.81814 3.23812 8.54882C3.23812 8.27933 3.48387 8.06106 3.78685 8.06106ZM3.78685 11.9636H14.2137C14.5169 11.9636 14.7624 12.182 14.7624 12.4514C14.7624 12.7208 14.5167 12.9391 14.2137 12.9391H3.78685C3.48367 12.9391 3.23812 12.7207 3.23812 12.4514C3.23812 12.1819 3.48387 11.9636 3.78685 11.9636ZM3.78685 15.8661H14.2137C14.5169 15.8661 14.7624 16.0846 14.7624 16.3539C14.7624 16.6234 14.5167 16.8416 14.2137 16.8416H3.78685C3.48367 16.8416 3.23812 16.6232 3.23812 16.3539C3.23812 16.0844 3.48387 15.8661 3.78685 15.8661Z" fill="#2F8DCC"/>
                            </svg>
                            <p className="font-bold">Assignments</p>
                        </div>
                    </Link>
                    <Link href={'/student/awards'}>
                        <div className={"text-center rounded-lg py-2 px-4 ml-3 cursor-pointer hover:bg-[#D7F0FF]  transition-all " + (router.pathname == '/student/awards' ? 'bg-[#D7F0FF]' :  'bg-[#E6E7E8]')}>
                            <svg className="block mx-auto" width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M15.8301 20.5H6.12803C6.12803 18.3724 7.31955 16.9254 8.76626 16.2447V14.8829C6.80881 14.3723 5.19164 13.0106 4.42593 10.883C-0.340105 10.032 -0.850815 2.37231 4.08554 2.03195V0.5H17.9579V2.03195C22.809 2.37235 22.3833 10.0319 17.5324 10.883C16.8517 13.0106 15.1495 14.3723 13.1921 14.8829V16.2447C14.7241 16.9255 15.8303 18.3723 15.8303 20.5H15.8301ZM4.08554 3.30869C4.08554 5.18104 3.91534 7.64902 4.08554 9.43615C1.2771 8.32973 1.02167 3.64905 4.08554 3.30869ZM17.9579 3.30869C17.9579 5.18104 18.1281 7.64902 17.8728 9.43615C20.6813 8.32973 21.0218 3.64905 17.9579 3.30869Z" fill="#2F8DCC"/>
                            </svg>
                            <p className="font-bold">Awards</p>
                        </div>
                    </Link>
                </div>
            }
            <div className="flex items-center">
                <Dropdown>
                    <Dropdown.Button flat color="none" onPress={checkMessage}>
                        <div className="flex items-center relative overflow-visible cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 peer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                            </svg>
                            {
                                uncheckCount != 0 &&
                                <div className="absolute rounded-full top-0 -right-1 font-poppins bg-[#EC2420] w-6 h-6 peer-hover:w-7 peer-hover:h-7 hover:w-7 hover:h-7 transition-all flex items-center justify-center">
                                    <p className="text-xl text-white">{uncheckCount}</p>
                                </div>
                            }
                        </div>
                    </Dropdown.Button>
                    {
                        messages.length == 0 &&
                        <Dropdown.Menu color="secondary" aria-label="Actions" css={{ $$dropdownMenuWidth: "350px", height: "50px" }} disabledKeys={['empty']}>
                            <Dropdown.Item
                                key="empty"
                                >
                                No message
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    }
                    <Dropdown.Menu color="secondary" aria-label="Actions" css={{ $$dropdownMenuWidth: "350px", maxHeight: "300px" }} onAction={(key) => {selectMessage(key)}}>
                        {
                            messages.length > 0 &&
                                messages.map(msg => {
                                    return (
                                        <Dropdown.Item
                                            key={msg.id}
                                            description={msg.updated_at}
                                            >
                                            {msg.text}
                                        </Dropdown.Item>
                                    )
                                })
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <div className="mx-12">
                    <Image src='/images/student/jewel.png' width={30} height={0} layout="responsive" className="block mx-auto p-1"/>
                    <p className="font-bold font-poppins">{studentInfo?.score} Gems</p>
                </div>
                <div className="cursor-pointer">
                    <CustomDropdown
                        align="right"
                        width="48"
                        trigger={
                            <div>
                                <img src={backendUrl + '/media/svg/avatars/' + studentInfo.avatars?.avatar_url} className="block mx-auto rounded-full w-7"/>                        
                                <p className="pt-1 font-bold font-poppins">{studentInfo?.fname + " " + studentInfo?.lname}</p>
                            </div>
                        }>
                        <DropdownButton onClick={log_out}>
                            Logout
                        </DropdownButton>
                        <DropdownButton onClick={() => {console.log("profile")}}>
                            Profile
                        </DropdownButton>
                    </CustomDropdown>
                </div>
            </div>
        </div>
    )
}