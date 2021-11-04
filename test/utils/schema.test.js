/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { getDefinitionNameFromRef, addComment, addAnnotations } from '../../src/utils/schema'

describe('getDefinitionNameFromRef', () => {
  test('works', () => {
    const ref = '#/definitions/Foo'
    expect(getDefinitionNameFromRef(ref)).toBe('Foo')
  })
})

describe('addComment', () => {
  test('simple', () => {
    const json = `
{
  "status": "ready",
  "organisation": {
    "status": "ready"
  }
}
`
    expect(addComment(json, 2, 'status', 'some comment on status')).toBe(`
{
  // some comment on status
  "status": "ready",
  "organisation": {
    "status": "ready"
  }
}
`)
  })
})

describe('addAnnotations', () => {
  test('simple', () => {
    const json = `
{
  "status": "ready",
  "organisation": {
    "status": "ready"
  }
}
`
    const schema = {
      properties: {
        status: {
          description: 'some comment on status',
        },
      },
    }
    expect(addAnnotations(json, 2, schema)).toBe(`
{
  // some comment on status
  "status": "ready",
  "organisation": {
    "status": "ready"
  }
}
`)
  })

  test('reference', () => {
    const json = `
{
  "status": "ready1",
  "organisation": {
    "status": "ready2"
  },
  "second" : {
    "status": "ready3"
  }
}
`
    const schema = {
      properties: {
        status: {
          description: 'some comment on status',
        },
        organisation: {
          $ref: '#/definitions/Organisation',
        },
      },
    }

    const fullSwagger = {
      definitions: {
        Organisation: {
          properties: {
            status: {
              description: 'some comment on org status',
            },
          },
        },
      },
    }

    expect(addAnnotations(json, 2, schema, fullSwagger)).toBe(`
{
  // some comment on status
  "status": "ready1",
  "organisation": {
    // some comment on org status
    "status": "ready2"
  },
  "second" : {
    "status": "ready3"
  }
}
`)
  })

  test('array', () => {
    const json = `
{
  "status": "ready1",
  "organisations": [
    {
      "status": "ready2"
    },
    {
      "status": "ready3"
    }
  ],
  "otherArray" : [
    {
      "status": "ready5"
    },
    {
      "status": "ready6"
    }
  ]
}
`
    const schema = {
      properties: {
        status: {
          description: 'some comment on status',
        },
        organisations: {
          type: 'array',
          items: {
            $ref: '#/definitions/Organisation',
          },
        },
      },
    }

    const fullSwagger = {
      definitions: {
        Organisation: {
          properties: {
            status: {
              description: 'some comment on org status',
            },
          },
        },
      },
    }

    const annotated = addAnnotations(json, 2, schema, fullSwagger)
    expect(annotated).toBe(`
{
  // some comment on status
  "status": "ready1",
  "organisations": [
    {
      // some comment on org status
      "status": "ready2"
    },
    {
      // some comment on org status
      "status": "ready3"
    }
  ],
  "otherArray" : [
    {
      "status": "ready5"
    },
    {
      "status": "ready6"
    }
  ]
}
`)
  })

  test('array of object', () => {
    const json = `
{
  "name": "DEPLOY_106",
  "type": "DEPLOY",
  "environmentId": "106",
  "environmentType": "stage",
  "steps": [
    {
      "name": "deploy",
      "options": {
        "dispatcherCacheInvalidationPaths": [
          "/content/mysite/home.html"
        ],
        "dispatcherCacheFlushPaths": [
          "/etc.clientlibs"
        ]
      }
    },
    {
      "name": "loadTest",
      "options": {
        "popularPagesWeight": 70,
        "otherPagesWeight": 20,
        "newPagesWeight": 10
      }
    }
  ]
}
`

    const schema = {
      properties: {
        steps: {
          type: 'array',
          description: 'Steps to be included in the phase in execution order. Might be added or not, depending on permissions or configuration',
          items: {
            $ref: '#/definitions/PipelineStep',
          },
        },
      },
    }

    const fullSwagger = {
      definitions: {
        PipelineStep: {
          properties: {
            name: {
              type: 'string',
              example: 'deploy',
              description: 'Name of the step',
            },
            options: {
              type: 'object',
              description: 'Map of option parameters for the step',
              $ref: '#/definitions/PipelineStepOptions',
            },
          },
        },
        PipelineStepOptions: {
          properties: {
            dispatcherCacheInvalidationPaths: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'For deploy steps on AMS pipelines, list of paths to invalidate on dispatchers after package installation.',
            },
            dispatcherCacheFlushPaths: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'For deploy steps on AMS pipelines, list of paths to flush on dispatchers after package installation.',
            },
            popularPagesWeight: {
              type: 'integer',
              format: 'int32',
              description: 'For loadTest steps on AMS pipelines, the percentage of performance test traffic which will be sent to the popular pages bucket.',
            },
            newPagesWeight: {
              type: 'integer',
              format: 'int32',
              description: 'For loadTest steps on AMS pipelines, the percentage of performance test traffic which will be sent to the new pages bucket.',
            },
            otherPagesWeight: {
              type: 'integer',
              format: 'int32',
              description: 'For loadTest steps on AMS pipelines, the percentage of performance test traffic which will be sent to the other pages bucket.',
            },
          },
        },
      },
    }

    const annotated = addAnnotations(json, 2, schema, fullSwagger)
    expect(annotated).toBe(`
{
  "name": "DEPLOY_106",
  "type": "DEPLOY",
  "environmentId": "106",
  "environmentType": "stage",
  // Steps to be included in the phase in execution order. Might be added or not, depending on permissions or configuration
  "steps": [
    {
      // Name of the step
      "name": "deploy",
      // Map of option parameters for the step
      "options": {
        // For deploy steps on AMS pipelines, list of paths to invalidate on dispatchers after package installation.
        "dispatcherCacheInvalidationPaths": [
          "/content/mysite/home.html"
        ],
        // For deploy steps on AMS pipelines, list of paths to flush on dispatchers after package installation.
        "dispatcherCacheFlushPaths": [
          "/etc.clientlibs"
        ]
      }
    },
    {
      // Name of the step
      "name": "loadTest",
      // Map of option parameters for the step
      "options": {
        // For loadTest steps on AMS pipelines, the percentage of performance test traffic which will be sent to the popular pages bucket.
        "popularPagesWeight": 70,
        // For loadTest steps on AMS pipelines, the percentage of performance test traffic which will be sent to the other pages bucket.
        "otherPagesWeight": 20,
        // For loadTest steps on AMS pipelines, the percentage of performance test traffic which will be sent to the new pages bucket.
        "newPagesWeight": 10
      }
    }
  ]
}
`)
  })
})
