---
title: Yubikey
date: Last Modified 
permalink: yubikey.html
eleventyNavigation:
  key: Yubikey
  parent: Security
  order: 320
  title: Yubikey
---
## Configuration

For Yubikey OTP token authentication, first [configure your Yubikey](https://www.yubico.com/products/services-software/personalization-tools/yubikey-otp/). After this, make sure to [request a `Client ID` and `Secret key` pair](https://upgrade.yubico.com/getapikey/).

Now configure the `yubikeyclientid` and `yubikeysecret` fields in the general section in the configuration file.

To enable Yubikey OTP authentication for a user, you must specify their Yubikey ID on the users `yubikey` field. The Yubikey ID is the first 12 characters of the Yubikey OTP, as explained in the below chart.

![Yubikey OTP](https://developers.yubico.com/OTP/otp_details.png)

When a user has been configured with either one of the OTP options, the OTP authentication is required for the user. If both are configured, either one will work.

## Example Configuration

Global setting:

``` toml
yubikeyclientid = "yubi-api-clientid"
yubikeysecret = "yubi-api-secret"
```

User setting:

``` toml
[[users]] # [tl! focus:1]
  name = "otpuser"
  uidnumber = 5004
  primarygroup = 5501
  passsha256 = "652c7dc687d98c9889304ed2e408c74b611e86a40caa51c4b43f1dd5913c5cd0" # mysecret
  otpsecret = "3hnvnk4ycv44glzigd6s25j4dougs3rk"
  yubikey = "vvjrcfalhlaa" # [tl! focus:3]
    [[users.capabilities]]
    action = "search"
    object = "ou=superheros,dc=glauth,dc=com"
```