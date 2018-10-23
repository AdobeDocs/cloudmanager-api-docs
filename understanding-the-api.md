## Understanding the API

The Cloud Manager API is composed of two components:

* An _inbound_ HTTP-based API which can be used by Cloud Manager customers to read and manipulate the state of their CI/CD pipelines.
* An _outbound_ event system which allows Cloud Manager customers to receive events when key events happen in their CI/CD pipelines.

While it is possible to use **only** one or the other of these components, in most cases integrations will use both components. That said, it is best to start with just one, get it working, and then move on to the other component.

The steps to get started are different for these two components. Read [Create API Integration](create-api-integration.md) to get started with the inbound API and [Create Event Integration](create-event-integration.md) to get started with the event API.