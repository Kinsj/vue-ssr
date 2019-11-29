const path = require('path') // 路径包，nodejs的基本包，用于兼容各系统路径问题
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的
const HTMLPlugin = require('webpack-html-plugin')  // vue编译出来的是一个bundle.js，需要有index.html去包装它才能使用，这个插件会自动生成一个外包的index.html

// 判断环境变量是否为开发环境
let isDev = process.env.NODE_ENV === "development" // NODE_ENV 在package.json的script里有配置。

const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'), // 程序入口 app.vue是不能作为程序的入口的，所以引入一个index.js
    output: {  // 程序出口 也就是打包后输出的结果
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    // 添加es6语法支持，vue文件语法支持等
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"' // 此参数主要传递给vue或者react，让他们区分这是开发版还是生产版，判断是否压缩库代码，是否不加错误信息等
            }
        }),
        new VueLoaderPlugin, // vue-loader 15.*必须插件
        new HTMLPlugin, // index.html 自动生成插件
    ],
    module: {  // module 就是用于安装各种处理工具各种loader
        rules: [
            {
                test: /\.vue$/, // 正则匹配文件类型
                loader: 'vue-loader'
            },
            // css预处理器
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
            // 它会应用到普通的 `.css` 文件
            // 以及 `.vue` 文件中的 `<style>` 块
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {   // 在use里使用 obj形式用于给插件传参
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name]-aaa.[ext]'
                        }
                    }
                ]
            }
        ]
    }
}

// 利用 cross-env 来兼容各平台的开发环境变量。然后根据环境变量来判断是开发端还是生产端
// dev端配置
if(isDev) {
    config.devSever = {
        port: 8000,
        host: '0.0.0.0', // 使用0.0.0.0 同时具备了 127.0.0.1 localhost 和 本机ip，支持局域网访问
        overlay: { 
            errors: true, // 这个配置是当webpack编译时有任何错误都会显示到网页上
        }

    }
}

module.exports = config