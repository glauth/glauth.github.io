---
title: RFCs & Extensions
date: Last Modified 
permalink: rfcs-and-extensions.html
eleventyNavigation:
  key: rfcs
  order: 601
  title: RFCs & Extensions
---
While our stated goal for GLAuth is to provide the simplest possible authentication server, we keep finding an increasing number of client appliances that are asking fairly "existential" questions of the server. We have been working on providing answers these clients will find satisfactory.

## Root DSE

RFC 4512: "An LDAP server SHALL provide information about itself and other information that is specific to each server.  This is represented as a group of attributes located in the root DSE"

Test: `ldapsearch -LLL -H ldap://localhost:3893 -D cn=serviceuser,ou=svcaccts,dc=glauth,dc=com -w mysecret -x -s base "(objectclass=*)"`

## Subschema Discovery

RFC 4512: "To read schema attributes from the subschema (sub)entry, clients MUST issue a Search operation [RFC4511] where baseObject is the DN of the subschema (sub)entry..."

Test: `ldapsearch -LLL -o ldif-wrap=no -H ldap://localhost:3893 -D cn=serviceuser,ou=svcaccts,dc=glauth,dc=com -w mysecret -x -bcn=schema -s base`

By default, this query will return a very minimal schema (~5 objects) -- you can ask GLAuth to return more comprehensive schemas by unpacking, in the `schema/` directory, the OpenLDAP or FreeIPA schema archives found in the `assets/` directory.

## LDAP Backend: "1.1" attribute

RFC 4511: "A list containing only the OID "1.1" indicates that no attributes are to be returned."

