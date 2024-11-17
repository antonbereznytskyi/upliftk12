import axios from '@/lib/axios'
import { mutate } from 'swr'

export const collect = () => {
    
    const csrf = () => axios.get('/sanctum/csrf-cookie')
    const updateLandingPageVisit = async() => {
        await csrf()
        axios.post('/update-visit').then(() => mutate());
    }

    return {
        updateLandingPageVisit
    }
}