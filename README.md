# E-Com Plus Application Starter

[![CodeFactor](https://www.codefactor.io/repository/github/ecomplus/storefront-starter/badge)](https://www.codefactor.io/repository/github/ecomplus/storefront-starter) ![Deploy](https://github.com/ecomplus/application-starter/workflows/Deploy/badge.svg) [![License MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Boilerplate for E-Com Plus apps with [Firebase](https://firebase.google.com/) Cloud Functions and GitHub Actions.

[CHANGELOG](https://github.com/ecomplus/application-starter/blob/master/CHANGELOG.md)

## Getting started

1. Start creating a [Firebase project](https://console.firebase.google.com/):
    - Analytics is not needed;
    - Set a nice project name (ID) and remember it;

2. Enter the project, go to _databases_ page (on menu) and _create database_:
    - Just bypass with default production mode and rules;

3. Get your Firebase token from CLI:
```bash
npm install -g firebase-tools
firebase login:ci
```

4. [Use this template](https://github.com/ecomplus/application-starter/generate) to generate a new repository for your application;

5. Go to your repository _settings_ tab and set the following _secrets_:
    - `FIREBASE_PROJECT_ID`: The ID (name) of your Firebase project;
    - `FIREBASE_TOKEN`: The token generated with `firebase-tools`;
    - `SERVER_OPERATOR_TOKEN`: Random (at least 16 bytes) admin token generated from CLI or [here](https://randomkeygen.com/);

## Next steps

Almost ready, time to :coffee: and code!

Edit [`functions/ecom.config.js`](functions/ecom.config.js) to set correct `app_id`, `title` and optionally more fields on base app body.

If you're not yet familiarized with this boilerplate, **read the comments and instructions at the configuration file with attention**. You can also setup procedures from there to specify the web-hooks your app should receive.

After checking `ecom.config.js`, you may want to:

- Add custom web app routes by creating new files to [`functions/routes`](functions/routes) folder;

- Add abstractions included on your app source at [`functions/lib`](functions/lib) folder;

## Continuous integration

Every commit will trigger a new **deploy** (with [GitHub Actions](.github/workflows)), then your app will be accessible at:

`https://us-central1-<project-id>.cloudfunctions.net/app/` :blush:

The `functions/assets/app.json` will be updated automatically with some package info and current Cloud Function endpoints, you can use it as body to [_Create new Application_](https://developers.e-com.plus/docs/api/#/store/applications/new-application) on Store API;

> You can skip deploy workflow by adding `[skip ci]` to the commit message.

Also, your app's access tokens to Store API will be **automatically refreshed** every 8 hours by scheduled workflow.

## Developing and testing locally

Setup the project normally by cloning your repository and installing npm dependencies:

```bash
git clone git@github.com:$username/$app_repository.git
cd $app_repository
npm i
cd functions
npm i
```

Then you can call `npm run serve` from project root to test the function locally before deploy.

### Firebase tools

You can also use [`firebase-tools` CLI](https://firebase.google.com/docs/cli) to run tests/deploy with custom config or scripts.
