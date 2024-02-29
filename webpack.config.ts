import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
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
      directory: path.resolve(__dirname, 'src'),
    },
    // historyApiFallback: true,
    proxy: {
      '/': 'http://localhost:3000',
    },
    port: 8080,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
};

export default config;
// module.exports = () => {
//   // if (isProduction) {
//   //   config.mode = 'production';
//   // } else {
//   //   config.mode = 'development';
//   // }
//   return config;
// };
