## Creating an API Integration

To work with the Cloud Manager API on the Adobe I/O Console, you need to have the System Administrator role for your organization. When you receive notification of this role, click the **Get Started** button in the message to access services.

All requests to the Cloud Manager API must be authenticated using an access token retrieved using a JSON Web Token (JWT). The [Adobe I/O JWT Quickstart](https://www.adobe.io/authentication/auth-methods.html#!adobeio/adobeio-documentation/master/auth/JWTAuthenticationQuickStart.md) provides a guide to creating the certificate files necessary to set up the integration as well as instructions for how to generate your first access token. The [Creating a JSON Web Token](https://www.adobe.io/apis/cloudplatform/console/authentication/createjwt.html) page has more detailed reference information on the specific content of the JWT.

Once you've generated your certificate, to create an API Integration:

1. Navigate to the following URL: [https://console.adobe.io/integrations](https://console.adobe.io/integrations).

2. Click the `New integration` button.

3. Select the `Access an API` option and then click `Continue`.

4. Under the Experience Cloud section select `Cloud Manager` and then click `Continue`.

5. Select `New integration` and then click `Continue`.

6. Fill out the name and description.

7. Upload your certificate file.

8. If the integration needs access based on a [specific role](https://www.adobe.com/go/aem_cloud_mrg_usersroles_en), select the role from the dropdown list:

![Select Role Dropdown](img/integration-selectrole.png)
> At present, you can only select this role when first creating the integration. If you need a different role, the integration must be deleted and recreated.

9. Click `Create Integration`.

Your client is now created. Notice your client has an `API Key (Client ID)` and an `Organization ID`. You'll need these when making API calls. You will also need the `Technical Account ID` and `Client Secret` values to obtain an Access Token.

<style type="text/css">
#kirbyMainContent p img {
  padding-top: 0;
  padding-bottom: 0;
}
#kirbyMainContent blockquote {
  background-color: rgb(240, 240, 240);
  margin-left: 1em;
}
</style>