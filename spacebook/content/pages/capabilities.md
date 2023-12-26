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
[[users]] # [tl! focus]
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

Introduced in _2.1.0_, this feature continues improving the intrinsic security model of GLAuth.

While some level of access control is already enforced when using an LDAP backend, Capabilities are now part of the Config and Database backends.

Currently, one capability is recognized: "search" -- here is how to configure it in a Config yaml file:

```toml
...
[behaviors]
  # Ignore all capabilities restrictions, for instance allowing every user to perform a search
  IgnoreCapabilities = false
...
[[users]]
  name = "hackers"
    [[users.capabilities]]
    action = "search"
    object = "ou=superheros,dc=glauth,dc=com"
    [[users.capabilities]]
    action = "search"
    object = "ou=someotherdn,dc=glauth,dc=com"
...
[[users]]
  name = "serviceuser"
    [[users.capabilities]]
    action = "search"
    object = "*"
...
```
For backward compatibility, you can set `IgnoreCapabilities` to "true"

If you are using a Database backend, check the plugins README for configuration information.
