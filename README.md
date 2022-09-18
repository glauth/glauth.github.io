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

```
// Note: only mysql limited by varchar


Table users as U {
  id int [pk, increment]
  name varchar(64)
  uidnumber int
  primarygroup int [ref: > G.id]
  othergroups varchar(1024) [default:'', ref: <> G.id]
  givenname varchar(64) [default:'']
  sn varchar(64) [default:'']
  mail varchar(254) [default:'']
  loginshell varchar(64) [default:'']
  homedirectory varchar(64) [default:'']
  disabled int2 [default:0]
  passsha256 varchar(64) [default:'']
  passbcrypt varchar(64) [default:'']
  otpsecret varchar(64) [default:'']
  yubikey varchar(128) [default:'']
  sshkeys text [default:'']
  custattr text [default:'{}']
  Indexes {
    (name) [name:'idx_user_name']
  }
}

Table groups as G {
  id int [pk, increment]
  name varchar(64) [not null]
  gidnumber int [not null]
  Indexes {
    (name) [name:'idx_group_name']
  }
}

Table includegroups {
  id int [pk, increment]
  parentgroupid int [not null, ref: > G.id]
  includegroupid int [not null, ref: > G.id]
}

Table capabilities {
  id int [pk, increment]
  userid int [not null, ref: > U.id]
  action varchar(128) [not null]
  object varchar(128) [not null]
}
```
