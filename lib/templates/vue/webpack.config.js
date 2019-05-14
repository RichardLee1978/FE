const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';
const config = {
	mode:isEnvProduction?"production": isEnvDevelopment && 'development',
	entry: {
		app:[
			path.resolve(__dirname,'{{entry}}')
		]
	},
	output: {
		path: path.resolve(__dirname,'{{dist}}'),
		filename:'{{filename}}',
		publicPath:'{{publicPath}}'
	},
	module: {
		rules:[
			{
				test:/\.vue$/,
				exclude:/(node_modules)/,
				use:{
					loader: 'vue-loader',
					options:{
						loaders: {
            					js: 'babel-loader'
         					 }					
					}
				}
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				use:{
					loader: 'babel-loader',
					options:{
						presets: ['es2015','es2016'],
						plugins: ['transform-runtime','transform-object-rest-spread','babel-polyfill']
					}
				}
			},
			{
		        test: /\.css$/,
		        use: ExtractTextPlugin.extract({
		        	use: ['css-loader',{
		          		loader:'postcss-loader',
		          		options:{
		          			plugins:[
		          				require('autoprefixer')()
		          			]
		          		}
		          	}]
		        })
		    },
			{
		        test: /\.less$/,
		        use: ExtractTextPlugin.extract({
		        	fallback: 'style-loader',
		          	use: ['css-loader',{
		          		loader:'postcss-loader',
		          		options:{
		          			plugins:[
		          				require('autoprefixer')()
		          			]
		          		}
		          	},'less-loader'],

		        })
		    },
		    {
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader?limit=10000&name=images/[name].[ext]'
					}
				]
			},
	        {
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'url-loader?limit=10000&name=svg/[name].[ext]' 
					}
				]
			},
			{
				test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'url-loader?limit=10000&name=fonts/[name].[ext]' 
					}
				]
			},
	        {
				test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'url-loader?limit=10000&name=fonts/[name].[ext]' 
					}
				]
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'url-loader?limit=10000&name=fonts/[name].[ext]' 
					}
				]
			},
	        {
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'url-loader?limit=10000&name=fonts/[name].[ext]' 
					}
				]
			}
		]
	},
	resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
	plugins: [
		new VueLoaderPlugin(),
		//new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin({
			filename: 'css/[name].css'
		}),
		new AssetsPlugin({
            filename: '{{AssetsJsonName}}',
            path: path.resolve(__dirname,'{{dist}}'),
            prettyPrint: true,
            fullPath: true,
            processOutput: function(assets) {
                var now = Date.now();

                for (var i in assets) {

                    for (var j in assets[i]) {

                        assets[i][j] = assets[i][j] + "?v=" + now.toString();
                    }

                }
                return JSON.stringify(assets);
            }
		}),
		isEnvProduction && new OptimizeCssAssetsPlugin(),
		new HtmlWebpackPlugin({
            title: '{{templateTitle}}',
            filename: path.resolve(__dirname,'{{templateDist}}'),
            template: path.resolve(__dirname,'{{templateSrc}}'),
            inject: "body",
            hash: true // 为静态资源生成hash值
        }),
        //new CleanWebpackPlugin([path.resolve(__dirname, 'dist')])
	],
	devServer: {
        contentBase: path.join(__dirname,'{{dist}}'),
        port: {{devServerPort}},
        compress:true,
		historyApiFallback:true
    }
}
module.exports = config;