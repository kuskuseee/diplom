const config = {
        output: {
            filename: 'script.js',
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules)/,
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "ie 11" }]
                        ]
                    },
    },
    ],
    }
}
;
module.exports = config;