import { AmericanExpressIcon } from "../icons/amex";
import { JCBIcon } from "../icons/jcb";
import { MasterCardIcon } from "../icons/mastercard";
import { VisaIcon } from "../icons/visa";
import { cx } from "@/utils/cx";
import { useState } from "react";

export default function Radio({register, card, setRadioCheck, reset, radioCheck}) {

    const handleChange = event => {
        setRadioCheck(event.target.value);
        console.log(event.target.value);
        if (reset != '') {
            reset({
                address: card.address,
                city: card.city,
                state: card.state,
                postalCode: card.zip,
                card: event.target.value
            })
        }
        
    };

    return (
        <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
            <input {...register ? register('card') : ''} name="card" type="radio" value={card.id} defaultChecked={card.id === radioCheck} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <div className="flex py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">
                <AmericanExpressIcon className={cx('w-8 h-6 border p-px rounded-md transition-colors', card.account_type != 'AmericanExpress' ? 'w-0 h-0 border-none' : '')}></AmericanExpressIcon>
                <VisaIcon className={cx('w-8 h-6 border p-px rounded-md transition-colors', card.account_type != 'Visa'? 'w-0 h-0 border-none' : '')}></VisaIcon>
                <MasterCardIcon className={cx('w-8 h-6 border p-px rounded-md transition-colors', card.account_type != 'MasterCard' ? 'w-0 h-0 border-none' : '')}></MasterCardIcon>
                <JCBIcon className={cx('w-8 h-6 border p-px rounded-md transition-colors', card.account_type != 'JCB' ? 'w-0 h-0 border-none' : '')}></JCBIcon>
                <label className="self-center ml-3">{card.account_number}</label>
            </div>
        </div>
    )

} 