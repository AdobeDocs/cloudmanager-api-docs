---
title: Tutorial Step 4 - Cloud Manager API
description: This is step 4 of the Cloud Manager API Tutorial
keywords:
  - Experience Cloud
  - Adobe Experience Manager
  - API Documentation
  - Cloud Manager
  - Tutorial
  - JavaScript
---

import Glitch from "../../components/glitch"

# Tutorial Step 4 - Obtaining an Access Token

The JSON object sent to the webhook is very minimal -- it largely consists of event metadata (e.g. the timestamp of the event) and a URL to either the pipeline execution. In general, the webhook implementation will need to call the Cloud Manager API to get additional information. In the case of this tutorial, the webhook is actually going to make two API calls for more information. That, however, is for the next step...

In this step, we're going to lay the groundwork for making those API calls by obtaining an _access token_ which will be passed to the API for the purpose of authentication. Adobe I/O uses JSON Web Tokens (JWT) to obtain access tokens. The webhook will create a signed JWT and then _exchange_ that with Adobe's identity management system for an access token.

## Setting up the Environment Variables

The JWT token is created, signed and exchanged using the `API_KEY`, `CLIENT_SECRET`, `ORGANIZATION`, `TECHNICAL_ACCOUNT_ID` and `PRIVATE_KEY` variables, so the first step is to make sure the `.env` file has all of these variable populated. You should have done this in Step 0, but if not (or if you are using Glitch), you will need to do this now.

## Adding Dependencies

We're going to use two new third-party dependencies for the exchange process. First, <a href="http://kjur.github.io/jsrsasign/" target="_new">jsrsasign</a> is used to sign the JWT. Then, <a href="https://github.com/bitinn/node-fetch" target="_new">node-fetch</a> is used to make the exchange HTTP request. If you are editing the script locally, you'll need to install these two packages:

```bash
npm install jsrsasign node-fetch
```

If you are running the webhook in Glitch, you'll need to edit the `package.json` file manually and add these two packages to the `dependencies` object. Take a look at the Remix link below if you need help doing this.

The header of the script also needs to be updated to include these new dependencies, along with the `URLSearchParams` class:

```javascript
const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const jsrsasign = require("jsrsasign");
const fetch = require("node-fetch");

const { URLSearchParams } = require("url");
```

## Writing the `getAccessToken` Function

As the code to obtain an access token is fairly complicated, it makes sense to organize it into a separate function. The function has three parts. First, it generates the JWT payload, then the signed token is created, and then the exchange is done. Finally, the function returns the access token.

```javascript
async function getAccessToken() {
  const EXPIRATION = 60 * 60; // 1 hour

  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const payload = {
    exp: Math.round(new Date().getTime() / 1000) + EXPIRATION,
    iss: process.env.ORGANIZATION_ID,
    sub: process.env.TECHNICAL_ACCOUNT_ID,
    aud: `https://ims-na1.adobelogin.com/c/${process.env.API_KEY}`,
    "https://ims-na1.adobelogin.com/s/ent_cloudmgr_sdk": true,
  };

  const jwtToken = jsrsasign.jws.JWS.sign(
    "RS256",
    JSON.stringify(header),
    JSON.stringify(payload),
    process.env.PRIVATE_KEY
  );

  const response = await fetch(
    "https://ims-na1.adobelogin.com/ims/exchange/jwt",
    {
      method: "POST",
      body: new URLSearchParams({
        client_id: process.env.API_KEY,
        client_secret: process.env.CLIENT_SECRET,
        jwt_token: jwtToken,
      }),
    }
  );

  const json = await response.json();

  return json["access_token"];
}
```

## Getting the Access Token in the Webhook Route

The access token is an asynchronous function so it returns a `Promise`. So logging of the access token (which is all we're doing in this step) has to be done in a closure invoked when the Promise is resolved:

```javascript
if (
  STARTED === event["@type"] &&
  EXECUTION === event["xdmEventEnvelope:objectType"]
) {
  console.log("received execution start event");
  getAccessToken().then((accessToken) => {
    console.log(accessToken);
  });
}
```

## Running the Updated Webhook

If you are running the script locally, you'll need to stop and restart the node process. You don't need to restart ngrok. In fact, if you do restart ngrok, the URL will likely change and you'll need to go back into the <a href="https://console.adobe.io/integrations" target="_new">Adobe I/O Console</a> and update the Webhook URL.

If you are running the script through Glitch, Glitch will restart automatically. If you don't want to update your existing Glitch project (or lost it), you can click the button below to start over.

<Glitch projectName="adobe-cloudmanager-api-tutorial-step4" />

## Next Step

With all that done, you're ready to proceed to the next step. Continue to [Step 5](5-getting-the-execution.md).
