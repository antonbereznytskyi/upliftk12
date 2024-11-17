import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Swal from 'sweetalert2'

export default function Modal({ delModalShow, onReload, onClose, id }) {
    function escHandler({ key }) {
        if (key === 'Escape') {
            onClose()
        }
    }
    function deleteClass() {
        axios
            .delete('/api/classes/' + id)
            .then(res => {
                Swal.fire({
                    title: 'Success',
                    text: 'Class is deleted successfully!',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Yes!',
                })
                onClose()
                onReload()
            })
            .catch(e => {})
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

    if (typeof document !== 'undefined') {
        return createPortal(
            <div
                className={`fixed flex items-center justify-center inset-0 z-50 ${
                    delModalShow ? '' : 'pointer-events-none'
                }`}>
                {/* backdrop */}
                <div
                    className={`fixed inset-0 bg-black ${
                        delModalShow
                            ? 'opacity-70'
                            : 'pointer-events-none opacity-0'
                    } transition-opacity duration-300 ease-in-out`}
                    onClick={onClose}
                />

                {/* content */}
                <div
                    className={`fixed rounded-lg w-1/5 h-auto bg-white shadow-lg max-w-full p-0 ${
                        delModalShow
                            ? 'opacity-100'
                            : 'pointer-events-none opacity-0'
                    } transition-opacity duration-300 ease-in-out`}>
                    <div className="text-start">
                        <div className="p-5">
                            <p className="font-bold text-xl my-3">
                                You are about to delete your class.
                            </p>
                            <p>
                                Are you going to really delete your class? if
                                yes, click Delete button!
                            </p>
                        </div>
                        <div className="flex justify-end bg-gray-200 rounded-b-lg p-5">
                            <button
                                className="bg-gray-400 text-white px-5 py-1 rounded-md"
                                onClick={onClose}>
                                Cancel
                            </button>
                            <button
                                className="bg-red-600 text-white px-5 py-1 rounded-md mx-3"
                                onClick={deleteClass}>
                                Delete
                            </button>
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
