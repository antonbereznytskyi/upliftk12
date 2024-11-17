const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./src/**/*.js', './node_modules/flowbite/**/*.js'],
    darkMode: 'media',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
                poppins: ['Poppins'],
                logo: ['logo'],
                primary: ['Roboto'],
            },
            colors: {
                primary: '#1d3f54',
                secondary: '#2f8dcc',
                'yellow-landing': '#FAA91C',
                'green-landing': '#1BA361',
                'blue-landing': '#2F8DCC',
            },
            screens: {
                xs: '320px',
                sm: '576px',
            },
            keyframes: {
                wave: {
                    '0%': { transform: 'rotate(20deg)' },
                    '40%': { transform: 'rotate(-20deg)' },
                    '60%': { transform: 'rotate(-20deg)' },
                    '80%': { transform: 'rotate(20deg)' },
                    '100%': { transform: 'rotate(20deg)' },
                },
                pluse: {
                    '0%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(45deg)' },
                    '50%': { transform: 'rotate(45deg)' },
                    '75%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(0deg)' },
                },
                share: {
                    '0%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(45deg)' },
                    '50%': { transform: 'rotate(0deg)' },
                    '75%': { transform: 'rotate(-45deg)' },
                    '100%': { transform: 'rotate(0deg)' },
                },
                circle: {
                    '0%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(90deg)' },
                    '50%': { transform: 'rotate(180deg)' },
                    '75%': { transform: 'rotate(270deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                dot_pan: {
                    '0%': { transform: 'translate(0, 0)' },
                    '50%': { transform: 'translate(-50px, 50px)' },
                    '100%': { transform: 'translate(0, 0)' },
                },
            },
            animation: {
                'rotate-4': 'wave 2s ease-in-out infinite',
                'rotate-pluse': 'pluse 5s ease-in-out infinite',
                'rotate-share': 'share 5s ease-in-out infinite',
                'rotate-circle': 'circle 10s linear infinite',
                dot_pan: 'dot_pan 10s linear infinite',
            },
        },
    },

    variants: {
        extend: {
            opacity: ['disabled'],
        },
        scrollbar: ['rounded'],
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp'),
        require('tailwind-scrollbar'),
        require('flowbite/plugin'),
        require("tailwindcss-radix")(),
    ],
}
