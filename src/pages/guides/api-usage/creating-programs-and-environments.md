---
title: Creating Programs and Environments - Cloud Manager API
description: Describes creating programs and environments
keywords:
  - Experience Cloud
  - Adobe Experience Manager
  - API Documentation
  - Cloud Manager
  - Pipeline
---

# Creating Programs and Environments

## Creating AEM Cloud Service Programs

Based on the entitlements available for an organization, AEM Cloud Service programs may be created through the Cloud Manager API. This is done by executing a `POST` request to the `http://ns.adobe.com/adobecloud/rel/programs` HAL link of the tenant resource. To discover the tenant resource, you can either navigate to the `http://ns.adobe.com/adobecloud/rel/tenant` HAL link from any existing program *or* execute a `GET` request to `https://cloudmanager.adobe.io/api/tenants`. This response will contain exactly one tenant resource.

### Creating a Production Program

To create a production program, the body of the `POST` request needs to include the type `aem_cloud_service`, a name, and at least one solution name. The allowed solutions are `aemsites` and `aemassets`.

<InlineAlert slots="text" />

Creating AEM Forms programs will be available in a forthcoming release.

For example:

```plaintext
POST https://cloudmanager.adobe.io/api/tenant/1/programs

{
  "name": "My Second Program",
  "type": "aem_cloud_service",
  "solutionNames": ["aemsites"]
}
```

### Creating a Sandbox Program

To create a sandbox program, the body of the `POST` request needs to include the type `aem_cloud_service`, a name, and a capabilities object that specifies that it is a sandbox program.

For example:

```plaintext
POST https://cloudmanager.adobe.io/api/tenant/1/programs

{
  "name": "My Second Program",
  "type": "aem_cloud_service",
  "capabilities": {
    "sandbox": true
  }
}
```

## Creating AEM Cloud Service Environments

In order to find the set of currently available regions, execute a GET request to the `http://ns.adobe.com/adobecloud/rel/regions` HAL link of the program.

```plaintext
GET https://cloudmanager.adobe.io/api/program/4/regions
```

This will return a list like this:

```plaintext
{
  "_embedded": {
    "regions": [
      {
        "name": "va7"
      },
      {
        "name": "nld2"
      }
    ]
  },
  "_totalNumberOfItems": 2
}
```

The set of available regions will vary based on capacity and entitlements, so always check this list before creating an environment. The superset of possible regions are:

* `aus5` - Australia Southeast
* `can2` - Canada
* `deu6` - Germany
* `gbr9` - UK South
* `jpn4` - Japan
* `nld2` - West Europe
* `sgp5` - Singapore
* `va7` - East US
* `wa1` - West US

### Creating a Single Region Environment

Using the region value, you can then execute a POST request to the `http://ns.adobe.com/adobecloud/rel/environments` HAL link of the program with the desired name and type.

```plaintext
POST https://cloudmanager.adobe.io/api/program/4/environments

{
  "name" : "my-second-dev-environment",
  "type" : "dev",
  "region" : "va7"
}
```

### Creating a Multi Region Environment

To create multi region, the body of the `POST` request needs to include the `secondaryRegionDeployments` that specifies the regions in which additional publish instances should be provisioned.
For example:

```plaintext
POST https://cloudmanager.adobe.io/api/program/4/environments

{
  "name" : "my-multi-region-prod-environment",
  "type" : "prod",
  "region" : "va7",
  "secondaryRegionDeployments" : [
     {
       "region" : "wa1"
     },
     {
       "region" : "sgp5"
     }
  ]
}
```

### Important Limitations

Usage of this API will be limited by the existing environment limits. Specifically:

* Sandbox programs are limited to one environment of each type.
* Production programs are limited to one stage and one production environment.
* The total number of dev environments in production programs is limited to the number of dev environments contracted for that organization.
