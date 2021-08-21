---
title: Editing and Deleting Pipelines - Cloud Manager API
description: Describes editing and deleting pipelines
contributors:
  - https://github.com/justinedelson
---

## Editing Pipelines

The Cloud Manager API supports editing of the branch property of a pipeline. This is done by executing a `PATCH` request to the pipeline endpoint. The body should be the same structure as the response to a `GET` request to the pipeline endpoint except that *only* the `BUILD` phase need be submitted in the body. The `repositoryId` property of the build phase object may be ommitted.

For example:

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

### Building a Tag

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

## Deleting Pipelines

Deleting a pipeline can be done by executing a `DELETE` request to the pipeline endpoint.