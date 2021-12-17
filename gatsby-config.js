/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

module.exports = {
  siteMetadata: {
    pages: [
      {
        title: 'Cloud Manager',
        path: '/',
      },
      {
        title: 'Guides',
        path: '/guides/',
      },
      {
        title: 'Tutorial',
        path: '/tutorial/',
      },
      {
        title: 'API Reference',
        menu: [{
          title: 'Cloud Manager API',
          description: 'Reference document for the Cloud Manager API',
          path: '/reference/api/',
        }, {
          title: 'Cloud Manager API Models',
          description: 'Reference document for the model objects Cloud Manager API',
          path: '/reference/models/',
        }, {
          title: 'Event Definitions',
          description: 'Definition of Event Payloads',
          path: '/reference/events/',
        }, {
          title: 'Playground',
          description: 'API Playground (Early Access)',
          path: '/reference/playground/',
        }],
      },
      {
        title: 'CLI and SDKs',
        path: '/cli-and-sdks/',
      },
    ],
    subPages: [
      {
        title: 'Getting Started',
        path: '/guides/getting-started/',
        header: true,
        pages: [
          {
            title: 'Understanding the API',
            path: '/guides/getting-started/understanding-the-api/',
          },
          {
            title: 'Create an API Integration Project',
            path: '/guides/getting-started/create-api-integration/',
          },
          {
            title: 'Create an Event Integration Project',
            path: '/guides/getting-started/create-event-integration/',
          },
          {
            path: 'guides/getting-started/authentication.md',
            title: 'Authentication',
          },
          {
            path: 'guides/getting-started/permissions.md',
            title: 'API Permissions',
          },
          {
            title: 'Getting Started with Postman',
            path: '/guides/getting-started/getting-started-with-postman/',
          },
        ],
      },
      {
        title: 'API Usage',
        path: '/guides/api-usage/',
        header: true,
        pages: [
          {
            path: 'guides/api-usage/receiving-events.md',
            title: 'Receiving Events',
          },
          {
            path: 'guides/api-usage/understanding-metric-data.md',
            title: 'Understanding Metric Data',
          },
          {
            path: 'guides/api-usage/editing-and-deleting-pipelines.md',
            title: 'Editing and Deleting Pipelines',
          },
          {
            path: 'guides/api-usage/advancing-and-cancelling-steps.md',
            title: 'Advancing and Cancelling Steps',
          },
          {
            path: 'guides/api-usage/creating-programs-and-environments.md',
            title: 'Creating Programs and Environments',
          },
          {
            path: 'guides/api-usage/adding-custom-domain-names.md',
            title: 'Adding Custom Domain Names',
          },
        ],
      },
      {
        title: 'Tutorial Overview',
        path: '/tutorial/',
      },
      {
        title: 'Step 1 - A Basic Webhook',
        path: '/tutorial/1-a-basic-webhook/',
      },
      {
        title: 'Step 2 - Webhook Signature Validation',
        path: '/tutorial/2-webhook-signature-validation/',
      },
      {
        title: 'Step 3 - Handling Specific Events',
        path: '/tutorial/3-handling-specific-events/',
      },
      {
        title: 'Step 4 - Getting an Access Token',
        path: '/tutorial/4-getting-an-access-token/',
      },
      {
        title: 'Step 5 - Getting the Execution',
        path: '/tutorial/5-getting-the-execution/',
      },
      {
        title: 'Step 6 - Getting the Program',
        path: '/tutorial/6-getting-the-program/',
      },
      {
        title: 'Step 7 - Sending Notifications',
        path: '/tutorial/7-sending-notifications/',
      },
    ],
  },
  plugins: [
    '@adobe/gatsby-theme-aio',
    {
      resolve: 'gatsby-plugin-static-folders',
      options: {
        folders: [
          './swagger-specs',
        ],
      },
    },
  ],
  pathPrefix: process.env.PATH_PREFIX || '/experience-cloud/cloud-manager/',
}
