---
title: CLI and SDKs - Cloud Manager API
description: Describes the available CLI and SDKs that use the API
keywords:
  - Experience Cloud
  - Adobe Experience Manager
  - JavaScript
  - Java
  - Command Line Interface
  - Cloud Manager
---

# CLI and SDKs

In addition to direct HTTP usage of the Cloud Manager API, there are open source tools and libraries built on top of the API which can be used in integration projects. In addition to being directly usable, they are also good examples of how to use the API. More detailed information can be found on each respective project's website.

Note that many of these require that an [API Integration Project](../guides/getting-started/create-api-integration.md) to be created in the Adobe Developer Console before use.

## Command Line Interface

The [Cloud Manager CLI](https://github.com/adobe/aio-cli-plugin-cloudmanager) is a plugin for the general-purpose [Adobe I/O CLI](https://github.com/adobe/aio-cli) (referred to as `aio`). The CLI can be used in both direct usage and within shell scripts.

### Example Usage


```bash
$ aio cloudmanager:list-programs
```

## Node.js SDK

The [Cloud Manager Node.js SDK](https://github.com/adobe/aio-lib-cloudmanager) is used inside the Command Line Interface, but is also independently usable for other Node.js applications, e.g. in [Adobe App Builder](https://developer.adobe.com/app-builder/) or [Electron](https://www.electronjs.org/) applications.

### Example Usage

```node
const client = await sdk.init('orgId', 'x-api-key', 'valid auth token')
const programs = await client.listPrograms()
```

## Java SDK

The [Cloud Manager Java SDK](https://github.com/adobe/aio-lib-java-cloudmanager) provides a Java interface on top of the Cloud Manager API and enables integration in JVM-based applications.

### Example Usage

```java
CloudManagerApi api = new CloudManagerApiImpl("orgId", "x-api-key", "valid auth token");
List<EmbeddedProgram> client.listPrograms();
```

## GitHub Actions

The Node.js SDK is wrapped into a [GitHub Action](https://github.com/adobe/aio-cloudmanager-create-execution-action) for cases when it is appropriate to create a pipeline execution as a step in a GitHub Action-based workflow.

### Example Usage

```yaml
- name: Create Execution
  uses: adobe/aio-cloudmanager-create-execution-action@v1.0.5
  with:
    CLIENTID: ${{ secrets.CM_CLIENT_ID }}
    CLIENTSECRET: ${{ secrets.CM_CLIENT_SECRET }}
    TECHNICALACCOUNTID: ${{ secrets.CM_TA_EMAIL }}
    IMSORGID: ${{ secrets.CM_ORG_ID }}
    KEY: ${{ secrets.CM_PRIVATE_KEY }}
    PIPELINEID: ${{ secrets.CM_PIPELINE_ID }}
    PROGRAMID: ${{ secrets.CM_PROGRAM_ID }}
```