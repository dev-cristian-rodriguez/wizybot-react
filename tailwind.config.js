/** @type {import('tailwindcss').Config} */

export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],

    theme: {
        extend: {
            colors: {
                'primary-color': '#6564db',
                'secondary-color': '#1a1a32',
                'tertiary-color': '#647185',
            },

            fontSize: {
                'title': '20px',
                'subtitle': '15px',
                'paragraph': '12px',
                'small': '10px',
            },

            // Media queries
            screens: {
                sm: '500px',
                md: '768px',
                lg: '1024px',
                xl: '1430px',
            },
        },
    },
    plugins: [],
};
