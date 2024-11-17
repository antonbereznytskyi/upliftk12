import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
                router.push('/verify-email')
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }) => {
        await csrf()
        if (props.caller == 'register') {
            setErrors({})
        } else {
            setErrors([])
        }

        if (
            props.g_recaptcha_response !== undefined ||
            props.register_type == 'google'
        ) {
            axios
                .post(
                    process.env.NEXT_PUBLIC_AUTH_URL + '/api/validateCaptcha',
                    {
                        gRecaptchaToken: props.g_recaptcha_response,
                        register_type: props.register_type,
                    },
                )
                .then(response => {
                    if (response.data.status) {
                        console.log(props);
                        axios
                            .post('/register', props)
                            .then((res) => {                           
                                if(res.data.status == 'error'){
                                    setErrors(res.data.message)
                                }
                                else mutate()
                            })
                            .catch(error => {
                                //console.log(error.response.status);
                                //if (error.response.status !== 422) throw error
                                if (
                                    error.response.status !== 200 &&
                                    error.response.status !== 422
                                ) {
                                    if (props.caller != 'register')
                                        setErrors([
                                            'An error occured on server response',
                                        ])
                                    else
                                        setErrors({
                                            internalservererror: [
                                                'An error occured on server response',
                                            ],
                                        })
                                    //setErrors({recaptcha: ['Google recaptcha is invalid']});
                                } else {
                                    setErrors(error.response.data.errors)
                                }
                            })
                    } else {
                        setErrors({
                            recaptcha: ['Google recaptcha is invalid'],
                        })
                    }
                })
        }
    }
    const update = async ({ setErrors, setResDataStatus, formData }) => {
        axios
            .post('/update', formData)
            .then(res => {
                mutate()
                if (res.data.status == 'success') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Ok...',
                        text: res.data.message,
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.data.message,
                    })
                }
                setResDataStatus(false)
            })
            .catch(error => {
                setResDataStatus(false)
                setErrors(error.response.data.errors)

                /*
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.errors
            })*/
            })
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/login', props)
            .then(res => {
                if(res.data.status == 'error'){
                    setErrors(res.data.message)
                }
                else mutate()
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors))
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: router.query.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        const { data: csrfToken } = await axios.get(
            process.env.NEXT_PUBLIC_AUTH_URL + '/api/auth/csrf',
        )
        let csrf = csrfToken.csrfToken

        if (!error) {
            await axios
                .post(process.env.NEXT_PUBLIC_AUTH_URL + '/api/auth/signout', {
                    csrfToken: csrf,
                })
                .then()
            await axios.post('/logout').then(() => {
                mutate()
                window.location.pathname = '/login'
            })
        }
        window.localStorage.clear()
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        register,
        update,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
