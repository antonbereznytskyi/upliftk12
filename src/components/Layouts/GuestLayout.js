import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'

const GuestLayout = ({ children }) => {
    return (
        <div>
            <Head>
                <title>Laravel</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"></meta>
            </Head>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-RV30TLL84H"></Script>
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
            
                gtag('config', 'G-RV30TLL84H');
                `}
            </Script>
            <div className="bg-primary pt-3 pb-3">
                <div className=" w-max h-20 mx-auto">
                    <Image
                        src="/logos/whitelogo.png"
                        width={200}
                        height={80}
                        className="mx-auto"></Image>
                </div>
            </div>

            <div className="font-sans text-gray-900 antialiased">
                {children}
            </div>
        </div>
    )
}

export default GuestLayout
