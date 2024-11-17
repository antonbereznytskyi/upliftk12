import { AmericanExpressIcon } from "@/components/icons/amex";
import { JCBIcon } from "@/components/icons/jcb";
import { MasterCardIcon } from "@/components/icons/mastercard";
import { VisaIcon } from "@/components/icons/visa";
import { ErrorMessage } from "@/components/Membership/ErrorMessage";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import isCreditCard from 'validator/lib/isCreditCard';
import { z } from 'zod';
import { cx } from "@/utils/cx";
import { useState } from "react";
import { handleNumbersOnly, getCardType } from '../../utils';
import { creditCard } from "@/hooks/creditcard";
import { useEffect } from "react";
import Radio from "@/components/Card/radio";
import PageLoading from '@/components/Loading/PageLoading'
import { memberships } from "@/constants/membership";
import { useRouter } from "next/router";
import { membership } from "@/hooks/membership";
import AjaxWaitLoading from "@/components/Loading/PageLoading";


const schema = z
	.object({
		firstName: z.string().min(1),
        lastName: z.string().min(1),
		cardNumber: z.string().max(16).refine(isCreditCard, {
			message: 'Must be a valid credit card number',
		}),
        cardExpirationMonth: z
            .string()
            .regex(/^(0[1-9]|1[0-2])/),
		cardExpirationYear: z
			.string()
			.regex(/^(([0-9]{4}|[0-9]{2})$)/),
		cardCvv: z.string().regex(/^[0-9]{3,4}$/),
	})
	.required();

const schemaBilling = z
    .object({
        address: z.string().min(1),
        city: z.string().min(1),
        state: z.string().min(1),
        postalCode: z.string().min(1),
        card: z.string({
            invalid_type_error: "You should select one of your card to process payment",
        }).min(1),
    })
    .required();

export default function upgrade() {
    const router = useRouter();
    const {membershipInfo} = membership();
	const {
		register,
		handleSubmit,
        watch,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
	});

    const {
        register: registerBilling,
        handleSubmit: handleSubmitBilling,
        formState: {errors: errorsBilling},
        reset: resetBilling,
        watch: watchBilling
    } = useForm({
        resolver: zodResolver(schemaBilling)
    });

    const [cardForm, setCardForm] = useState(false);
    const { userCards, addCard, processPayment} = creditCard()
    const [isLoading, setLoading] = useState(true);
    const [isAjaxLoading, setAjaxLoading] = useState(false);
    const [radioCheck, setRadioCheck] = useState();
    const [membershipTitle, setMemberShipTitle] = useState('');
    const [membershipPrice, setMemberShipPrice] = useState(0);
    const [billingType, setBillingType] = useState();
    const [membershipType, setMemberShipType] = useState(1);

    useEffect(() => {
       if (userCards && membershipInfo) {
            setLoading(false);
            userCards.map((userCard) => {
                if (userCard.is_active_card == true) {
                    setRadioCheck(userCard.id);
                    resetBilling({
                        address: userCard.address,
                        city: userCard.city,
                        postalCode: userCard.zip,
                        state: userCard.state                        
                    });
                    return;
                }
            });
        }
    }, [userCards, membershipInfo])

    useEffect(() => {
        let membershipId = router.query.p;
        let billingType = router.query.b;
        if (membershipId > memberships.length || (billingType != 'monthly' && billingType != 'annual')) {
            router.back();
            return;
        }
        let membershipInfo = memberships[membershipId - 1];
        setMemberShipTitle(membershipInfo.title)
        setMemberShipType(membershipInfo.id);
        setMemberShipPrice(billingType == 'annual' ? membershipInfo.price.annual : membershipInfo.price.monthly);
        setBillingType(billingType);
       
    }, [router])

	const onSubmit = handleSubmit((data) => {
		// Here is where you can do whatever you want with data
        setAjaxLoading(true);
        addCard({setAjaxLoading, setCardForm, data});
         
	});

    const onSubmitBilling = handleSubmitBilling((data) => {
        setAjaxLoading(true);
        data.membershipType = membershipType;
        data.amount = membershipPrice;
        data.billingType = billingType;
        processPayment({setAjaxLoading, data});
    })

    console.log(watchBilling('card'));

    if (isLoading) return (<PageLoading></PageLoading>);
	return (
		<div className="min-h-screen grid place-items-center place-content-center relative bg-[#f5f2f2]">
			<div className="bg-white rounded-md shadow-md px-6 py-8 max-w-lg w-[600px] mx-auto relative space-y-4">
				<div className="flex flex-col gap-4 mb-8">
					<h1 className="text-center font-semibold text-2xl">
						{membershipInfo.membership_type < membershipType ? 'Upgrade' : 'Downgrade'} to {membershipTitle}
					</h1>
                    <div className="bg-secondary">
                        <h3 className="text-white px-8 py-2 text-center text-xl font-extrabold">${membershipPrice} /{billingType}*</h3>
                    </div>
                    <div className="mt-6">
                        <h5 className="text-slate-600 text-lg font-bold">Payment Method</h5>
                        <p className="text-gray-500">All transactions are secure and encrypted</p>
                        <div className="border border-gray-300 rounded mt-2 mb-2 divide-y">
                            {errorsBilling.card ? (
                                <ErrorMessage message={errorsBilling.card.message} />
                            ) : null}
                            {
                                userCards && userCards.map((card, i, {length}) => {
                                    return (
                                        <div key={i}>
                                            <Radio register = {registerBilling} 
                                            reset = {resetBilling}
                                            card = {card} 
                                            setRadioCheck={setRadioCheck}
                                            radioCheck = {radioCheck}
                                            />
                                        </div>
                                    )
                                })
                            }        
                    
                            <div className={cx('px-4 py-3 flex', cardForm ? 'justify-center' : 'justify-between')}>
                                <button className={cx(
                                    'bg-[#eaeef1] border-1 text-sm px-4 py-2 rounded font-semibold border-[#cdd3d7] text-[#5b6d79] hover:shadow-md', !cardForm ? 'flex' : 'hidden')}
                                onClick={event => {
                                    setCardForm(true);
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                    </svg>
                                    Add Card
                                </button>
                                <div className="flex gap-2 self-center">
                                    <AmericanExpressIcon className={cx(
                                        'w-8 h-6 border p-px rounded-md transition-colors', (getCardType(watch('cardNumber')) == 'amex' && cardForm) ? 'border-blue-600' : '') } />
                                    <JCBIcon className={cx(
                                        'w-8 h-6 border p-px rounded-md transition-colors', (getCardType(watch('cardNumber')) == 'jcb' && cardForm) ? 'border-blue-600' : '') } />
                                    <MasterCardIcon className={cx(
                                        'w-8 h-6 border p-px rounded-md transition-colors', (getCardType(watch('cardNumber')) == 'mastercard' && cardForm) ? 'border-blue-600' : '') } />
                                    <VisaIcon className={cx(
                                        'w-8 h-6 border p-px rounded-md transition-colors', (getCardType(watch('cardNumber')) == 'visa' && cardForm) ? 'border-blue-600' : '') } />
                                </div>
                            </div>
                            
                            
                            <form className={cx('gap-8 px-4 py-3 bg-[#f8fafb]', cardForm ? 'flex flex-col' : 'hidden')} onSubmit={onSubmit}>
                                <div className="flex gap-4">
                                    <div className="relative w-1/2">
                                        <input
                                            id="firstName"
                                            className={cx(
                                                'peer h-10 w-full border-b-2 bg-transparent border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500',
                                                errors.firstName ? '!border-red-500' : ''
                                            )}
                                            placeholder="Jhon"
                                            required
                                            {...register('firstName')}
                                        />
                                        <label
                                            htmlFor="firstName"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                        >
                                            First Name
                                        </label>
                                        {errors.firstName ? (
                                            <ErrorMessage message={errors.firstName.message} />
                                        ) : null}
                                    </div>
                                    <div className="relative w-1/2">
                                        <input
                                            id="lastName"
                                            className={cx(
                                                'peer h-10 w-full border-b-2 bg-transparent border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500',
                                                errors.lastName ? '!border-red-500' : ''
                                            )}
                                            placeholder="Doe"
                                            required
                                            {...register('lastName')}
                                        />
                                        <label
                                            htmlFor="lastName"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                        >
                                            Last Name
                                        </label>
                                        {errors.lastName ? (
                                            <ErrorMessage message={errors.lastName.message} />
                                        ) : null}
                                    </div>
                                </div>

                                <div className="relative">
                                    <input
                                        id="cardNumber"
                                        className={cx(
                                            'peer h-10 w-full border-b-2 bg-transparent border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500',
                                            errors.cardNumber ? '!border-red-500' : ''
                                        )}
                                        maxLength = "16"
                                        placeholder="4567890123456789"
                                        onKeyDown={handleNumbersOnly}
                                        required
                                        {...register('cardNumber')}
                                    />
                                    <label
                                        htmlFor="cardNumber"
                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Card Number
                                    </label>
                                    {errors.cardNumber ? (
                                        <ErrorMessage message={errors.cardNumber.message} />
                                    ) : null}
                                </div>

                                <div className="flex gap-4">
                                    <div className="relative w-1/4">
                                        <input
                                            id="cardExpirationMonth"
                                            className={cx(
                                                'peer h-10 w-full border-b-2 bg-transparent border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500',
                                                errors.cardExpiration ? '!border-red-500' : ''
                                            )}
                                            placeholder="06"
                                            maxLength={2}
                                            required
                                            {...register('cardExpirationMonth')}
                                        />
                                        <label
                                            htmlFor="cardExpirationMonth"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                        >
                                            MM
                                        </label>
                                        {errors.cardExpirationMonth ? (
                                            <ErrorMessage message={errors.cardExpirationMonth.message} />
                                        ) : null}
                                    </div>
                                    <div className="relative w-1/4">
                                        <input
                                            id="cardExpirationYear"
                                            className={cx(
                                                'peer h-10 w-full border-b-2 bg-transparent border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500',
                                                errors.cardExpirationYear ? '!border-red-500' : ''
                                            )}
                                            placeholder="26"
                                            maxLength={4}
                                            required
                                            {...register('cardExpirationYear')}
                                        />
                                        <label
                                            htmlFor="cardExpirationYear"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                        >
                                            YY
                                        </label>
                                        {errors.cardExpirationYear ? (
                                            <ErrorMessage message={errors.cardExpirationYear.message} />
                                        ) : null}
                                    </div>
                                    <div className="relative w-1/2">
                                        <input
                                            id="cardCvv"
                                            className={cx(
                                                'peer h-10 w-full border-b-2 bg-transparent border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500',
                                                errors.cardCvv ? '!border-red-500' : ''
                                            )}
                                            placeholder="104"
                                            maxLength = "3"
                                            required
                                            {...register('cardCvv')}
                                        />
                                        <label
                                            htmlFor="cardCvv"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                        >
                                            CVV
                                        </label>
                                        {errors.cardCvv?.message ? (
                                            <ErrorMessage message={errors.cardCvv.message} />
                                        ) : null}
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <div className="flex gap-4">
                                        <button type="submit" className="bg-primary text-white text-sm font-semibold px-4 py-1.5 rounded">Add Card</button>
                                        <button className="underline text-gray-400 font-extrabold text-sm" 
                                        onClick={event => {
                                            setCardForm(false)
                                        }}>Cancel</button>
                                    </div>
                                    <div className="flex text-xs text-gray-400 self-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                        </svg>
                                        <p className="uppercase text-xs text-gray-400 font-semibold">Secure Payment</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <p className="text-gray-400 text-sm">By completing this purchase, you authorize Uplift K12 to charge you automatically every year until you cancel your subscription.</p>
                    </div>
                    <div className="mt-6">
                        <h5 className="text-slate-600 text-lg font-bold">Billing Information</h5>
                        <p className="text-gray-500">Please provide the following information</p>
                    </div>
				</div>
                <form onSubmit={onSubmitBilling}>
                    <div className="border border-gray-300 rounded mb-2 divide-y">
                        <div className={cx('gap-8 px-4 py-3 flex flex-col')}>
                            <div className="relative">
                                <input
                                    id="address"
                                    className={cx(
                                        'peer h-10 w-full border-b-2 bg-transparent border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500',
                                        errorsBilling.address ? '!border-red-500' : ''
                                    )}
                                    placeholder="Address"
                                    required
                                    {...registerBilling('address')}
                                />
                                <label
                                    htmlFor="address"
                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                >
                                    Address
                                </label>
                                {errorsBilling.address ? (
                                    <ErrorMessage message={errorsBilling.address.message} />
                                ) : null}
                            </div>

                            <div className="relative">
                                <input
                                    id="city"
                                    className={cx(
                                        'peer h-10 w-full border-b-2 bg-transparent border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500',
                                        errorsBilling.city ? '!border-red-500' : ''
                                    )}
                                    placeholder="City"
                                    required
                                    {...registerBilling('city')}
                                />
                                <label
                                    htmlFor="city"
                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                >
                                    City
                                </label>
                                {errorsBilling.city ? (
                                    <ErrorMessage message={errorsBilling.city.message} />
                                ) : null}
                            </div>

                            <div className="flex gap-4">
                                <div className="relative w-1/2">
                                    <input
                                        id="state"
                                        className={cx(
                                            'peer h-10 w-full border-b-2 bg-transparent border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500',
                                            errorsBilling.state ? '!border-red-500' : ''
                                        )}
                                        placeholder="TX"
                                        required
                                        {...registerBilling('state')}
                                    />
                                    <label
                                        htmlFor="cardExpiration"
                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        State
                                    </label>
                                    {errorsBilling.state?.message ? (
                                        <ErrorMessage message={errorsBilling.state.message} />
                                    ) : null}
                                </div>
                                <div className="relative w-1/2">
                                    <input
                                        id="postalCode"
                                        className={cx(
                                            'peer h-10 w-full border-b-2 bg-transparent border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500',
                                            errorsBilling.postalCode ? '!border-red-500' : ''
                                        )}
                                        placeholder="77090"
                                        required
                                        {...registerBilling('postalCode')}
                                    />
                                    <label
                                        htmlFor="postalCode"
                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    >
                                        Postal Code
                                    </label>
                                    {errorsBilling.postalCode?.message ? (
                                        <ErrorMessage message={errorsBilling.postalCode.message} />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h5 className="text-slate-600 text-lg font-bold">Order Summary</h5>
                        <div className="flex justify-between">
                            <p className="text-gray-500">Subtotal</p>
                            <p>${membershipPrice}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-500">Sales Tax</p>
                            <p>$0.00</p>
                        </div>
                    </div>
                    <div className="mt-3 flex justify-between bg-slate-200 px-4 py-4">
                        <div className="font-semibold text-sm self-center">
                            Order Total: <span className="text-blue-600 font-extrabold">${membershipPrice}</span>
                        </div>
                        <button className="bg-green-landing text-white px-8 py-4 rounded hover:bg-green-400">Complete purchase</button>
                    </div>
                    <div className="px-24 text-sm text-center text-gray-400">
                        By completing this purchase you agree to all Terms and Conditions.
                    </div>
                </form>
                
			</div>
            {isAjaxLoading && <AjaxWaitLoading/>}
		</div>
	);
}