import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import Image from 'next/future/image';
import axios from '@/lib/axios';
import { Table } from '@nextui-org/react';
import socketIO from 'socket.io-client'
import Swal from 'sweetalert2';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
const nodeserverUrl = process.env.NEXT_PUBLIC_NODESERVER_URL

export default function Modal({studentInfo, lessonId, inviteModalShow, close}) {

    const socket = socketIO(nodeserverUrl);
    
    const [classmates, setClassmates] = useState([])
    const [selectedStudents, setSelectedStudents] = useState([])
    const [disconnectedStudent, setDisconnectedStudent] = useState([])
    const [disableStudents, setDisableStudents] = useState([])
    
    function escHandler({ key }) {
        if (key === 'Escape') {
            close()
        }
    }
    function askConnected(students){
        return new Promise(function(resolve, reject){
            socket.emit('ask-connected', students);
            socket.on('get-response', (data) => {
                resolve(data)
            })
        })
    }
    useEffect(() => {
                axios.get('/api/getClassmates')
                    .then(res => {
                        setClassmates(res.data)
                        askConnected(res.data)
                            .then(res => {
                                setDisconnectedStudent(res)
                                setDisableStudents(res)
                            })
                        
                    })
        
        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', escHandler);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('keydown', escHandler);
            }
        };
    }, []); 
    function handleSelectStudent(row){        
        let obj = Object.fromEntries(row.entries())
        setSelectedStudents(Object.keys(obj))
        let array = Object.keys(obj)
        if(array.length > 3){
            let disableStu = []
            classmates.map(stu => {
                let flag = true
                array.map(student => {
                    if("" + stu.id == student || stu.id == studentInfo.id) {flag = false}
                })
                if(flag == true) {disableStu.push("" + stu.id)}
            })
            setDisableStudents(disableStu)
        }else{
            setDisableStudents(disconnectedStudent)
        }
    }
    function handleInvite(){
        if(selectedStudents.length == 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Please select students to invite.",
            })
            return;
        }
        socket.emit('sendInviteMessage', {invite: selectedStudents, sendStudent: studentInfo, lessonId: lessonId})
        close()
    }
    if (typeof document !== 'undefined') {        
            return createPortal((
            <div className={`fixed flex items-center justify-center inset-0 z-50 ${inviteModalShow ? '' : 'pointer-events-none'}`}>
                {/* backdrop */}
                <div 
                    className={`fixed inset-0 bg-black ${inviteModalShow ? 'opacity-70' : 'pointer-events-none opacity-0'} transition-opacity duration-300 ease-in-out`} 
                    onClick={close} 
                />

                {/* content */}
                <div className={`fixed rounded-lg w-[500px] h-auto bg-white shadow-lg max-w-full p-0 ${inviteModalShow ? 'opacity-100' : 'pointer-events-none opacity-0'} transition-opacity duration-300 ease-in-out`}>
                    <div className='p-5 font-poppins text-[#1D3F54]'>
                        <p className='text-3xl text-center font-bold mb-5'>Select Students To Invite</p>
                        <Table
                            aria-label="table"
                            css={{
                                height: "auto",
                                minWidth: "100%",
                            }}
                            selectionMode="multiple"
                            color="primary"
                            onSelectionChange={handleSelectStudent} 
                            disabledKeys={disableStudents}   
                            >
                            <Table.Header>
                                <Table.Column>First Name</Table.Column>
                                <Table.Column>Last Name</Table.Column>
                                <Table.Column>Avatar</Table.Column>
                                <Table.Column>Status</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {
                                    classmates.length > 0 &&
                                        classmates.map(student => {
                                            if(student.id == studentInfo.id) return 

                                            return (
                                                <Table.Row key={student.id}>
                                                    <Table.Cell><p className={disconnectedStudent.findIndex(e => e == "" + student.id) == -1 && "text-green-400"}>{student.fname}</p></Table.Cell>
                                                    <Table.Cell><p className={disconnectedStudent.findIndex(e => e == "" + student.id) == -1 && "text-green-400"}>{student.lname}</p></Table.Cell>
                                                    <Table.Cell><img src={backendUrl + '/media/svg/avatars/' + student.avatars.avatar_url} className="w-6 h-6"/></Table.Cell>
                                                    <Table.Cell><p className={disconnectedStudent.findIndex(e => e == "" + student.id) == -1 && "text-green-400"}>{disconnectedStudent.findIndex(e => e == "" + student.id) > -1 ? "offline" : "online"}</p></Table.Cell>
                                                </Table.Row>
                                            )
                                        })
                                }
                            </Table.Body>                        
                        </Table>
                        <div className='flex justify-end items-center mt-3'>
                            <button onClick={handleInvite} className='text-white bg-[#2f8dcc]  transition-all px-4 py-2 rounded-md font-bold ml-3 hover:bg-[#659ec4]'>Invite</button>
                            <button
                                className="ml-5 px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded-md font-bold text-white"
                                onClick={close}>
                                Cancel
                            </button>
                        </div>
                    </div>         
                </div>
            </div>
            ), document.body)
    } else {
        return null
    }
}