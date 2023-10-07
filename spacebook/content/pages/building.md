---
title: Building
date: Last Modified 
permalink: building.html
eleventyNavigation:
  key: Building
  parent: Development
  order: 1107
  title: Building
---
## Make Targets

|Target|Description|
|-|-|
|*make all*|run build binaries for platforms|
|*make fast*|run build for only linux 64 bit|
|*make run*|wrapper for the 'go run' command, setting up the needed tooling|
|*make pull-base-plugins*|add base plugins code as submodules for local build|
|*make forget-plugins*|remove all plugins from current tree|
|*make test*|run the integration test on linux64 binary|
|*make releaseplugins*|build app plugins that we pulled locally|
|*make releasedocker*|build main and plugins, push to docker hub|
|*make testdocker*|quick docker sanity check|
