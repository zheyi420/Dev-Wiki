- [Wiki - Shapefile](https://en.wikipedia.org/wiki/Shapefile) 

-  [pdf - "ESRI Shapefile Technical Description"](http://www.esri.com/library/whitepapers/pdfs/shapefile.pdf) 


ESRI Shapefile(shp) ， 或简称 shapefile，是美国环境系统研究所公司 (ESRI) 开发的一种空间数据开放格式。该文件格式已经成为了地理信息软件界的一个开放标准。

必须的文件：

.shp 图形格式，用于保存元素的几何实体。

.shx 图形索引格式。几何体位置索引，记录每一个几何体在 .shp 文件之中的位置，能够加快向前或向后搜索一个几何体的效率。

.dbf 属性数据格式，以 dBase Ⅳ 的数据表格式存储每个几何形状的属性数据。

其他可选的文件：

.prj 投帧式，用于保存地理坐标系统与投影信息，是一个存储 well-known text 投影描述符的文本文件

.cpg 用于描述 .dbf 文件的代码页，指明其使用的字符编码。

Shapefile 文件，该种文件格式是由多个同名文件组成的，只是后缀不一样，其中 .shp 文件是识别文件，缺失必须文件时将无法打开。上传文件时，应上传全部文件，通常将其压缩打包上传。


- [Switch from Shapefile](http://switchfromshapefile.org/) 
	- [一种激进的观点：不要再用 shp 格式了](https://zhuanlan.zhihu.com/p/378437201) 
