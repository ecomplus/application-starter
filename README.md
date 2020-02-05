# express-app-boilerplate

Boilerplate for E-Com Plus apps with Node.js and Express web framework

[Changelog](https://github.com/ecomclub/express-app-boilerplate/blob/master/CHANGELOG.md)

## Getting started

Setup the source of your new E-Com Plus app with this boilerplate
by running the following commands (bash):

```bash
mkdir my-app
cd my-app
git clone https://github.com/ecomclub/express-app-boilerplate.git
cp -r express-app-boilerplate/app/* ./
rm -rf express-app-boilerplate
```

You should replace `my-app` with the name of your
application (on kebab-case).

## Next steps

- Configure custom
[Store API procedures](https://developers.e-com.plus/docs/api/#/store/procedures/)
to specify the webhooks your app should receive
at [`lib/store-api/procedures.js`](https://github.com/ecomclub/express-app-boilerplate/blob/master/app/lib/store-api/procedures.js);

- If your app has custom daemon processes,
you may run them from
[`bin/local.js`](https://github.com/ecomclub/express-app-boilerplate/blob/master/app/bin/local.js);

- Edit
[`routes/ecom/webhooks.js`](https://github.com/ecomclub/express-app-boilerplate/blob/master/app/routes/ecom/webhook.js)
to handle received webhooks from Store API properly;

- Add custom web app routes by creating new files to
[`routes`](https://github.com/ecomclub/express-app-boilerplate/tree/master/app/routes)
folder and adding them to Express router at
[`bin/web.js`](https://github.com/ecomclub/express-app-boilerplate/blob/master/app/bin/web.js);

- You may also create new JS files at
[`lib`](https://github.com/ecomclub/express-app-boilerplate/tree/master/app/lib)
folder to add new methods or handlers to be included
on your app source;
