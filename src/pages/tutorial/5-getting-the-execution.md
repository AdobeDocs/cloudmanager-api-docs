---
title: Tutorial Step 5 - Cloud Manager API
description: This is step 5 of the Cloud Manager API Tutorial
keywords:
  - Experience Cloud
  - Adobe Experience Manager
  - API Documentation
  - Cloud Manager
  - Tutorial
  - JavaScript
---

import Glitch from "../../components/glitch"

# Tutorial Step 5 - Getting Execution Data

Now that we have an access token, we can use it to make API calls into Cloud Manager to get more information about the execution (and in the next step the program).

## Adding Dependencies

For the API calls, we'll use the <a href="https://github.com/node-fetch/node-fetch" target="_new">node-fetch</a> library. If you are editing the script locally, you'll need to install this package:

```bash
npm install node-fetch
```

If you are running the webhook in Glitch, you'll need to edit the `package.json` file manually and add these this package to the `dependencies` object. Take a look at the Remix link below if you need help doing this.

The header of the script also needs to be updated to include this dependency.

```javascript
const fetch = require('node-fetch')
```

## Writing a Generic `makeApiCall` function

Making an API call to Cloud Manager requires several headers to be passed. Since we are ultimately going to be making two separate API calls (one for the execution and one for the program), it makes sense to centralize this logic into a new function.

The function itself is pretty simple -- it accepts the access token, a URL, and an HTTP method and then makes a request to that URL with the supplied method setting the three required headers:

- `x-gw-ims-org-id` - the Organization ID (contained in the `ORGANIZATION_ID` variable)
- `x-api-key` - the Client ID (contained in the `CLIENT_ID` variable)
- `Authorization` - contains the access token

The function then returns the response body as a JavaScript object.

```javascript
async function makeApiCall (accessToken, url, method) {
  const response = await fetch(url, {
    'method': method,
    'headers': {
      'x-gw-ims-org-id': process.env.ORGANIZATION_ID,
      'x-api-key': process.env.CLIENT_ID,
      'Authorization': `Bearer ${accessToken}`
    }
  })

  return response.json()
}
```

## Writing a Specific `getExecution` Function

With the generic function in place, the function to get an execution is pretty simple. It just needs to call the `getAccessToken` function (created in the last step) and then makes a GET request to the execution URL.

```javascript
async function getExecution (executionUrl) {
  const accessToken = await getAccessToken()

  return makeApiCall(accessToken, executionUrl, 'GET')
}
```

## Getting the Execution in the Webhook

Finally, we can call the `getExecution` function with the URL contained in the event payload. There's a variety of information in the execution response (take a look at the [API Reference](/reference/api/) for all the details), but for now let's just log the execution id.

```javascript
if (STARTED === event['@type'] &&
      EXECUTION === event['xdmEventEnvelope:objectType']) {
  console.log('received execution start event')

  const executionUrl = event['activitystreams:object']['@id']

  getExecution(executionUrl).then(execution => {
    console.log(`Execution ${execution.id} started`)
  })
}
```

## Running the Updated Webhook

If you are running the script locally, you'll need to stop and restart the node process. You don't need to restart ngrok. In fact, if you do restart ngrok, the URL will likely change and you'll need to go back into the <a href="https://developer.adobe.com/console/projects" target="_new">Adobe Developer Console</a> and update the Webhook URL.

If you are running the script through Glitch, Glitch will restart automatically. If you don't want to update your existing Glitch project (or lost it), you can click the button below to start over.

<Glitch projectName="adobe-cloudmanager-api-tutorial-step5" />

## Next Step

With all that done, you're ready to proceed to the next step. Continue to [Step 6](6-getting-the-program.md).
