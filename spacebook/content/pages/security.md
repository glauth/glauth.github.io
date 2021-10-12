---
title: Security
date: Last Modified 
permalink: security.html
eleventyNavigation:
  key: Security
  order: 300
  title: Security
---
When using an application to provide authentication and authorization, security is an important consideration. While GLAuth does not aspire to be a full-fledged solution (many very good ones already exist), it is, by its very nature, exposed to the world, and should not weaken your security posture.

## Passwords

GLAuth supports two types of passwords:
- Account passwords
- Application password

In addition, you can use two-factor authentication with account passwords.

These passwords can be hashed following two different algorithms: `SHA256` and `bcrypt`

`bcrypt` is the recommended algorithm. Note that bcrypt passwords contain their own salt and cost value.

|Config key|Meaning|
|-|-|
|passsha256|SHA256 interactive password|
|passappsha256|SHA256 application password|
|passbcrypt|BCrypt interactive password|
|passappbcrypt|BCrypt application password|

::: warning
Note that two-factor authentication is bypassed when using an application password.
:::

## Root DSE 

In some use cases, you would want to allow anonymous requests to the "root DSE" area. In fact, some applications will not bind properly unless they are first allowed to perform a bit of digging around that area. This is an acceptable practice, as "root DSE" stands for "Root Directory Server Agent Service Entry" and can be used to discover your server's schema.

If you are not using any such application, we would recommend protecting your root DSE, so that only authenticated users can access it.

To protect this area, use this configuration:

``` toml
[backend] # [tl! focus]
  datastore = "config"
  baseDN = "dc=glauth,dc=com"
  anonymousdse = false # [tl! focus]

```

## Attack Surface

Minimizing an application's attack surface is a good practice, reducing exploit opportunities.

Therefore, we recommend that:
- you only expose the ports necessary to use GLAuth
- only use LDAP with TLS transport (port 636)
- use capabilities to limit your users' search scope

Note that, if using a Docker image, the `glauth-plugins` image is built on top of [Distroless](https://github.com/GoogleContainerTools/distroless) and is therefore devoid of unnecessary and sometimes compromised packages. 