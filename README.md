# 说明

这个 fork 在原来 Farseerfc 的 fork 基础上修改，改了还是有点多的。

默认语言从繁中改为简中。

删掉了日文翻译支持，毕竟咱虽然有打算学日语，但写文章估计没戏。

进行了瘦身，比如：

* 去掉了 Material
* 对 bootstrap 下的针对本博客不需要的 css 进行了删除，结果就是 bootstrap.min.js 体积 128K -> 88K （88K 还额外包含了主题所有的额外 css 设置 ）
* 去掉了 100+K 的 FortAwesome 字体以及其 css 而是改成单独的 svg 图这样子就不必下载整个字体 （当需要用到哪个符号需要再次另外添加 css 样式）
* Jquery 改用了 3.1.1 slim.min ，然后对其不支持的 ajax 单独改了另外的 js
* 升级 tipuesearch.js 到 6.1 并使其支持 jquery.slim.min.js ，添加了中文引号支持，默认改为非全单词搜索以支持中文
* 还有其它杂七杂八的记不得的..

还有就是，目前这个东东很不完善，等我慢慢改吧，欢迎访问我的博客 https://nifume.com ，也是本主题的 Demo.
