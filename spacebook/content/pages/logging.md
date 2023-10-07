---
title: Logging
date: Last Modified 
permalink: logging.html
eleventyNavigation:
  key: Logging
  parent: Development
  order: 1111
  title: Logging
---
## Logging Levels

- using logr with increasing verbosity
  - 0 you always want to see this
  - 1 common logging that you might *possibly* want to turn off (error)
  - 2 warn
  - 3 notice
  - 4 info
  - 6 debug
  - 8 trace
  - 10 I would like to performance test your log collection stack
- errors really are errors that cannot be handled or returned
  - returning a proper LDAP error code is handling an error
