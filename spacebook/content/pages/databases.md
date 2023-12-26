---
title: Databases
date: Last Modified 
permalink: databases.html
eleventyNavigation:
  key: Databases
  parent: Backends
  order: 211
  title: Databases
---
Various databases can be used as long as they implement the database plugin interfaces.

[[toc]]

Database Tables (scroll down for complete schema and discussion):

|Name|Function|
|-|-|
|users|your users, of course|
|ldapgroups|primary and secondary groups available|
|includegroups|store group indirections (equivalent to `includegroups` directive)|

Note that, in `users`, `othergroups` is a comma-separated list of group ids.

Here is how to insert some example data in your database using its REPL:

```sql
INSERT INTO ldapgroups(name, gidnumber)
  VALUES('superheros', 5501);
INSERT INTO ldapgroups(name, gidnumber)
  VALUES('svcaccts', 5502);
INSERT INTO ldapgroups(name, gidnumber)
  VALUES('civilians', 5503);
INSERT INTO ldapgroups(name, gidnumber)
  VALUES('caped', 5504);
INSERT INTO ldapgroups(name, gidnumber)
  VALUES('lovesailing', 5505);
INSERT INTO ldapgroups(name, gidnumber)
  VALUES('smoker', 5506);
INSERT INTO includegroups(parentgroupid, includegroupid)
  VALUES(5503, 5501);
INSERT INTO includegroups(parentgroupid, includegroupid)
  VALUES(5504, 5502);
INSERT INTO includegroups(parentgroupid, includegroupid)
  VALUES(5504, 5501);
INSERT INTO users(name, uidnumber, primarygroup, passsha256)
  VALUES('hackers', 5001, 5501,
    '6478579e37aff45f013e14eeb30b3cc56c72ccdc310123bcdf53e0333e3f416a');
INSERT INTO users(name, uidnumber, primarygroup, passsha256)
  VALUES('johndoe', 5002, 5502,
    '6478579e37aff45f013e14eeb30b3cc56c72ccdc310123bcdf53e0333e3f416a');
INSERT INTO users(name, mail, uidnumber, primarygroup, passsha256)
  VALUES('serviceuser', "serviceuser@example.com", 5003, 5502,
    '652c7dc687d98c9889304ed2e408c74b611e86a40caa51c4b43f1dd5913c5cd0');
INSERT INTO users(name, uidnumber, primarygroup, passsha256, othergroups)
  VALUES('user4', 5004, 5504,
    '652c7dc687d98c9889304ed2e408c74b611e86a40caa51c4b43f1dd5913c5cd0',
    '5505,5506');
INSERT INTO capabilities(userid, action, object)
  VALUES(5001, "search", "ou=superheros,dc=glauth,dc=com");
INSERT INTO capabilities(userid, action, object)
  VALUES(5003, "search", "*");
```

This should be equivalent to this configuration:
```toml
[[users]]
  name = "hackers"
  uidnumber = 5001
  primarygroup = 5501
  passsha256 = "6478579e37aff45f013e14eeb30b3cc56c72ccdc310123bcdf53e0333e3f416a" # dogood
    [[users.capabilities]]
    action = "search"
    object = "ou=superheros,dc=glauth,dc=com"

[[users]]
  name = "johndoe"
  uidnumber = 5002
  primarygroup = 5502
  passsha256 = "6478579e37aff45f013e14eeb30b3cc56c72ccdc310123bcdf53e0333e3f416a" # dogood

[[users]]
  name = "serviceuser"
  mail = "serviceuser@example.com"
  uidnumber = 5003
  passsha256 = "652c7dc687d98c9889304ed2e408c74b611e86a40caa51c4b43f1dd5913c5cd0" # mysecret
  primarygroup = 5502
    [[users.capabilities]]
    action = "search"
    object = "*"

[[users]]
  name = "user4"
  uidnumber = 5003
  primarygroup = 5504
  othergroups = [5505, 5506]
  passsha256 = "652c7dc687d98c9889304ed2e408c74b611e86a40caa51c4b43f1dd5913c5cd0" # mysecret
    [[users.customattributes]]
    employeetype = ["Intern", "Temp"]
    employeenumber = [12345, 54321]

[[groups]]
  name = "superheros"
  gidnumber = 5501

[[groups]]
  name = "svcaccts"
  gidnumber = 5502

[[groups]]
  name = "civilians"
  gidnumber = 5503
  includegroups = [ 5501 ]

[[groups]]
  name = "caped"
  gidnumber = 5504
  includegroups = [ 5502, 5501 ]
```

and LDAP should return these `memberOf` values:

```shell
uid: hackers
ou: superheros
memberOf: cn=caped,ou=groups,dc=militate,dc=com
memberOf: cn=civilians,ou=groups,dc=militate,dc=com
memberOf: cn=superheros,ou=groups,dc=militate,dc=com

uid: johndoe
ou: svcaccts
memberOf: cn=caped,ou=groups,dc=militate,dc=com
memberOf: cn=svcaccts,ou=groups,dc=militate,dc=com

uid: serviceuser
ou: caped
memberOf: cn=caped,ou=groups,dc=militate,dc=com

uid: user4
ou: caped
memberOf: cn=caped,ou=groups,dc=militate,dc=com
memberOf: cn=lovesailing,ou=groups,dc=militate,dc=com
memberOf: cn=smoker,ou=groups,dc=militate,dc=com
```
If you have the ldap client package installed, this can be easily confirmed by running
```shell
ldapsearch -LLL -H ldap://localhost:3893 -D cn=serviceuser,ou=svcaccts,dc=glauth,dc=com -w mysecret -x -bdc=glauth,dc=com cn=hackers
```
and so on.

## Database Schema 

![http://localhost:8000/docs/content/images/glauth-simple-schema.png](/docs/content/images/glauth-simple-schema.png)

### users table

_this table contains all LDAP information pertaining to user accounts, including links to other tables_

|Field|Function|
|-|-|
|id|internal id number, used by glauth|
|name|LDAP name (i.e. `cn`, `uid`)|
|uidnumber|LDAP `UID` attribute|
|primarygroup|An LDAP group's `GID` attribute; also used to build `ou` attribute; used to build `memberOf`|
|othergroups|A comma-separated list of `GID` attributes; used to build `memberOf`|
|givenname|LDAP `GivenName` attribute, i.e. an account's first name|
|sn|LDAP `sn` attribute, i.e. an account's last name|
|mail|LDAP `mail` attribute, i.e. email address; also used as `userPrincipalName`|
|loginshell|LDAP `loginShell` attribute, pushed to the client, may be ignored|
|homedirectory|LDAP `homeDirectory` attribute, pushed to the client, may be ignored|
|disabled|LDAP `accountStatus` attribute, if non-zero returns "inactive"|
|passha256|SHA256 account password|
|passbcrypt|BCRYPT-encrypted account password|
|otpsecret|OTP secret, for two-factor authentication|
|yubikey|UBIKey, for two-factor authentication|
|sshkeys|A comma-separated list of `sshPublicKey` attributes|
|custattr|A JSON-encoded string, containing arbitrary additional attributes; must be `{}` by default|

### ldapgroups table

_this table represents primary and secondary LDAP groups_

|Field|Function|
|-|-|
|id|internal id number, used by glauth|
|name|LDAP group name (i.e. `cn` or `ou` depending on context)|
|gidnumber|LDAP `GID` attribute|

### includegroups table

_this table is used to represent groups containing other groups and inheriting their attributes_

|Field|Function|
|-|-|
|id|internal id number, used by glauth|
|parentgroupid|the LDAP group id containing another group, used by glauth|
|includegroupid|the LDAP group id contained in the parent group, used by glauth|

### capabilities table

_this table is used to retrieve capabilities granted to users linked to it from the users table_

|Field|Function|
|-|-|
|id|internal id number, used by glauth|
|userid|internal user id number, used by glauth|
|action|string representing an allowed action, e.g. "search"|
|object|string representing scope of allowed action, e.g. "ou=superheros,dc=glauth,dc=com"|

### Discussion: database schema

While GLAuth is not meant to support millions of user accounts, some decent performance is still expected! In fact, when searching through records using a database query, we should see a performance of O(log n) as opposed to, when searching through a flat config, O(n).

While it would be friendlier to offer related attributes in `join`ed tables, we may end up re-creating a "browse" scenario unintentionally.

For instance, when retrieving custom attributes, we could go through an attribute table: `custattr[userid, attribute, value#n]`

However, this means that a `join` statement between the account table and the custom attribute table would yield the cartesian product of each account x attributes; we would need to iterate through the results and collate them.

Alternatively, in Postgres and MySQL, we could rely on the database engine's built-in support for `crosstab` which pivots the second table's results into corresponding columns. This would not be supported in SQLite and would also mean building pretty nasty execution plans.

**So, what's the decision?**

In GLAuth 2.x, when including information that does not benefit from being normalized (e.g. custom attributes) we are following the "nosql" trend (irony!) of storing this data in a JSON structure.
