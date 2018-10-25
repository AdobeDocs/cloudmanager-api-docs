## Receiving Events

When Cloud Manager emits an event, all webhooks configured for that event will be called. As it is possible to reuse the same webhook for multiple events and even multiple events from different providers, two HTTP headers can be used to differentiate events. The `x-adobe-provider` header will be `cloudmanager` for Cloud Manager events. The type of event is contained in the `x-adobe-event-code` header.

| Event Type                      | `x-adobe-event-code` Header       |
|---------------------------------|-----------------------------------|
| Pipeline Execution Started      | `pipeline_execution_start`        |
| Pipeline Execution Step Started | `pipeline_execution_step_start`   |
| Pipeline Execution Step Waiting | `pipeline_execution_step_waiting` |
| Pipeline Execution Step Ended   | `pipeline_execution_step_end`     |
| Pipeline Execution Ended        | `pipeline_execution_end`          |

The body of the requests received by the webhook will vary based on the event type. The [API Reference](swagger-specs/events.yaml) details the schema for each event body.

### Step Actions

Each pipeline step has an assigned `action` which indicates the type of step. New actions will be added over time. Below is the list of actions in the current release:

| `action` value                   | Description                           |
|----------------------------------|---------------------------------------|
| `validate`                       | Pipeline and Environment Validation   |
| `build`                          | Build and Unit Testing                |
| `codeQuality`                    | Code Quality Testing                  |
| `securityTest`                   | Security Testing                      |
| `loadTest`                       | Sites Performance Testing             |
| `approval`                       | Go-Live Approval                      |
| `schedule`                       | Production Deployment Scheduling      |
| `managed`                        | CSE Oversight                         |
| `deploy`                         | Deployment                            |

#### Step Events

With a few exceptions, all steps will emit _start_ and _end_ events. The _waiting_ event is emitted when a step is waiting for user feedback, e.g. when important metrics have failed and the pipeline is waiting for a decision to override or reject those failures. There are some exceptions, however. These actions will never emit start events:

* `codeQuality`
* `approval`
* `schedule`
* `managed`


### Validating Events

Webhooks used in Adobe I/O must be accessible from the public internet. As a result, it is a best practice to use the `x-adobe-signature` header to validate that the event did, in fact, originate from Adobe I/O. Information on this header can be found in the Authenticating events section of the [Adobe I/O Events Webhooks Introduction](../../../../adobeio/adobeio-documentation/master/events/intro/webhook_docs_intro.md).
