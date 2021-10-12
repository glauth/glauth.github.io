---
title: Limitations
date: Last Modified 
permalink: limitations.html
eleventyNavigation:
  key: Limitations
  order: 602
  title: Limitations
---
## Limitations when using non-LDAP backends

I am listing these limitations here because I have been finding an increasing number of use cases where a client device/application tries to discover/browse the content of our LDAP directory rather than relying on direct queries. In theory, we would not need to address these, except that even the basic glauth charter of authenticating users does not always work due to these limitations.

- not possible to explore the user hierarchy by descending branches
- search with a more specific DN (`ou=`) does not filter out users
- base=one does not seem to be supported either
- limited root DSS information (WIP)
- missing schema (WIP)

## Not supported/Not being considered

- "who am I" support
