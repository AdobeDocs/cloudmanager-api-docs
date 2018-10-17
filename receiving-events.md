## Receiving Events

When Cloud Manager emits an event, all configured webhooks will be called. The specific event type will be sent in a header named `x-adobe-event-type`.

The body of the requests received by the webhook will vary based on the event type. The [API Reference](/swagger-specs/events.yaml) details the schema for each event body.

| Event Type                      | `x-adobe-event-type` Header       |
|---------------------------------|-----------------------------------|
| Pipeline Execution Started      | `pipeline_execution_start`        |
| Pipeline Execution Step Started | `pipeline_execution_step_start`   |
| Pipeline Execution Step Waiting | `pipeline_execution_step_waiting` |
| Pipeline Execution Step Ended   | `pipeline_execution_step_end`     |
| Pipeline Execution Ended        | `pipeline_execution_end`          |