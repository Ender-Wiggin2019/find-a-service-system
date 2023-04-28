module.exports = {
    mode: 'jit',
    purge: {
        enabled: process.env.NODE_ENV === 'production',
        safeList: [],
        content: ['./index.html', './src/**/*.tsx', './src/**/*.ts'],
    },
    content: [
        './node_modules/flowbite/**/*.js',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
        './node_modules/react-tailwindcss-select/dist/index.esm.js',
    ],
    theme: {
        minWidth: {
            40: '10rem',
            60: '15rem',
            80: '20rem',
            100: '25rem',
        },
        maxWidth: {
            120: '30rem',
            160: '40rem',
            200: '50rem',
        },
        extend: {
            colors: {
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                background: '#d8eefe',
                head: '#094067',
                subhead: '#5f6c7b',
                card: '#fffffe',
                button: '#3da9fc',
                secondary: '#90b4ce',
                tertiary: '#ef4565',
                pink: '#f8eaef',
                deeppink: '#ad6072',
            },
        },
        fontFamily: {
            body: [
                'Inter',
                'ui-sans-serif',
                'system-ui',
                '-apple-system',
                'system-ui',
                'Segoe UI',
                'Roboto',
                'Helvetica Neue',
                'Arial',
                'Noto Sans',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji',
                'Segoe UI Symbol',
                'Noto Color Emoji',
            ],
            sans: [
                'Inter',
                'ui-sans-serif',
                'system-ui',
                '-apple-system',
                'system-ui',
                'Segoe UI',
                'Roboto',
                'Helvetica Neue',
                'Arial',
                'Noto Sans',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji',
                'Segoe UI Symbol',
                'Noto Color Emoji',
            ],
        },
    },
    variants: {},
    plugins: [require('daisyui'), require('flowbite/plugin')],
    daisyui: {
        themes: ['corporate'],
    },
}
