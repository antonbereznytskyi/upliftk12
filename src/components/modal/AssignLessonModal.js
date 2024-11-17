import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Swal from 'sweetalert2'
import Image from 'next/image'
import Router, { useRouter } from 'next/router'

export default function Modal({ assignModalShow, assignLessonId, onClose }) {
    const [classes, setClasses] = useState([])
    const [selectedClassId, setSelectedClassId] = useState(0)
    const [students, setStudents] = useState([])
    const [selectedStudents, setSelectedStudents] = useState([])
    const [load, setLoad] = useState(true)

    function escHandler({ key }) {
        if (key === 'Escape') {
            onClose()
        }
    }
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', escHandler)
        }
        axios.get('/api/getClass').then(res => {
            if (res.data.length != 0) {
                setClasses(res.data)
                setSelectedClassId(res.data[0].id)
                axios
                    .post('/api/getStudents', { class_id: res.data[0].id })
                    .then(res => {
                        setStudents(res.data)
                    })
            }
        })
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('keydown', escHandler)
            }
        }
    }, [])

    function selectClass(e) {
        setSelectedClassId(e.target.value)
        setLoad(false)
        axios
            .post('/api/getStudents', { class_id: e.target.value })
            .then(res => {
                setLoad(true)
                setStudents(res.data)
            })
    }
    function selectStudent(e, id) {
        if (e.target.checked == true) {
            if (selectedStudents.length == 0) {
                let array = []
                array.push(id)
                setSelectedStudents(array)
            } else setSelectedStudents([...selectedStudents, id])
        } else {
            let newArray = selectedStudents.filter(function (student_id) {
                return student_id != id
            })
            setSelectedStudents(newArray)
        }
    }
    function assignLesson() {
        if (selectedStudents.length == 0) {
            alert('Select Students!!!')
            return
        }
        axios
            .post('/api/assignments', {
                lesson_id: assignLessonId,
                student_ids_array: selectedStudents,
            })
            .then(res => {
                Swal.fire({
                    title: 'Success',
                    text: 'Lesson is assigned successfully!',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Yes!',
                })
                Router.push('/assign-task')
            })
    }
    if (typeof document !== 'undefined') {
        return createPortal(
            <div
                className={`fixed flex items-center justify-center inset-0 z-50 ${
                    assignModalShow ? '' : 'pointer-events-none'
                }`}>
                {/* backdrop */}
                <div
                    className={`fixed inset-0 bg-black ${
                        assignModalShow
                            ? 'opacity-70'
                            : 'pointer-events-none opacity-0'
                    } transition-opacity duration-300 ease-in-out`}
                    onClick={onClose}
                />
                {/* content */}
                <div
                    className={`fixed md:flex rounded-lg w-3/5 h-auto  bg-white shadow-lg max-w-full p-0 ${
                        assignModalShow
                            ? 'opacity-100'
                            : 'pointer-events-none opacity-0'
                    } transition-opacity duration-300 ease-in-out`}>
                    <div className="w-full h-full p-10">
                        <p className="text-3xl font-bold text-center text-sky-900">
                            Assign Lesson
                        </p>
                        <p>Select Class</p>
                        <select
                            className="w-full mt-3 rounded-md border-gray-300 mb-5"
                            onChange={selectClass}>
                            {classes &&
                                classes.map(clas => {
                                    return (
                                        <option value={clas.id}>
                                            {clas.class_name}
                                        </option>
                                    )
                                })}
                        </select>
                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Select</TableCell>
                                        <TableCell align="center">
                                            First Name
                                        </TableCell>
                                        <TableCell align="center">
                                            Last Name
                                        </TableCell>
                                        {/* <TableCell align="center">
                                            Status
                                        </TableCell>
                                        <TableCell align="center">
                                            Object
                                        </TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {students &&
                                        students.map(student => (
                                            <TableRow
                                                key={student.id}
                                                sx={{
                                                    '&:last-child td, &:last-child th': {
                                                        border: 0,
                                                    },
                                                }}>
                                                <TableCell>
                                                    <input
                                                        type="checkbox"
                                                        onClick={(e, id) => {
                                                            selectStudent(
                                                                e,
                                                                student.id,
                                                            )
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    {student.fname}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {student.lname}
                                                </TableCell>
                                                {/* <TableCell align="center">
                                                    sdf
                                                </TableCell>
                                                <TableCell align="center">
                                                    dgfh
                                                </TableCell> */}
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div className="mt-10 flex justify-end">
                            <button
                                className="bg-sky-700 text-white rounded-lg px-3 py-1"
                                onClick={assignLesson}>
                                Assign Lesson
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className={
                        assignModalShow && !load
                            ? 'backdrop-blur-sm bg-white/30 w-full h-full fixed left-0 top-0 z-40'
                            : ''
                    }></div>
                {!assignModalShow || load ? (
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
            </div>,
            document.body,
        )
    } else {
        return null
    }
}
