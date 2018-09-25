之前readme的资料现在重温出现困难，重新针对性的笔记，对应代号：1809

1.
Cannot use [chunkhash] for chunk in '[name].[chunkhash].js' (use [hash] instead)
去掉热更新，不要让webpack.HotModuleReplacementPlugin()在plugins里运行，否则会与filename: '[name].[chunkhash].js',冲突