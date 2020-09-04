## Understanding Metric Data

The Metric endpoint returns the measured results for each of the Cloud Manager quality gates: Code Quality, Security, Performance, and Experience Audit. Each metric is represented with a JSON object containing the severity, the expected value, the actual value, the result, the comparator used to generate the result, and the metric name.

For example, if you look at the code quality metrics, you will see an object like this:

```
{
    "id": "7776",
    "severity": "important",
    "passed": true,
    "override": false,
    "actualValue": "50.4",
    "expectedValue": "50",
    "comparator": "GTE",
    "kpi": "coverage"
}
```

Here, we can see that this is the `coverage` metric, the expected value is `50`, the actual value is `50.4`, to pass the actual value must be greater than or equal to (GTE) the expected value, that the metric passed.

The `kpi` value is a _technical_ value which will generally need to be translated into a user-facing value. The reference tables below provide mappings between the technical name in the API response and the names/definitions in the [documentation](https://www.adobe.com/go/aem_cloud_mgr_testresults_en) for each of the quality gates.

### Code Quality

| Technical Name             | Display Name           |
|----------------------------|------------------------|
| `security_rating`          | Code Coverage          |
| `reliability_rating`       | Reliability Rating     |
| `sqale_rating`             | Maintainability Rating |
| `coverage`                 | Coverage               |
| `skipped_tests`            | Skipped Unit Tests     |
| `open_issues`              | Open Issues            |
| `duplicated_lines_density` | Duplicated Lines       |

### Security Testing

| Technical Name                                  | Display Name                                  |
|-------------------------------------------------|-----------------------------------------------|
| `deserialization_firewall_attach_api_readiness` | Deserialization Firewall Attach API Readiness |
| `deserialization_firewall_functional`           | Deserialization Firewall Functional           |
| `deserialization_firewall_loaded`               | Deserialization Firewall Loaded               |
| `authorizable_node_name_generation`             | Authorizable Node Name Generation             |
| `default_login_accounts`                        | Default Login Accounts                        |
| `sling_get_servlet`                             | Sling Get Servlet                             |
| `cq_dispatcher_configuration`                   | CQ Dispatcher Configuration                   |
| `cq_html_library_manager_config`                | CQ HTML Library Manager Config                |
| `sling_java_script_handler`                     | Sling Java Script Handler                     |
| `sling_jsp_script_handler`                      | Sling JSP Script Handler                      |
| `sling_referrer_filter`                         | Sling Referrer Filter                         |
| `ssl_configuration`                             | SSL Configuration                             |
| `user_profile_default_access`                   | User Profile Default Access                   |
| `crxde_support`                                 | CRXDE Support                                 |
| `davex_health_check`                            | DavEx Health Check                            |
| `example_content_packages`                      | Example Content Packages                      |
| `wcm_filter_configuration`                      | WCM Filters Configuration                     |
| `webdav_health_check`                           | WebDAV Health Check                           |
| `web_server_configuration`                      | Web Server Configuration                      |
| `replication_and_transport_users`               | Replication and Transport Users               |

### Performance Testing

| Technical Name             | Display Name                                  |
|----------------------------|-----------------------------------------------|
| `error_rate`               | Page Request Error Rate %                     |
| `cpu_utilization_rate`     | CPU Utilization Rate                          |
| `disk_io_wait_time`        | Disk IO Wait Time                             |
| `response_time`            | 95 Percentile Response Time                   |
| `peak_resp_time`           | Peak Response Time                            |
| `views_per_minute`         | Page Views Per Minute                         |
| `disk_bandwidth_util`      | Disk Bandwidth Utilization                    |
| `network_bandwidth_util`   | Network Bandwidth Utilization                 |
| `requests_per_minute`      | Requests Per Minute                           |

### Experience Audit

| Technical Name             | Display Name                                  |
|----------------------------|-----------------------------------------------|
| `performance`              | Performance Score                             |
| `best-practices`           | Best Practices Score                          |
| `accessibility`            | Accessibility Score                           |
| `seo`                      | SEO Score                                     |
| `pwa`                      | PWA Score (not displayed)                     |
