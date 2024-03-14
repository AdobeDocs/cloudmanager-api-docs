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

In this step, we're going to lay the groundwork for making those API calls by obtaining an _access token_ which will be passed to the API for the purpose of authentication. Adobe I/O uses OAuth Server-to-Server credential to obtain access tokens.

<InlineAlert slots="text" variant="warning"/>

Note that obtaining access token using JSON Web Tokens (JWT) is deprecated. [Learn More](https://developer.adobe.com/developer-console/docs/guides/authentication/JWT/).

## Setting up the Environment Variables

The access token is created using the `CLIENT_ID`, `CLIENT_SECRET`, `GRANT_TYPE` and `SCOPES` variables, so the first step is to make sure the `.env` file has all of these variable populated. You should have done this in Step 0, but if not (or if you are using Glitch), you will need to do this now.

## Writing the `getAccessToken` Function

For clarity, it makes sense to organize obtaining the access token into a separate function. The function makes an API call to an IMS endpoint for fetching the token.

```javascript
async function getAccessToken () {
  const form = new FormData();
  form.append('client_id', process.env.CLIENT_ID);
  form.append('client_secret', process.env.CLIENT_SECRET);
  form.append('grant_type', process.env.GRANT_TYPE);
  form.append('scope', process.env.SCOPES);

  const response = await fetch('https://ims-na1.adobelogin.com/ims/token/v3', {
    'method': 'POST',
    'headers': { 'Content-Type': 'application/x-www-form-urlencoded' },
    'body': form
  })
  if (!response.ok) {
    throw new Error('Failed to get access token');
  }
  const responseData = await response.json();
  return responseData.access_token;
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
