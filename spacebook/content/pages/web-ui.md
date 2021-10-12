---
title: Web UI
date: Last Modified 
permalink: web-ui.html
eleventyNavigation:
  key: WebUI
  order: 290
  title: Web UI
---
If so configured, GLAuth starts with a web UI that allows you to check its statistics as well as application health.
This web UI runs mated to a REST API that is accessible at the same address.

The statistics available are of particular interest when running in LDAP proxy mode.

Example configuration:

``` toml
[api]
  enabled = true
  internals = true # debug application performance
  tls = false # enable TLS for production!!
  listen = "0.0.0.0:5555"
  cert = "cert.pem"
  key = "key.pem"
```

If `internals` is enabled, an additional screen becomes available, providing information pertaining to the Go application's internals, including garbage collection information, heap size, etc.






