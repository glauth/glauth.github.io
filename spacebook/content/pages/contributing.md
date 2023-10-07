---
title: Contributing
date: Last Modified
permalink: contributing.html
eleventyNavigation:
  key: Contributing
  parent: Development
  order: 1109
  title: Contributing
---
Starting with GLAuth 2.4.0, we have reworked and optimized the build workflow, and this starts with a new contribution process.

[[toc]]

# Preparing to Commit

Format your code automatically using `gofmt -d ./` before committing. If you forget this step, a subsequent pull request may fail.

# Writing Commit Messages

Commit messages must be semantically correct; this is all conventions, of course, and the one that  has worked well for us is [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

Here's the minimum information you need to know:

A commit message contains a prefix, followed by a short explanation. It may also contain "footer" annotations, but these are not mandatory (albeit appreciated)

Should you bundle multiple items in the same commit (say a new feature and a bug fix), you can... wait no please **don't do that.**

## Commit Prefix

A prefix is written imperatively and looks like this:
```
feat(plugins)!: Change the plugins API to allow NoSQL databases.
```
A quick decoding of this message reveals that this is a new feature (`feat`) and we **optionally** specify which area of GLAuth is impacted (`(plugins)`) - We also warn the reader of a breaking change (`!`)

A more innocuous change could be:
```
chore: Add more comments in all modules.
```

Here is a pretty self-explanatory list of prefixes: `feat`, `fix`, `chore`, `build`, `ci`, `perf`, `refactor`, `test`, `style`

## Commit Footer Annotations

For instance:
```
Reviewed-by: John Romero <john@romero.com>
Tested-by: Joel Spolsky <joel@joelonsoftware.com>
BREAKING-CHANGE: I am yelling because I broke the plugin API compatibility!
```

_None of the people mentioned above were harmed in the writing of this example_

Here is a far-from-exhaustive list of footer annotations:

`Signed-Off-by`, `Acked-by`, `Reviewed-by`, `Helped-by`, `Co-authored by`, `Reported-by`, `Tested-by`, `Cc`, `Reference-to`, `See-also`, `BREAKING-CHANGE`

# Pull Requests

## Creating a Pull Request

Create your Pull Requests from your branch directly to the **'Master'** branch. We discontinued use of the 'Dev' branch as we wish to enforce pulling from tagged versions, as opposed to making the merge flow more difficult to follow by jumping through intermediate branches.

## Merging a Pull Request

If you have the privileges to merge a pull request, please start by ensuring that it follows the proper conventions.

::: callout-blue
Note that pull requests that represent branch merges and other maintenance operations should not, in fact, follow these conventions. This allows us to exclude them from a release's notes.
:::

# Releasing

## Versioning

We follow the [Semantic Version v2.0 conventions](https://semver.org/)

Therefore, all releases follow this numbering scheme: **v&lt;major&gt;.&lt;minor&gt;.&lt;patch&gt;**, e.g. 'v1.1.0'

- The patch number increments as we add bug fixed or minor tweaks
- The minor number increments as we make significant changes, such as code refactoring
- An increment of the major number denotes a breaking change!

::: callout
You may submit an important feature that we all want to incorporate in GLAuth quickly. However, we cannot surprise our users by breaking their production setups. Therefore, we have to strike a balance between our desire to release the feature, and the need to wait for a major release to do so.
:::

## Creating a Release

We now rely on [release-please](https://github.com/google-github-actions/release-please-action) to automate the creation of release notes based on semantically correct commits (see above)

Any commit message following the proper conventions will be included in the release notes, while "housekeeping" commits will not be.

To create a new release, in this example 2.0.0:

```
git commit --allow-empty -m "chore: release 2.0.0" -m "Release-As: 2.0.0"
```

The 'release-please' action will create a Pull Request tracking all commits since the last release tag.
