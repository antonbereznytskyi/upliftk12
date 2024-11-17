import Axios from 'axios'
import https from 'https'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    mode: 'cors',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
    },
    //httpsAgent: new https.Agent({ rejectUnauthorized: false, requestCert: true, keepAlive: true}),
    withCredentials: true,
})

export default axios
