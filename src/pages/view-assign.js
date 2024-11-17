import AppLayout from '../components/Layouts/AppLayout'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from '@/lib/axios'
import Link from 'next/link'
import DataTable from 'react-data-table-component'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
const columns = [
    {
        name: 'No',
        selector: 'no',
        width: '5%',
    },
    {
        name: 'Student Name',
        selector: 'student_name',
        sortable: true,
        cell: d => {
            return (
                <div className="flex items-center">
                    <img
                        className="w-14 h-14 rounded-full border p-1"
                        src={
                            backendUrl +
                            '/media/svg/avatars/' +
                            d.student_avatar
                        }
                    />
                    <p className="mx-3">{d.student_name}</p>
                </div>
            )
        },
    },
    {
        name: 'Score',
        selector: 'student_score',
        sortable: true,
    },
    {
        name: 'Date',
        selector: 'created_at',
        sortable: true,
        cell: d => {
            if (d.created_at != '') {
                let date = new Date(d.created_at)
                return (
                    date.getMonth() +
                    1 +
                    '/' +
                    date.getDate() +
                    '/' +
                    date.getFullYear()
                )
            } else return ''
        },
    },
]
const AssignTask = () => {
    const router = useRouter()
    const assign_id = router.query.assignId
    const [assignment, setAssignment] = useState({})
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(false)
        if (assign_id == undefined) return
        axios.get('/api/assignments/' + assign_id).then(res => {
            setAssignment(res.data)
            let no = 1
            let data = []
            res.data.studentsList.map(student => {
                let obj = {}
                obj.no = no
                obj.student_name = student.fname + ' ' + student.lname
                obj.student_avatar = student.avatars.avatar_url
                obj.student_score =
                    student.score != null ? student.score.student_score : ''
                obj.created_at =
                    student.score != null ? student.score.created_at : ''
                obj.id = student.id
                data.push(obj)
                no++
            })
            setTableData(data)
            setLoading(true)
        })
    }, [assign_id])
    return (
        <div>
            <AppLayout title="View Assign">
                <Head>
                    <title>View Assign</title>
                </Head>
                <div className="py-10 px-11 bg-gray-100 h-full">
                    <div className="container mx-auto">
                        <div className="flex justify-between items-center mb-5">
                            <div className="flex items-center">
                                <img
                                    className="w-28 h-28 mr-5 shadow-lg border"
                                    src={
                                        Object.keys(assignment).length != 0 &&
                                        assignment.lesson.lesson_image
                                    }></img>
                                <p className="text-2xl font-bold text-sky-900">
                                    Lesson Name:{' '}
                                    {Object.keys(assignment).length != 0 &&
                                        assignment.lesson.lesson_name}
                                </p>
                            </div>
                            <Link href="/assign-task">
                                <button className="rounded-md px-4 py-2 text-white bg-blue-600 hover:bg-blue-700">
                                    Back To List
                                </button>
                            </Link>
                        </div>
                        <div className="px-5 bg-white">
                            <DataTable
                                columns={columns}
                                data={tableData}
                                pagination={true}
                            />
                        </div>
                    </div>
                </div>
            </AppLayout>
            <div
                className={
                    !loading
                        ? 'backdrop-blur-sm bg-white/30 w-full h-full fixed left-0 top-0 z-40'
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
export default AssignTask
