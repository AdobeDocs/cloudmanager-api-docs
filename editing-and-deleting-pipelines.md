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

## Deleting Pipelines

Deleting a pipeline can be done by executing a `DELETE` request to the pipeline endpoint.