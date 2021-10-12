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
  -v ./config.cfg:/app/config/config.cfg \
  glauth/glauth
```

And to expose port numbers (unless you are using a reverse proxy):

``` shell
docker run -d \
  -p 389:389 \
  -p 636:636 \
  -p 5555:5555 \
  glauth/glauth
```