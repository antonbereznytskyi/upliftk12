import Head from 'next/head'
import AppLayout from '../components/Layouts/AppLayout'
import { creditCard } from "@/hooks/creditcard";
import { zodResolver } from '@hookform/resolvers/zod';
import isCreditCard from 'validator/lib/isCreditCard';
import { z } from 'zod';
import { cx } from "@/utils/cx";
import { useState } from "react";
import { handleNumbersOnly, getCardType } from '../utils';
import { useForm } from 'react-hook-form';
import { useEffect } from "react";
import Radio from "@/components/Card/radio";
import PageLoading from '@/components/Loading/PageLoading'
import { AmericanExpressIcon } from "@/components/icons/amex";
import { JCBIcon } from "@/components/icons/jcb";
import { MasterCardIcon } from "@/components/icons/mastercard";
import { VisaIcon } from "@/components/icons/visa";
import { ErrorMessage } from "@/components/Membership/ErrorMessage";

export default function paymentMethod() {
  const { userCards, addCard} = creditCard()
  const [radioCheck, setRadioCheck] = useState();
  const [isLoading, setLoading] = useState(true);
  const [cardForm, setCardForm] = useState(false);

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

  const {
		register,
		handleSubmit,
    watch,
    reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
	});

  useEffect(() => {
    if (userCards) {
      setLoading(false);
      userCards.map((userCard) => {
        if (userCard.is_active_card == true) {
          setRadioCheck(userCard.id);
          return;
        }
      });
    }
  }, [userCards])

  const onSubmit = handleSubmit((data) => {
		// Here is where you can do whatever you want with data
    setLoading(true);
    reset({
      firstName: '',
      lastName: '',
      cardNumber: '',
      cardExpirationMonth: '',
      cardExpirationYear: '',
      cardCvv: ''
    });
    addCard({setLoading, setCardForm, data});
         
	});

  if (isLoading) return (<PageLoading></PageLoading>);

  return (
    <AppLayout title="Payment Method">
      <Head>
        <title>Payment Method</title>
      </Head>
      <div className='px-12 py-4'>
        <h5 className="text-slate-600 text-lg font-bold">Payment Method</h5>
        <p className="text-gray-500">All transactions are secure and encrypted</p>
        <div className="border border-gray-300 rounded mt-2 mb-2 divide-y">
          {
              userCards && userCards.map((card, i, {length}) => {
                return (
                    <div key={i}>
                        <Radio register = {''} 
                        reset = {''}
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
      </div>
      
    </AppLayout>
  )
}