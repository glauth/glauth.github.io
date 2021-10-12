---
title: OpenLDAP Setup
date: Last Modified 
permalink: openldap-setup.html
eleventyNavigation:
  key: OpenLDAP-Setup
  parent: Development
  order: 1120
  title: OpenLDAP Setup
---
## Containerized Setup

Using Docker:

``` shell
docker run \
    -d \
    -p 389:389 \
    --name ldap-service \
    --hostname ldap-service \
    --env LDAP_ORGANISATION="GLauth" \
    --env LDAP_DOMAIN="glauth.com" \
    --env LDAP_ADMIN_PASSWORD="password" \
    --env LDAP_CONFIG_PASSWORD="password" \
    --env LDAP_BASE_DN="dc=glauth,dc=com" \
    -v $PWD/data/config:/etc/ldap/slapd.d \
    -v $PWD/data/db:/var/lib/ldap \
    osixia/openldap:latest
```

Setup a management container:

``` shell
docker run \
    -d \
    -p 443:443 \
    --name phpldapadmin-service \
    --hostname phpldapadmin-service \
    --link ldap-service:ldap-host \
    --env PHPLDAPADMIN_LDAP_HOSTS=ldap-service \
    osixia/phpldapadmin:latest
```

Test query:

``` shell
ldapsearch -H ldap://localhost -bdc=glauth,dc=com \
    -D cn=admin,dc=glauth,dc=com \
    -w password "(objectclass=*)"
```

To add users, groups, and other objects visit `https://<your host>`

## Overlays and Group Membership

OK, now let's build on top of this. A commonly misunderstood process is how a user becomes a "memberOf" a group, and that is because it's a very "OpenLdap" feature. Actually, it relies on OL's overlay feature.

First, let's check that our container is running OpenLDAP with that overlay enabled and configured:

``` shell
docker exec  ldap-service slapcat -n 0
```

We should find a couple entries in there, the first one listing the "memberOf" overlay and further down another one representing its configuration.

So, step-by-step, let's create users, assign them to Posix Groups, **and** to Groups of Unique Names (the latter triggering the mechanism by which users will end up being "memberOf" groups)

Long story short: we are going to structure our database so that we have users, and these users will be found under posixGroups.
These users will also belong to OpenLDAP-specific groups, AKA "groupOfUniqueNames" which, thanks to the "memberOf" overlay will be retrieved alongside other user information as part of single user queries.

Select the root DN (dc=glauth,dc=com)
Create two Organisational Unit entries:
- users
- groups

Select the "ou=users" entry
Click: Create a child entry;  Default: posixGroup
Enter: "cn", "superheros","5501"
We will repeat these steps with:
- "cn", "svcaccts","5501"
- "cn", "vpn","5503"

Select the "cn=superheros" entry
Click: Create a child entry; Generic: User Account
"John", "Doe", "johndoe", "johndoe", "dogood", "dogood", "superheros"
Create user, then change its uidNumber to "5002"

Now, add the user to the "superheros" group:
Select the "cn=superheros" entry
Click: Add new attribute; select "memberUid"
Enter "johndoe" and save.

At this point, it is possible to retrieve the "johndoe" user by querying its group. But we cannot, yet, retrieve a group by querying the user itself.

Let's create our OpenLDAP group.
Select "ou=groups"
Click: Create a child entry; Default: groupOfUniqueNames
Enter: "cn", "superheros"
Browser the users' list and add a uniqueMember: John Doe. Now, create our entry.

If you inspect the John Doe user again, you will find that it now has a "memberOf" attribute. Done.

Test our configuration:

``` shell
ldapsearch -LLL -H ldap://localhost:389 \
    -D cn=admin,dc=glauth,dc=com -w password \
    -x -bdc=glauth,dc=com \
    "(objectclass=posixgroup)"

ldapsearch -LLL -H ldap://localhost:389 \
    -D cn=admin,dc=glauth,dc=com -w password \
    -x -bdc=glauth,dc=com \
    "(cn=johndoe)"

ldapsearch -LLL -H ldap://localhost:389 \
    -D cn=admin,dc=glauth,dc=com -w password \
    -x -bdc=glauth,dc=com \
    "(memberOf=cn=superheros,ou=groups,dc=glauth,dc=com)"
```

## Allowing an account to perform searches

First, list your configuration databases:

``` shell
docker exec openldap-service slapcat -b cn=config \
    | grep '^dn: olcDatabase'
```

So, let's say that you found that your work database is `dn: olcDatabase={1}mdb,cn=config` you then create a file called e.g. `grantserviceuser.ldif` with these instructions:

```
dn: olcDatabase={1}mdb,cn=config
changetype: modify
delete: olcAccess
-
add: olcAccess
olcAccess: to attrs=userPassword,shadowLastChange by self write by dn="cn=serviceuser,cn=svcaccts,ou=users,dc=glauth,dc=com" write by anonymous auth by * none
olcAccess: to * by self write by dn="cn=serviceuser,cn=svcaccts,ou=users,dc=glauth,dc=com" write by users read by * none
```

and use it (as your config admin user):

``` shell
ldapmodify -H ldap://localhost:389  \
    -D cn=admin,cn=config -w password \
    -x -f grantserviceuser.ldif
```

You should now be able to use the `serviceuser` account to query the database.