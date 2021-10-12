---
title: Integration with libpam-ldap and ncsd
date: Last Modified 
permalink: ssh-libpam-ldap-ncsd.html
eleventyNavigation:
  key: SSH-Libpam-ldap-ncsd
  parent: SSH-Integration
  order: 520
  title: Libmap-ldap and ncsd
---
Note that, with this setup, LDAP groups will automatically be assigned as Linux groups, same as using NIS (for instance)

## Setup

``` shell
sudo apt-get install -y libpam-ldap nscd
```

Here are some answers to the prompts you will see during the setup process:

|Prompt|Answer|
|-|-|
|Should debconf...?|Yes|
|LDAP URI|Your GLAuth instance fqdn and port number|
|Distinguished Name|dc=glauth,dc=com (replace with your org's DN)|
|LDAP version|3|
|Make local root database admin|Yes|
|Does the LDAP db require login?|No|
|LDAP account for root|cn=serviceuser,ou=service,dc=glauth,dc=com|
|LDAP root password|{your root user password}|
|Encryption|crypt|

You can reconfigure this later:

``` shell
sudo dpkg-reconfigure ldap-auth-config
```

In `/etc/nsswitch.conf`:

```
passwd:         ldap compat systemd
group:          ldap compat systemd
shadow:         ldap compat
gshadow:        files
```

In `/etc/pam.d/common-session`:

```
session required    pam_mkhomedir.so skel=/etc/b-skel umask=0077
```

Yes, this does create a home directory for each user being authenticated. We use a strong mask so that we can start storing sensitive info, if needed, in their home directory.

Note that we should also create our skeleton directory:

``` shell
sudo mkdir /etc/b-skel
```

In `/etc/pam.d/common-password`, remove `use_authtok` if present.

Allow password login. Make sure you have, in `/etc/ssh/sshd_config`:

```
PasswordAuthentication yes
```

## Security

Now, let's say that you are connecting to GLAuth using LDAPS, but you are using a self-signed cert. Change `/etc/ldap/ldap.conf` accordingly:

```
TLS_REQCERT never
```

You can also restrict access to certain groups.

In `/etc/pam.d/common-auth`:

```
auth    required    pam_access.so
```

In `/etc/security/access.conf`:

```
-:ALL EXCEPT root (admin):ALL EXCEPT LOCAL
```

## Debugging

To debug authentication issues:

``` shell
sudo tail -f /var/log/auth.log
```

You can also check from the command line:

``` shell
sudo getent passwd
sudo getent group
finger {username} # if finger is installed
```
