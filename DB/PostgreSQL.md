- https://www.postgresql.org/docs/

# Tutorial

- [菜鸟教程 - PostgreSQL 教程](https://www.runoob.com/postgresql/postgresql-tutorial.html) 


# Case

## 连接 linux 服务器 pg 数据库

```bash
su - postgres[用户名]
Last login: ......
-bash-4.2$ psql -h [机子ip] -p [服务所在端口] -W
Password:
psql (9.2.24, server 12.4)
WARNING: psql version 9.2, server version 12.0
         some psql features might not work.
Type "help" for help.

postgres=# show pool_nodes; [查看集群节点状态]
```


## win10 连接本地 pg 数据库

```powershell
PS D:\otherTools\PostgreSQL\12\scripts> ls


    目录: D:\otherTools\PostgreSQL\12\scripts


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         2021/6/29     14:13                images
-a----         2021/6/29     14:14            747 runpsql.bat
-a----         2021/6/29     14:14           2556 serverctl.vbs


PS D:\otherTools\PostgreSQL\12\scripts> .\runpsql.bat
Server [localhost]:
Database [postgres]:
Port [5432]:
Username [postgres]:
用户 postgres 的口令：
psql (12.7)
输入 "help" 来获取帮助信息.

postgres=# help
您正在使用psql, 这是一种用于访问PostgreSQL的命令行界面.
键入： \copyright 显示发行条款
       \h 显示 SQL 命令的说明
       \? 显示 pgsql 命令的说明
       \g 或者以分号(;)结尾以执行查询
       \q 退出
postgres=#
```


## 常用命令

```sql
-- 添加属性列
ALTER TABLE table_name
	ADD COLUMN new_column_name data_type;

-- 添加多项属性列
ALTER TABLE table_name
	ADD COLUMN new_column_name_1 data_type,
	ADD COLUMN new_column_name_2 data_type,
	...
	ADD COLUMN new_column_name_n data_type;

-- 删除属性列
ALTER TABLE table_name 
	DROP COLUMN column_name;

-- 删除数据行
DELETE FROM table_name
	WHERE condition

-- 将带有geom的表数据关联到另一张表
UPDATE TABLE_A
SET geom = TABLE_B.geom,
		name1 = TABLE_B.name1,
		name2 = TABLE_B.name2,
		...
		namen = TABLE_B.namen
FROM TABLE_B
WHERE TABLE_A.line_id = TABLE_B.line_id
	AND TABLE_A.section_id = TABLE_B.section_id;

-- 将表A中，与表B的某些字段值相等的数据行，删除
DELETE FROM TABLE_A
	USING TABLE_B
	WHERE TABLE_A.line_id = TABLE_B.line_id
		AND	TABLE_A.section_id = TABLE_B.section_id;

-- 使用 SELECT 出的内容新建表
CREATE TABLE table_name AS
	SELECT ......

-- 跨服务器建表

-- 更改字段名，'COLUMN'可省略
ALTER TABLE table_name
RENAME COLUMN column_name_1 TO new_column_name_1,
RENAME COLUMN column_name_2 TO new_column_name_2,
...
RENAME COLUMN column_name_n TO new_column_name_n;


```

## 问题

- 连接报错
    > could not connect to server: Connection refused (0x0000274D/10061) Is the server running on host "localhost" (::1) and accepting TCP/IP connections on port 5432?

	解决
    - 检查本地服务是否开启，开启本地服务 postgresql-x64-12


# Database administration


## pgAdmin
> pgAdmin 软件包是 PostgreSQL 的免费开源图形用户界面（graphical user interface - GUI）管理工具。

- https://www.pgadmin.org/

- [How to upgrade pgAdmin 4 on windows?](https://stackoverflow.com/questions/56461166/how-to-upgrade-pgadmin-4-on-windows) 

