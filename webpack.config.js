const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const entries = {}
fs.readdirSync('./src/components').forEach((entry) => {
    const fileName = entry.substring(0, entry.length - 4);
    entries[fileName] = './src/components/' + entry;
});

module.exports = (env) => {
    return {
        mode: env.NODE_ENV,
        entry: entries,
        output: {
            library: 'AXCReactComponents',
            libraryTarget: 'umd',
            path: path.join(__dirname, 'dist'),
            filename: '[name].js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json']
        },
        externals: {
            // Don't bundle react or react-dom      
            react: {
                commonjs: "react",
                commonjs2: "react",
                amd: "React",
                root: "React"
            },
            "react-dom": {
                commonjs: "react-dom",
                commonjs2: "react-dom",
                amd: "ReactDOM",
                root: "ReactDOM"
            }
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader"
                }
            ]
        },
        plugins: [
            new webpack.BannerPlugin({
                banner: 'Copyright (c) 2019-present Àlex Mas- MIT License '
            })
        ]

    }
}