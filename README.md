# Cloud Manager API Documentation

This repository contains the source files for the documentation of the Adobe Cloud Manager APIs as published on https://www.adobe.io/

> This API is still a work-in-progress and is not considered stable.

## Description

Cloud Manager, part of the Adobe Managed Cloud Services, enables organizations to self-manage Experience Manager environments in the cloud. Cloud Manager includes
a full-featured web user interface at https://my.cloudmanager.adobe.com/

The Cloud Manager API enables Cloud Manager customers to interact with the same underlying capabilities exposed through the web UI in a fully programmatic fashion. This allows for integration of the Cloud Manager Continuous Integration / Continuous Delivery pipeline with other systems.

## Sample Use Cases

There are a variety of use cases enabled with this API, including:

* Starting the Cloud Manager CI/CD pipeline from an external system.
* Executing additional tests between the standard Cloud Manager performance tests and the ultimate production deployment.
* Triggering additional activities after the production deployment is complete, e.g. CDN cache invalidation.

### Contributing

Contributions are welcomed! Read the [Contributing Guide](CONTRIBUTING.md) for more information.

### Licensing

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more information.
