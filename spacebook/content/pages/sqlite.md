---
title: SQLite
date: Last Modified 
permalink: sqlite.html
eleventyNavigation:
  key: SQLite
  parent: Databases
  order: 221
  title: SQLite
---
Example configuration:

``` toml
[backend]
  datastore = "plugin"
  plugin = "sqlite.so"
  pluginhandler = "NewSQLiteHandler"
  database = "path to your database file"
```

Note that `plugin` is the path to your database plugin's library.

See the Databases page for global database-related information.