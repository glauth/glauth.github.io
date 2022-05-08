---
title: Containerization
date: Last Modified 
permalink: containerization.html
eleventyNavigation:
  key: Containerization
  parent: Setup
  order: 52
  title: Containerization
---
To run GLAuth in a container, you have three choices:
- Fetch and instantiate an image from Docker Hub (the most popular approach)
- Clone the GLAuth repository and manually create your image
- Use Kubernetes's Helm chart

The default approach looks like this:

``` shell
docker run -d glauth/glauth
```

or to run GLAuth with its plugins:

``` shell
docker run -d glauth/glauth-plugins
```

To specify your own config file (which is the most likely scenario):

``` shell
docker run -d \
  -v <path>/config.cfg:/app/config/config.cfg \
  glauth/glauth
```

And to expose port numbers (unless you are using a reverse proxy):

``` shell
docker run -d \
  -p 389:3893 \
  -p 636:3894 \
  -p 5555:5555 \
  glauth/glauth
```

## sqlite

If you are using sqlite, please follow these instructions to avoid losing your data!

You sqlite database must be made permanent. It can either be stored on the host, on in a dedicated volume (more difficult)

::: warning
You database will be clobbered if you do not specify a configuration file. Unless....
:::

### Method #1: configuration file + database file on host

Retrieve a base database file from https://github.com/glauth/glauth/raw/master/v2/scripts/docker/gl.db

``` shell
docker run -d \
  -v <path>/config.cfg:/app/config/config.cfg \
  -v <path>/gl.db:/app/config/gl.db \
  glauth/glauth
```

### Method #2: no configuration file, but database file on host

In this scenario, the container's startup script will copy the database file over its working file.

``` shell
docker run -d \
  -v <path>/gl.db:/app/docker/gl.db \
  glauth/glauth
```

## LDAP certificates

You definitely should not be using the default certificates in production!

First, modify your configuration file to point to where your certificate files will be mounted in your container. `/app/config` is a good option.

Then:

``` shell
docker run -d \
  -v <path>/config.cfg:/app/config/config.cfg \
  -v <path>/cert.pem:/app/config/cert.pem \
  -v <path>/key.pem:/app/config/key.pem \
  glauth/glauth
```
