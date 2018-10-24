## Tutorial Step 3 - Handling Specific Events

As seen in [Step 1](1-a-basic-webhook.md), webhooks can be registered for one or more events. Depending on the type of integration you are actually building with Cloud Manager, you will end up with a single webhook script which can handle multiple events in different ways. The event type is passed to the webhook in the `x-adobe-event-code` Header. A full list can be found on the [Receiving Events](../receiving-events.md) page. For this step in the tutorial, you're going to add a simple log statement when event being received is a Pipeline Execution Started event.

> It is also possible that you will have a single webhook which handles events from multiple providers. For these cases, you can look at the `x-adobe-provider` header.

### Updating the Webhook

Replace the `app.post` block with this code:

```javascript
app.post('/webhook', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/text' });
  res.end("pong");

  if (req.header("x-adobe-event-code") === "pipeline_execution_start") {
    console.log("received execution start event");
  }
});
```
Now when a Pipeline Execution Started event is received, the message `received execution start event` will be logged.

### Running the Updated Webhook

If you are running the script locally, you'll need to stop and restart the node process. You don't need to restart ngrok. In fact, if you do restart ngrok, the URL will likely change and you'll need to go back into the <a href="https://console.adobe.io/integrations" target="_new">Adobe I/O Console</a> and update the Webhook URL.

If you are running the script through Glitch, Glitch will restart automatically. If you don't want to update your existing Glitch project (or lost it), you can click the button below to start over.

<!-- Remix Button -->
<a href="https://glitch.com/edit/#!/remix/adobe-cloudmanager-api-tutorial-step3" target="_new">
  <img src="../img/glitch.png" alt="Remix in Glitch" id="glitch-button">
</a>

#### Next Step

With all that done, you're ready to proceed to the next step. Continue to [Step 4](4-getting-an-access-token.md).