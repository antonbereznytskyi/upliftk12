import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import PageLoading from '@/components/Loading/PageLoading'
import MemberShipLayout from '@/components/Membership/MemberShipLayout'
import Switch from '@/components/Element/Swtich'
import MemberShipButton from '@/components/Membership/MemberShipButton'
import {memberships} from '../../constants/membership'
import { membership } from '@/hooks/membership'
import AjaxWaitLoading from '@/components/Loading/PageLoading'

const getLabel = (member_info, selected_member_type) => {
    if (selected_member_type == 4) {
        return 'Contact Us';
    }
    if (selected_member_type == 1) {
        return '';
    }
    if (member_info === undefined || member_info.length == 0) return 'Get Started';
    else if (member_info.membership_type < selected_member_type) return 'Upgrade';
    else if (member_info.membership_type == selected_member_type) {
        if (member_info.membership_type == 1) return 'Current Plan';
        if (member_info.scheduled_membership_type == 0) {
            return 'Current Plan - Renews ' + new Date(member_info.membership_expired_date).toLocaleDateString('en-US')
        } else {
            return 'Current Plan - Expires ' + new Date(member_info.membership_expired_date).toLocaleDateString('en-US')
        }
    }
    return 'Downgrade'
}

const MemberShip = () => {
    const [annual, setAnnual] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isAjaxLoading, setAjaxLoading] = useState(false);
    const {membershipInfo} = membership();
    
    useEffect(() => {
        if (membershipInfo) {
            setLoading(false);
        }
    }, [membershipInfo])

    if (isLoading) return (<PageLoading></PageLoading>);
    return (
        <MemberShipLayout member_info={membershipInfo}>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:px-6">
                    <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Choose your Uplift K12 plan</h2>
                        <Switch stateChanger={setAnnual}/>
                    </div>
                    <div className="space-y-8 lg:grid lg:grid-cols-4 sm:gap-6 xl:gap-6 lg:space-y-0">
                        {memberships.map((member) => (
                            <div key={member.id} className={(member.id == (membershipInfo != undefined && membershipInfo.membership_type) ? "border border-secondary " : "border border-gray-100 ") + "relative flex flex-col mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg shadow marker:dark:border-gray-600 dark:bg-gray-800 dark:text-white"}>
                                <div className={member.color.light + ' relative h-40 mb-6'} >
                                    <h3 className={"py-3 text-base uppercase font-sans font-bold text-white " + member.color.background}>{member.title}</h3>
                                    <div className={(member.id < 4 ? '' : 'hidden') + ' absolute mx-auto text-white  bottom-[-25px] w-24 h-24 left-0 right-0 overflow-hidden rounded-full border-4 border-white ' + member.color.background}>
                                        <p className="text-2xl leading-5 mt-6 font-extrabold">${annual ? member.price.annual : member.price.monthly}</p>
                                        <span className='text-xs'>{annual ? "annual" : "monthly"}</span>
                                    </div>
                                </div>
                                <div className={member.id == (membershipInfo != undefined && membershipInfo.membership_type) ? 'absolute top-[-15px] right-3' : 'hidden'}>
                                    <span className="text-xs inline-block py-2.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-[#faa91c] text-blue-600 rounded-full">Current</span>
                                </div>
                                <MemberShipButton setLoading = {setAjaxLoading} expiredDate = {membershipInfo.membership_expired_date} scheduledMemberShipType = {membershipInfo.scheduled_membership_type} button = {member.button} color={member.color} label={getLabel(membershipInfo, member.id)} id={member.id} annual={annual}/>
                                <ul role="list" className="mb-8 space-y-4 text-left p-6">
                                    {member.features.map((feature, index)  => (
                                        <li key={index} className="flex items-center space-x-3">
                                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {isAjaxLoading && <AjaxWaitLoading></AjaxWaitLoading>}
        </MemberShipLayout>
    )
}

export default MemberShip