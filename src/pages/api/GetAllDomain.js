import useSWR from 'swr'
import axios from '@/lib/axios'
export const getAllDomain = () => {
    const { data: domains, error } = useSWR('/api/domains', () =>
        axios
            .get('/api/domains')
            .then(res => res.data)
            .catch(error => {
                console.log(error)
            }),
    )

    return domains
}
