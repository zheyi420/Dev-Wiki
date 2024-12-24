
## 常见需求

### Linux 命令行导入表数据
```bash
# 切换到目标数据库的`bin`目录，使用以下命令将导出的`.dmp`文件导入到新的数据库中
# 目录路径可能为`/data/dmdbms/tool/bin/`
./dimp 用户名/密码@ip:端口 FILE=导入的文件路径 DIRECTORY=导入文件所在目录
# 如
./dimp SYSDBA/SYSDBA@localhost:5236 FILE=/path/to/import/my_table_export.dmp DIRECTORY=/path/to/import/
```

### Linux 命令行访问本机达梦数据库

1. 进入达梦数据库安装目录
```bash
# 通常，达梦数据库的安装目录为 `/opt/drcun/dms` 或 `/data/dmdbms/tool`。根据实际安装路径，输入以下命令进入相应目录：
cd /opt/drcun/dms
# 或者
cd /data/dmdbms/tool/
```
2. 使用 disql 登录数据库
```bash
# 在安装目录下，运行 `disql` 命令以登录数据库。输入以下命令：
./disql

# 接着，使用以下格式的命令连接到数据库：
conn 用户名/密码@localhost:5236;
```
3. 查看数据库
```bash
# 查看当前用户下的所有数据表
SELECT TABLE_NAME FROM USER_TABLES;

# 查看所有用户的表
SELECT TABLE_NAME FROM ALL_TABLES;

# 查询前两行数据 使用 TOP
SELECT TOP 2 * FROM your_table_name;
# 查询前两行数据 使用 LIMIT
SELECT * FROM your_table_name LIMIT 2;

```

4. 退出 `disql`
```bash
EXIT;
```