import Link from 'next/link'
import {cx} from '../../utils/cx'
import { membership } from '@/hooks/membership'
export default function MemberShipButton ({setLoading, color, label, id, annual, scheduledMemberShipType, expiredDate}) {
    const { cancelOrRestoreMemberShip, downgradeMemberShip } = membership()
    const handleClick = (event) => {
        setLoading(true);
        cancelOrRestoreMemberShip({setLoading, scheduledMemberShipType});
    }

    const handleDownGrade = (event) => {
        setLoading(true);
        downgradeMemberShip({setLoading, id});

    }
    const className = cx("m-5 leading-10 w-[80%] text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg \
    text-sm text-center dark:text-white  dark:focus:ring-primary-900 ", color.background);

    if (label == 'Get Started') {
        return (
            <button className={className} onClick={() => {
                localStorage.setItem('redirect_memberhsip', true);
                location.href = '/register'
            }}>{label}</button>
        )
    }

    if (label == 'Upgrade') {
        return (
            <div className='h-24'>
                <Link className='h-24' href={`/membership/upgrade?p=${id}&b=${annual ? 'annual' : 'monthly'}`}>
                    <button className={className}>{label}</button>
                </Link>
            </div>
        )
    }
    if (label == 'Downgrade') {
        if (scheduledMemberShipType == id) {
            return (
                <div className='h-24'>
                    <p className='mt-3'>Selected Plan</p>
                    <p>Starts on {new Date(expiredDate).toLocaleDateString('en-US')}</p>
                </div>
            )
        } else {
            return (
                <div className='h-24'>
                    <button className={className} onClick = {handleDownGrade}>{label}</button>
                </div>
            )
        }
        
    }
    if (label == 'Contact Us') {
        return (
            <div className='h-24'>
                <Link href="mailto:teach@upliftk12.com?subject=dd &message=ee">
                    <button className={className}>{label}</button>
                </Link>
            </div>
        )
    }
    if (label != '') {
        return (
            <div className='w-100 h-20'>
                <span className={`m-5 leading-10 text-black hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-extrabold rounded-lg \
                text-sm text-center dark:text-white  dark:focus:ring-primary-900`}>{label}</span>
                <button className='underline text-blue-600' onClick = {handleClick}>{scheduledMemberShipType != 0 ? 'Restore' : 'Cancel'}</button>
            </div>
        )
    }
    return (<div className='w-100 h-20'></div>)
    
}