import axios from '@/lib/axios'
import Swal from 'sweetalert2'
import useSWR from 'swr'
import { useRouter } from 'next/router'

export const creditCard = () => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')
    const router = useRouter()

    const { data: userCards, error, mutate } = useSWR('/api/get-user-card', () =>
        axios.get('/api/get-user-card')
        .then(res => res.data)
        .catch(error => {
            if (error.response.status !== 409) throw error
        }),
    )
    
    const addCard = async({setAjaxLoading, setCardForm, ...props}) => {
        await csrf()
        axios.post('/api/add-card', props).then(res => {
            Swal.fire({
                icon: res.data.is_success ? 'success' : 'error',
                text: res.data.is_success ? 'The card is added successfully!' : res.data.error_message,
            })
            mutate();
            setAjaxLoading(false);
            setCardForm(false);
        });
    }

    const processPayment = async({setAjaxLoading, ...props}) => {
        await csrf()

        axios.post('/api/process-payment', props.data).then(res => {
            mutate();
            setAjaxLoading(false);            
            console.log(res.data);
            Swal.fire({
                icon: res.data.is_success ? 'success' : 'error',
                text: res.data.error_message,
            }).then((res) => {
                if (res.value)
                router.push('/membership');
            })
        })
    }

    return {
        userCards,
        addCard,
        processPayment
    }
} 