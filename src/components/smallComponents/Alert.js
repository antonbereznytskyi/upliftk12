import React from 'react'

export default function Alert({ message, mode, onClose }) {
    return (
        <div
            className={
                'w-2/3 py-2 px-5 rounded-lg flex justify-between items-center '
                // (mode == 'error' ? 'bg-red-200' : 'bg-green-200')
            }>
            <p className="text-red-500">{message}</p>
            <svg
                onClick={onClose}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </div>
    )
}
