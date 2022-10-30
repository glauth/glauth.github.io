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
This bare bones type of configuration allows you to get started with GLAuth very quickly and depending on your needs, you may not need to switch to a different backend.

Note that, since you can chain backends, you could use this backend to specify two-factors secrets before relaying a query to, for instance, a LDAP backend where the same users already exist, only without this added level of security.

TODO: Diagram

#[beta](red)
Starting with version 2.1.0, it is possible to split this backend type in multiple, specialized files. 
Store these files in a directory and point GLauth to that directory using `-c directory`

## Required Fields

|Name|Description|
|-|-|
|Name|The user's username|
|ou|ID of the user's primary group|
|uidnumber|The user's unix user id|
|sshPublicKey|Specify an array of public keys|

## Optional Fields

|Name|Description|Example|Default|
|-|-|-|-|
|otherGroups|Array of IDs of groups the user is a member of.|[5501, 5002]|blank|
|givenname|First name|John|blank|
|sn|Last name|Doe|blank|
|disabled|Set to 'true' (without quotes) to make the LDAP entry add 'AccountStatus = inactive'||false (active)|
|mail|Specify an email|jdoe@example.com|blank|
|loginshell|Specify a different login shell for the user|/bin/sh, or /sbin/nologin|/bin/bash|
|homedirectory|Specify an overridden home directory for the user|/home/itadmin|/home/[username]|
|otpsecret|Specify OTP secret used to validate OTP passcode|3hnvnk4ycv44glzigd6s25j4dougs3rk|blank|
|passappbcrypt|Specify an array of app passwords which can also succesfully bind - these bypass the OTP check. Hash the same way as password.|["c32256...","4939ef..."]|blank|
|passappsha256|Specify an array of app passwords which can also succesfully bind - these bypass the OTP check. Hash the same way as password.|["c32256...","4939ef..."]|blank|
|yubikey|Specify Yubikey ID for maching Yubikey OTP against the user|cccjgjgkhcbb|blank|
