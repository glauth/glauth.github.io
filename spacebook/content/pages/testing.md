---
title: Testing
date: Last Modified 
permalink: testing.html
eleventyNavigation:
  key: Testing
  parent: Development
  order: 1113
  title: Testing
---
A core set of tests is being run by Github Actions CI. However, when developing new features/refactoring, a more comprehensive regression testing suite is needed.

You can run `go test` to execute the tests found in `glauth_test.go` -- better, if it is installed, you can run [goconvey](https://github.com/smartystreets/goconvey)

Since some tests cover TOTP, you will first need to install `oathtool` in your environment.

You also must create a symbolink link called `glauth` to make it easy for the test framework to find the executable. For instance:

```
cd bin
ln -s glauth64 glauth
```

In order to test GLAuth against an LDAP backend, you will need docker. Run this command:
```
docker run \
    --rm \
    -d \
    -p 389:389 \
    --name openldap-service \
    --hostname ldap-service \
    --env LDAP_ORGANISATION="GLauth" \
    --env LDAP_DOMAIN="glauth.com" \
    --env LDAP_ADMIN_PASSWORD="password" \
    --env LDAP_CONFIG_PASSWORD="password" \
    --env LDAP_BASE_DN="dc=glauth,dc=com" \
    -v $PWD/misc/openldap/config:/etc/ldap/slapd.d \
    -v $PWD/misc/openldap/db:/var/lib/ldap \
    osixia/openldap:latest
```

Refer to [this page](https://github.com/glauth/glauth/wiki/Quick-openldap-setup-to-test-LDAP-backend) for a somewhat more in-depth overview of testing with OpenLDAP.
