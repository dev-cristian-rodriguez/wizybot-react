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
                'primary-dark': '#4f4eb8',
                'primary-light': '#8b8ae8',
                'secondary-color': '#1a1a32',
                'tertiary-color': '#647185',
                'wizybot-purple': '#6564db',
                'wizybot-dark': '#1a1a32',
            },
            boxShadow: {
                'chat': '0 2px 8px rgba(0, 0, 0, 0.1)',
                'chat-hover': '0 4px 12px rgba(0, 0, 0, 0.15)',
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
