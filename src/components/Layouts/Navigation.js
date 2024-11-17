import ApplicationLogo from '@/components/smallComponents/ApplicationLogo'
import Dropdown from '@/components/smallComponents/Dropdown'
import Link from 'next/link'
import NavLink from '@/components/smallComponents/NavLink'
import ResponsiveNavLink, {
    ResponsiveNavButton,
} from '@/components/Layouts/ResponsiveNavLink'
import DropdownLink, { DropdownButton} from '@/components/smallComponents/DropdownLink'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
const Navigation = ({ title }) => {
    const router = useRouter()

    const { user, logout } = useAuth()
    const [open, setOpen] = useState(false)

    return (
        <nav className="ml-80 bg-white border-b-2 border-gray-100 fixed w-[calc(100%-20rem)] z-10">
            {/* Primary Navigation Menu */}
            <div className="max-w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex">
                        {/* Logo */}
                        {/* Navigation Links */}
                        <div className="hidden sm:-my-px sm:ml-2 sm:flex self-center">
                            <Breadcrumbs>
                                <Link href="#">
                                    <a className="text-gray-900 font-primary font-bold text-2xl">
                                        {title}
                                    </a>
                                </Link>
                            </Breadcrumbs>
                            {/* <NavLink
                                href="/dashboard"
                                active={router.pathname === '/dashboard'}>
                                Dashboard
                            </NavLink> */}
                        </div>
                    </div>
                    {/* Settings Dropdown */}
                    <div className="hidden sm:flex sm:items-center sm:ml-6"> 
                        { router.pathname.includes('advanced-search-library') &&
                            <Link href="/mylessons">
                                <button className="bg-sky-700 text-white rounded-lg px-3 py-2 hover:bg-sky-600 transition-all mr-10">
                                    Back To My Lessons
                                </button>
                            </Link>
                        }                           
                        <Link href={BACKEND_URL}>
                            <button className="bg-[#2f8dcc] rounded-lg px-5 py-2 text-white font-poppins transition-all">Go To Whiteboard</button>
                        </Link>
                        <img
                            className="w-10 h-10 mx-3 rounded-full border-2"
                            src={
                                BACKEND_URL +
                                '/uploads/user_images/' +
                                (user?.avatar == null || user?.avatar == ''
                                    ? 'default.png'
                                    : user?.avatar)
                            }></img>
                        <Dropdown
                            align="right"
                            width="48"
                            trigger={
                                <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                                    <div>
                                        {user?.fname} {user?.lname}
                                    </div>

                                    <div className="ml-1">
                                        <svg
                                            className="fill-current h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </button>
                            }>
                            <DropdownLink href="/profile">
                                My Account
                            </DropdownLink>
                            <DropdownLink href="/payment-method">
                                Payment Method
                            </DropdownLink>
                            {/* Authentication */}
                            <DropdownButton onClick={() => {logout()}}>
                                Logout
                            </DropdownButton>

                        </Dropdown>
                    </div>

                    {/* Hamburger */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setOpen(open => !open)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24">
                                {open ? (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Responsive Navigation Menu */}
            {open && (
                <div className="block sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href="/dashboard"
                            active={router.pathname === '/dashboard'}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    {/* Responsive Settings Options */}
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="flex items-center px-4">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-10 w-10 fill-current text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>

                            <div className="ml-3">
                                <div className="font-medium text-base text-gray-800">
                                    sdf
                                    {user?.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {user?.email}
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            {/* Authentication */}
                            <ResponsiveNavButton onClick={() => {logout({loginUrl:'/login'})}}>
                                Logout
                            </ResponsiveNavButton>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navigation
