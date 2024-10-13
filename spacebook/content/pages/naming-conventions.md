---
title: Naming Conventions
date: Last Modified 
permalink: naming-conventions.html
eleventyNavigation:
  key: Naming-Conventions
  parent: Backends
  order: 202
  title: "Note: Naming Conventions"
---
::: callout-blue
If you are not a seasoned veteran of LDAP, you may want to read this page first.
:::

Naming Conventions can be very confusing when multiple sets are used.

Unfortunately, LDAP is a protocol that was invented in a different decade (century!), when user-friendly naming was not a priority. Back in these days, as long as the computer understood your naming scheme, the user was expected to read a manual the size of a phone book. Yes, I realize that depending on when you were born, you may also be wondering what a phone book is.

The GLAuth project itself was started as an easy-to-approach, novice-friendly LDAP server. While it is now used in many enterprise-type environments, in conjunction with top security software and equipment, we still strive to provide this level of approachability.

This, ocasionally, adds opacity to our configuration choices, so I hope the following clarifications help.

Here is a table of equivalences between GLAuth's configuration and LDAP naming. They are not exclusive, but complementary.

|configuration naming|LDAP naming|What it is|
|-|-|-|
|sshkeys|sshPublicKey| |
|primarygroup|ou|An "Organizational Unit"|
|othergroups|ou|More "Organizational Units"|
|includegroups|-|No equivalent|

LDAP is a "simplified" hierarchical naming system, part of an original vastly more complex and expansive protocol referred to as X.500. As a result, many of the simple conventions specified in the configuration files will be mapped to a host of different LDAP attributes.

For instance, the `primarygroup` field in the configuration file is used to specify the LDAP attribute `gidNumber`.

Remaing on the topic of groups, when you specifical additional groups using `otherGroups` you are specifying the LDAP attribute `memberOf` for the `posixAccount` class. 

But not only! You are also specifying the LDAP attribute `memberUid` for the `posixGroup` class. Due to LDAP's concept of overlays, GLAuth also maps this to the `uniqueMember` attribute of the `groupOfUniqueNames` class.

If it did not go to these lengths to abstract out the complexity of your LDAP configuration, you would end up finding that some of your client software only "sees" the user-to-group relationships one-way, and the other direction would be invisible to them.

GLAuth provides many more under-the-hood mappings, to make your life easier. For instance, wherever needed, `cn` and `uid` may be used interchangeably.

**So, what is `includegroups`?**

It is an example of a directive that does not map to an LDAP attribute. Instead, it allows you to specify that the users belonging to the groups specified in this directive will also be a member of the group specified in the current `[[groups]]` section. Therefore, its meaning is semantically different from e.g. `otherGroups`.