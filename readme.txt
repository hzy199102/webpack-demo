1.IntelliJ IDEA 的 .idea 目录加入.gitignore无效的解决方法
无效的原因是：对应的目录或者文件已经被git跟踪，此时再加入.gitignore后就无效了
解决办法：
先执行
    [文件夹]  git rm -r --cached .idea
    [文件]     git rm --cached demo-project.iml
再重新加入.gitignore文件


2.IntelliJ IDEA 设置新建文件就直接add进入版本控制中
settings –> Version control –> confirmation中选择add sliently即可


3.npm init -y 是什么意思
npm init 用来初始化生成一个新的 package.json 文件。它会向用户提问一系列问题，如果你觉得不用修改默认配置，一路回车就可以了。
如果使用了 -f（代表force）、-y（代表yes），则跳过提问阶段，直接生成一个新的 package.json 文件。


4.为什么使用webpack
无法立即体现，脚本的执行依赖于外部扩展库(external library)。
如果依赖不存在，或者引入顺序错误，应用程序将无法正常运行。
如果依赖被引入但是并没有使用，浏览器将被迫下载无用代码。


5.webpack 4.x,运行webpack命令会提示安装webpack-cli,
是因为到了webpack4,  webpack 已经将 webpack 命令行相关的内容都迁移到 webpack-cli，所以除了 webpack 外，我们还需要安装 webpack-cli
npm install -D webpack-cli 等价于 npm install --save-dev webpack-cli


6../node_modules/.bin/webpack 运行不了
相信绝大部分初学webpack或是gulp等等的人都不会遇到这个问题，因为一开始运行webpack都会先安装全局的webpack，然后在项目中安装局部的webpack，然后使用webpack [命令] 去运行，这并没有什么不对的，
但是有个缺点，就是在不同环境下全局安装的webpack版本可能是不同的，也就是说在不同环境下全局安装的webpack版本可能就不符合这个项目所依赖的版本，所以得用局部依赖的webpack运行，使用 ：
./node_modules/.bin/webpack [命令]
那么问题来了，这条命令在windows环境下出现问题：
（’.’ 不是内部或外部命令，也不是可运行的程序或批处理文件。）
这个问题不仅仅在使用webpack的时候出现，还在使用gulp或是git等等的时候也会有类似问题，那么来看windows下运行的正确命令：
.\node_modules.bin\webpack -v
显而易见，只不过把斜杠换了个方向而已，当然不仅是这条命令，很多命令windows环境下与linux或mac还是有区别的，所以大家在使用时请注意了。
还有这里只是单单讲这条命令为什么会在windows环境下运行不了而已，不代表非得使用这条命令去实现，例如在package.json里配置”start”：
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "demo",
  "scripts": {
    "start": "webpack"
  },
  "author": "kay",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^1.12.9"
  }
}
这样就可以使用 npm start 这条命令运行局部的webpack了，这样是不是更简洁明了。


6..\node_modules\.bin\webpack src\index.js dist\bundle.js 无效
官网命令写错了，应该是：.\node_modules\.bin\webpack src\index.js --output dist\bundle.js


7.webpack 4.x 打包总是加密压缩，影响开发
webpack功能强大，有很多独特的功能，但其中一个难点是配置文件。为此,webpack团队改变了这一现状：webpack 4默认不需要配置文件。
可以通过mode选项为webpack指定一些默认的配置。mode分为development/production,默认为production。每个选项的默认配置如下(common指两个配置项都存在的属性):
https://segmentfault.com/a/1190000013712229


8.webpack 4.x 默认不需要配置文件带来的问题
开发模式下，选择mode为development，默认devtool:eval（生成后的代码，构建和重构建极快），
但或许devtool:inline-source-map（原始源码，构建和重构建极慢）更好。


9.webpack热更新的原理


10.webpack4.x对应webpack-dev-server3.x,异常的缓慢，但是切换到webpack2.x对应webpack-dev-server2.x就异常流畅，怎么修正
我推测是在3.x需要加入更多的配置，另外webpack4.x一定要配置webpack-cli,然后webpack-dev-server就一定要3.x，这是配套的


11.调用了以下命令，但是仍然没用移除JavaScript 上下文中无用代码
node_modules\.bin\webpack --mode development src\main.js --output dist\dist.js
node_modules\.bin\webpack  --optimize-minimize src\main.js --output dist\dist.js
cd E:\git\webpack\examples\aggressive-merging && node build.js


12.webpack4.x坑太多，降级到3.x继续调研
我操，降级到3.x tree shaking就正常了，4.x的side-effect实在是纯英文，难懂


13.热更新
a."start": "webpack-dev-server --open", 只写这句，不会热更新，但会刷新页面更新
b."start": "webpack-dev-server --open --hotOnly", 只写这句，不会热更新，也不会页面刷新，会提示：
c.The following modules couldn't be hot updated: (They would need a full reload!)
"start": "webpack-dev-server --open"
devServer: {
    contentBase: './dist',
    hot: true
},会报错：
dev-server.js:52Uncaught Error: [HMR] Hot Module Replacement is disabled.(…)
再加入new webpack.NamedModulesPlugin(),
但是还是不会热更新，但会刷新页面更新
d.需要加入各种loader或者插件去实现后台刷新，比如css文件的热更新使用'style-loader', 'css-loader'
e.其他vue，react，angular都有各自loader和插件，用时在查


14.label-loader es5,6,7的特性，webpack生产环境打包
npm install babel-core babel-loader --save-dev
npm install babel-preset-es2015 --save-dev
npm install babel-preset-react --save-dev
npm install babel-preset-stage-0 --save-dev
npm install babel-polyfill --save
npm install babel-runtime --save
npm install babel-plugin-transform-runtime --save-dev

https://www.jianshu.com/p/6969b8822630 Using ES6 and ES7 in the Browser, with Babel 6 and Webpack
https://www.cnblogs.com/shiyunfront/p/7338384.html babel-runtime 使用场景
https://www.cnblogs.com/chris-oil/p/5717544.html 如何区分Babel中的stage-0,stage-1,stage-2以及stage-3（一）
你可以尝试一下babel-preset-es2015，这是ES6转换的一个合集，如果你在使用JSX，你可能需要babel-preset-react。
而且如果你想要玩玩火，你可以加入babel-preset-stage-0来尝试ES7的新特性，async或者await等等
错误：await is a reserved word 原因：When using await in a function it must be marked as async
错误：SyntaxError: src/index.js: Unexpected token (4:20) const _ = await import(/* webpackChunkName: "lodash" */'lodash');
原因：.babelrc文件配置'stage-3'，资料显示这样就能支持es7新特性await，但是我发现要支持await import则要升级为stage-0,
但是这样打包体积更大，显然不可取
lodash.bundle.js    1.43 MB       0  [emitted]  [big]  lodash
 index.bundle.js    1.97 MB       1  [emitted]  [big]  index
去掉await
lodash.bundle.js    1.43 MB       0  [emitted]  [big]  lodash
 index.bundle.js    1.15 MB       1  [emitted]  [big]  index
去掉babelrc的"plugins": ["transform-runtime"]
lodash.bundle.js    1.43 MB       0  [emitted]  [big]  lodash
 index.bundle.js     924 kB       1  [emitted]  [big]  index
不过如果在生产环境node_modules\.bin\webpack --optimize-minimize，千万注意devtool: 'inline-source-map',这句要去掉，这是开发环境的
lodash.bundle.js    72.4 kB       0  [emitted]  lodash
 index.bundle.js    46.8 kB       1  [emitted]  index
 babel-polyfill太大了，可以单项引用
https://github.com/zloirock/core-js#commonjs


15.es7的asynv/await
个人感觉相对于promise有代码上的简洁
https://blog.csdn.net/loveyouyouno/article/details/76794477
https://cnodejs.org/topic/5640b80d3a6aa72c5e0030b6
https://www.cnblogs.com/whybxy/p/7645578.html


16.分析 Bundle Analysis
webpack --profile --json > stats.json
https://alexkuz.github.io/webpack-chart/

https://www.cnblogs.com/libin-1/p/7027164.html webpack教程


17.代码拆分
三种方法
a.动态导入
output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
}
const _ = await import(/* webpackChunkName: "lodash" */'lodash');
切记await一定要与async合用，improt返回的是promise对象
b.防止重复
new webpack.optimize.CommonsChunkPlugin({
    name: 'common' // Specify the common bundle's name.
})
c.手动分离
entry的手动配置


18.懒加载
https://alexjoverm.github.io/2017/07/16/Lazy-load-in-Vue-using-Webpack-s-code-splitting/ vue的方案
tree_lazy 可以查看promise和await的区别，await显然用的更爽，不需要then的方法体做操作


19.cache
如果文件内容不改变，npm run build的结果不会改变，哪怕重启idea都不会改变，看来chunkhash的值应该和文件内容有关，
为了验证，把内容修改一下在改回去，发现的确如此，chunkhash的值只与文件内容有关，和编译时间，是否重启idea无关。
CommonsChunkPlugin，我之前的认知是分离共同的代码，现在才发现还有2个作用，
第一：能够在每次修改后的构建结果中，将 webpack 的样板(boilerplate)和 manifest 提取出来。
通过指定 entry 配置中未用到的名称，此插件会自动将我们需要的内容提取到单独的包中：
第二：将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中
修改index.js的内容引入新的print.js模块，发现三个文件都变化了，这是因为每个 module.id 会基于默认的解析顺序(resolve order)进行增量。
也就是说，当解析顺序发生变化，ID 也会随之改变。因此，简要概括：
main bundle 会随着自身的新增内容的修改，而发生变化。
vendor bundle 会随着自身的 module.id 的修改，而发生变化。
runtime bundle 会因为当前包含一个新模块的引用，而发生变化。
使用模块标识符去解决这个问题，就是加入插件new webpack.HashedModuleIdsPlugin(),


20.创建库对我来说太遥远，跳过吧


21.NODE_ENV不是内部或外部命令,也不是可运行的程序
解决办法：安装across-env:
npm install cross-env –-save-dev
"build_p": "cross-env NODE_ENV=production PLATFORM=web webpack",
当然也可以不安装across-env，而是如下写法
"build_p2": "set NODE_ENV=development && set PLATFORM=web && webpack",
事实上，以上脚本合并两条命令（这种操作在powershell中不被支持，在cmd中也不被支持，这是Mac中bash或Linux的shell中的独特操作）


22.shimming 太复杂，等到有实际场景的时候再见招拆招


23.typescript的webpack支持
首先需要了解typescript到底是什么
https://segmentfault.com/q/1010000010574476


24.vagrant 以后有时间在研究
https://blog.csdn.net/ty_hf/article/details/78314583?locationNum=4&fps=1
https://www.jianshu.com/p/e87ebc032924
https://www.jianshu.com/p/c88c8888b51a


25.require
import() 返回的是promise，另外require.ensure，所以为了适配老的浏览器，需要使用es6-promise or promise-polyfill.
require.sure 代码分割


26.代码分割（重要）
js 就是缓存，类似19
css 需要用到ExtractTextPlugin
https://blog.csdn.net/liangklfang/article/details/55048516（必看 webpack的code spitting以及chunkfilename详解）


27.API部分太难了，不看


28.output
devtoolModuleFilenameTemplate
在浏览器控制台查看webpack://下的内容，找到对应的包含源码的文件，这个有合适的默认值，一般无需修改，只有在生产环境用得到
devtoolFallbackModuleFilenameTemplate
devtoolModuleFilenameTemplate中的内容有重复的时候用到备用名称，这个基本用不到
chunkFilename
这个参数极其重要，是按需加载，懒加载的关键，支持import和require，如下
button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {}
require.ensure([], function(require){
    require('./layer/layer.js')
    layer.open({
        type: 1,
        skin: 'layui-layer-rim', //加上边框
        area: ['420px', '240px'], //宽高
        content: 'html内容'
    });
}, 'layer');
配置：chunkFilename: '[name].[chunkhash].js',这样会创建单独的文件，一般可用在cdn上，当然有个劣势，一个第三方库一个文件，目前没找到合并的方法



29.引入layer
这是紧急需求，相当于引入第三方库
采用require引入，require('./layer/layer.js')，但是发现它关联jquery，于是全局引入jquery，当然也可以在它之前指定引入，但是jquery
作为框架，可能会在多个组件使用，所以全局更合适
new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery',
    'window._': 'lodash',
    '_': 'lodash'
})
这个插件会把jquery变成全局，它找的是npm的组件，我通过npm install jquery，引入了jquery
这时候发现layer.css的默认样式没引入，于是单独引入import './layer/theme/default/layer.css';
因为第三方库应该是不变的，所以应该代码拆分，如果是npm的第三方，可以直接拆分出：
new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor'
}),
entry: {
    index: './src/five_layer/index.js',
    vendor: [
        'lodash',
        'jquery'
    ]
},
但是layer是require进入的，只能
require.ensure([], function(require){
    require('./layer/layer.js')
}, 'layer');
output: {
    filename: '[name].[chunkhash].js', // 生产环境使用
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
}
但是使用require.ensure不兼容旧的浏览器，需要npm install promise-polyfill --save-dev，然后在入口文件引入import 'promise-polyfill/src/polyfill';
这样打包，修改index的内容，第三方库依然缓存，性能优化
layer.c1832156fdb61cfdbc78.js     252 kB       0  [emitted]  [big]  layer
ba81b24c06e2e0eac1e219405b33766b.png    5.91 kB          [emitted]
a72011ccdc2bcd23ba440f104c416193.gif    5.79 kB          [emitted]
1140bc5c7863f8e54a3c2b179e640758.gif  701 bytes          [emitted]
50c5e3e79b276c92df6cc52caeb464f0.gif    1.79 kB          [emitted]
551539f873d9ebe0792b120a9867d399.png    11.5 kB          [emitted]
       index.741c115e1fb6b9e2d293.js    64.9 kB       1  [emitted]         index
      vendor.bfaeb71fcf0a1e38d599.js    2.18 MB       2  [emitted]  [big]  vendor
     runtime.030d978f0289709c716c.js    13.9 kB       3  [emitted]         runtime
                          styles.css    14.7 kB       1  [emitted]         index
                          index.html  442 bytes          [emitted]

 layer.c1832156fdb61cfdbc78.js     252 kB       0  [emitted]  [big]  layer
ba81b24c06e2e0eac1e219405b33766b.png    5.91 kB          [emitted]
a72011ccdc2bcd23ba440f104c416193.gif    5.79 kB          [emitted]
1140bc5c7863f8e54a3c2b179e640758.gif  701 bytes          [emitted]
50c5e3e79b276c92df6cc52caeb464f0.gif    1.79 kB          [emitted]
551539f873d9ebe0792b120a9867d399.png    11.5 kB          [emitted]
       index.92666d8a4ff09cd9ebce.js    64.9 kB       1  [emitted]         index
      vendor.bfaeb71fcf0a1e38d599.js    2.18 MB       2  [emitted]  [big]  vendor
     runtime.030d978f0289709c716c.js    13.9 kB       3  [emitted]         runtime
                          styles.css    14.7 kB       1  [emitted]         index
                          index.html  442 bytes          [emitted]
但是能否将require的第三方库和npm的第三方库合成一个文件呢？
这是最好的解决方案：
https://www.cnblogs.com/webARM/p/5945208.html
另外注意：这个时候生产环境打包node_modules\.bin\webpack --env=5 --optimize-minimize
layer.c1832156fdb61cfdbc78.js    49.2 kB       0  [emitted]  layer
ba81b24c06e2e0eac1e219405b33766b.png    5.91 kB          [emitted]
a72011ccdc2bcd23ba440f104c416193.gif    5.79 kB          [emitted]
1140bc5c7863f8e54a3c2b179e640758.gif  701 bytes          [emitted]
50c5e3e79b276c92df6cc52caeb464f0.gif    1.79 kB          [emitted]
551539f873d9ebe0792b120a9867d399.png    11.5 kB          [emitted]
       index.92666d8a4ff09cd9ebce.js    9.04 kB       1  [emitted]  index
      vendor.bfaeb71fcf0a1e38d599.js     160 kB       2  [emitted]  vendor
     runtime.030d978f0289709c716c.js    1.41 kB       3  [emitted]  runtime
                          styles.css    14.5 kB       1  [emitted]  index
                          index.html  442 bytes          [emitted]
chunkhash没变，但是体积只有不到原来的不到8%
但是layer在移动端和PC端很很大不同，需要新的支持，应该如何解决？



31.Cannot use [chunkhash] for chunk in '[name].[chunkhash].js' (use [hash] instead)
去掉热更新，不要让webpack.HotModuleReplacementPlugin()在plugins里运行，否则会与filename: '[name].[chunkhash].js',冲突


32.Module build failed: SyntaxError: Unexpected token / in JSON at position 18
json文件不能带有注释


35.webpack 跨域问题处理，proxy，代理
https://www.jb51.net/article/138369.htm
https://github.com/chimurai/http-proxy-middleware#options


36.module
exclude: /node_modules/
任何loader都应该加入exclude: /node_modules/
否则打包速度会慢
使用了noParse的模块将不会被loaders解析，所以当我们使用的库如果太大，
并且其中不包含require、define或者类似的关键字的时候(因为这些模块加载并不会被解析，所以就会报错)，我们就可以使用这项配置来提升性能。
loash模块就是个例子


37.resolve
resolve.alias
alias: {
  Utilities: path.resolve(__dirname, 'src/utilities/'),
  Templates: path.resolve(__dirname, 'src/templates/')
}
现在，替换「在导入时使用相对路径」这种方式，就像这样：
import Utility from '../../utilities/utility';
你可以这样使用别名：
import Utility from 'Utilities/utility';
这个最常用，其他用的少
resolve.modules
array 默认：modules: ["node_modules"]
告诉 webpack 解析模块时应该搜索的目录。
如果你想要添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索：
modules: [path.resolve(__dirname, "src"), "node_modules"]


38.
devServer: {
  contentBase: path.join(__dirname, "dist"),
  compress: true,
  port: 9000
}
一定要加入compress:true,这个属性一般默认是false，代表是否gzip压缩，因为要兼容来的浏览器（20世纪），一般默认不压缩。
如何看是否有效，在谷歌浏览器开发者工具栏——network——vendor.bundle.js——headers——response Headers——是否包含content-encoding:gzip
没压缩2.9mb，压缩之后680kb，效果明显

指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，指定如下：
host: "0.0.0.0"
这样可以ip访问

devServer.historyApiFallback
当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
historyApiFallback: true,
但是这样不适用于多级目录，因为页面引入的js和css都是相对路径，多级目录会让相对路径指向错误的地址，
比如http://10.1.77.30:8080/asdasd，可以重定向找到http://10.1.77.30:8080/index.html，以及http://10.1.77.30:8080/styles.css
但是http://10.1.77.30:8080/asdasd/asdasd,就会找http://10.1.77.30:8080/asdasd/styles.css，就404
这里有个解决方案，就是
output: {
    //filename: '[name].[chunkhash].js', // 生产环境使用
    filename: '[name].bundle.js',
    publicPath: "/",
    //chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
}
重点在publicPath,如上设置，这样所有引用的路径就是以当前引用文件的路径为根路径的相对路径
 <script type="text/javascript" src="/runtime.bundle.js"></script><script type="text/javascript" src="/vendor.bundle.js">
 如果不写，则如下
<script type="text/javascript" src="runtime.bundle.js"></script><script type="text/javascript" src="vendor.bundle.js">
注意，这些都是开发环境下的配置，在生产环境下output.publicPath还需要另外配置，
这个可以查看 21.NODE_ENV不是内部或外部命令,也不是可运行的程序，也可以查看webpack.config.5.js的相关配置
通过传入一个对象，比如使用 rewrites 这个选项，此行为可进一步地控制：
historyApiFallback: {
  rewrites: [
    { from: /^\/$/, to: '/views/landing.html' },
    { from: /^\/subpage/, to: '/views/subpage.html' },
    { from: /./, to: '/views/404.html' }
  ]
}
https: true
加入支持https之后，http就不支持了，证书可以自己配置
inline和iframe的区别
https://blog.csdn.net/chengnuo628/article/details/52441977
open:true 和host:0.0.0.0 不能一起用
openPage: 'different/page' 可以指定打开的路径，有点用处
overlay: 非常重要的一个属性，在网页上展示运行错误信息，而不止在控制台，这样更酷炫
overlay: {
  warnings: false,
  errors: true
}
proxy： 跨域处理，非常经典的属性，使用了http-proxy-middleware
publicPath 这个感觉鸡肋
https://segmentfault.com/q/1010000008980858 动态配置
publicPath （文档）
配置了 publicPath后， url = '主机名' + 'publicPath配置的' +
'原来的url.path'。这个其实与 output.publicPath 用法大同小异。
output.publicPath 是作用于 js, css, img 。而 devServer.publicPath 则作用于请求路径上的。
// devServer.publicPath
publicPath: "/assets/"

// 原本路径 --> 变换后的路径
http://localhost:8080/app.js --> http://localhost:8080/assets/app.js

watchOptions：这个涉及到文件系统概念（nfs）,后期会有更详细的介绍
watchOptions （文档）
一组自定义的监听模式，用来监听文件是否被改动过。
watchOptions: {
  aggregateTimeout: 300,
  poll: 1000，
  ignored: /node_modules/
}
aggregateTimeout：一旦第一个文件改变，在重建之前添加一个延迟。填以毫秒为单位的数字。
ignored：观察许多文件系统会导致大量的CPU或内存使用量。可以排除一个巨大的文件夹。

poll：填以毫秒为单位的数字。每隔（你设定的）多少时间查一下有没有文件改动过。不想启用也可以填false。
当您有一个单独的API后端开发服务器，并且想要在同一个域上发送API请求时，则代理这些 url 。看例子好理解。
  proxy: {
    '/proxy': {
        target: 'http://your_api_server.com',
        changeOrigin: true,
        pathRewrite: {
            '^/proxy': ''
        }
  }
假设你主机名为 localhost:8080 , 请求 API 的 url 是 http：//your_api_server.com/user/list
'/proxy'：如果点击某个按钮，触发请求 API 事件，这时请求 url 是http：//localhost:8080/proxy/user/list 。
changeOrigin：如果 true ，那么 http：//localhost:8080/proxy/user/list 变为 http：//your_api_server.com/proxy/user/list 。但还不是我们要的 url 。
pathRewrite：重写路径。匹配 /proxy ，然后变为'' ，那么 url 最终为 http：//your_api_server.com/user/list 。


39.nfs是什么
https://www.cnblogs.com/alonones/p/6105586.html


40.引入cdn的第三方库
目的是进一步压缩vendor的大小，当然这个仅仅是调研一种性能优化上的解决方案
https://segmentfault.com/a/1190000012113011 webpack externals 深入理解
import _ from 'lodash';是引入npm包，打包文件会变大，所以通过cdn引入，即script引入，用到externals
这时候import _ from 'lodash'就不在引npm包，而是引cdn的文件，这个可以通过打包日志清晰反映出来。






之前在引入layer方案中是通过
new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery',
    'window._': 'lodash',
    '_': 'lodash'
})
将npm包设置成全局，然后在每次需要引用jquery的时候省去import $ from 'jquery';这段代码
但是这是npm方案，需要引入jquery包，在打包时会加大vendor包的体积，如果是cdn方案该如何做呢？
首先在index.html中通过script标签引入cdn地址，然后
externals: {
  "lodash": {
        commonjs: "lodash",//如果我们的库运行在Node.js环境中，import _ from 'lodash'等价于const _ = require('lodash')
        commonjs2: "lodash",//同上
        amd: "lodash",//如果我们的库使用require.js等加载,等价于 define(["lodash"], factory);
        root: "_"//如果我们的库在浏览器中使用，需要提供一个全局的变量‘_’，等价于 var _ = (window._) or (_);
  }
}
总得来说，externals配置就是为了使import _ from 'lodash'这句代码，在本身不引入lodash的情况下，能够在各个环境都能解释执行。
有一点需要注意的是，假如lodash中在浏览器环境中不提供_的全局变量，那么就没有办法使用。这个"_"是不能随便乱写的。
如果外部库lodash提供的是全局变量lodash,那你就得使用lodash。
如果你写的库要支持各种环境，你需要设置output中的libraryTarget为umd，也就是将打包的文件，生成为umd规范，
适用于各种环境。libraryTarget和externals有藕断丝连的关系，后面会提到。
可以先npm uninstall lodash
npm uninstall jquery
npm install lodash --save-dev
npm install jquery --save-dev
证明可行
插曲，安装lodash之后，总显示_不存在，怀疑是安装出错的原因，重新安装之后,仍然有问题，为何？后来无意中发现，哪怕我关闭了idea，
网页仍然有效，查看进程，发现node.js没有被终止，之前是习惯性关闭cmd窗口去终止node.js的进程，发现不是每台电脑都这样，环境的差异，nodejs
版本的差异会导致不同的结果，应该明确终止进程，才能确保修改的代码能被实时使用。
另外在本例子中，jquery和lodash都可以直接script引入而无需配置externals，代码能正常运行


41.hash,chunkhash,contenthash的区别
https://www.jb51.net/article/132275.htm hash,chunkhash,contenthash的区别
总的来说：
采用hash计算的话，每一次构建后生成的哈希值都不一样，即使文件内容压根没有改变。这样子是没办法实现缓存效果，我们需要换另一种哈希值计算方式，即chunkhash。
chunkhash和hash不一样，它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。我们在生产环境里把一些公共库和程序入口文件区分开，
单独打包构建，接着我们采用chunkhash的方式生成哈希值，那么只要我们不改动公共库的代码，就可以保证其哈希值不会受影响。
在chunkhash的例子，我们可以看到由于index.css被index.js引用了，所以共用相同的chunkhash值。但是这样子有个问题，如果index.js更改了代码，
css文件就算内容没有任何改变，由于是该模块发生了改变，导致css文件会重复构建。
这个时候，我们可以使用extra-text-webpack-plugin里的contenthash值，保证即使css文件所处的模块里就算其他文件内容改变，只要css文件内容不变，那么不会重复构建。


42.lodash模块在被remove之后，并且在程序中不在调用之后，居然每次运行还是会提示找不到lodash模块，于是npm cache clean,接着npm install,恢复正常。


43.多个活动项目（都是vue结构），合并成一个项目，通过命令去打包不同模块，抽取出公共组件
合并的原因是太多类似的组件和代码，每次修改可能要多个项目同时修改，切换idea，重复性的修改相同的东西，很容易造成遗漏和疲劳，所以合并方便统一管理。
合并的关键是只新建一个项目，每个活动业务都分别放在一个文件夹中，作为一个大的业务模块，通过package.json的命令去控制打包项目。
难点和坑很多，逐一说明：
1.package.json中的命令要传参，代表打包不同的业务（文件夹），最开始的vue脚手架通过node build/build.js 和 node build/dev-server.js去编译和启动项目，传参可以是
 node build/build.js odin(文件夹名称)，js文件通过process.argv去读取参数，但是这样第一太low，不能形成key-value这样的取值，第二局限性很大，在vue脚手架升级改版之后，
 通过npm run dev去启动项目，而dev 指的是webpack-dev-server --inline --progress --open --config build/webpack.dev.conf.js，那么这时候上述方法无法传值，这里使用
 cross-env（readme.txt有详细教程），然后cross-env project=ironman_1 node build/build.js这样命令，接收参数非常方便global.currentProject = process.env.project
 2.因为现在打包是指定了特定的文件夹，就是打包入口地址是参数化的，所以需要对所有涉及到入口地址的地方进行参数化修正，这里一一列出：
 webpack.base.conf.js 所有有src的地方，全部修正为global.currentProject + '/src'，
 webpack.dev.conf.js HtmlWebpackPlugin中的template: global.currentProject + '/index.html',这个地方特别注意，如果没有写对，编译会报错，但是不会指出错误原因，
 所以是非常细节的点，另外CopyWebpackPlugin的相关内容注释掉，如果是build打包，因为路径的原因总是会出错，但是不知道错在哪，但是注释掉什么都不影响
 webpack.prod.conf.js 操作和webpack.dev.conf.js一模一样
 3.vue脚手架版本的原因，可能存在config/index.js文件在dev对象和build对象没有引入env: require('./dev.env'),和env: require('./prod.env'),会提示找不到env参数
 4.涉及不同的活动，又在一个项目，自然存在port的问题，就在config/index.js,dev对象修正port: global.currentPort
 5.项目打包的出口应该是可配置化的，所以在config/index.js,build对象修正assetsPublicPath: eventConfigJson.assetsPath,
 以上就是vue脚手架的基本修正，业务修正需要深入业务代码，这里只简单的说明遇到的问题：
 1.目前集成了3个项目，但是3个项目开展历史递进的，所以在设计上存在上下不兼容，最早的项目设计老旧，很多可以配置化的详谈功能的组件不能直接提出来复用，
 这个问题有2个原因造成，一个是当初设计时候的思路过于简单，第二是编程人员水平明显参差不齐，有些代码写的太落后，不符合规范导致组件抽象还要完全重写代码
 解决方案就只有下次书写的时候定义代码规范，定期代码审核，但是我没有这么高的权限去约束别人，所以基本无解。
 ps:幸亏研究了点webpack，否则这次悬。本来有一个项目已经实现多项目合并成一个项目，但是返现使用的是早起的vue脚手架，质量不行，另外合并的多个项目均由一个人开发，
 所以合并起来在业务代码上，配置文件上没有太多难度，所以更简单，如果多个人开发，那配置文件完全不同，代码风格杂乱，在抽取公共组件，命令指定活动打包的时候简直是灾难。


 44.合并之后抽取组件遇到的问题
 抽取组件发现每个调用的地方都有些许不同，有可能是样式，有可能是多了些元素，有可能是里面的处理逻辑不一致，到底该如何抽取呢？
 有个方案，逻辑可以对外暴露接口去处理，样式可以通过自定义class去处理，多了些元素就需要按情况定义了，一般应该抽取公共的，如果
 有不一样的元素，正面抽取的还不够彻底。另外抽取公共组件要切记一个事情，原则上不改变之前项目的代码，就是调用的组件还是之前的组件，
 而不改为现在公共的组件，否则工作量太大，应该是为以后的项目做准备。

 45.babel-preset-env相关调研，参考14
 https://blog.csdn.net/houdabiao/article/details/78620202 babel配置，这个真详细--
 之前一直使用babel-preset-es2015，简单解释下babel概念：
 babel官网正中间一行黄色大字写着“babel is a javascript compiler”，翻译一下就是babel是一个javascript转译器。
 为什么会有babel存在呢？原因是javascript在不断的发展，但是浏览器的发展速度跟不上。
 以es6为例，es6中为javascript增加了箭头函数、块级作用域等新的语法和Symbol、Promise等新的数据类型，但是这些语法和数据类型并不能够马上被现在的浏览器全部支持，
 为了能在现有的浏览器上使用js新的语法和新的数据类型，就需要使用一个转译器，将javascript中新增的特性转为现代浏览器能理解的形式。babel就是做这个方面的转化工作。

调研分4部分：参数的作用和配置；对浏览器的兼容情况；文件大小；相对babel-preset-es2015的优势





