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

14.label-loader es5,6,7的特性
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
