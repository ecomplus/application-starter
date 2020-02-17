# application-starter

Boilerplate for E-Com Plus apps with
[Firebase](https://firebase.google.com/) Cloud Functions

[Changelog](https://github.com/ecomplus/application-starter/blob/master/CHANGELOG.md)

## Getting started

> TODO

## Install and configure firebase tools

```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy --only functions
```

## Next steps

- Configure custom
[Store API procedures](https://developers.e-com.plus/docs/api/#/store/procedures/)
to specify the webhooks your app should receive
at [`lib/store-api/procedures.js`](https://github.com/ecomplus/application-starter/blob/master/app/lib/store-api/procedures.js);

- Edit
[`routes/ecom/webhooks.js`](https://github.com/ecomplus/application-starter/blob/master/functions/routes/ecom/webhook.js)
to handle received webhooks from Store API properly;

- Add custom web app routes by creating new files to
[`routes`](https://github.com/ecomplus/application-starter/tree/master/functions/routes)

- You may also create new JS files at
[`lib`](https://github.com/ecomplus/application-starter/tree/master/functions/lib)
folder to add new methods or handlers to be included
on your app source;

- Before deploy the project, you must to create the env variables:

```bash
firebase functions:config:set \
server.operatorToken="CUSTOM_TOKEN_HERE" \
app.title="My Awesome E-Com Plus App"
```
