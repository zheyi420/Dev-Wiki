- 查询表的数据行数  
	`SELECT COUNT(*) FROM YOUR_TABLE_NAME;`

- 限制返回行数  
	`SELECT * FROM table_name LIMIT 5;`

- 查看数据库中某个表的指定字段的唯一值数量
	- **COUNT(DISTINCT 字段名)**：此函数会计算指定字段中不同（唯一）的值的数量。
	- **AS 唯一值数量**：为返回的结果列指定一个别名，以便于理解。

	```sql
	SELECT COUNT(DISTINCT 字段名) AS 唯一值数量
	FROM 表名;
	```
	- 显示出现次数
	```sql
	SELECT
	    字段名,
	    COUNT(*) AS count
	FROM 表名
	GROUP BY 字段名
	ORDER BY 字段名;
	```

- 查询 schema 中的所有表
	```sql
	SELECT table_name

	FROM information_schema.tables
	
	WHERE table_schema = 'schema名'
	
		AND table_type = 'BASE TABLE'
	
	ORDER BY table_name;
	```