---
title: Backends
date: Last Modified 
permalink: backends.html
eleventyNavigation:
  key: Backends
  order: 201
  title: Backends
---
GLAuth's architecture is very simple: a frontend manages your LDAP requests, and a series of pluggable backends serve the results.

The default backends are: `config/file`, `ownCloud` and `ldap`. The latter allows GLAuth to act as a LDAP proxy to one or more existing LDAP servers.

Additional backends, available as plugins, let you wire databases as authentication providers.

::: warning
Unfortunately, Go plugins are not compatible with Windows OS. Therefore, they are only available on Linux and MacOS.
:::

## Chaining

Backends can be chained to inject features that are not originally available. For instance, you can setup GLAuth to forward authentication requests to an existing OpenLDAP server, but not before using another backend to inject two-factor authentication checks.



