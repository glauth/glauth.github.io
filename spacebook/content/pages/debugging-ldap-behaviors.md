---
title: Debugging LDAP Behaviors
date: Last Modified 
permalink: debugging-ldap-behaviors.html
eleventyNavigation:
  key: Debugging-LDAP
  parent: Development
  order: 1115
  title: Debugging LDAP Behaviors
---
## Understanding LDAP filters

Often, a query does not return the expected entries because they were filtered out. I have fixed several such scenario (missing query filters in response, "do not send values" support, etc) but many remain.

In order to debug this, we need to instrument the LDAP library code itself.

Relevant functions:

- `github.com/nmcclain/server_search.go` `HandleSearchRequest/6`
- `github.com/nmcclain/filter.go` `ServerApplyFilter/2`
