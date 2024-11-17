import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useState, useEffect } from 'react'
const ProfileInput = ({
    error,
    title,
    type,
    addClass,
    value,
    handleChange,
}) => {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true)
        }, 1000)
        return () => clearTimeout(timer)
    })
    return (
        <div className={addClass}>
            <p>{title}</p>
            {loading == true ? (
                <input
                    className="w-full border rounded-md focus:outline-none p-2 border-gray-300 "
                    disabled={title == 'Email'}
                    type={type}
                    value={value}
                    onChange={handleChange}></input>
            ) : (
                <Skeleton width={300} height={40} />
            )}
            {error &&
                error.map(err => {
                    return (
                        <label className="text-xs text-red-600">
                            {err}
                            <br></br>
                        </label>
                    )
                })}
        </div>
    )
}
export default ProfileInput
