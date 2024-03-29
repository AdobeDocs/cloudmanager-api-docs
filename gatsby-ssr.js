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

import React from 'react'
import { readFileSync } from 'fs'
import { paths } from './swagger-specs/api.yaml'

const operations = Object.keys(paths).flatMap(path => {
  return Object.keys(paths[path]).map(method => `/${paths[path][method].operationId}`)
})

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script dangerouslySetInnerHTML= {{
      __html: `var allCloudManagerApiOperations = ${JSON.stringify(operations)}`,
    }} key="operations"/>,
    <script dangerouslySetInnerHTML= {{
      __html: `${readFileSync('./files/accordion.js').toString()}`,
    }} key="accordion"/>,
    <script dangerouslySetInnerHTML= {{
      __html: `${readFileSync('./files/redirections.js').toString()}`,
    }} key="redirections"/>,
  ])
}
