---
title: Postgresql
date: Last Modified 
permalink: postgresql.html
eleventyNavigation:
  key: Postgresql
  parent: Databases
  order: 223
  title: Postgresql
---
Example configuration:

``` toml
[backend]
  datastore = "plugin"
  plugin = "postgres.so"
  pluginhandler = "NewPostgresHandler"
  database = "database connection string"
```

Note that `plugin` is the path to your database plugin's library.

See the Databases page for global database-related information.