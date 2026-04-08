---
title: API Permissions - Cloud Manager API
description: Describes the permissions needed to use the API
keywords:
  - Experience Cloud
  - Adobe Experience Manager
  - API Documentation
  - Cloud Manager
  - Permissions
---

# API Permissions

The Cloud Manager API is accessed using a technical service account created using the Adobe Developer Console. This service account can only be used to access the API -- it does not have a normal password and so cannot be used to log into Cloud Manager or Experience Cloud in general. Although this service account is effectively created by an individual, it is "owned" by the organization. As a result, when looking at the permissions required to use the Cloud Manager API, there are two separate permissions to consider. The first is the permission required to create the project in the Adobe Developer Console. The second is the permission assigned to the service account.

## Developer Console Project Creation Permission

Creating a project with the Cloud Manager API in the Adobe Developer Console is allowed for authenticated users who are _either_ System Administrators in the target organization _or_ are assigned Developer Access for one of more Cloud Manager product profiles. A user who is a System Administrator in the target organization can create projects in Developer Console with any of the Cloud Manager product profiles whereas a user with Developer Access is explicitly allowed to create projects using a subset of product profiles.

To assign a user Developer Access, in the [Adobe Admin Console](https://adminconsole.adobe.com/), click the `Add Developer` link. Enter the email address and click the `Assign Products` tab. Then select the product and product profiles desired before clicking `Save`. For example, in the image below, the user would have the ability to create projects in Adobe Developer Console with the `Cloud Manager - Deployment Manager` product profile.

![Set Developer Access Product Profiles](img/add-developer.png)

> It is important to understand that this does **not** enable this user (`developer@myco.com` in this example) to actually log into Cloud Manager, Adobe Experience Manager or any other Experience Cloud product. This only enables this user to create projects in Adobe Developer Console with the Cloud Manager API.

## Cloud Manager API Permissions

Interactions with the Cloud Manager API using the service account are permitted based on the product profiles assigned to the service account. When creating or editing a project in Adobe Developer Console, the product profiles for that project are selectable.

![Set Service Account Product Profiles](img/api-product-profiles.png)

> Which profiles are listed here depends on the user -- if this was done using the `developer@myco.com` user created above, **only** the `Cloud Manager - Deployment Manager` product profile would be displayed.

Which product profile(s) or permission(s) to select depends upon the specific requirements for the project and what APIs will be accessed. Either a pre-defined product profile can be assigned or with [custom permissions](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-manager/content/requirements/custom-permissions), a permission can be assigned to a custom profile for respective operation.

With a few exception (listed below), if only read (`GET`) access is required, the Developer product profile will be sufficient. Guidance for projects which require specific profiles:

## Detailed Permission Information


| Operation | Product Profile(s) | Permission |
|-----------|---------------------|------------|
| `deleteProgram` `DELETE /api/program/\{programId\}` | Business Owner | Not configurable |
| `updateCertificate` `PUT /api/program/\{programId\}/certificate/\{certificateId\}` | Deployment Manager, Business Owner | SSL Certificate Manage |
| `deleteCertificate` `DELETE /api/program/\{programId\}/certificate/\{certificateId\}` | Deployment Manager, Business Owner | SSL Certificate Manage |
| `createCertificate` `POST /api/program/\{programId\}/certificates` | Deployment Manager, Business Owner | SSL Certificate Manage |
| `getContentFlow` `GET /api/program/\{programId\}/contentFlow/\{contentFlowId\}` | Deployment Manager | Content Copy Manage |
| `cancelContentFlow` `DELETE /api/program/\{programId\}/contentFlow/\{contentFlowId\}` | Deployment Manager | Content Copy Manage |
| `getContentFlowLogs` `GET /api/program/\{programId\}/contentFlow/\{contentFlowId\}/logs` | Deployment Manager | Content Copy Manage |
| `downloadLogs` `GET /api/program/\{programId\}/contentFlow/\{contentFlowId\}/logs/download` | Deployment Manager | Content Copy Manage |
| `listContentFlows` `GET /api/program/\{programId\}/contentFlows` | Deployment Manager | Content Copy Manage |
| `deleteContentSet` `DELETE /api/program/\{programId\}/contentSet/\{contentSetId\}` | Deployment Manager | Content Copy Manage |
| `updateContentSet` `PUT /api/program/\{programId\}/contentSet/\{contentSetId\}` | Deployment Manager | Content Copy Manage |
| `getContentSet` `GET /api/program/\{programId\}/contentSet/\{contentSetId\}` | Deployment Manager | Content Copy Manage |
| `createContentSet` `POST /api/program/\{programId\}/contentSets` | Deployment Manager | Content Copy Manage |
| `listContentSets` `GET /api/program/\{programId\}/contentSets` | Deployment Manager | Content Copy Manage |
| `updateEnvironmentDomainName` `PUT /api/program/\{programId\}/domainName/\{domainNameId\}` | Deployment Manager, Business Owner | Domain Name Manage |
| `deleteEnvironmentDomainName` `DELETE /api/program/\{programId\}/domainName/\{domainNameId\}` | Deployment Manager, Business Owner | Domain Name Manage |
| `deployDomainName` `POST /api/program/\{programId\}/domainName/\{domainNameId\}/deploy` | Deployment Manager, Business Owner | Domain Name Manage |
| `verifyDomainName` `POST /api/program/\{programId\}/domainName/\{domainNameId\}/verify` | Deployment Manager, Business Owner | Domain Name Manage |
| `createEnvironmentDomainName` `POST /api/program/\{programId\}/domainNames` | Deployment Manager, Business Owner | Domain Name Manage |
| `validateDomainName` `POST /api/program/\{programId\}/domainNames/validate` | Deployment Manager, Business Owner | Domain Name Manage |
| `deleteEnvironment` `DELETE /api/program/\{programId\}/environment/\{environmentId\}` | Business Owner, Deployment Manager | Not Configurable |
| `enableEnvironmentAdvancedNetworkingConfiguration` `PUT /api/program/\{programId\}/environment/\{environmentId\}/advancedNetworking` | Deployment Manager, Business Owner | Environment Edit |
| `disableEnvironmentAdvancedNetworkingConfiguration` `DELETE /api/program/\{programId\}/environment/\{environmentId\}/advancedNetworking` | Deployment Manager, Business Owner | Environment Edit |
| `createContentFlow` `POST /api/program/\{programId\}/environment/\{environmentId\}/contentFlow` | Deployment Manager | Content Copy Manage |
| `getEnvironmentLogs` `GET /api/program/\{programId\}/environment/\{environmentId\}/logs` | Deployment Manager, Developer | Environment Logs Read |
| `downloadLogs` `GET /api/program/\{programId\}/environment/\{environmentId\}/logs/download` | Deployment Manager | Content Copy Manage |
| `createRegionDeployment` `POST /api/program/\{programId\}/environment/\{environmentId\}/regionDeployments` | Deployment Manager, Business Owner | Environment Edit |
| `patchRegionDeployment` `PATCH /api/program/\{programId\}/environment/\{environmentId\}/regionDeployments` | Deployment Manager, Business Owner | Environment Edit |
| `resetRde` `PUT /api/program/\{programId\}/environment/\{environmentId\}/reset` | Developer | Rapid Dev Environment Reset |
| `restoreExecution` `PUT /api/program/\{programId\}/environment/\{environmentId\}/restoreExecution` | Deployment Manager | Environment Restore Create |
| `patchEnvironmentVariables` `PATCH /api/program/\{programId\}/environment/\{environmentId\}/variables` | Deployment Manager | Environment Variables Manage |
| `createEnvironment` `POST /api/program/\{programId\}/environments` | Deployment Manager, Business Owner | Environment Create |
| `addFeedback` `POST /api/program/\{programId\}/feedbacks` | Business Owner, Deployment Manager, Program Manager, Developer | Any product profile is sufficient |
| `updateIPAllowlist` `PUT /api/program/\{programId\}/ipAllowlist/\{ipAllowlistId\}` | Deployment Manager, Business Owner | IP Allowlist Manage |
| `deleteIPAllowlist` `DELETE /api/program/\{programId\}/ipAllowlist/\{ipAllowlistId\}` | Deployment Manager, Business Owner | IP Allowlist Manage |
| `deleteIPAllowlistBinding` `DELETE /api/program/\{programId\}/ipAllowlist/\{ipAllowlistId\}/binding/\{ipAllowlistBindingId\}` | Deployment Manager, Business Owner | IP Allowlist Manage |
| `retryIPAllowlistBinding` `PUT /api/program/\{programId\}/ipAllowlist/\{ipAllowlistId\}/binding/\{ipAllowlistBindingId\}/retry` | Deployment Manager, Business Owner | IP Allowlist Manage |
| `createIPAllowlistBinding` `POST /api/program/\{programId\}/ipAllowlist/\{ipAllowlistId\}/bindings` | Deployment Manager, Business Owner | IP Allowlist Manage |
| `createIPAllowlist` `POST /api/program/\{programId\}/ipAllowlists` | Deployment Manager, Business Owner | IP Allowlist Manage |
| `updateNetworkInfrastructure` `PUT /api/program/\{programId\}/networkInfrastructure/\{networkInfrastructureId\}` | Business Owner | Network Infrastructure Manage |
| `deleteNetworkInfrastructure` `DELETE /api/program/\{programId\}/networkInfrastructure/\{networkInfrastructureId\}` | Business Owner | Network Infrastructure Manage |
| `createNetworkInfrastructure` `POST /api/program/\{programId\}/networkInfrastructures` | Business Owner | Network Infrastructure Manage |
| `getNewRelicSubAccountUserList` `GET /api/program/\{programId\}/newRelicUsers` | Deployment Manager, Business Owner | New Relic Sub Account User Manage |
| `createDeleteNewRelicSubAccountUsers` `PATCH /api/program/\{programId\}/newRelicUsers` | Deployment Manager, Business Owner | New Relic Sub Account User Manage |
| `deletePipeline` `DELETE /api/program/\{programId\}/pipeline/\{pipelineId\}` | Deployment Manager | Pipeline Delete |
| `patchPipeline` `PATCH /api/program/\{programId\}/pipeline/\{pipelineId\}` | Deployment Manager | Pipeline Edit |
| `invalidateCache` `DELETE /api/program/\{programId\}/pipeline/\{pipelineId\}/cache` | Deployment Manager | Pipeline Cache Invalidation |
| `startPipeline` `PUT /api/program/\{programId\}/pipeline/\{pipelineId\}/execution` | Business Owner, Deployment Manager, Program Manager | Pipeline Executions Start |
| `advancePipelineExecution` `PUT /api/program/\{programId\}/pipeline/\{pipelineId\}/execution/\{executionId\}/phase/\{phaseId\}/step/\{stepId\}/advance` | Business Owner, Deployment Manager, Program Manager | Production Deployments Approve/Reject, Production Deployments Schedule, Override/Reject Important Metric Failures |
| `cancelPipelineExecutionStep` `PUT /api/program/\{programId\}/pipeline/\{pipelineId\}/execution/\{executionId\}/phase/\{phaseId\}/step/\{stepId\}/cancel` | Business Owner, Deployment Manager, Program Manager (Note: Program Manager is limited to cancelling steps with status WAITING.) | Pipeline Executions Cancel, Production Deployments Approve/Reject, Production Deployments Schedule, Override/Reject Important Metric Failures |
| `patchPipelineVariables` `PATCH /api/program/\{programId\}/pipeline/\{pipelineId\}/variables` | Deployment Manager | Pipeline Edit |
| `getPipelineVariables` `GET /api/program/\{programId\}/pipeline/\{pipelineId\}/variables` | Business Owner, Deployment Manager, Program Manager, Developer | Program Access |
| `addProgram` `POST /api/tenant/\{tenantId\}/programs` | Business Owner | Program Create |

