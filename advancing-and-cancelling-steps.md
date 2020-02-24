## Advancing and Cancelling Steps

Certain steps in the pipeline can be "advanced" or "cancelled". These generic functions apply to a variety of steps:

* For the Code Quality, Security Test, and Performance Test steps, advance and cancel are how important failures in these steps get overridden or rejected, respectively.
* For the Go-Live Approval step, advance and cancel are how the deployment is approved or rejected, respectively.
* For the Schedule step, advance and cancel are how a schedule is set or the pipeline is canclled, respectively.
* For the Build, Security Test, and Performance Test steps, cancel can be used to cancel the step (and the pipeline) while the step is running.

For both advance and cancel functions, a `PUT` request is made to the appropriate endpoint, discoverable as the `http://ns.adobe.com/adobecloud/rel/pipeline/advance` and `http://ns.adobe.com/adobecloud/rel/pipeline/cancel` links of the step, respectively. The body of the request will vary based on the step and circumstance.

> These requests require that the service account for the integration be assigned the Deployment Manager, Program Manager, or Business Owner role. See the Cloud Manager <a href="https://www.adobe.com/go/aem_cloud_mrg_usersroles_en">documentation</a> for more information.

### Advance Body Definitions

#### Override Code Quality, Security Test, Performance Test Results

To override important failures in the Code Quality, Security Test, and Performance Test steps, the request body contains an array of the metrics being overridden. The metric keys can be found in the Step Metrics response and are also listed on the [Understanding Metric Data](understanding-metric-data.md) page. For example, if the `coverage` and `sqale_rating` metrics were failing and an override was desired, the body would be:

```javascript
{
    "metrics": [
        {
            "kpi":"coverage",
            "overridden":true
        },
        {
            "kpi":"sqale_rating",
            "overridden":true
        }
    ]
}
```

> It is required that *all* failing important metrics be sent. Otherwise, an error response will be generated.

#### Go-Live Approval

The body for the Go-Live Approval step passes `approved` as `true`:

```javascript
{
    "approved": true
}
```

#### Schedule Step

The body for the Schedule step can take two forms. The first is where a future date/time is set. In this case, `type` in the request body is set to `SCHEDULED` and `schedule` is set to an ISO-8601 formatted date. For example:

```javascript
{
    "type":"SCHEDULED",
    "schedule":"2018-11-16T13:45:00.000Z"
}
```

The second form is where the deployment should be done immediately. In this case, the `type` is set to `IMMEDIATE` and no `schedule` value is required:

```javascript
{
    "type":"IMMEDIATE"
}
```

#### Resume Paused Deployment

The body to resume a paused deployment step passes `resume` as `true`:

```javascript
{
    "resume":true
}
```

### Cancel Body Definitions

#### Reject Code Quality, Security Test, Performance Test Results

The body to reject important failures for one of these steps passes `override` as `false`:

```javascript
{
    "override":false
}
```

> Unlike with the advance endpoint, listing individual metrics here is not required.

#### Cancel Build, Security Test, Performance Test, and Schedule Steps

The body to cancel one of these running steps passes `cancel` as `true`:

```javascript
{
    "cancel":true
}
```

#### Reject Go-Live Approval

The body to reject a Go-Live Approval step passes `approved` as `false`:

```javascript
{
    "approved":false
}
```

#### Stop Paused Deployment

The body to stop a paused deployment step passes `resume` as `false`:

```javascript
{
    "resume":false
}
```

