---
title: Integration with SSSD
date: Last Modified 
permalink: ssh-sssd.html
eleventyNavigation:
  key: SSH-SSSD
  parent: SSH-Integration
  order: 540
  title: SSSD
---
First, a tip: make sure that `nscd` is **not** installed or you will be pulling your hair for quite a while.

This approach works better if you are forwarding to an AD server, FreeIpa, or other domain-based auth environments.

Create `/etc/sssd/conf.d/auth-something.conf`. Note that group enforcement takes place in this same file:
``` toml
[sssd]
config_file_version = 2
services = nss, pam, ssh
domains = MYDOMAIN

[nss]

[pam]

[domain/MYDOMAIN]
#cache_credentials = True
enumerate = False
id_provider = ldap
auth_provider = ldap
access_provider = ldap
ldap_uri = {auth_uri}
ldap_search_base = dc=glauth,dc=com
ldap_default_bind_dn = cn=serviceuser,ou=service,dc=glauth,dc=com
ldap_default_authtok_type = password
ldap_default_authtok = {your root user password}
ldap_use_tokengroups = False
ldap_tls_cacert = /etc/ssl/certs/auth-yourcert.crt
sudo_provider = none
ldap_group_member = member
ldap_schema = rfc2307bis
ldap_access_order = filter
ldap_access_filter = (memberOf=ou=service,dc=glauth,dc=com)
```

In `/etc/ldap/ldap.conf`, remove this line:
```
TLS_CACERT    /etc/ssl/certs/ca-certificates.crt
```
and replace it with:
```
TLS_CACERT   /etc/ssl/certs/auth-yourcert.crt
```

Same as above, create a home directory on demand. In `/etc/pam.d/common-session`:
```
session.   required.   pam_mkhomedir.so umask=0077
```

Do not forget to install, start and enable the `sssd` service. Done.