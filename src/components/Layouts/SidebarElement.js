import Link from 'next/link'
import { useAuth } from '../../hooks/auth'
function Sidebar({ svg, name, isSelected = false }) {
    let linkUrl
    const { logout } = useAuth()
    if (name == 'Dashboard') linkUrl = 'dashboard'
    else if (name == 'My Lessons') linkUrl = 'mylessons'
    else if (name == 'Settings') linkUrl = 'settings'
    else if (name == 'Profile') linkUrl = 'profile'
    else if (name == 'My Student') linkUrl = 'mystudent'
    else if (name == 'My Class') linkUrl = 'myclass'
    else if (name == 'My Video') linkUrl = 'myvideo'
    else if (name == 'Assign Task') linkUrl = 'assign-task'
    else if (name == 'Membership') linkUrl = 'membership'
    else linkUrl = '#'
    return (
        <li
            className={`text-center ml-5 pl-5 pr-14 py-3 my-3 rounded-md hover:font-bold hover:text-white hover:bg-slate-600 transition-all duration-200 ${
                isSelected
                    ? 'text-white bg-slate-600'
                    : 'bg-transparent text-gray-700'
            }`}>
            <Link href={linkUrl}>
                {linkUrl == '#' ? (
                    <button
                        className="flex items-center w-full"
                        onClick={() => {logout()}}>
                        {svg}
                        <span className="ml-3 text-lg">{name}</span>
                    </button>
                ) : (
                    <a className="flex items-center">
                        {svg}
                        <span className="ml-3 text-lg">{name}</span>
                    </a>
                )}
            </Link>
        </li>
    )
}
export default Sidebar
