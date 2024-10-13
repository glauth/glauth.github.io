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
::: warning
Make sure that `nscd` is **not** installed, as it will interfere with SSSD.
:::

This approach works better if you are forwarding to an AD server, FreeIpa, or other domain-based auth environments.

## Setup

Create `/etc/sssd/conf.d/auth-something.conf`. Note that group enforcement takes place in this same file:

::: warning
The `services` directive is commented out because it is not needed in recent versions of SSSD. The documentation mentions leaving it in as a quirky warning, but it will unfortunately create more issues than that description implies.
:::

``` toml
[sssd]
config_file_version = 2
#services = nss, pam, ssh
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

## Enumerating

A sssd domain can be configured, using `enumerate = True`, to cache locally LDAP's knowledge of existing users and groups.

If this setting remains `False`, commands such as `getent passwd` and `getent group` will ignore these remote entries, unless an entry name is explicitly provided.

For security reasons, it is usually recommended to not enable this setting.

Note that, even with this setting enabled, SSSD would still only cache entries that match the `ldap_access_filter` directive.

In addition, while GLAuth implements both `rfc2307` and `rfc2307bis` schemas, SSSD currently only supports the former and does not properly list users belonging to a given group.

## Debugging

If you are experiencing issues convincing SSSD to use GLAuth, you can check the SSSD logs by running `journalctl -u sssd`.

If you need to troubleshoot various subsytems' behavior, you can also check their logs. The three most likely interesting log files being:

- `/var/log/sssd/sssd_MYDOMAIN.log`
- `/var/log/sssd/sssd_pam.log`
- `/var/log/sssd/sssd_nss.log`

(note: replace `MYDOMAIN` with the actual domain name you are using)

In order to get more verbose logging, you can edit `/etc/sssd/conf.d/auth-something.conf` (or whatever you named your configuration file) and change `debug_level = 0` to `debug_level = 5` or higher in each section.

## Basic LDAP filters used by SSSD:

In this example, we are authenticating as the `hackers` user.

- `(&(uid=hackers)(objectclass=posixAccount)(&(uidNumber=*)(!(uidNumber=0))))`
- `(&(member=cn=hackers,ou=superheros,ou=users,dc=glauth,dc=com)(objectClass=posixGroup)(cn=*))`
- `(&(uid=hackers)(objectclass=posixAccount)(memberOf=ou=superheros,ou=groups,dc=glauth,dc=com))`
- `(&(cn=superheros)(objectClass=posixGroup)(cn=*)(&(gidNumber=*)(!(gidNumber=0))))`

## Considered future improvements

- Implement support for Update Sequence Value (USN) based synchronization.
- Use `access_provider = simple` to allow per-user LDAP access control.
- Use `ldap_access_filter` to specify user access to LDAP entries.

