---
title: Receiving Events  - Cloud Manager API
description: Describes how to receive events
contributors:
  - https://github.com/bstopp 
keywords:
  - Experience Cloud
  - API Documentation
  - JavaScript  
---
# Receiving Events

When Cloud Manager emits an event, all webhooks configured for that event will be called. As it is possible to reuse the same webhook for multiple events and even multiple events from different providers, webhooks should inspect the event payload in order to determine the nature of the event before handling it. This can be done by using the `@type` and `xdmEventEnvelope:objectType` values. The `@type` value identifies the verb, i.e. the thing that happened, whereas the `xdmEventEnvelope:objectType` value identifies the noun, i.e. what type of thing the thing that happened happened to.

## Event Types

### Pipeline Execution Started

<dl class="event-description">
  <dt><span class="spectrum-Code spectrum-Code--sizeM">@type</span></dt>
  <dd><span class="spectrum-Code spectrum-Code--sizeM">https://ns.adobe.com/experience/cloudmanager/event/started</span></dd>
  <dt><span class="spectrum-Code spectrum-Code--sizeM">xdmEventEnvelope:objectType</span></dt>
  <dd><span class="spectrum-Code spectrum-Code--sizeM">https://ns.adobe.com/experience/cloudmanager/pipeline-execution</span></dd>
</dl>

### Pipeline Execution Step Started

<dl class="event-description">
  <dt><span class="spectrum-Code spectrum-Code--sizeM">@type</span></dt>
  <dd><span class="spectrum-Code spectrum-Code--sizeM">https://ns.adobe.com/experience/cloudmanager/event/started</span></dd>
  <dt><span class="spectrum-Code spectrum-Code--sizeM">xdmEventEnvelope:objectType</span></dt>
  <dd><span class="spectrum-Code spectrum-Code--sizeM">https://ns.adobe.com/experience/cloudmanager/execution-step-state</span></dd>
</dl>

### Pipeline Execution Step Waiting

<dl class="event-description">
  <dt><span class="spectrum-Code spectrum-Code--sizeM">@type</span></dt>
  <dd><span class="spectrum-Code spectrum-Code--sizeM">https://ns.adobe.com/experience/cloudmanager/event/waiting</span></dd>
  <dt><span class="spectrum-Code spectrum-Code--sizeM">xdmEventEnvelope:objectType</span></dt>
  <dd><span class="spectrum-Code spectrum-Code--sizeM">https://ns.adobe.com/experience/cloudmanager/execution-step-state</span></dd>
</dl>

### Pipeline Execution Step Ended

<dl class="event-description">
  <dt><span class="spectrum-Code spectrum-Code--sizeM">@type</span></dt>
  <dd><span class="spectrum-Code spectrum-Code--sizeM">https://ns.adobe.com/experience/cloudmanager/event/ended</span></dd>
  <dt><span class="spectrum-Code spectrum-Code--sizeM">xdmEventEnvelope:objectType</span></dt>
  <dd><span class="spectrum-Code spectrum-Code--sizeM">https://ns.adobe.com/experience/cloudmanager/execution-step-state</span></dd>
</dl>

### Pipeline Execution Ended

<dl class="event-description">
  <dt><span class="spectrum-Code spectrum-Code--sizeM">@type</span></dt>
  <dd><span class="spectrum-Code spectrum-Code--sizeM">https://ns.adobe.com/experience/cloudmanager/event/ended</span></dd>
  <dt><span class="spectrum-Code spectrum-Code--sizeM">xdmEventEnvelope:objectType</span></dt>
  <dd><span class="spectrum-Code spectrum-Code--sizeM">https://ns.adobe.com/experience/cloudmanager/pipeline-execution</span></dd>
</dl>

The body of the requests received by the webhook will vary based on the event type. The [Reference Document](../../reference/events.md) details the schema for each event body.

## Step Actions

Each pipeline step has an assigned `action` which indicates the type of step. New actions will be added over time. Below is the list of actions in the current release:

| `action` value                   | Description                           |
|----------------------------------|---------------------------------------|
| `validate`                       | Pipeline and Environment Validation   |
| `build`                          | Build and Unit Testing                |
| `codeQuality`                    | Code Quality Testing                  |
| `buildImage`                     | Build Image from branch source        |
| `securityTest`                   | Security Testing                      |
| `loadTest`                       | Sites Performance Testing Execution   |
| `assetsTest`                     | Assets Performance Testing Execution  |
| `reportPerformanceTest`          | Assets Performance Testing Execution  |
| `productTest`                    | Product Functional Tests              |
| `functionalTest`                 | Custom Functional Tests               |
| `contentAudit`                   | Experience Audit (fka Content Audit)  |
| `approval`                       | Go-Live Approval                      |
| `schedule`                       | Production Deployment Scheduling      |
| `managed`                        | CSE Oversight                         |
| `deploy`                         | Deployment                            |

### Step Events

With a few exceptions, all steps will emit _start_ and _end_ events. The _waiting_ event is emitted when a step is waiting for user feedback, e.g. when important metrics have failed and the pipeline is waiting for a decision to override or reject those failures. There are some exceptions, however. These actions will never emit start events:

* `codeQuality`
* `approval`
* `schedule`
* `managed`


## Validating Events

Webhooks used in Adobe I/O must be accessible from the public internet. As a result, it is a best practice to use the `x-adobe-signature` header to validate that the event did, in fact, originate from Adobe I/O. Information on this header can be found in the Authenticating events section of the [Adobe I/O Events Webhooks Introduction](https://www.adobe.io/apis/experienceplatform/events/docs.html#!adobedocs/adobeio-events/master/intro/webhooks_intro.md).
