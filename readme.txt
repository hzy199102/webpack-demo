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


8.

