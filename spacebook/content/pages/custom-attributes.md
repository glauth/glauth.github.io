---
title: Custom Attributes
date: Last Modified 
permalink: custom-attributes.html
eleventyNavigation:
  key: Custom Attributes
  order: 405
  title: Custom Attributes
---
GLAuth comes with a set of pre-defined attributes that should be enough to use the directory server in most basic scenarios. It also provides some more elaborate attributes, allowing you to specify an account's home directory or SSH keys.

You may need, for your particular use-case, to provide additional attributes.

::: callout
At this time, these attributes cannot be used as search filters. On the other hand, they are full-fledged attributes that can be retrieved when querying accounts.
:::

## Specifying attributes

### In the config backend

Here is an example:

``` toml
[[users]] # [tl! focus]
  name = "hackers"
  uidnumber = 5001
  primarygroup = 5501
    [[users.customattributes]] # [tl! focus:2]
    employeetype = ["Intern", "Temp"]
    employeenumber = [12345, 54321]
```

### In a database plugin backend

This is the new (as of _2.1.0_) database field `custattr` in the `users` table.

This field contains a valid JSON expression (please do not store an empty string of invalid JSON in this field!) that will be expanded to a set of multi-valued attributes.

For instance:

``` json
{"employeetype":["Intern","Temp"],"employeenumber":[12345,54321]}
```

If an existing account's information needs updating:

``` sql
UPDATE users
  SET custattr='{"employeetype":["Intern","Temp"],"employeenumber":[12345,54321]}'
  WHERE uidnumber=5004;
```

If you are concerned about clobbering existing values while updating a database entry, you can use a JSON editor. You can also use the 'JSON Patch' method as described in [RFC 6902](http://tools.ietf.org/html/rfc6902) -- for instance, using Python:

``` bash
# One-time only
python -m pip install jsonpath

# Add a new value to the employee type attribute
UIDNUMBER=5004; TMP=$(mktemp); \
echo "SELECT custattr FROM users WHERE uidnumber=$UIDNUMBER" | sqlite3 gl.db > $TMP; \
NEWATTR=$(echo '[{"op":"add","path":"/employeetype/-","value":"Manager"}]' | jsonpatch $TMP); \
echo "UPDATE users SET custattr='$NEWATTR' WHERE uidnumber=$UIDNUMBER" | sqlite3 gl.db
```

As per the RFC, the operation being performed is adding a new employee type (`/employeetype/-` means we will append the new value)

## Not-so-custom attributes

For reference, here is a list of specific attributes described in [RFC 2798](https://datatracker.ietf.org/doc/html/rfc2798#page-3) ("`inetOrgPerson`") but not available as default attributes in GLAuth (accounts are of `PosixAccount` type):

- carLicense
- departmentNumber
- displayName
- employeeNumber
- employeeType
- jpegPhoto
- preferredLanguage
- userSMIMECertificate
- userPKCS12

## jpegPhoto is a binary blob

When asking GLAuth to absorb binary data, we handle this in a similar manner to what we would do with a LDIF file: we encode the file's content to base64 and store that.

First, we encode our file's content:

``` bash
cat photo.jpg | base64 | xclip # on MacOS: pbcopy
```

Then, for each custom attribute value that is base-64 encoded, we prefix the entry's content with `base64: ` (there is a trailing space) -- for instance:

``` json
{"employeetype":["Intern"],"jpegphoto":["base64: /9j/4..."]}
```
