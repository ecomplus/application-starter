# express-app-boilerplate

Boilerplate for E-Com Plus apps with Node.js and Firebase

[Changelog](https://github.com/ecomclub/firebase-app-boilerplate/blob/master/CHANGELOG.md)

## Getting started

Setup the source of your new E-Com Plus app with this boilerplate
by running the following commands (bash):

```bash
mkdir my-app
cd my-app
git clone https://github.com/ecomclub/firebase-app-boilerplate.git
cp -r firebase-app-boilerplate/functions/* ./
rm -rf firebase-app-boilerplate
```

You should replace `my-app` with the name of your
application (on kebab-case).

## Next steps

- Configure custom
[Store API procedures](https://developers.e-com.plus/docs/api/#/store/procedures/)
to specify the webhooks your app should receive
at [`lib/store-api/procedures.js`](https://github.com/ecomclub/firebase-app-boilerplate/blob/master/app/lib/store-api/procedures.js);

- Edit
[`routes/ecom/webhooks.js`](https://github.com/ecomclub/firebase-app-boilerplate/blob/master/functions/routes/ecom/webhook.js)
to handle received webhooks from Store API properly;

- Add custom web app routes by creating new files to
[`routes`](https://github.com/ecomclub/firebase-app-boilerplate/tree/master/functions/routes)

- You may also create new JS files at
[`lib`](https://github.com/ecomclub/firebase-app-boilerplate/tree/master/functions/lib)
folder to add new methods or handlers to be included
on your app source;

- Before deploy the project, you must to create the env variables:

```bash
firebase functions:config:set app.base_uri="https://us-central1-<project-id>.cloudfunctions.net" app.name="My E-Com Plus App"
```
