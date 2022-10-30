---
title: OpenSSH Keys
date: Last Modified 
permalink: openssh-keys.html
eleventyNavigation:
  key: OpenSSHKeys
  parent: Security
  order: 322
  title: OpenSSH Keys
---
GLAuth can store a user's SSH authorized keys. For instance, in a given user's configuration:
```
sshkeys = ["ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAQEA3UKCEllO2IZXgqNygiVb+dDLJJwVw3AJwV34t2jzR+/tUNVeJ9XddKpYQektNHsFmY93lJw5QDSbeH/mAC4KPoUM47EriINKEelRbyG4hC/ko/e2JWqEclPS9LP7GtqGmscXXo4JFkqnKw4TIRD52XI9n1syYM9Y8rJ88fjC/Lpn+01AB0paLVIfppJU35t0Ho9doHAEfEvcQA6tcm7FLJUvklAxc8WUbdziczbRV40KzDroIkXAZRjX7vXXhh/p7XBYnA0GO8oTa2VY4dTQSeDAUJSUxbzevbL0ll9Gi1uYaTDQyE5gbn2NfJSqq0OYA+3eyGtIVjFYZgi+txSuhw== rsa-key-20160209"]
```

Add one or more keys per user as shown above, then follow the steps to setup the goklp helper: https://github.com/glauth/goklp
