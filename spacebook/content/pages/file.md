---
title: Config/File
date: Last Modified 
permalink: file.html
eleventyNavigation:
  key: Config
  parent: Backends
  order: 205
  title: Config/File
---
This is the default backend. It contains all configuration information, as well as users and groups. 
This bare bones type of configuration allows you to get started with GLAuth very quickly and depending on your needs, 
you may not need to switch to a different backend.

Note that, since you can chain backends, you could use this backend to specify two-factors secrets before relaying a query 
to, for instance, a LDAP backend where the same users already exist, only without this added level of security.

TODO: Diagram

#[beta](red)
Starting with version 2.1.0, it is possible to split this backend type in multiple, specialized files. 
Store these files in a directory and point GLauth to that directory using `-c directory`