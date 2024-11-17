import AppLayout from '../components/Layouts/AppLayout'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import StudentDataTable from '../components/Tables/StudentDataTable'
import AddStudentModal from '../components/modal/AddStudentModal'
import DelStudentModal from '../components/modal/DelStudentModal'
import Image from 'next/image'

const MyStudent = () => {
    const [addModalShow, setAddModalShow] = useState(false)
    const [editStudent, setEditStudent] = useState({})
    const [delId, setDelId] = useState('')
    const [delModalShow, setDelModelShow] = useState('')
    const [reload, setReload] = useState(false)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true)
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    const columns = [
        {
            label: 'no',
            width: '5%',
        },
        {
            label: 'avatar',
            width: '20%',
        },
        {
            label: 'full name',
            width: '15%',
        },
        {
            label: 'password',
            width: '15%',
        },
        {
            label: 'user id',
            width: '15%',
        },
        {
            label: 'class name',
            width: '20%',
        },
        {
            label: 'action',
            width: '10%',
        },
    ]
    return (
        <div>
            <AppLayout title="My Student">
                <Head>
                    <title>My Student</title>
                </Head>
                <div className="py-2 px-11 bg-gray-100 h-full w-full">
                    <div className="container mx-auto">
                        <div className="flex justify-center mt-7">
                            <StudentDataTable
                                url="/api/students"
                                reload={reload}
                                onReload={() => {
                                    setReload(false)
                                }}
                                columns={columns}
                                addButton="Add Student"
                                onAddButtonClick={() => {
                                    setAddModalShow(true)
                                }}
                                onEditButtonClick={student => {
                                    setEditStudent(student)
                                    setAddModalShow(true)
                                }}
                                onDelButtonClick={id => {
                                    setDelId(id)
                                    setDelModelShow(true)
                                }}
                            />
                            <AddStudentModal
                                addStudentModalShow={addModalShow}
                                onReload={() => {
                                    setReload(true)
                                }}
                                onClose={() => {
                                    setAddModalShow(false)
                                    setEditStudent({})
                                }}
                                student={editStudent}
                            />
                            <DelStudentModal
                                delModalShow={delModalShow}
                                onReload={() => {
                                    setReload(true)
                                }}
                                onClose={() => {
                                    setDelModelShow(false)
                                    setDelId('')
                                }}
                                id={delId}
                            />
                        </div>
                    </div>
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
            </AppLayout>
        </div>
    )
}
export default MyStudent
