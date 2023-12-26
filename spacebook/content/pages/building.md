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
|*make prepare-plugins-release*|pull plugins dependencies for local build|
|*make forget-plugins*|deprecated!|
|*make test*|run the integration test on linux64 binary|
|*make releaseplugins*|build app plugins that we pulled locally|
|*make releasedocker*|build main and plugins, push to docker hub|
|*make testdocker*|quick docker sanity check|

## Building plugins

To build a plugin, pull GLauth's codebase, and make sure that the plugin is a submodule of the main repository.

Run `make prepare-plugins-release` to update the top-level dependencies with the plugins'

Then, run `make releaseplugins`

To avoid building all plugins, for every plugin you do not wish to build:

```bash
touch pkg/plugins/glauth-<plugin name>/.ignore
```

To build only for some platforms, for instance here `linux/amd64`:

```bash
PLUGIN_TARGETS=linux/amd64 make releaseplugins
```

The same applies when building the main package, using `MAIN_TARGETS`


