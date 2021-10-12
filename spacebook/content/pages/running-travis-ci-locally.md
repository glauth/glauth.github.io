---
title: Running Travis-CI Locally
date: Last Modified 
permalink: running-travis-ci-locally.html
eleventyNavigation:
  key: Travis-CI
  parent: Development
  order: 1130
  title: Running Travis-CI Locally
---
::: warning
Circle CI is now a paid only product, even for open source projects.
We have moved our continuous integration to GitHub actions (see .github folder)
:::

The following steps can be followed to run Travis CI on your development machine, as long as you have Docker installed.

This is obviously not an "officially supported" flow, but it works.

## Quick history

I found the information that got me started with this on Stackoverflow. I tried to contribute back by adding a couple observations I made, due to the fact that the Travis CI flows have been subtly changing over time!

## The Workflow

### Creating a local container

As mentioned, I got the idea from Stackoverflow. I modified some aspects of the flow to use a local, uncommitted branch.

This will download and run the container image:

``` shell
DTAG=$(curl -s 'https://hub.docker.com/v2/repositories/travisci/ci-sardonyx/tags/?page_size=1&page=1&ordering=last_updated' |  jq -r '.results[].name')
INSTANCE="travisci/ci-sardonyx:$DTAG"
docker run --name glauth-travis-work -v "$(pwd)":/home/travis/builds/glauth/ -dit $INSTANCE /sbin/init
docker exec -it glauth-travis-work bash -l
```

Using the last command, I entered the container to prepare it.

### CI preparation

In the container:

``` shell
su - travis                                                                                                             
rvm autolibs enable \
&& rvm install 2.3.0 \
&& rvm use 2.3.0 --default \
&& cd $HOME/builds \
&& git clone https://github.com/travis-ci/travis-build.git \
&& cd travis-build/ \
&& mkdir -p /home/travis/.travis \
&& ln -s `pwd` ~/.travis/travis-build \
&& gem update --system \
&& gem install bundler \
&& bundle update --bundler \
&& bundle install \
&& bundler binstubs travis \
&& cd $HOME/builds/glauth \
&& ~/.travis/travis-build/bin/travis compile \
|   awk '!/^travis_cmd travis_wait_for_network/' \
|   awk '/^travis_fold start docker_mtu_and_registry_mirrors/,/travis_time_start/ {next} 1' \
|   awk '{sub(/^travis_run_checkout/, "travis_run_local_clone"); print}' > ~/ci.sh
```

The last command spit out Travis' execution script with some unwanted stuff removed.
 We are now going to modify it to fit our purpose by adding:

``` shell
export TRAVIS_HOME=$HOME
cat <<'EOFUNC_LOCAL_CLONE' >>${TRAVIS_HOME}/.travis/job_stages
function travis_run_local_clone() {
travis_time_start
echo

travis_fold start local.clone
  travis_cmd rm\ -f\ "$HOME/gopath/src/github.com/glauth/glauth/bin/*"
  if [[ -d "${TRAVIS_BUILD_DIR}/glauth" ]]; then
    travis_cmd rm\ -rf\ "${TRAVIS_BUILD_DIR}/glauth"
  fi
  travis_cmd mkdir\ -p\ "${TRAVIS_BUILD_DIR}/glauth"
  travis_cmd cp\ -r\ "${TRAVIS_HOME}/builds/glauth"\ "${TRAVIS_BUILD_DIR}/glauth/"
travis_fold end local.clone

echo

travis_time_finish local_clone
:
}

EOFUNC_LOCAL_CLONE
```

Exit the container, stop it, commit it and finally delete it:

``` shell
docker stop glauth-travis-work
docker commit glauth-travis-work glauth-travis
```

### Using our work image

``` shell
BUILDID="build-$RANDOM"
docker run --rm --name $BUILDID -v "$(pwd)":/home/travis/builds/glauth/ glauth-travis su - travis -c "cd ~/builds/glauth;bash ~/ci.sh"
```

### Dirty speed-up

Note that, if you wish to bypass the whole container setup phase to run CI multiple times during a work session, you can run it interactively and abuse it until you are satisfied:

``` shell
BUILDID="build-$RANDOM"
docker run --rm --name $BUILDID -v "$(pwd)":/home/travis/builds/glauth/ -dit glauth-travis /sbin/init
docker exec -it $BUILDID bash -l
su - travis
bash ~/ci.sh
# ...
bash ~/ci.sh
# etc.
exit
exit
docker stop $BUILDID
```