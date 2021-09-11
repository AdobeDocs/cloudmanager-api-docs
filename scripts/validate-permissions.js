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

// eslint-disable-next-line node/no-unpublished-require
const yaml = require('js-yaml')
const fs = require('fs')
const permissions = require('../src/data/permissions.json')

const knownPermissions = permissions.map(perm => `${perm.method} ${perm.path}`)

const api = yaml.load(fs.readFileSync('./swagger-specs/api.yaml', 'utf8'))
const definedRequests = Object.keys(api.paths).flatMap(path => {
  return Object.keys(api.paths[path]).filter(method => method !== 'get').map(method => {
    return {
      request: `${method.toUpperCase()} ${path}`,
      method: method.toUpperCase(),
      path: path,
      operationId: api.paths[path][method].operationId,
    }
  })
})

const requestsWithoutPermissions = definedRequests.filter(req => !knownPermissions.includes(req.request))

if (requestsWithoutPermissions.length !== 0) {
  console.error(`Not all mutation requests have defined permissions: ${requestsWithoutPermissions.map(req => req.request).join(', ')}`)
  const newRequests = []
  requestsWithoutPermissions.forEach(req => {
    newRequests.push({
      operation: req.operationId,
      profiles: 'TODO',
      method: req.method,
      path: req.path,
    })
  })
  console.log(JSON.stringify(newRequests, null, 4))
  throw new Error()
} else {
  console.log('Permissions OK')
}
