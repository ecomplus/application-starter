# E-Com Plus Application Starter

[![Deploy](https://github.com/ecomplus/application-starter/workflows/Deploy/badge.svg)](https://github.com/ecomplus/application-starter/actions?workflow=Deploy) [![Call refresh tokens](https://github.com/ecomplus/application-starter/workflows/Call%20refresh%20tokens/badge.svg)](https://github.com/ecomplus/application-starter/actions?workflow=Call+refresh+tokens) [![License MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

:dog: Boilerplate for E-Com Plus apps with [Firebase](https://firebase.google.com/) Cloud Functions and GitHub Actions.

[CHANGELOG](https://github.com/ecomplus/application-starter/blob/master/CHANGELOG.md)

## Getting started

1. Start creating a [Firebase project](https://console.firebase.google.com/):
    - Analytics is not needed;
    - Set a nice project name (ID) and remember it;

2. Enter the project, go to _databases_ page (on menu) and _create database_:
    - Just bypass with default production mode and rules;

3. Firebase free plan doesn't support sending external HTTP requests, so you'll need to upgrade to _Blaze_ (on demand) plan;

4. Get your Firebase token from CLI:
```bash
npm install -g firebase-tools
firebase login:ci
```

5. [Use this template](https://github.com/ecomplus/application-starter/generate) to generate a new repository for your application;

6. Go to your repository _settings_ tab and set the following _secrets_:
    - `FIREBASE_PROJECT_ID`: The ID (name) of your Firebase project;
    - `FIREBASE_TOKEN`: The token generated with `firebase-tools`;
    - `SERVER_OPERATOR_TOKEN`: Random (at least 16 bytes) admin token generated from CLI or [here](https://randomkeygen.com/);
    - `MARKET_TOKEN` (optional): Your E-Com Plus Market [personal token](https://market.e-com.plus/partners/account) to publish the app automatically;

## Next steps

Almost ready, time to :coffee: and code!

Edit [`functions/ecom.config.js`](functions/ecom.config.js) to set correct `app_id`, `title` and optionally more fields on base app body.

If you're not yet familiarized with this boilerplate, **read with attention the comments and instructions at the configuration file**. You can also setup procedures from there to specify the web-hooks your app should receive.

### E-Com common routes

All endpoints inside [`/ecom/`](functions/routes/ecom) path **MUST BE PRIVATE** (trey are by default), accessible only for E-Com Plus official servers or with `X-Operator-Token` header (equal to `SERVER_OPERATOR_TOKEN` env).

Requests to E-Com routes must have `X-Store-ID` header or `store_id` parameter on URL query string.

#### [`auth-callback`](functions/routes/ecom/auth-callback.js)

Handle [authentication callback request](https://developers.e-com.plus/docs/api/#/store/authenticate-app/authenticate-app) and save tokens to database, also create Store API procedures if configured.

> You can edit it to send custom requests to external server notifying new store installation or setup.

#### [`get-auth`](functions/routes/ecom/get-auth.js)

Returns Store API authentication data based on received Store ID, for external usage.

Sample response:

```json
{
  "application_id": "a00000000000000000000012",
  "application_app_id": 9000,
  "store_id": 1011,
  "authentication_id": "120000000000000000000012",
  "access_token": "eyJhbGciOi.eyYzdWIi.ZEONFh7HgQ"
}
```

> You should consume it if you want to use this boilerplate as an _authentication backend_ only. By getting this data (HTTP GET) you'll be able to run authenticated requests to [Store API](https://developers.e-com.plus/docs/api/#/store/) from your own server, with your preferred language, framework...

#### [`refresh-tokens`](functions/routes/ecom/refresh-tokens.js)

Call update service to start refreshing old access tokens.

#### [`webhook`](functions/routes/ecom/webhook.js)

Receives E-Com Plus notification POSTs for configured procedures.

> You may want to edit it to properly treat trigger body and do your custom stuff for each notification type.

#### [`modules/*`](functions/routes/ecom/modules)

Endpoints for [E-Com Plus Mods API](https://developers.e-com.plus/modules-api/).

> You should edit the respective ones for enabled modules (on `ecom.config.js`).

### Additional Store API handlers

If the app works with `admin_settings` (configuration), use [`getAppData`](functions/lib/store-api/get-app-data.js) to get the application `data`/`hidden_data` configured by merchant from dashboard through Store API ([Application Object](https://developers.e-com.plus/docs/api/#/store/applications/)).

We recommend treating Store API clients (40x) and server (50x) errors with [`errorHandling`](functions/lib/store-api/error-handling.js) abstraction.

### Application SDK

You may want to use [`appSdk`](https://github.com/ecomplus/application-sdk) to make custom authenticated requests to [Store API](https://developers.e-com.plus/docs/api/#/store/) or deeper coding out of our examples.

### Custom integration scripts

- Add third party libraries to [`functions/package.json`](functions/package.json) dependencies;
- Add custom web app routes by creating new files to [`functions/routes`](functions/routes) folder;
- Add new methods/handlers at [`functions/lib`](functions/lib) folder;

### Optional setup for [Market](https://market.e-com.plus/)

You may want to make your app public and available to install within E-Com Plus dashboard, to do this:

- Edit [`ecomplus-market.json`](ecomplus-market.json) to set a short description and category between _shipping_, _sales_, _tools_, _customer-service_, _marketing_, _inventory_ or _product-sourcing_;
- Overwrite the default PNG icon at [`functions/public/icon.png`](functions/public/icon.png);
- Write a good markdown description for the app at [`functions/public/description.md`](functions/public/description.md);
- Take note about [publication](#publication);

> If you are not yet a registered partner, start by filling out [this form](https://docs.google.com/forms/d/e/1FAIpQLSfd8uUsMG6N_rSFi2blGuk3Rfqi_BPp6fxschkmkdhEBVDsyw/viewform) and wait a little for our response :handshake:

## Examples

:sunglasses: [Awesome E-Com Plus applications](https://github.com/ecomplus/awesome#applications) to get inspired!

## Continuous integration

Every commit will trigger a new **deploy** (with [GitHub Actions](.github/workflows)), then your app will be accessible at:

`https://us-central1-<project-id>.cloudfunctions.net/app/` :blush:

The `assets/application.json` will be updated automatically with some package info and current Cloud Function endpoints, you can use it as body to [_Create new Application_](https://developers.e-com.plus/docs/api/#/store/applications/new-application) on Store API.

> You can skip deploy workflow by adding `[skip ci]` to the commit message.

Also, your app's access tokens to Store API will be **automatically refreshed** every 8 hours by scheduled workflow.

### Publication

If `MARKET_TOKEN` secret is set, the app will be **automatically published to [Market](https://market.e-com.plus/)** every time `assets/application.json` is changed, then merchants will be able to install it with up to date version.

## Developing and testing locally

Setup the project normally by cloning your repository and installing npm dependencies:

```bash
git clone git@github.com:$username/$app_repository.git
cd $app_repository
npm i
cd functions
npm i
```

Then you can call `npm run deploy` locally getting configuration from `.env` file on project root. You can also set a different `FIREBASE_PROJECT_ID` locally for test purpose only.

When you're done, you can publish the app by running `npm run publish:market`.

### Firebase tools

You can also use [`firebase-tools` CLI](https://firebase.google.com/docs/cli) to run tests/deploy with custom config or scripts.
