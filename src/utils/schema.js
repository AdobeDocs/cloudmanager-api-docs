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

export const getDefinitionNameFromRef = (refValue) => refValue.substring(14)

const splitLines = (str) => str.split(/\r?\n/)

const splitDoRejoin = (str, callback) => {
  if (str) {
    const lines = splitLines(str)
    return lines.flatMap(callback).join('\n')
  }
  return str
}

const replaceLines = (str, startLine, endLine, replacement) => {
  const arr = splitLines(str)
  return [
    ...arr.slice(0, startLine),
    replacement,
    ...arr.slice(endLine + 1),
  ].join('\n')
}

export const extractObject = (jsonString, level, field, endToken) => {
  const startLinePrefix = `${' '.repeat(level)}"${field}": `
  const endLinePrefix = `${' '.repeat(level)}${endToken}`
  const result = {
    found: false,
    startLine: 0,
    endLine: 0,
    jsonString: undefined,
  }
  let inside = false
  const jsonStringLines = []
  const lines = splitLines(jsonString)
  lines.forEach((line, index) => {
    if (!result.found && line.startsWith(startLinePrefix)) {
      result.found = true
      result.startLine = index
      inside = true
      jsonStringLines.push(line.substring(startLinePrefix.length))
    } else if (inside) {
      jsonStringLines.push(line)
      if (line.startsWith(endLinePrefix)) {
        result.endLine = index
        inside = false
      }
    }
  })
  if (result.found) {
    result.jsonString = jsonStringLines.join('\n')
  }
  return result
}

export const addComment = (jsonString, level, field, comment) => {
  const regex = new RegExp(`^(?<leading>\\s{${level}})"${field}"`)
  return splitDoRejoin(jsonString, line => {
    const match = regex.exec(line)
    if (match) {
      return [
        `${match.groups.leading}// ${comment}`,
        line,
      ]
    } else {
      return line
    }
  })
}

export const addAnnotations = (json, level, schemaData, fullSwagger) => {
  if (schemaData && schemaData.properties) {
    Object.keys(schemaData.properties).forEach(propName => {
      const property = schemaData.properties[propName]
      const description = property.description
      if (description) {
        json = addComment(json, level, propName, description.replace(/\s+/g, ' '))
      }

      if (property.$ref) {
        const objectSchema = fullSwagger.definitions[getDefinitionNameFromRef(property.$ref)]
        if (objectSchema) {
          const extractedObject = extractObject(json, level, propName, '}')
          if (extractedObject.found) {
            let annotatedObject = addAnnotations(extractedObject.jsonString, level + 2, objectSchema, fullSwagger)
            annotatedObject = `${' '.repeat(level)}"${propName}": ${annotatedObject}`
            json = replaceLines(json, extractedObject.startLine, extractedObject.endLine, annotatedObject)
          }
        }
      }

      if (property.type === 'array' && property.items) {
        if (property.items.$ref) {
          const arraySchema = fullSwagger.definitions[getDefinitionNameFromRef(property.items.$ref)]
          if (arraySchema) {
            const extractedObject = extractObject(json, level, propName, ']')
            if (extractedObject.found) {
              let annotatedObject = addAnnotations(extractedObject.jsonString, level + 4, arraySchema, fullSwagger)
              annotatedObject = `${' '.repeat(level)}"${propName}": ${annotatedObject}`
              json = replaceLines(json, extractedObject.startLine, extractedObject.endLine, annotatedObject)
            }
          }
        }
      }
    })
  }
  return json
}
