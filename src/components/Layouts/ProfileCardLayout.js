import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useState, useEffect } from 'react'

const ProfileCardLayout = ({ addClass, bigTitle, smallTitle, children }) => {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true)
        }, 1000)
        return () => clearTimeout(timer)
    })
    return (
        <div className={'grid grid-cols-4 py-6 ' + addClass}>
            <div className="text-gray-600">
                <p className="2xl:text-2xl">{bigTitle}</p>
                <p className="my-3">{smallTitle}</p>
            </div>
            <div className="col-span-2 border rounded-md p-10">{children}</div>
        </div>
    )
}
export default ProfileCardLayout
