1.IntelliJ IDEA 的 .idea 目录加入.gitignore无效的解决方法
无效的原因是：对应的目录或者文件已经被git跟踪，此时再加入.gitignore后就无效了
解决办法：
先执行
    [文件夹]  git rm -r --cached .idea
    [文件]     git rm --cached demo-project.iml
再重新加入.gitignore文件

2.IntelliJ IDEA 设置新建文件就直接add进入版本控制中
settings –> Version control –> confirmation中选择add sliently即可