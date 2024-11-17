import { MultiSelect } from 'react-multi-select-component'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useState, useEffect } from 'react'

function Example({
    addClass,
    title,
    multiSelectOptions,
    selected,
    setSelected,
}) {
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
                <MultiSelect
                    hasSelectAll={false}
                    disableSearch
                    options={multiSelectOptions}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                />
            ) : (
                <Skeleton height={40} width={300} />
            )}
        </div>
    )
}

export default Example
