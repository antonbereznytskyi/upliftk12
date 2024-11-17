import useSWR from 'swr'
import axios from '@/lib/axios'
export const getDomainTreeView = () => {
    const { data: treeView, error } = useSWR('/api/domainTree', () =>
        axios
            .get('/api/domainTree')
            .then(res => res.data.library)
            .catch(error => {
                console.log(error)
            }),
    )
    return treeView
}
