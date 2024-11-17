import AppLayout from '@/components/Layouts/AppLayout'
import ProfileCardLayout from '@/components/Layouts/ProfileCardLayout'
import Head from 'next/head'
import Multiselect from '@/components/smallComponents/Multiselect'
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { useAuth } from '@/hooks/auth'
import countryList from 'react-select-country-list'
import ProfileInput from '../components/smallComponents/ProfileInput'
import Skeleton from 'react-loading-skeleton'
import Image from 'next/image'
import 'react-loading-skeleton/dist/skeleton.css'
import { getAllGrades } from './api/GetAllGrades'
import { getAllSubjects } from './api/GetAllSubjects'
import swal from 'sweetalert2'
import { getAllState } from './api/GetAllState'
import axios from '@/lib/axios'
import Autosuggest from 'react-autosuggest'
import debounce from "lodash.debounce";

function useOutsideAlerter(ref, setShowSuggestionFlag) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowSuggestionFlag(false)
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref])
}
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
const Profile = () => {
    const gradeOptions = getAllGrades()
    const subjectOptions = getAllSubjects()
    const states = getAllState()

    const wrapperRef = useRef(null)
    let { user } = useAuth({ middleware: 'auth' })

    const { update } = useAuth({ middleware: 'auth' })
    const [image, setImage] = useState(null)
    const [imageSrc, setImageSrc] = useState('')
    const countryOptions = useMemo(() => countryList().getData(), [])
    const imageChange = event => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
            setImageSrc(URL.createObjectURL(event.target.files[0]))
        }
    }
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [resDataStatus, setResDataStatus] = useState(false)
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [cPassword, setCPassword] = useState('')
    const [nPassword, setNPassword] = useState('')
    const [cnPassword, setCNPassword] = useState('')
    const [country, setCountry] = useState('United States')
    const [selectedState, setSelectedState] = useState('1')
    const [school, setSchool] = useState('')
    const [schoolSuggestion, setSchoolSuggestion] = useState([])
    const [showSuggestionFlag, setShowSuggestionFlag] = useState(false)
    const [emptyFlag, setEmptyFlag] = useState(false)
    const [skipSchoolInput, setSkipSchoolInput] = useState(false)
    const [inputDisable, setInputDisable] = useState(false)
    const [grade, setGrade] = useState([])
    const [subject, setSubject] = useState([])

    const[billingAddress, setBillingAddress] = useState('');
    const[billingCity, setBillingCity] = useState('');
    const[billingState, setBillingState] = useState('');
    const[billingZip, setBillingZip] = useState('');
    const[shippingAddress, setShippingAddress] = useState('');
    const[shippingCity, setShippingCity] = useState('');
    const[shippingState, setShippingState] = useState('');
    const[shippingZip, setShippingZip] = useState('');

    useOutsideAlerter(wrapperRef, setShowSuggestionFlag)

    useEffect(() => {
        axios.get('api/getTeacherInfo').then(res => {
            setSelectedState('' + res.data.teacher.state_id)
            setGrade(res.data.grade)
            setSubject(res.data.subject)
            setSchool(res.data.school)            
            axios
            .post('/api/getSchoolSuggestion', {
                country: country,
                state: res.data.teacher.state_id,
                school: res.data.school,
            })
            .then(res => {
                setSchoolSuggestion(res.data)
            })
        })
    }, [])
    useEffect(() => {
        setFname(user?.fname)
        setLname(user?.lname)
        setEmail(user?.email)
        const timer = setTimeout(() => {
            setLoading(true)
        }, 1000)
        return () => clearTimeout(timer)
    }, [user])
    function handleUpdate() {
        setResDataStatus(true)
        setErrors({})
        const formData = new FormData()
        formData.append('image', image)
        formData.append('fname', fname)
        formData.append('lname', lname)
        formData.append('userId', user?.id)
        formData.append('state_id', selectedState)
        formData.append('grade', JSON.stringify(grade))
        formData.append('subject', JSON.stringify(subject))
        formData.append('school', school)
        formData.append('country', country);
        formData.append('state', selectedState);
        if (user?.register_type != 'google') {
            formData.append('currentPassword', cPassword)
            formData.append('newPassword', nPassword)
            formData.append('newPassword_confirmation', cnPassword)
        }
        update({ setErrors, setResDataStatus, formData })
    }
    function changeCountry(e) {
        let country = e.target.value
        setCountry(country)
    }
    function changeState(e) {
        setSelectedState(e.target.value)
    }

    function onSelectSchool(event, { suggestion }) {
        setShowSuggestionFlag(false)
        setSchool(suggestion.name)
    }
    function onSuggestionsClearRequestedSchool() {
        setSchoolSuggestion([])
    }
    function inputChangeSchool(value, state) {
        let formData = new FormData()
        formData.append('country', country)
        formData.append('school', value)
        if (country == 'United States') formData.append('state', state)
        axios.post('/api/getSchoolSuggestion', formData).then(res => {
            if (res.data.length == 0) {
                setEmptyFlag(true)
            } else setEmptyFlag(false)
            setSchoolSuggestion(res.data)
        })
    }
    const onSuggestionsFetchRequestedSchoolDebounce = useCallback(debounce(inputChangeSchool, 500), []);
    function onSuggestionsFetchRequestedSchool({value}){
        if (typeof value == 'object') return
        setSchool(value)
        onSuggestionsFetchRequestedSchoolDebounce(value, selectedState)
    }
    function getSuggestionValueSchool(suggestion) {
        return suggestion
    }
    function renderSuggestionSchool(suggestion, { query }) {
        return <p className="text-gray-600">{suggestion.name}</p>
    }
    function handleChangeSchool(e) {
        setSchool(e.target.value)
    }
    function handleSelectButton() {
        const schoolInput = document.getElementById('school')
        schoolInput.focus()
    }
    function focusSchoolInput() {
        setShowSuggestionFlag(true)
        // let formData = new FormData()
        // formData.append('country', country)
        // formData.append('school', school)
        // if (country == 'United States') formData.append('state', selectedState)
        // axios.post('/api/getSchoolSuggestion', formData).then(res => {
        //     if (res.data.length == 0) setEmptyFlag(true)
        //     else setEmptyFlag(false)
        //     setShowSuggestionFlag(true)
        //     console.log('3')
        //     setSchoolSuggestion(res.data)
        // })
    }
    function handleSkipSchoolInput() {
        setInputDisable(true)
        setSkipSchoolInput(true)
        setShowSuggestionFlag(false)
    }
    function returnSchoolSearch() {
        setInputDisable(false)
        setSkipSchoolInput(false)
    }
    return (
        <div>
            <AppLayout title="Profile">
                <Head>
                    <title>Profile</title>
                </Head>
                <div className="pt-2 pb-36 mx-11">
                    <ProfileCardLayout
                        addClass={
                            user?.register_type == 'google' ? 'border-b' : ''
                        }
                        bigTitle="Basic Information"
                        smallTitle="Update your personal account details.">
                        <div className="flex items-center">
                            {loading == false ? (
                                <Skeleton
                                    circle={true}
                                    width={75}
                                    height={75}
                                />
                            ) : (
                                <img
                                    src={
                                        imageSrc == ''
                                            ? BACKEND_URL +
                                              '/uploads/user_images/' +
                                              (user?.avatar == null ||
                                              user?.avatar == ''
                                                  ? 'default.png'
                                                  : user?.avatar)
                                            : imageSrc
                                    }
                                    className="border-2 rounded-full w-20 h-20"></img>
                            )}
                            {loading == true && (
                                <label className="absolute transform translate-x-12 translate-y-4">
                                    <input
                                        type="file"
                                        class="hidden"
                                        onChange={imageChange}
                                    />
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-8 w-8 bg-white text-gray-600 cursor-pointer border rounded-full p-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    </span>
                                </label>
                            )}
                            <p className="text-blue-400 pl-6 font-bold text-xl mx-3">
                                Update Profile Image
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 my-3">
                            <ProfileInput
                                error={errors.fname}
                                title="First Name"
                                value={fname}
                                handleChange={e => {
                                    setFname(e.target.value)
                                }}
                            />
                            <ProfileInput
                                error={errors.lname}
                                title="Last Name"
                                value={lname}
                                handleChange={e => {
                                    setLname(e.target.value)
                                }}
                            />
                            <ProfileInput
                                title="Email"
                                addClass="col-span-2"
                                value={email}
                                handleChange={e => {
                                    setEmail(e.target.value)
                                }}
                            />
                        </div>
                    </ProfileCardLayout>
                    {user?.register_type != 'google' &&
                        user?.register_type !== undefined && (
                            <ProfileCardLayout addClass="border-b">
                                <div className="grid grid-cols-2 gap-4">
                                    <ProfileInput
                                        error={errors.currentPassword}
                                        title="Current Password"
                                        type="password"
                                        handleChange={e => {
                                            setCPassword(e.target.value)
                                        }}
                                    />
                                    <ProfileInput
                                        error={errors.newPassword}
                                        addClass="row-start-2"
                                        title="New Password"
                                        type="password"
                                        handleChange={e => {
                                            setNPassword(e.target.value)
                                        }}
                                    />
                                    <ProfileInput
                                        error={errors.newPassword_confirmation}
                                        addClass="row-start-2"
                                        title="Confirm New Password"
                                        type="password"
                                        handleChange={e => {
                                            setCNPassword(e.target.value)
                                        }}
                                    />
                                </div>
                            </ProfileCardLayout>
                        )}
                    
                    <ProfileCardLayout
                        bigTitle="Teacher & School Information"
                        smallTitle="Connect with your school for a more tailored experience."
                        addClass={'border-b'}
                        >
                        <div className="grid grid-cols-2 gap-4">
                            <Multiselect
                                title="Grades"
                                multiSelectOptions={gradeOptions}
                                selected={grade}
                                setSelected={setGrade}
                            />
                            <Multiselect
                                addClass="row-start-2"
                                title="Subjects"
                                multiSelectOptions={subjectOptions}
                                selected={subject}
                                setSelected={setSubject}
                            />
                            <div className="row-start-3">
                                <p>Country</p>
                                {loading == true ? (
                                    <select
                                        className="w-full rounded-md border-gray-300"
                                        onChange={changeCountry}>
                                        {countryOptions.map(option => (
                                            <option
                                                value={option.label}
                                                selected={
                                                    option.label ==
                                                    'United States'
                                                }>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <Skeleton width={300} height={40} />
                                )}
                            </div>
                            {country == 'United States' && (
                                <div className="row-start-3">
                                    <p>State</p>
                                    {loading == true ? (
                                        <select
                                            className="w-full rounded-md border-gray-300"
                                            onChange={(e) => {changeState(e)}}
                                            >
                                            {states != undefined &&
                                                states.map(state => {
                                                    if (
                                                        state.state_id ==
                                                        '' + selectedState
                                                    )
                                                        return (
                                                            <option
                                                                selected
                                                                value={
                                                                    state.state_id
                                                                }>
                                                                {
                                                                    state.state_name
                                                                }
                                                            </option>
                                                        )
                                                    return (
                                                        <option
                                                            value={
                                                                state.state_id
                                                            }>
                                                            {state.state_name}
                                                        </option>
                                                    )
                                                })}
                                        </select>
                                    ) : (
                                        <Skeleton width={300} height={40} />
                                    )}
                                </div>
                            )}
                            <div className="row-start-4">
                                <p>School</p>
                                {loading == true ? (
                                    <div className="w-full relative"
                                        ref={wrapperRef}>
                                        <Autosuggest
                                            alwaysRenderSuggestions={
                                                showSuggestionFlag
                                            }
                                            onSuggestionSelected={
                                                onSelectSchool
                                            }
                                            suggestions={schoolSuggestion}
                                            onSuggestionsFetchRequested={
                                                onSuggestionsFetchRequestedSchool
                                            }
                                            onSuggestionsClearRequested={
                                                onSuggestionsClearRequestedSchool
                                            }
                                            focusInputOnSuggestionClick="false"
                                            getSuggestionValue={
                                                getSuggestionValueSchool
                                            }
                                            renderSuggestion={
                                                renderSuggestionSchool
                                            }
                                            inputProps={{
                                                disabled: inputDisable,
                                                value: school,
                                                id: 'school',
                                                onChange: handleChangeSchool,
                                                onFocus: focusSchoolInput,
                                                className:
                                                    (inputDisable
                                                        ? 'text-gray-400 '
                                                        : '') +
                                                    'w-full rounded-md border-gray-300',
                                            }}
                                        />
                                        {emptyFlag && showSuggestionFlag && (
                                            <div
                                                className="absolute border-gray-300 border top-12 rounded-md w-full bg-white shadow-lg">
                                                <div className="p-6 text-center border-b">
                                                    <p className="font-bold text-gray-600 text-lg">
                                                        Your school has not been found
                                                    </p>
                                                    <p className="text-gray-400">
                                                        No problem! You can input your school name and please make sure if the spelling is correct.
                                                    </p>
                                                </div>
                                                <div
                                                    className="p-4 cursor-pointer"
                                                    onClick={
                                                        handleSkipSchoolInput
                                                    }>
                                                    <p className="text-sky-500">
                                                        Added your school? Save it
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        <div
                                            className="absolute top-3 right-3 z-50 cursor-pointer"
                                            onClick={handleSelectButton}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                class="w-[17px] h-[17px]">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                ) : (
                                    <Skeleton width={300} height={40} />
                                )}
                            </div>
                            {skipSchoolInput && (
                                <div className="row-start-4 col-start-2 mt-8">
                                    <p
                                        className="text-gray-500 underline cursor-pointer"
                                        onClick={returnSchoolSearch}>
                                        Return to School Search
                                    </p>
                                </div>
                            )}
                        </div>
                    </ProfileCardLayout>

                    <ProfileCardLayout bigTitle="Billing & Shipping Information" smallTitle="We need your billing and shipping information">
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label>Billing Information</label>
                                <ProfileInput title="Address" addClass={"mt-5"}></ProfileInput>
                                <ProfileInput title="City" addClass={"mt-3"}></ProfileInput>
                                <ProfileInput title="State" addClass={"mt-3"}></ProfileInput>
                                <ProfileInput title="Zip Code" addClass={"mt-3"}></ProfileInput>
                            </div>
                            <div>
                                <div>
                                    <label>Shipping Information</label>        
                                </div>
                                
                                <ProfileInput title="Address" addClass={"mt-5"}></ProfileInput>
                                <ProfileInput title="City" addClass={"mt-3"}></ProfileInput>
                                <ProfileInput title="State" addClass={"mt-3"}></ProfileInput>
                                <ProfileInput title="Zip Code" addClass={"mt-3"}></ProfileInput>
                            </div>
                        </div>
                        <label
                            htmlFor="remember_me"
                            className="inline-flex float-right mt-5">
                            <input
                                id="remember_me"
                                type="checkbox"
                                name="remember"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-600">
                                Same as Billing Address
                            </span>
                        </label>
                    </ProfileCardLayout>

                    <div className="grid grid-cols-4">
                        <div className="col-start-3 flex justify-end">
                            <button
                                className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-5 text-lg rounded-lg"
                                onClick={handleUpdate}>
                                Update
                            </button>
                        </div>
                    </div>
                    <div
                        className={
                            resDataStatus
                                ? 'backdrop-blur-sm bg-white/30 w-full h-full fixed left-0 top-0'
                                : ''
                        }></div>
                </div>
            </AppLayout>
            {!resDataStatus ? (
                ''
            ) : (
                <div className="text-center fixed transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 z-50">
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
        </div>
    )
}

export default Profile
