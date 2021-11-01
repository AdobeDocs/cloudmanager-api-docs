---
title: Editing and Deleting Pipelines - Cloud Manager API
description: Describes editing and deleting pipelines
keywords:
  - Experience Cloud
  - Adobe Experience Manager
  - API Documentation
  - Cloud Manager
  - Pipeline
---

## Editing Pipelines

The Cloud Manager API supports partial editing of pipeline by accepting `PATCH` requests on the pipeline endpoint. The body of these requests follows the same
structure as the response to a `GET` request to the pipeline endpoint. However, only the changes need to be submitted. Below are a number of examples of the types of changes which are supported using this API.

### Editing the Repository or Branch

The body for changing the repository or branch of a pipeline is done by submitting the `BUILD` phase specifying either the `branch` or *both* the `branch` and `repositoryId` properties. For example:

```
PATCH https://cloudmanager.adobe.io/api/program/4/pipeline/1

{
  "phases" : [
    {
      "name":"BUILD_1",
      "type":"BUILD",
      "repositoryId" : "1",
      "branch": "develop"
    }
  ]
}
```

#### Building a Tag

Using this API, it is possible to specify a tag name instead of a branch name. To do this, specify the `branch` value to `refs/tags/TAGNAME`. For example, if the tag is `release-20200214`, you would execute:

```
PATCH https://cloudmanager.adobe.io/api/program/4/pipeline/1

{
  "phases" : [
    {
      "name":"BUILD_1",
      "type":"BUILD",
      "repositoryId" : "1",
      "branch": "refs/tags/release-20200214"
    }
  ]
}
```

<InlineAlert slots="text" />

Specifying a tag is **only** possible using this API, not the Cloud Manager UI.

### Changing the Deployment Environment

Changing the target environment for a pipeline can be done by by submitting the `DEPLOY` phase which needs to be changed. For example:

```
PATCH https://cloudmanager.adobe.io/api/program/4/pipeline/1

{
  "phases" : [
    {
      "name":"DEPLOY_1",
      "type":"DEPLOY",
      "environmentId" : "15"
    }
  ]
}
```

<InlineAlert slots="text" />

Production pipelines will include two deploy phases -- be sure to specify the correct `name`.

### Changing the Dispatcher Invalidation or Flush Paths

Specifically for AMS pipelines, the dispatcher paths which will be invalidated or flushed as part of the deploy process can be specified as part of the `DEPLOY` phase. For example:

```
PATCH https://cloudmanager.adobe.io/api/program/4/pipeline/1

{
  "phases" : [
    {
      "name":"DEPLOY_1",
      "type":"DEPLOY",
      "steps": [
        "name": "deploy",
        "options": {
          "dispatcherCacheInvalidationPaths": [
            "/content/mysite/home.html"
          ],
          "dispatcherCacheFlushPaths": [
            "/etc.clientlibs"
          ]
        }
      ]
    }
  ]
}
```

## Invalidating a Pipeline's Cache

Deleting a pipeline can be done by executing a `DELETE` request to the pipeline's cache endpoint, accessible via the `http://ns.adobe.com/adobecloud/rel/cache` HAL Link of the pipeline endpoint.

```
DELETE https://cloudmanager.adobe.io/api/program/4/pipeline/1/cache
```

## Deleting Pipelines

Deleting a pipeline can be done by executing a `DELETE` request to the pipeline endpoint.

```
DELETE https://cloudmanager.adobe.io/api/program/4/pipeline/1
```