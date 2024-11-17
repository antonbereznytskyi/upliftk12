import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import StudentInput from '@/components/smallComponents/StudentInput'
import axios from '@/lib/axios'
import Swal from 'sweetalert2'

export default function Modal({
    onReload,
    addStudentModalShow,
    onClose,
    student,
}) {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [password, setPassword] = useState('')
    const [classId, setClassId] = useState('')
    const [classes, setClasses] = useState([])
    const [title, setTitle] = useState('')
    const [inviteAllow, setInviteAllow] = useState(false)

    function close() {
        setFname('')
        setLname('')
        setPassword('')
        setClassId(classes[0]?.id)
        setInviteAllow(false)
        onClose()
    }
    function escHandler({ key }) {
        if (key === 'Escape') {
            close()
        }
    }
    const AddStudent = () => {
        let formData = new FormData()
        formData.append('fname', fname)
        formData.append('lname', lname)
        formData.append('password', password)
        formData.append('class_id', classId)
        if (student?.id) {
            axios
                .put('/api/students/' + student.id, {
                    fname: fname,
                    lname: lname,
                    password: password,
                    class_id: classId,
                })
                .then(res => {
                    Swal.fire({
                        title: 'Success',
                        text: 'Student is updated successfully!',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Yes!',
                    })
                    close()
                    onReload()
                })
                .catch(error => {
                    console.log(error.response.data.errors)
                    Swal.fire({
                        title: 'error',
                        text: error.response.data.message,
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Yes!',
                    })
                })
        } else {
            axios
                .post('/api/students', formData)
                .then(res => {
                    Swal.fire({
                        title: 'Success',
                        text: 'Student is added successfully!',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Yes!',
                    })
                    close()
                    onReload()
                })
                .catch(error => {
                    console.log(error.response.data.errors)
                    Swal.fire({
                        title: 'error',
                        text: error.response.data.message,
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Yes!',
                    })
                })
        }
    }
    useEffect(() => {
        axios
            .get('/api/classes')
            .then(res => {
                setClasses(res.data)
                setClassId(res.data[0].id)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    useEffect(() => {
        if (student.fname) {
            setTitle('Edit Student')
            setFname(student.fname)
            setLname(student.lname)
            setPassword(student.password)
            setClassId(student.class_id)
            if(student.invite_allow == 0) setInviteAllow(false)
            else setInviteAllow(true)
        } else {
            var timer = setTimeout(() => {
                setTitle('Add Student')
            }, 300)
        }
        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', escHandler)
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('keydown', escHandler)
            }
            clearTimeout(timer)
        }
    }, [student])
    function checkInviteAllow(e){
        setInviteAllow(e.target.checked)
    }
    if (typeof document !== 'undefined') {
        return createPortal(
            <div
                className={`fixed flex items-center justify-center inset-0 z-50 ${
                    addStudentModalShow ? '' : 'pointer-events-none'
                }`}>
                {/* backdrop */}
                <div
                    className={`fixed inset-0 bg-black ${
                        addStudentModalShow
                            ? 'opacity-70'
                            : 'pointer-events-none opacity-0'
                    } transition-opacity duration-300 ease-in-out`}
                    onClick={close}
                />

                {/* content */}
                <div
                    className={`fixed rounded-lg w-1/3 h-auto bg-white shadow-lg max-w-full p-0 ${
                        addStudentModalShow
                            ? 'opacity-100'
                            : 'pointer-events-none opacity-0'
                    } transition-opacity duration-300 ease-in-out`}>
                    <div className="px-10 pt-5">
                        <div className="flex justify-between mb-7">
                            <p className="text-2xl font-bold">{title}</p>
                            <button onClick={close}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <StudentInput
                            label="First Name"
                            value={fname}
                            onChange={e => {
                                setFname(e.target.value)
                            }}
                        />
                        <StudentInput
                            label="Last Name"
                            value={lname}
                            onChange={e => {
                                setLname(e.target.value)
                            }}
                        />
                        <StudentInput
                            label="Set Password"
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value)
                            }}
                        />
                        <div className="flex text-start my-3 items-center">
                            <p className="w-1/3">Class:</p>
                            <select
                                className="w-2/3 border-gray-200 rounded-md py-1"
                                value={classId}
                                onChange={e => {
                                    setClassId(e.target.value)
                                }}>
                                {classes?.map(classes => {
                                    return (
                                        <option value={classes?.id}>
                                            {classes?.class_name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='flex items-center mt-6'>
                            <input type="checkbox" checked={inviteAllow} onChange={checkInviteAllow}/>
                            <p className='ml-3'>Allow the student to invite other students</p>
                        </div>
                    </div>
                    <div className="bg-gray-100 py-5 px-10 rounded-b-lg flex justify-end">
                        <button
                            className="text-gray-400 mx-5 hover:text-gray-600"
                            onClick={close}>
                            Cancel
                        </button>
                        <button
                            className="rounded-lg py-2 px-3 bg-green-500 hover:bg-green-400 text-white"
                            onClick={AddStudent}>
                            {student?.fname != undefined
                                ? 'Edit Student'
                                : 'Add Student'}
                        </button>
                    </div>
                </div>
            </div>,
            document.body,
        )
    } else {
        return null
    }
}
