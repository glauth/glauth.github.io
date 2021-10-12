---
title: High Availability
date: Last Modified 
permalink: high-availability.html
eleventyNavigation:
  key: HighAvailability
  order: 409
  title: High Availability
---

Setting up GLAuth in a high availability scenario is easy: each instance of GLAuth can run independently as long as the backend is shared. Therefore, you can run multiple instances in different VMs or on multiple servers, as long as you are using these back-ends:

- Config
- LDAP Proxy
- ownCloud
- MySQL
- Postgresql
- SQLite in a shared mount

Note that an easy way to run GLAuth in a high availability mode with auto restart and scalability is using Kubernetes and our Helm chart.