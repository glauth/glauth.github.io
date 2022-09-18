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

Database Tables (scroll down for complete schema):

|Name|Function|
|-|-|
|users|your users, of course|
|groups|primary and secondary groups available|
|includegroups|store group indirections (equivalent to `includegroups` directive)|

Note that, in `users`, `othergroups` is a comma-separated list of group ids.

Here is how to insert some example data in your database using its REPL:

```sql
INSERT INTO groups(name, gidnumber)
  VALUES('superheros', 5501);
INSERT INTO groups(name, gidnumber)
  VALUES('svcaccts', 5502);
INSERT INTO groups(name, gidnumber)
  VALUES('civilians', 5503);
INSERT INTO groups(name, gidnumber)
  VALUES('caped', 5504);
INSERT INTO groups(name, gidnumber)
  VALUES('lovesailing', 5505);
INSERT INTO groups(name, gidnumber)
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

### groups table

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