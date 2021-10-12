---
title: SSH PAM Integrations
date: Last Modified 
permalink: ssh-integration.html
eleventyNavigation:
  key: SSH-Integration
  order: 500
  title: SSH Integration
---
Here are a couple ways that you could configure your SSH server side, so that folks would use GLAuth for authentication (including 2FA, etc.)

The first way has been around forever but the "newer" way, based on introducing a dependency on `sssd` is more powerful (in addition to be simpler to set up) -- for instance, it natively supports secondary groups, which is quite important when implementing RBAC!

[SSH integration using libpam-ldap and ncsd](ssh-libpam-ldap-ncsd.html)

[SSH integration using SSSD](ssh-sssd.html)

So, if you are comfortable with this approach, using SSSD is now the recommended approach.