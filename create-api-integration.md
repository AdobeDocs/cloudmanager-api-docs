## Creating an API Integration

To work with the Cloud Manager API on the Adobe I/O Console, you need to have System Admin rights for your organization. When you receive notification of these rights, click the **Get Started** button in the message to access services.

All requests to the Cloud Manager API must be authenticated using an access token retrieved using a JSON Web Token (JWT). The [Adobe I/O JWT Quickstart](https://www.adobe.io/authentication/auth-methods.html#!adobeio/adobeio-documentation/master/auth/JWTAuthenticationQuickStart.md) provides a guide to creating the certificate files necessary to set up the integration as well as instructions for how to generate your first access token.

Once you've generated your certificate, to create an API Integration:

1. Navigate to the following URL: https://console.adobe.io/integrations.

2. Click the `New integration` button.

3. Select the `Access an API` option and then click `Continue`.

4. Under the Experience Cloud section select `Cloud Manager` and then click `Continue`.

5. Select `New integration` and then click `Continue`.

6. Fill out the name and description.

7. Upload your certificate file.

8. Click `Create Integration`.

Your client is now created. Notice your client has an `API Key (Client ID)` and an `Organization ID`. You'll need these when making API calls.
