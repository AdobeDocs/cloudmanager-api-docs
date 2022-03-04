---
title: Tutorial Step 6 - Cloud Manager API
description: This is step 6 of the Cloud Manager API Tutorial
keywords:
  - Experience Cloud
  - Adobe Experience Manager
  - API Documentation
  - Cloud Manager
  - Tutorial
  - JavaScript
---

import Glitch from "../../components/glitch"

# Tutorial Step 6 - Navigating Between API Calls

While the execution information is interesting, what we actually want to send in the notification sent to Microsoft Teams or Slack is the program name. This isn't in the execution response but has to be requested from a different URL, one following the pattern `/api/program/{programId}`.

While it is possible for you to formulate the URL, it is a best practice to follow the links provided in the API response. The Cloud Manager API responses use a convention named <a href="https://en.wikipedia.org/wiki/Hypertext_Application_Language" target="_new">Hypertext Application Language</a> (HAL for short) to define links. But you don't really need to know too many details of HAL to use the API. The important part is that in the API response, there is a `_links` object which contains a set of objects. Each of these objects has a meaningful name that tells the API consumer where the link goes and the `href` property of the object has the destination.

For example, in an execution response, you will see this:

```json
"_links": {
    "http://ns.adobe.com/adobecloud/rel/pipeline": {
        "href": "/api/program/1234/pipeline/5678",
        "templated": false
    },
    "http://ns.adobe.com/adobecloud/rel/program": {
        "href": "/api/program/1234",
        "templated": false
    },
    "self": {
        "href": "/api/program/1234/pipeline/5678/execution/9012",
        "templated": false
    }
}
```

> The Cloud Manager API uses templatized links in a few places; in these cases `templated` will be `true`, but that's not the case for the program links we need to follow for this tutorial.

Note that these links are _relative_ to the domain name for the API. As with the path, while you could prepend `cloudmanager.adobe.io` yourself, it is a best practice to have the links be treated as relative links.

## Writing a Generic `getLink` Function

This might be overkill for this tutorial, since we only need a single link, but getting a link from an API response is a common enough task that it makes sense to make a separate function for this. It's fairly straightforward object navigation:

```javascript
function getLink (obj, linkType) {
  return obj['_links'][linkType].href
}
```

## Updating the `getExecution` Method

To get the program data based on the execution, first you get the link to the program from the execution response. Remember -- at this point it will be a server-relative path. Then, you use the Node.js `URL` class to turn that path into an absolute URL and pass this URL to the `makeApiCall` function to get the program. Finally, the program response is added to the execution response.

Although the `URL` class is built-in to Node.js, it does need to be imported from the `url` module:

```javascript
const { URL } = require('url')
```

The updated `getExecution` function looks like this:

```javascript
async function getExecution (executionUrl) {
  const accessToken = await getAccessToken()

  const execution = await makeApiCall(accessToken, executionUrl, 'GET')

  const REL_PROGRAM = 'http://ns.adobe.com/adobecloud/rel/program'
  const programLink = getLink(execution, REL_PROGRAM)
  const programUrl = new URL(programLink, executionUrl)
  const program = await makeApiCall(accessToken, programUrl)

  execution.program = program

  return execution
}
```

## Logging the Program Name in the Webhook

Now that `getExecution` returns the Program information as part of the `execution` object, we can easily change the log message to output the program name instead of the execution id.

```javascript
if (STARTED === event['@type'] &&
       EXECUTION === event['xdmEventEnvelope:objectType']) {
  console.log('received execution start event')

  const executionUrl = event['activitystreams:object']['@id']

  getExecution(executionUrl).then(execution => {
    console.log(`Execution for ${execution.program.name} started`)
  })
}
```

## Running the Updated Webhook

If you are running the script locally, you'll need to stop and restart the node process. You don't need to restart ngrok. In fact, if you do restart ngrok, the URL will likely change and you'll need to go back into the <a href="https://developer.adobe.com/console/projects" target="_new">Adobe Developer Console</a> and update the Webhook URL.

If you are running the script through Glitch, Glitch will restart automatically. If you don't want to update your existing Glitch project (or lost it), you can click the button below to start over.

<Glitch projectName="adobe-cloudmanager-api-tutorial-step6" />

## Next Step

With all that done, you're ready to proceed to the next and final step. Continue to [Step 7](7-sending-notifications.md).
