import ApplicationLogo from '@/components/smallComponents/ApplicationLogo'
import AuthCard from '@/components/smallComponents/AuthCard'
import AuthValidationErrors from '@/components/smallComponents/AuthValidationErrors'
import Button from '@/components/smallComponents/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/smallComponents/Input'
import Label from '@/components/smallComponents/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState, useEffect } from 'react'
import SigninOther from '@/components/smallComponents/SigninOther'
import Recaptcha from 'react-google-recaptcha'
import { signIn, useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import ReCAPTCHA from 'react-google-recaptcha'
import Head from 'next/head'

let item = false;
const Register = () => {
    
    const { data: session, status } = useSession()
    const [fname, setFName] = useState('')
    const [lname, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [redierct_membership, setRedirectMemberShip] = useState(
        typeof window !== "undefined" ? localStorage.redirect_memberhsip : false
    );
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState({})
    const [terms, setTerms] = useState(false)
    const [registerToServer, setRegisterToserver] = useState(false)

    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: redierct_membership ? '/membership' : '/mylessons',
    })

    useEffect(() => {
        if (status == 'authenticated' && session.user) {
            setRegisterToserver(true)
            register({
                fname: session.user.family_name,
                role_id: process.env.NEXT_PUBLIC_TEACHER_ROLE,
                caller: 'register',
                lname: session.user.given_name,
                email: session.user.email,
                register_type: 'google',
                setErrors,
            })
        }
        item = localStorage.getItem('redirect_memberhsip')
    }, [status, session])
    if (JSON.stringify(errors) !== '{}' && registerToServer) {
        grecaptcha.reset()
        setRegisterToserver(false)
        if (session) signOut({ redirect: false })
    }

    const submitForm = async event => {
        event.preventDefault()
        setRegisterToserver(true)
        //console.log(grecaptcha.getResponse());
        const g_recaptcha_response = await grecaptcha.getResponse()
        register({
            fname,
            lname,
            email,
            role_id: process.env.NEXT_PUBLIC_TEACHER_ROLE,
            password,
            caller: 'register',
            password_confirmation: passwordConfirmation,
            g_recaptcha_response: g_recaptcha_response,
            terms,
            setErrors,
        })
    }

    return (
        <GuestLayout>
            <Head>
                <title>Register</title>
            </Head>
            <AuthCard>
                <h3 className="text-center text-2xl mb-3 text-primary font-bold">
                    Free teacher sign up
                </h3>
                <h5 className="text-center text-base mb-6 text-gray-600">
                    Already have an account?
                    <Link href="/login">
                        <a className="text-blue-600 font-bold ml-2 underline">
                            Sign In
                        </a>
                    </Link>
                </h5>
                <hr />
                {/* Validation Errors */}
                <AuthValidationErrors className="mb-4" errors={errors} />
                <div className="flex flex-col md:flex-row md:divide-x xs:divide-y">
                    <div className="flex p-6 md:p-12 lg:w-1/2">
                        <div className="w-full">
                            <div className="flex justify-center">
                                <div>
                                    <SigninOther
                                        svg={
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="inline w-4 h-4 mr-3 text-gray-900 fill-current"
                                                viewBox="0 0 48 48"
                                                width="48px"
                                                height="48px">
                                                <path
                                                    fill="#fbc02d"
                                                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                                <path
                                                    fill="#e53935"
                                                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                                <path
                                                    fill="#4caf50"
                                                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                                <path
                                                    fill="#1565c0"
                                                    d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                            </svg>
                                        }
                                        title={'Signup with Google'}
                                        onClick={() =>
                                            signIn('google')
                                        }></SigninOther>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center p-6 md:p-12 lg:w-1/2">
                        <div className="w-full">
                            <div className="flex justify-center">
                                <form className="w-full" onSubmit={submitForm}>
                                    {/* Name */}
                                    <Label
                                        className={`mt-1 w-full ${
                                            errors.internalservererror
                                                ? 'block text-red-400'
                                                : 'hidden'
                                        }`}>
                                        {errors.internalservererror}
                                    </Label>
                                    <div className="flex">
                                        <div className="flex items-center justify-center md:w-1/2 mr-3">
                                            <div>
                                                <Label htmlFor="fname">
                                                    First Name
                                                </Label>
                                                <Input
                                                    id="fname"
                                                    type="text"
                                                    value={fname}
                                                    className={`block mt-1 w-full ${
                                                        errors.fname
                                                            ? 'text-red-400 border-red-400'
                                                            : 'border-gray-300 text-black'
                                                    }`}
                                                    onChange={event =>
                                                        setFName(
                                                            event.target.value,
                                                        )
                                                    }
                                                    required
                                                    autoFocus
                                                />
                                                <Label
                                                    className={`mt-1 w-full ${
                                                        errors.fname
                                                            ? 'block text-red-400'
                                                            : 'hidden'
                                                    }`}>
                                                    {errors.email}
                                                </Label>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center md:w-1/2 ml-3">
                                            <div>
                                                <Label htmlFor="lname">
                                                    Last Name
                                                </Label>
                                                <Input
                                                    id="lname"
                                                    type="text"
                                                    value={lname}
                                                    className={`block mt-1 w-full ${
                                                        errors.lname
                                                            ? 'text-red-400 border-red-400'
                                                            : 'border-gray-300 text-black'
                                                    }`}
                                                    onChange={event =>
                                                        setLName(
                                                            event.target.value,
                                                        )
                                                    }
                                                    required
                                                    autoFocus
                                                />
                                                <Label
                                                    className={`mt-1 w-full ${
                                                        errors.lname
                                                            ? 'block text-red-400'
                                                            : 'hidden'
                                                    }`}>
                                                    {errors.lname}
                                                </Label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email Address */}
                                    <div className="mt-4">
                                        <Label htmlFor="email">Email</Label>

                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            className={`block mt-1 w-full ${
                                                errors.email
                                                    ? 'text-red-400 border-red-400'
                                                    : 'border-gray-300 text-black'
                                            }`}
                                            onChange={event => {
                                                setEmail(event.target.value)
                                                delete errors.email
                                            }}
                                            required
                                        />
                                        <Label
                                            className={`mt-1 w-full ${
                                                errors.email
                                                    ? 'block text-red-400'
                                                    : 'hidden'
                                            }`}>
                                            {errors.email}
                                        </Label>
                                    </div>

                                    {/* Password */}
                                    <div className="mt-4">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>

                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            className={`block mt-1 w-full ${
                                                errors.password
                                                    ? 'text-black border-red-400'
                                                    : 'border-gray-300 text-black'
                                            }`}
                                            onChange={event =>
                                                setPassword(event.target.value)
                                            }
                                            required
                                            autoComplete="new-password"
                                        />
                                        <Label
                                            className={`mt-1 w-full ${
                                                errors.password
                                                    ? 'block text-red-400'
                                                    : 'hidden'
                                            }`}>
                                            {errors.password}
                                        </Label>
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="mt-4">
                                        <Label htmlFor="passwordConfirmation">
                                            Confirm Password
                                        </Label>

                                        <Input
                                            id="passwordConfirmation"
                                            type="password"
                                            value={passwordConfirmation}
                                            className={`block mt-1 w-full ${
                                                errors.password
                                                    ? 'text-black-400 border-red-400'
                                                    : 'border-gray-300 text-black'
                                            }`}
                                            onChange={event =>
                                                setPasswordConfirmation(
                                                    event.target.value,
                                                )
                                            }
                                            required
                                        />
                                    </div>

                                    {/*Recaptcha*/}
                                    <div className="w-full flex justify-center items-center mt-10">
                                        <ReCAPTCHA
                                            size="normal"
                                            sitekey={
                                                process.env
                                                    .NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                                            }></ReCAPTCHA>
                                    </div>
                                    <Label
                                        className={`mt-1 w-full text-center ${
                                            errors.recaptcha
                                                ? 'block text-red-400'
                                                : 'hidden'
                                        }`}>
                                        {errors.recaptcha}
                                    </Label>
                                    <div className="flex mt-4">
                                        <label
                                            htmlFor="remember_me"
                                            className="inline-flex items-center">
                                            <input
                                                id="remember_me"
                                                type="checkbox"
                                                name="terms"
                                                value="1"
                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                                                onChange={e => setTerms(
                                                    e.target.checked
                                                )}
                                                required
                                            />
                                            <span className="ml-2 text-sm text-gray-600">
                                                I agree to the <a href="/Terms_of_Use.pdf" target='_blank' className='text-blue-600'>Terms and Conditions </a> and <a href="/Privacy_Policy.pdf" target="_blank" className='text-blue-600'>Privacy Policy</a>
                                            </span>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-center mt-4">
                                        <Button className="ml-4">
                                            Register
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={
                        registerToServer
                            ? 'backdrop-blur-sm bg-white/30 absolute w-full h-full left-0 top-0'
                            : ''
                    }></div>
            </AuthCard>

            {!registerToServer ? (
                ''
            ) : (
                <div className="text-center absolute left-[calc(50%-18px)] top-[calc(45%-18px)]">
                    <div role="status">
                        <svg
                            className="inline mr-2 w-36 h-36 text-gray-200 animate-spin dark:text-gray-600 fill-green-300"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="absolute left-[0.6rem] top-[0.6rem]">
                        <Image
                            src="/logos/small-logo.png"
                            width={'124px'}
                            height={'124px'}
                            className="mx-auto"></Image>
                    </div>
                </div>
            )}
        </GuestLayout>
    )
}

export default Register
