import useSWR from 'swr'
import axios from '@/lib/axios'
export const getAllClass = () => {
    const { data: classes, error } = useSWR('/api/classes', () =>
        axios
            .get('/api/classes')
            .then(res => res.data)
            .catch(error => {
                console.log(error)
            }),
    )
    return classes
}
