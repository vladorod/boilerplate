const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const css = require('./webpack/sass&css.js')


module.exports = merge([
    {
    mode: "production",
    entry: './src/app.js',
    output: {
        path: path.join(__dirname,'dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [ 
            {
                test: /\.woff$|\.ttf$/, 
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                          name: '[name].[ext]',
                          outputPath: 'fonts/'
                        }
                      }
                ]
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                mozjpeg: {
                                  progressive: true,
                                  quality: 65 // качество 
                                },
                                // optipng.enabled: false will disable optipng
                                optipng: {
                                  enabled: false,
                                },
                                pngquant: {
                                  quality: [0.65, 0.90],
                                  speed: 4
                                },
                                gifsicle: {
                                  interlaced: false,
                                },
                                // the webp option will enable WEBP
                                webp: {
                                  quality: 75
                                }
                              }
                        }
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './img/',
                            useReletivePath: true
                        }
                    }
                ]
            },
            {
             test: /\.pug$/, 
             loader: "pug-loader",
             query: { pretty: true }
            }
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'src/index.pug'),
            minify: true,
            hash: true,
        }),
    ]
},
css()
]);