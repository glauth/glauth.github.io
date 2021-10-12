---
title: Capabilities
date: Last Modified 
permalink: capabilities.html
eleventyNavigation:
  key: Capabilities
  order: 402
  title: Capabilities
---
Capabilities are a modern implementation of privileges as seen in OpenLDAP and other servers.

Rather than using a tacked-on syntax that requires schema changes, these are encoded as key-value pairs, defining what actions an account can perform, and to what scope.

Example configuration:

``` toml
[[users]] # [tl! focus:1]
  name = "hackers"
  uidnumber = 5001
  primarygroup = 5501
  passsha256 = "6478579e37aff45f013e14eeb30b3cc56c72ccdc310123bcdf53e0333e3f416a" # dogood
    [[users.capabilities]] # [tl! focus:2]
    action = "search"
    object = "ou=superheros,dc=glauth,dc=com"
```

|Name|Meaning|
|-|-|
|search|Define the scope of where a search action can be performed|