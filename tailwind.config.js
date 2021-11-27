module.exports = {
    purge: [
        './src/**/*.html',
        './src/**/*.vue',
        './src/**/*.jsx',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'x-red': '#EF1E2A'
            }
        },
    },
    variants: {
        extend: {
            display: ["group-hover"]
        }
    },
    plugins: [],
}
