import 'tailwindcss/tailwind.css'
import '../../public/styles/global.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { SessionProvider } from 'next-auth/react'
import Router from 'next/router'

NProgress.configure({
    minimum: 0.3,
    easing: 'ease',
    speed: 800,
    showSpinner: false,
})

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}

export default App
