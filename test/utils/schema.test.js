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
})
