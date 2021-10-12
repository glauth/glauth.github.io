---
title: Shipping using Podman
date: Last Modified 
permalink: shipping-using-podman.html
eleventyNavigation:
  key: Shipping-using-Podman
  parent: Development
  order: 1140
  title: Using Podman
---
## Rationale

Using Podman, we can create a working Docker image without needing to:
- setup a full Docker environment
- be a user with root-level privileges

This means that we can create a container in a very constrained environment like WSL, another container, etc.

## Details

The process could be a bit lighter, but the `ship-docker-build.sh` allows us to test our image.

Note that we are using [Alpine](https://hub.docker.com/_/golang) [containers](https://hub.docker.com/layers/golang/library/golang/alpine/images/sha256-3ea297170a6a51786d61cbdc48f0b75a1d2f43ee836223a9daf4568bd55b0279) as our base. Alpine uses musl, which enabled `faccessat2` to check permissions. However, runc returns a security error when the syscall is absent, rather than a "missing call" diagnostic, when seccomp (yet another character in this game of Clue!) blocks the call.

Long story short: we are working around this limitation by creating and using a more permissive policy. This is something that Docker would not allow us to do during the build process.
