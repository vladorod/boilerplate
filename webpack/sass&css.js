const Extract = require('extract-text-webpack-plugin');
const OPTCSS = require('optimize-css-assets-webpack-plugin')

module.exports = function (paths) { 
    return { 
        module: { 
            rules: [
                { 
                   test: /\.s[ac]ss$/,
                   include: paths,
                   use: Extract.extract({
                    publicPath: '../',
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader'],
                   }),
                },
                { 
                   test: /\.css$/,
                   include: paths,
                   use: Extract.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                    }),
                },
            ],
        },
        plugins: [
            new Extract('./css/mine.css'), 
            new OPTCSS({ 
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: { 
                preset: ['default', { 
                    discardComments: { 
                        removeAll: true
                    }
                }]
                },
                canPrint: true
            })
        ],
    };
}