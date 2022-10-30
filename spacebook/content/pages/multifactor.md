---
title: Multi Factor Auth
date: Last Modified 
permalink: multifactor.html
eleventyNavigation:
  key: MFA
  parent: Security
  order: 315
  title: Multi Factor Auth
---
GLAuth can be configured to accept OTP tokens as appended to a users password. Support is added for both **TOTP tokens** (often known by its most prominent implementation, "Google Authenticator") and **Yubikey OTP tokens**.

When using 2FA, append the 2FA code to the end of the password when authenticating. For example, if your password is "monkey" and your otp is "123456", enter "monkey123456" as your password.

## TOTP Configuration

To enable TOTP authentication on a user, you can use a tool [like this](https://freeotp.github.io/qrcode.html) to generate a QR code (pick 'Timeout' and optionally let it generate a random secret for you), which can be scanned and used with the [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en) app. To enable TOTP authentication, configure the `otpsecret` for the user with the TOTP secret.

## App Passwords

Additionally, you can specify an array of password hashes using the `passappsha256` for app passwords. These are not OTP validated, and are hashed in the same way as a password. This allows you to generate a long random string to be used in software which requires the ability to authenticate.

However, app passwords can be used without OTP as well.
