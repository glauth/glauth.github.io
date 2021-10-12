---
title: Quick Start
date: Last Modified 
permalink: quickstart.html
eleventyNavigation:
  key: Quickstart
  order: 20
  title: Quick Start
---
These steps offer a great way to try out GLAuth in a non-production environment.  *Be warned that you should take the extra steps to setup SSL (TLS) for production use!*

1. Download a precompiled binary from the [releases](https://github.com/glauth/glauth/releases) page.
2. Download the [example config file](https://github.com/glauth/glauth/blob/master/sample-simple.cfg).
3. Start the GLAuth server, referencing the path to the desired config file with `-c ./glauth64 -c sample-simple.cfg`
4. Test with traditional LDAP tools

For example:

``` shell
ldapsearch -LLL -H ldap://localhost:3893 \
   -D cn=serviceuser,ou=svcaccts,dc=glauth,dc=com -w mysecret \
   -x -bdc=glauth,dc=com cn=hackers
```
