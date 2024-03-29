"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const config = {
    entry: './src/index.ts',
    output: {
        path: path_1.default.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-typescript', // separate TypeScript preset
                                ['@babel/preset-react', { runtime: 'automatic' }],
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.s?css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            // {
            //   test: /\.(ts|tsx)$/i,
            //   loader: 'ts-loader',
            //   exclude: ['/node_modules/'],
            // },
            // {
            //   test: /\.css$/i,
            //   use: [stylesHandler, 'css-loader'],
            // },
            // {
            //   test: /\.s[ac]ss$/i,
            //   use: [stylesHandler, 'css-loader', 'sass-loader'],
            // },
            // {
            //   test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
            //   type: 'asset',
            // },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
    devServer: {
        static: {
            publicPath: '/src',
            directory: path_1.default.resolve(__dirname, 'src'),
        },
        // historyApiFallback: true,
        proxy: {
            '/': 'http://localhost:3000',
        },
        port: 8080,
        hot: true,
    },
    plugins: [
        new html_webpack_plugin_1.default({
            template: 'index.html',
        }),
        new mini_css_extract_plugin_1.default(),
    ],
};
exports.default = config;
// module.exports = () => {
//   // if (isProduction) {
//   //   config.mode = 'production';
//   // } else {
//   //   config.mode = 'development';
//   // }
//   return config;
// };
