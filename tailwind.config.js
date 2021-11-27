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
            },
            screens: {
                iphone678: {'raw': '(max-width: 375px) and (max-height: 667px)'},
                iphone678Plus: {'raw': '(max-width: 414px) and (max-height: 736px)'},
                iphoneX: {'raw': '(max-width: 375px) and (max-height: 812px)'},
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
