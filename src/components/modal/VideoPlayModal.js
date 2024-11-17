import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
export default function Modal({ playModalShow, close, videoUrl }) {
    function escHandler({ key }) {
        if (key === 'Escape') {
            close()
        }
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
                    playModalShow ? '' : 'pointer-events-none'
                }`}>
                {/* backdrop */}
                <div
                    className={`fixed inset-0 bg-black ${
                        playModalShow
                            ? 'opacity-70'
                            : 'pointer-events-none opacity-0'
                    } transition-opacity duration-300 ease-in-out`}
                    onClick={close}
                />

                {/* content */}
                <div
                    className={`fixed rounded-lg w-1/3 h-auto bg-white shadow-lg max-w-full p-0 ${
                        playModalShow
                            ? 'opacity-100'
                            : 'pointer-events-none opacity-0'
                    } transition-opacity duration-300 ease-in-out`}>
                    <video
                        className="rounded-lg"
                        src={backendUrl + '/storage/videos/capture/' + videoUrl}
                        controls
                        autoPlay
                        onEnded={close}></video>
                </div>
            </div>,
            document.body,
        )
    } else {
        return null
    }
}
