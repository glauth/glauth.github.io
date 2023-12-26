## What is this?

This is a temporary website so that curious folks have something to look at.

Followed a few "startup marketing" principles.

Still quite bare but I don't think either of us would like to add fluff for no reason.

## Documentation

This website now also offers a documentation area.

While authoring the documentation, one can keep checking their work using:
```
cd spacebook && yarn watch
```
To build a proper preview, including syntax highlighting:
```
cd spacebook && yarn build
```

From the top-level folder, build the documentation as it will be published:
```
yarn doc
```

Of course, to build the whole site, we need to ensure that the stylesheet is up-to-date:
```
yarn dev
yarn prod
```

Note: `yarn <xxx>` is equivalent to `npm run <xxx>`

## OK, so... step by step?

```
cd spacebook
brew install vips # mac only
yarn install
cd ..
npm i run-p
yarn sync
```

```
cd spacebook
yarn build
```

## Database diagram created using dbdiagram.io

See `.txt` files in `content/images/`

## Markdown

```
[[toc]]

```
::: wanrning
blah
:::
```

```
Here is a footnote reference,[^1] and another.[^longnote]

[^1]: Here is the footnote.

[^longnote]: Here's one with multiple blocks.

    Subsequent paragraphs are indented to show that they
belong to the previous footnote.
```

```
<-Centered text->
```

Labels:
```
#[important](red)
```

## Updating

```
git pull
yarn sync # auto refresh
yarn doc # refresh doc pages
yarn prod # and assets
cp docs/docs/index-search.json docs/ # update search content
git push
```
