---
title: Rate Limiting
date: Last Modified 
permalink: rate-limiting.html
eleventyNavigation:
  key: Rate-Limiting
  parent: Security
  order: 310
  title: Rate Limiting
---
This feature is similar to that of websites that block login attempts for a "cooldown period" to prevent brute force attacks.

It applies to LDAP bind operations.

Example configuration:

``` toml
[behaviors]
  LimitFailedBinds = true
  NumberOfFailedBinds = 3
  PeriodOfFailedBinds = 10
  BlockFailedBindsFor = 60
  PruneSourceTableEvery = 600
  PruneSourcesOlderThan = 600
```

|Configuration|Meaning|
|-|-|
|LimitFailedBinds|When enabled, rate limiting will apply after a number of failed authentication attempts|
|NumberOfFailedBinds|Number of consecutive failed auth attempts required to trigger rate limiting|
|PeriodOfFailedBinds|Window (in seconds) to detect failed auth attempts|
|BlockFailedBindsFor|Number of seconds to block the source IP address|
|PruneSourceTableEvery|(Housekeeping) clean up monitored IP addresses after this many seconds|
|PruneSourcesOlderThan|Clean up IP addresses last seen this many seconds ago|