import useSWR from 'swr'
import axios from '@/lib/axios'
export const getAllState = () => {
    const { data: states, error } = useSWR('/api/state', () =>
        axios
            .get('/api/state')
            .then(res => res.data)
            .catch(error => {
                console.log(error)
            }),
    )
    return states
}
