---
title: MySQL/MariaDB
date: Last Modified 
permalink: mysql.html
eleventyNavigation:
  key: MySQL
  parent: Databases
  order: 222
  title: MySQL/MariaDB
---
Example configuration:

``` toml
[backend]
  datastore = "plugin"
  plugin = "mysql.so"
  pluginhandler = "NewMySQLHandler"
  database = "database connection string"
```

Note that `plugin` is the path to your database plugin's library.

See the Databases page for global database-related information.