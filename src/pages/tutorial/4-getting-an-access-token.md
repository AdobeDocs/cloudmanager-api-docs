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

The JWT token is created, signed and exchanged using the `CLIENT_ID`, `CLIENT_SECRET`, `ORGANIZATION`, and `TECHNICAL_ACCOUNT_ID` variables along with the `private.key` file in the `.data` directory, so the first step is to make sure the `.env` file has all of these variable populated and the `private.key` file is in place. You should have done this in Step 0, but if not (or if you are using Glitch), you will need to do this now.

## Adding Dependencies

For the exchange process, we'll use Adobe's <a href="https://github.com/adobe/jwt-auth" target="_new">jwt-auth</a> library. If you are editing the script locally, you'll need to install this package:

```bash
npm install @adobe/jwt-auth
```

If you are running the webhook in Glitch, you'll need to edit the `package.json` file manually and add these this package to the `dependencies` object. Take a look at the Remix link below if you need help doing this.

The header of the script also needs to be updated to include this dependency, along with the built-in `fs` library which will be used to load the private key.

```javascript
const auth = require('@adobe/jwt-auth')
const fs = require('fs')
```

## Writing the `getAccessToken` Function

For clarity, it makes sense to organize obtaining the access token into a separate function. The function has assembles the configuration object needed by `jwt-auth` and then does the token exchange.

```javascript
async function getAccessToken () {
  const config = {
    clientId: process.env.CLIENT_ID,
    technicalAccountId: process.env.TECHNICAL_ACCOUNT_ID,
    orgId: process.env.ORGANIZATION_ID,
    clientSecret: process.env.CLIENT_SECRET,
    metaScopes: [ 'ent_cloudmgr_sdk' ]
  }
  config.privateKey = fs.readFileSync('.data/private.key')

  const { access_token } = await auth(config)
  return access_token  
}
```

## Getting the Access Token in the Webhook Route

The access token is an asynchronous function so it returns a `Promise`. So logging of the access token (which is all we're doing in this step) has to be done in a closure invoked when the Promise is resolved:

```javascript
if (STARTED === event['@type'] &&
      EXECUTION === event['xdmEventEnvelope:objectType']) {
  console.log('received execution start event')
  getAccessToken().then(accessToken => {
    console.log(accessToken)
  })
}
```

## Running the Updated Webhook

If you are running the script locally, you'll need to stop and restart the node process. You don't need to restart ngrok. In fact, if you do restart ngrok, the URL will likely change and you'll need to go back into the <a href="https://developer.adobe.com/console/projects" target="_new">Adobe Developer Console</a> and update the Webhook URL.

If you are running the script through Glitch, Glitch will restart automatically. If you don't want to update your existing Glitch project (or lost it), you can click the button below to start over.

<Glitch projectName="adobe-cloudmanager-api-tutorial-step4" />

## Next Step

With all that done, you're ready to proceed to the next step. Continue to [Step 5](5-getting-the-execution.md).
