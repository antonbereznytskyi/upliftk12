import React, { Component, useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Link from 'next/link'
import Image from 'next/image'
import DataTable from 'react-data-table-component'
import DelAssignModal from '@/components/modal/DelAssignModal'
import Router, { useRouter } from 'next/router'
import AssignTaskEditModal from '@/components/modal/AssignTaskEditModal'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
export default function AssignDatatable() {
    const columns = [
        {
            name: 'No',
            selector: 'no',
            width: '5%',
        },
        {
            name: 'Lesson Name',
            selector: 'lesson_name',
            sortable: true,
            width: '30%',
        },
        {
            name: 'Students',
            selector: 'assign_members',
            sortable: true,
            width: '25%',
            cell: d => {
                let no = 0
                let count = d.studentsList.length
                return d.studentsList.map(student => {
                    no++
                    if (no == 6)
                        return <p className="ml-2">+{count - 5} more</p>
                    else if (no > 6) return
                    return (
                        <img
                            className={
                                (no == 1 ? '' : '-ml-3 ') +
                                'w-14 h-14 rounded-full border p-1 bg-white'
                            }
                            src={
                                backendUrl +
                                '/media/svg/avatars/' +
                                student.avatars.avatar_url
                            }></img>
                    )
                })
            },
        },
        {
            name: 'Date',
            selector: 'created_at',
            sortable: true,
            cell: d => {
                let date = new Date(d.created_at)
                return (
                    date.getMonth() +
                    1 +
                    '/' +
                    date.getDate() +
                    '/' +
                    date.getFullYear()
                )
            },
        },
        {
            name: 'Action',
            selector: 'id',
            width: '20%',
            cell: d => {
                return (
                    <div className="font-poppins 2xl:flex">
                        <button
                            className="py-1 w-20 bg-[#16a260] hover:bg-[#16a260] text-white rounded-sm mx-auto block "
                            onClick={e => {
                                viewAssign(d.id)
                            }}>
                            View
                        </button>
                        <button
                            className="py-1 w-20 bg-[#1d3f54] hover:bg-[#1d3f54] text-white mx-2 rounded-sm mx-auto block my-1 2xl:my-0"
                            onClick={(e, ids, id) => {
                                editAssign(d.lesson_id, d.student_ids, d.id)
                            }}>
                            Edit
                        </button>
                        <button
                            className="py-1 w-20 bg-[#ee2626] hover:bg-[#ee2626] text-white rounded-sm mx-auto block"
                            onClick={e => {
                                deleteAssign(d.id)
                            }}>
                            Delete
                        </button>
                    </div>
                )
            },
        },
    ]
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [delModalShow, setDelModalShow] = useState(false)
    const [delAssignId, setDelAssignId] = useState(0)
    const [editModalShow, setEditModalShow] = useState(false)
    const [editAssignLessonId, setEditAssignLessonId] = useState('')
    const [editAssignStudentIds, setEditAssignStudentIds] = useState([])
    const [assignId, setAssignId] = useState('')

    function editAssign(lesson_id, student_ids, id) {
        setAssignId(id)
        setEditAssignStudentIds(student_ids)
        setEditAssignLessonId(lesson_id)
        setEditModalShow(true)
    }
    function deleteAssign(id) {
        setDelAssignId(id)
        setDelModalShow(true)
    }
    function viewAssign(id) {
        Router.push({ pathname: '/view-assign', query: { assignId: id } })
    }
    function fetchData() {
        axios.get('/api/assignments').then(res => {
            let data = []
            let no = 1
            res.data.map(assign => {
                let obj = {}
                obj.no = no
                obj.lesson_id = assign.ass_lesson_id
                obj.lesson_name = assign.lesson?.lesson_name
                obj.assign_members = assign.studentsList.length
                obj.student_ids = assign.students
                obj.studentsList = assign.studentsList
                obj.created_at = assign.created_at
                obj.status = 'status'
                obj.id = assign.id
                data.push(obj)
                no++
            })
            setTableData(data)
            setLoading(true)
        })
    }
    useEffect(() => {
        setLoading(false)
        fetchData()
    }, [])
    function handleChangeSearch(e) {
        setSearchValue(e.target.value)
    }
    function deletedAssign(id) {
        setTableData(
            tableData.filter(item => {
                if (item.id != id) return item
            }),
        )
    }
    return (
        <div>
            <div className="flex justify-between items-center mb-5">
                <div className="flex items-center border rounded-md px-1 bg-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 mx-1 text-gray-400">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                    <input
                        className="border-none focus:outline-none focus:border-none py-2 w-96"
                        placeholder="Search"
                        onChange={handleChangeSearch}></input>
                </div>
                <Link href={'/mylessons'}>
                    <button className="bg-[#2f8dcc] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded font-poppins">
                        New Assignment
                    </button>
                </Link>
            </div>
            <div className="px-5 bg-white">
                <DataTable
                    columns={columns}
                    data={tableData.filter(item => {
                        if (searchValue == '') return item
                        else if (
                            item.lesson_name
                                .toLowerCase()
                                .includes(searchValue.toLowerCase())
                        ) {
                            return item
                        }
                    })}
                    pagination={true}
                />
                <DelAssignModal
                    delModalShow={delModalShow}
                    onClose={() => {
                        setDelModalShow(false)
                        setDelAssignId(0)
                    }}
                    id={delAssignId}
                    deletedAssign={id => {
                        deletedAssign(id)
                    }}
                />
                <AssignTaskEditModal
                    assignModalShow={editModalShow}
                    assignLessonId={editAssignLessonId}
                    onClose={() => {
                        setEditModalShow(false)
                        fetchData()
                    }}
                    student_ids={editAssignStudentIds}
                    assignId={assignId}
                />
            </div>
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
