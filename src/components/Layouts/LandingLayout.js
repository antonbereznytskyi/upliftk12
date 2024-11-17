import LandingNavigation from '@/components/Layouts/LandingNavigation'
import { Component, useState } from 'react'
import Script from 'next/script'

class AppLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            navbarOpen: false,
        }
    }
    render() {
        return (
            <div className="min-h-screen">
                <Script async src="https://www.googletagmanager.com/gtag/js?id=G-RV30TLL84H"></Script>
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                
                    gtag('config', 'G-RV30TLL84H');
                    `}
                </Script>
                <LandingNavigation navbarOpen={this.state.navbarOpen} />
                <main
                    onClick={() => {
                        this.setState({ navbarOpen: false })
                    }}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default AppLayout
