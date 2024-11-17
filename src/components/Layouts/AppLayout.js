import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import { updateSQL } from '@/hooks/update'
import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Script from 'next/script'

const AppLayout = ({ title, children }) => {
    const { user, logout } = useAuth({ middleware: 'auth' })
    const { updateTerms } = updateSQL();
    const [accept, setAccept] = useState(false)
    useEffect(() => {
        if (user !== undefined)
        setAccept(user.accept_terms);
    }, [user])
    if (user == undefined) return (<></>)
    return (
        <>
            <div className="min-h-screen bg-white">
                <Script async src="https://www.googletagmanager.com/gtag/js?id=G-RV30TLL84H"></Script>
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                
                    gtag('config', 'G-RV30TLL84H');
                    `}
                </Script>
                <Navigation  title={title} />
                <div className="flex min-h-screen">
                    <div className="flex-none">
                        <Sidebar />
                    </div>
                    <div className="grow ml-80 mt-20">
                        <main className="h-full">{children}</main>
                    </div>
                </div>
                {/* <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header> */}
            </div>
            <div data-modal-placement="center" data-modal-show="true" tabindex="-1" className={"backdrop-brightness-0 bg-white/80 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 p-4 w-full md:inset-0 h-modal md:h-full justify-center items-center " + (accept == false ? 'flex' : 'hidden')}>
                <div className="relative w-full max-w-2xl h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Terms of Service
                            </h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            I agree to the <a href="/Terms_of_Use.pdf" target="_blank" className='text-blue-600'>Terms and Conditions</a> and <a href="/Privacy_Policy.pdf" target="_blank" className='text-blue-600'>Privacy Policy</a>
                            </p>
                            {/* <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                            </p> */}
                        </div>
                        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                            <button  type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                            onClick={
                                ()=>{
                                    updateTerms();
                                    setAccept(true);
                                }
                            }>I accept</button>
                            <button  type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" 
                            onClick={()=>{
                                logout()
                            }}>Decline</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
        
    )
}

export default AppLayout
