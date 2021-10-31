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
