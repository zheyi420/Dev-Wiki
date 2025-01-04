- 查询表的数据行数
	`SELECT COUNT(*) FROM YOUR_TABLE_NAME;`

- 查看数据库中某个表的指定字段的唯一值数量
	- **COUNT(DISTINCT 字段名)**：此函数会计算指定字段中不同（唯一）的值的数量。
	- **AS 唯一值数量**：为返回的结果列指定一个别名，以便于理解。

	```sql
	SELECT COUNT(DISTINCT 字段名) AS 唯一值数量
	FROM 表名;
	```

