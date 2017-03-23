module.exports = {
    entry: ['./client/Container.js'],
    output: {
        path: __dirname,
        filename: 'Container.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
                presets: ['es2015', 'react']
        }
        }]
    }
};