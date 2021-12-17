---
title: Adding Custom Domain Names
description: Learn how to add your own custom domain names to an environment.
keywords:
  - Experience Cloud
  - Adobe Experience Manager
  - API Documentation
  - Cloud Manager
  - Pipeline
  - Code Quality
  - Performance Testing
  - Security Testing
---

# Adding Custom Domain Names

Custom domain names can be added to an environment in your AEM Cloud Service program through the Cloud Manager API. The steps required are:

1. Retrieve the custom domains available.
1. Obtain the DNS TXT record value of the domain you wish to add.
1. Add the custom domain using the retrieved information

This documents details the steps for adding custom domain names. Update, delete, and other APIs are available, but not covered in detail in this section.om domain name.

## Retrieve Custom Domains

Each program resource has a HAL link named `http://ns.adobe.com/adobecloud/rel/domainNames`. To generate a list of existing custom domain names in your program, execute a GET request to the HAL link.

```shell
GET https://cloudmanager.adobe.io/api/program/1234/domainNames
```

This will return a list similar to the following.

```text
{
    "_links": {
        "http://ns.adobe.com/adobecloud/rel/domain-name/certificates": {
            "href": "/api/program/1234/certificates",
            "templated": false
        },
        "http://ns.adobe.com/adobecloud/rel/domain-name/deploy": {
            "href": "/api/program/1234/domain-name/403/deploy",
            "templated": false
        },
        "http://ns.adobe.com/adobecloud/rel/domain-name/verify": {
            "href": "/api/program/1234/domain-name/403/verify",
            "templated": false
        },
        "http://ns.adobe.com/adobecloud/rel/environment": {
            "href": "/api/program/1234/environment/1",
            "templated": false
        },
        "http://ns.adobe.com/adobecloud/rel/program": {
            "href": "/api/program/1234",
            "templated": false
        },
        "self": {
            "href": "/api/program/1234/domain-name/403",
            "templated": false
        }
    },
    "id": 403,
    "name": "andu.yahoo.com",
    "dnsTxtRecord": "adobe-aem-verification=andu.yahoo.com/53/2/504af30f-3d87-4bcf-a5a1-95ecc5fb035d",
    "dnsZone": "yahoo.com.",
    "environmentId": 1,
    "certificateId": 1,
    "createdAt": "2020-07-03T10:59:35.175+0000",
    "updatedAt": "2020-07-03T10:59:35.175+0000",
    "status": "not_verified",
    "environmentName": "testenv-stage",
    "certificateName": "default-certificate-name"
}
```

## Obtain DNS TXT Record Value

To add a custom domain, you must get a DNS TXT record value and zone for the domain name. In order to do this, execute a POST request by appending `/validate` to the `http://ns.adobe.com/adobecloud/rel/domainNames` HAL link of the program.

The body of the POST request must include the following in order to validate if the domain entry can be created.

* Custom domain name 
* Environment ID
* SSL certificate ID

```shell
POST https://cloudmanager.adobe.io/api/program/1234/domainNames/validate
{
    "name": "andu.yahoo.com",
    "environmentId": 2,
    "certificateId": 1
}
```

This will return a response body that contains the domain zone and a TXT record that is used as an identifier.

```text
{
    "_links": {
        "http://ns.adobe.com/adobecloud/rel/domain-name/certificates": {
            "href": "/api/program/53/certificates",
            "templated": false
        },
        "http://ns.adobe.com/adobecloud/rel/domain-name/deploy": {
            "href": "/api/program/53/domain-name//deploy",
            "templated": false
        },
        "http://ns.adobe.com/adobecloud/rel/domain-name/verify": {
            "href": "/api/program/53/domain-name//verify",
            "templated": false
        },
        "http://ns.adobe.com/adobecloud/rel/environment": {
            "href": "/api/program/53/environment/",
            "templated": false
        },
        "http://ns.adobe.com/adobecloud/rel/program": {
            "href": "/api/program/53",
            "templated": false
        },
        "self": {
            "href": "/api/program/53/domain-name/",
            "templated": false
        }
    },
    "dnsTxtRecord": "adobe-aem-verification=andu.yahoo.com/53/2/504af30f-3d87-4bcf-a5a1-95ecc5fb035d",
    "dnsZone": "yahoo.com."
}
```

## Add Custom Domain Name

Having retrieved the necessary information you can now add your custom domain name. To do this, execute a POST request to `http://ns.adobe.com/adobecloud/rel/domainNames` HAL link of the program. 

The body of the POST request needs to include the following data.

* Custom domain name
* Environment ID
* Certificate ID
* DNS TXT record value
* DNS zone

```shell
POST https://cloudmanager.adobe.io/api/program/1234/domainNames/
{
  "name": "customer.domain.com",
  "environmentId": 0,
  "certificateId": 0,
  "dnsTxtRecord": "adobe-aem-verification=www.adobe.com/1/2/ab-cd-ef",
  "dnsZone": "adobe.com."
}
```

This will return a response similar to the following.

```text
{
"id": 0,
"name": "customer.domain.com",
"status": "ready",
"type": "CNAME",
"dnsResolution": [
{}
],
"dnsTxtRecord": "adobe-aem-verification=www.adobe.com/1/2/ab-cd-ef",
"dnsZone": "adobe.com.",
"environmentId": 0,
"environmentName": "customerEnvironmentName",
"tier": "publish",
"certificateId": 0,
"certificateName": "My certificate",
"certificateExpireAt": "2019-08-24T14:15:22Z",
"createdAt": "2019-08-24T14:15:22Z",
"updatedAt": "2019-08-24T14:15:22Z",
"_links": {
"http://ns.adobe.com/adobecloud/rel/domainName/certificates": {},
"http://ns.adobe.com/adobecloud/rel/domainName/deploy": {},
"http://ns.adobe.com/adobecloud/rel/domainName/verify": {},
"http://ns.adobe.com/adobecloud/rel/environment": {},
"http://ns.adobe.com/adobecloud/rel/program": {},
"self": {}
}
}
```

## Limitations

Usage of this API has the following limitations.

* This API is applicable to AEM as a Cloud Service. 
* Custom domain names can only be applied to production programs with Sites enabled.
