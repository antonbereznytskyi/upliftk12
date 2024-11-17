import axios from '@/lib/axios'
import { mutate } from 'swr'

export const updateSQL = () => {
    
    const csrf = () => axios.get('/sanctum/csrf-cookie')
    
    const updateTerms = async() => {
        await csrf()
        axios.post('/api/update-terms').then(() => mutate());
    }

    return {
        updateTerms
    }
}