import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import StudentInput from '@/components/smallComponents/StudentInput'
import axios from '@/lib/axios'
import Swal from 'sweetalert2'

export default function Modal({ onReload, addModalShow, onClose, editClass }) {
    function close() {
        setClassName('')
        onClose()
    }
    const [className, setClassName] = useState('')
    const [title, setTitle] = useState('')

    function escHandler({ key }) {
        if (key === 'Escape') {
            close()
        }
    }
    const AddClass = () => {
        let formData = new FormData()
        formData.append('class_name', className)
        if (editClass?.class_name) {
            axios
                .put('/api/classes/' + editClass.id, {
                    class_name: className,
                })
                .then(res => {
                    Swal.fire({
                        title: 'Success',
                        text: 'Class is updated successfully!',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Yes!',
                    })
                    setClassName('')
                    close()
                    onReload()
                    // if(typeof window != 'undefined'){
                    //     window.location.reload(true)
                    // }
                })
                .catch(e => {
                    console.log(e)
                })
        } else {
            axios
                .post('/api/classes', formData)
                .then(res => {
                    Swal.fire({
                        title: 'Success',
                        text: 'Class is added successfully!',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Yes!',
                    })
                    setClassName('')
                    close()
                    onReload()
                    // if(typeof window != 'undefined'){
                    //     window.location.reload(true)
                    // }
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }
    useEffect(() => {
        if (editClass?.class_name) {
            setClassName(editClass.class_name)
            setTitle('Edit Class')
        } else {
            var timer = setTimeout(() => {
                setTitle('Add Class')
            }, 300)
            setClassName('')
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
    }, [editClass])

    if (typeof document !== 'undefined') {
        return createPortal(
            <div
                className={`fixed flex items-center justify-center inset-0 z-50 ${
                    addModalShow ? '' : 'pointer-events-none'
                }`}>
                {/* backdrop */}
                <div
                    className={`fixed inset-0 bg-black ${
                        addModalShow
                            ? 'opacity-70'
                            : 'pointer-events-none opacity-0'
                    } transition-opacity duration-300 ease-in-out`}
                    onClick={close}
                />

                {/* content */}
                <div
                    className={`fixed rounded-lg w-1/3 h-auto bg-white shadow-lg max-w-full p-0 ${
                        addModalShow
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
                            label="Class Name"
                            value={className}
                            onChange={e => {
                                setClassName(e.target.value)
                            }}
                        />
                        {/* <StudentInput label = "Last Name" value={lname} onChange = {(e) => {setLname(e.target.value)}}/>
                        <StudentInput label = "User Id" value={email} onChange = {(e) => {setEmail(e.target.value)}}/> */}
                        {/* <div className="flex text-start my-3 items-center">
                            <p className="w-1/3">Class:</p>
                            <select className="w-2/3 border-gray-200 rounded-md py-1" value={classId} onChange = {(e) => {setClassId(e.target.value)}}>
                                {classes?.map((classes) => {
                                    return <option value = {classes?.class_id}>{classes?.class_name}</option>
                                })}
                            </select>
                        </div>    */}
                    </div>
                    <div className="bg-gray-100 py-5 px-10 rounded-b-lg flex justify-end">
                        <button
                            className="text-gray-400 mx-5 hover:text-gray-600"
                            onClick={close}>
                            Cancel
                        </button>
                        <button
                            className="rounded-lg py-2 px-3 bg-green-500 hover:bg-green-400 text-white"
                            onClick={AddClass}>
                            {editClass?.class_name != undefined
                                ? 'Edit Class'
                                : 'Add Class'}
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
