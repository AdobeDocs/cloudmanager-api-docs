---
title: Tutorial - Cloud Manager API
description: This is the start of a tutorial for the Cloud Manager API
keywords:
  - Experience Cloud
  - Adobe Experience Manager
  - API Documentation
  - Cloud Manager
  - Tutorial
  - JavaScript
---

# Tutorial Introduction

The Cloud Manager API Tutorial walks through the process of creating an integration between Cloud Manager and either Microsoft Teams or Slack.

The files used in this tutorial can all be found in GitHub in the repository at [https://github.com/AdobeDocs/cloudmanager-api-tutorial](https://github.com/AdobeDocs/cloudmanager-api-tutorial). The result of each tutorial step is in a separate file:

| Step | Description                     | File             |
|------|---------------------------------|------------------|
| 1    | Basic Webhook Setup             | `step1.js`       |
| 2    | Webhook Signature Validation    | `step2.js`       |
| 3    | Looking for Specific Event Type | `step3.js`       |
| 4    | Getting an Access Token         | `step4.js`       |
| 5    | Getting Execution Data          | `step5.js`       |
| 6    | Getting Program Data            | `step6.js`       |
| 7    | Notifying Slack                 | `step7-slack.js` |
| 7    | Notifying Microsoft Teams       | `step7-teams.js` |

## Prerequisites

Before starting the tutorial, you must first set up an project in the <a href="https://developer.adobe.com/console/projects" target="_new">Adobe Developer Console</a>. First, follow the instructions on the [Creating an API Integration](/guides/getting-started/create-api-integration/) to create an API integration. You'll add the Event Provider integration in a later step.

## Project Initialization

### Configuration Variables

This tutorial does involve coding, so you're going to want to open up your favorite IDE now. Create a new project in your IDE with an empty folder. In this project, create a file named `.env`. This file is going to hold various configuration variables which should be kept out of the code.

Populate this file with the following content:

```text
PORT=4000
ORGANIZATION_ID=
CLIENT_ID=
CLIENT_SECRET=
GRANT_TYPE=client_credentials
SCOPES=
```

Let's go through each of these and set them.

1. `PORT` -- this is the port on which the webhook will listen. 4000 is a good default value, unless something else is using this port.
2. `ORGANIZATION_ID` -- this can be found in the Credentials details section of the Adobe Developer Console.
3. `CLIENT_ID` -- this can be found in the Credentials details section of the Adobe Developer Console.
4. `CLIENT_SECRET` -- this can be found in the Credentials details section of the Adobe Developer Console. Note that you have to click the `Retrieve client secret` button to reveal this.
5. `GRANT_TYPE` -- this is equal to **client_credentials**.
6. `SCOPES` -- this can be found in the Credentials details section of the Adobe Developer Console.

### Node.js Installation

This tutorial is written in JavaScript using <a href="https://nodejs.org/" target="_new">Node.js</a>. If you don't have Node.js installed, now is the time to do so. You'll also need npm, the Node Package Manager, as this tutorial uses a number of third-party dependencies, distributed as Node packages. Most of the time, npm is installed automatically when you install Node.js.

### Node.js Initialization

In order to use the Node packages dependened upon, you'll need to create a basic `package.json` file. To do this, open up a Terminal/Shell window in the project directory and run

```bash
npm init -y
```

from the Terminal or Shell.

### Next Step

With all that done, you're ready to start the actual tutorial. Continue to [Step 1](1-a-basic-webhook.md).
