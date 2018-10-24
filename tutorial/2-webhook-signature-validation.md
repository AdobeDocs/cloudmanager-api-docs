## Tutorial Step 2 - Webhook Signature Validation

In the second step of the tutorial, the webhook from the first step is going to be enhanced to validate that the POST request actually comes from Adobe I/O.

POST requests to the webhook are signed using a SHA256 HMAC stored in the `x-adobe-signature` header. There's a few different ways this can be done, but the approach used in this tutorial is using the `verify` feature of the `body-parser` package. This uses a function which is called on every request. If an error is thrown inside this function, the request is immediately rejected. This helps to keep the route function clean.

### Setting up the Secret Key

The `x-adobe-signature` header value is generated using the Client Secret value, so the first step is to make sure the `.env` file has the `CLIENT_SECRET` variable populated. You should have done this in Step 0, but if not (or if you are using Glitch), you will need to do this now.

### Using the crypto library

Node.js's standard `crypto` module supports all of the cryptographic functions needed for this. It just needs to be added to the top of the script:

```javascript
const express    = require('express'),
      bodyParser = require('body-parser'),
      crypto     = require("crypto');
```

### Writing the `verify` function

The actual `verify` function accepts the request and response objects along with a Node.js `Buffer`. It first reads the signature from the headers. Then it generates the HMAC using the `Buffer`. Finally, it compares a Base64 digest of the HMAC to the header value.

We also need to handle the case where the header isn't provided, so an `Error` should be thrown if there is no signature **and** the request is a POST request.

> There might be cases where you want to disable this checked, so the code below allows for a `DEBUG` variable to be set in `.env` to allow unsigned POSTs through.

Fully implemented, the `verify` function looks like this:

```javascript
app.use(bodyParser.json({
    verify: (req, res, buf, encoding) => {
      const signature = req.header("x-adobe-signature");
      if (signature) {
        const hmac = crypto.createHmac('sha256', process.env.CLIENT_SECRET);
        hmac.update(buf);
        const digest = hmac.digest('base64');
  
        if (signature !== digest) {
          throw new Error('x-adobe-signature HMAC check failed');
        }
      } else if (!process.env.DEBUG && req.method === "POST") {
        throw new Error('x-adobe-signature required');
      }
    }
  }));
```

### Updating the Webhook

To update your webhook script, just replace the line

```javascript
app.use(bodyParser.json());
```

with the block above. If you are running the script locally, you'll need to stop and restart the node process. You don't need to restart ngrok. In fact, if you do restart ngrok, the URL will likely change and you'll need to go back into the <a href="https://console.adobe.io/integrations" target="_new">Adobe I/O Console</a> and update the Webhook URL.

If you are running the script through Glitch, Glitch will restart automatically. If you don't want to update your existing Glitch project (or lost it), you can click the button below to start over.

<!-- Remix Button -->
<a href="https://glitch.com/edit/#!/remix/adobe-cloudmanager-api-tutorial-step2" target="_new">
  <img src="../img/glitch.png" alt="Remix in Glitch" id="glitch-button">
</a>

#### Next Step

With all that done, you're ready to proceed to the next step. Continue to [Step 3](3-handling-specific-events.md).