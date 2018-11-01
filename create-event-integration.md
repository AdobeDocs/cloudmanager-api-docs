## Creating an Event Integration

By using Adobe I/O Events, Cloud Manager can send external applications notifications when key events occur. This allows customers to connect existing and new external applications which respond to events emitted by the Cloud Manager CI/CD pipeline.

To work with the Cloud Manager Events on the Adobe I/O Console, you need to have the System Administrator role for your organization. When you receive notification of these rights, click the **Get Started** button in the message to access services.

Adobe I/O Events emitted by Cloud Manager are sent to **webhooks** hosted either in on-premise infrastucture, specialized webhook hosting providers, [Adobe I/O Runtime](https://www.adobe.io/apis/cloudplatform/runtime.html), or even your AEM instances managed by Adobe Managed Services.

The [Getting Started with Adobe I/O Events](https://www.adobe.io/apis/cloudplatform/events/documentation.html) guide provides general documentation on how to set up a webhook. As with [API Integrations](create-api-integration.html), a certificate file is needed to set up an Event integration.

Once your webhook is up and running and you have your certificate, to create an Event Integration:

1. Navigate to the following URL: [https://console.adobe.io/integrations](https://console.adobe.io/integrations).

2. Click the `New integration` button.

3. Select the `Receive near-real time events` option and then click `Continue`.

4. Under the Experience Cloud section select `Cloud Manager` and then click `Continue`.

5. Select `New integration` and then click `Continue`.

6. Fill out the name and description.

7. Upload your certificate file.

8. Click `Add Event Registration`.

9. Fill out the name, URL and description for the webhook.

10. Select the events you want to receive on the webhook.

11. Click `Save`.

12. Click `Create Integration`.
