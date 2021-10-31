---
title: Compatibility
date: Last Modified 
permalink: compatibility.html
eleventyNavigation:
  key: Compatibility
  order: 10
  title: Compatibility
---
::: callout-green
You can safely ignore this page if you are not upgrading from a pre-2.1.0 release! -> [Quick Start](/docs/quickstart.html)
:::

Starting with GLAuth 2.1.0:
- it is possible to browse through the server's tree using LDAP clients
- scopes (`base`, `one`, `sub`) are supported and behave (mostly) as expected
- whenever necessary, organizational units ("`ou`") are utilized
- groups are available both as `posixgroup` and `groupOfUniqueNames` entities

## Enabling Compatibility Mode

In order to prevent breaking existing setups, some of these changes are not enabled by default. To switch to full compatibility mode, update your configuration file:

``` toml
[backend] # [tl! focus]
  datastore = "config"
  baseDN = "dc=glauth,dc=com"
  nameformat = "ou" # [tl! focus:1]
  groupformat = "ou"
```

## Noticeable changes

When browsing/querying with specific scope...

Searching from a top level, `dn` refers to the correct path:
``` toml
dn: cn=hackers,ou=superheros,c=glauth,dc=com # [tl! --]
dn: cn=hackers,ou=superheros,ou=users,dc=glauth,dc=com # [tl! ++]
dn: cn=hackers,ou=superheros,dc=glauth,dc=com # [tl! --]
dn: cn=hackers,ou=superheros,ou=groups,dc=glauth,dc=com # [tl! ++]
```
Membership refers to organizational units:
``` toml
memberOf: cn=superheros,ou=groups,dc=glauth,dc=com # [tl! --]
memberOf: ou=superheros,ou=groups,dc=glauth,dc=com # [tl! ++]
```
Top-level classes are reporting their class hierarchy correctly:
``` toml
objectClass: posixGroup
objectClass: top # [tl! ++]
```
