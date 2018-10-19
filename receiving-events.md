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

### Validating Events

Webhooks used in Adobe I/O must be accessible from the public internet. As a result, it is a best practice to use the `x-adobe-signature` header to validate that the event did, in fact, originate from Adobe I/O. Information on this header can be found in the Authenticating events section of the [Adobe I/O Events Webhooks Introduction](../../../../adobeio/adobeio-documentation/master/events/intro/webhook_docs_intro.md).
