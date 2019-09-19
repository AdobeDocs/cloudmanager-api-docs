# Cloud Manager API Documentation

Cloud Manager, part of the Adobe Managed Cloud Services, enables organizations to self-manage Experience Manager environments in the cloud. Cloud Manager includes a full-featured web user interface at [https://my.cloudmanager.adobe.com/](https://my.cloudmanager.adobe.com/).

The Cloud Manager API enables Cloud Manager customers to interact with the same underlying capabilities exposed through the web UI in a fully programmatic fashion. This allows for integration of the Cloud Manager Continuous Integration / Continuous Delivery pipeline with other systems.

General information on Cloud Manager can be found in the [Product Documentation]( https://www.adobe.com/go/aem_cloud_mgr_userguide_en).

The links in this documentation will guide you through getting started with the Cloud Manager API. There is also a complete [API Reference](swagger-specs/api.yaml) which describes all of the individual endpoints and requests which are available for usage.

## Sample Use Cases

There are a variety of use cases enabled with this API, including:

* Starting the Cloud Manager CI/CD pipeline from an external system.
* Executing additional tests between the standard Cloud Manager performance tests and the ultimate production deployment.
* Triggering additional activities after the a pipeline execution is complete or a specific step has been completed, for example
 - CDN cache invalidation once the production deployment is finished.
 - Deploying related applications to non-Managed Services systems.
 - Notifying on other channels (e.g. Slack, Microsoft Teams).
 - Creating issue reports in bug tracking systems (e.g. Atlassian JIRA) on pipeline failures

### Contributing

We encourage you to participate in our open documentation initiative, if you have suggestions, corrections, additions or deletions for this documentation, check out the source from [this github repo](https://github.com/AdobeDocs/cloudmanager-api-docs), create issues, and submit pull requests with your contribution. For more information, refer to the [Contributing](https://github.com/AdobeDocs/cloudmanager-api-docs/blob/master/CONTRIBUTING.md) page.

