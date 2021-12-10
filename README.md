# Adobe Cloud Manager API Documentation

This projects builds the documentation for the [Cloud Manager API](https://www.adobe.io/apis/experiencecloud/cloud-manager/docs.html) using
the [Adobe I/O Gatsby Theme](https://github.com/adobe/aio-theme).

## How to develop

### Requirements

* Node 14.x
* Yarn 1.22.x

### Building Locally

For local development, simply use :
```
$ yarn install
$ yarn dev
```

## Launching a deploy

You can deploy using the GitHub actions deploy workflow see [deploy instructions](https://github.com/adobe/aio-theme#deploy-to-azure-storage-static-websites).

## Creating a new Guide

Creating a new guide page generally consists of three steps (and one optional step):

1. Create a new Markdown file under `pages/guides/api-usage` or `pages/guides/getting-started`. More likely the former than the latter.
2. Adding a new `DiscoverBlock` to the `index.md` file in one of those directories (the same directory the new guide is in) -- this will automatically cause the guide block to appear on the `/guides` page in the appropriate section.
3. Add a new page item to `gatsby-config.js` -- this will cause the guide to appear in the navigation.
4. (if appropriate) Add a new `DiscoverBlock` to `pages/index.md` -- this will cause the guide to appear on the home page.

If you are running `yarn dev` the whole time, you should be able to instantly view your changes.
