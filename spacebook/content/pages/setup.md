---
title: Setup
date: Last Modified 
permalink: setup.html
eleventyNavigation:
  key: Setup
  order: 50
  title: Setup
---
You can roll out your own instance(s) of GLAuth using various strategies:
- you can download the binary and a config file and be immediately operational -> see our [Quick Start](/docs/quickstart.html) page
- you can run a docker container; both a standalone version and one with database plugins are available -> [Containerization](/docs/containerization.html)
- running your own orchestration? A Helm chart is available -> [Kubernetes](/docs/kubernetes.html)

Checking release/container labels may get a tad confusing:

GLAuth's release cycle prioritizes the standalone version for production. As a result, this is the most stable version available and will always be built from the _Master_ branch.

Containers, on the other hand, are available with multiple labels reflecting their degree of maturity and are cut from the _Master_ and _Dev_ branches.

Let's borrow the concept of "Channels" from a company who has been borrowing a lot from everyone else :)

|Channel|Git Branch|Quality|Frequency|
|-|-|-|
|Dev|Feature Branches|Rough|Rare|
|Beta|Dev Branch|Reliable|Frequent|
|Preview|Dev Branch|Stable|Infrequent|
|Release|Master Branch|Stable|Rare|