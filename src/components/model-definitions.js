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

import React from 'react'
import PropTypes from 'prop-types'
import uniqueId from 'lodash.uniqueid'
import uniq from 'lodash.uniq'
import { css } from '@emotion/react'
import { ChevronRight } from '@adobe/gatsby-theme-aio/src/components/Icons'

const DEFINITIONS_TO_NOT_SHOW_DESCRIPTIONS = ['HalLink']

const cleanRef = (() => {
  const len = '#/definitions/'.length
  return ref => ref.substring(len)
})()

const generateIds = () => {
  const id = uniqueId()
  return {
    headerId: `spectrum-accordion-item-${id}-header`,
    contentId: `spectrum-accordion-item-${id}-content`,
  }
}

const ModelDefinitions = ({ data, exclusions, defaultOpen, sort, forTag }) => {
  const definitions = data.definitions

  const renderType = (type, format, isArray) => {
    return (
      <span className="model-definition-property--type">
        {isArray ? 'Array of ' : ''}
        <code className="spectrum-Code spectrum-Code--sizeS"><strong>{type}</strong></code>
        {format && (<span className="spectrum-Detail spectrum-Detail--sizeM" css={css`text-transform: none;`}>{' '}&lt;{format}&gt;</span>)}
      </span>
    )
  }

  const renderSimple = (type, { description, const: constantValue, enum: enumValues, format }, isArray) => {
    return (
        <div css={css`
          padding-left: calc(var(--spectrum-accordion-item-padding-x, var(--spectrum-global-dimension-size-225)) + var(--spectrum-accordion-icon-width, var(--spectrum-global-dimension-size-75)) + var(--spectrum-accordion-icon-gap, var(--spectrum-global-dimension-size-100)) + var(--spectrum-accordion-item-border-left-size-key-focus, var(--spectrum-alias-border-size-thick)));
          padding-right: var(--spectrum-accordion-item-padding-x, var(--spectrum-global-dimension-size-225));
          .model-definition-property--type, .model-definition-property--attribute {
            display: block
          }
      `}>
            {renderType(type, format, isArray)}
            {description}
            {constantValue
              ? (
                <span className="model-definition-property--attribute">Constant&nbsp;Value:&nbsp;
                  <code className="spectrum-Code spectrum-Code--sizeS">{constantValue}</code>
                </span>
                )
              : ''}
            {enumValues
              ? (
                <span className="model-definition-property--attribute">Enum:&nbsp;
                  {enumValues.map((enumValue, idx) => {
                    return (
                      <span key={enumValue}><code className="spectrum-Code spectrum-Code--sizeS">{enumValue}</code>{idx !== (enumValues.length - 1) ? ', ' : ' '}</span>
                    )
                  })}
                </span>
                )
              : ''}
        </div>
    )
  }

  const renderPropertiesForObject = (properties) => {
    return (<table className="spectrum-Table">
    <tbody className="spectrum-Table-body">
    {properties && Object.keys(properties).map(propName => {
      const propertyDef = properties[propName]
      return (
            <tr className="spectrum-Table-row" key={propName}>
                <td className="spectrum-Table-cell"><code className="spectrum-Code spectrum-Code--sizeS">{propName}</code></td>
                <td className="spectrum-Table-cell">{renderProperty(propertyDef)}</td>
            </tr>
      )
    })}
    </tbody>
</table>)
  }

  const renderObjectSchema = ({ name, properties, description, isArray }) => {
    const { headerId, contentId } = generateIds()

    let className = 'spectrum-Accordion-item'
    if (!name || (defaultOpen && defaultOpen.includes(name))) {
      className += ' is-open'
    }

    return (
        <div className={className} role="presentation">

            <h3 className="spectrum-Accordion-itemHeading">
            <button className="spectrum-Accordion-itemHeader" type="button" id={headerId} aria-controls={contentId} aria-expanded="true">
                {isArray ? renderType('object', name, isArray) : name}
                {description && (<span css={css`font-size: var(--spectrum-global-dimension-font-size-50);`}>&nbsp;({description})</span>)}
            </button>
              <ChevronRight className="spectrum-Accordion-itemIndicator" />
            </h3>

            <div className="spectrum-Accordion-itemContent" role="region" id={contentId} aria-labelledby={headerId}>
                {renderPropertiesForObject(properties)}
            </div>
        </div>
    )
  }

  const renderObject = (obj, name, skipDescription) => {
    if (!obj.properties) {
      return (
        <div css={css`
          padding-left: calc(var(--spectrum-accordion-item-padding-x, var(--spectrum-global-dimension-size-225)) + var(--spectrum-accordion-icon-width, var(--spectrum-global-dimension-size-75)) + var(--spectrum-accordion-icon-gap, var(--spectrum-global-dimension-size-100)) + var(--spectrum-accordion-item-border-left-size-key-focus, var(--spectrum-alias-border-size-thick)));
          padding-right: var(--spectrum-accordion-item-padding-x, var(--spectrum-global-dimension-size-225));
        `}>
          <code className="spectrum-Code spectrum-Code--sizeS"><strong>object</strong></code>
          {obj.description && (<div>{obj.description}</div>)}
        </div>)
    }

    return renderObjectSchema({
      name: (name || 'Schema'),
      description: !skipDescription && obj.description,
      properties: obj.properties,
    })
  }

  const renderArray = (obj) => {
    if (obj.items) {
      if (obj.items.$ref) {
        const key = cleanRef(obj.items.$ref)
        const ref = definitions[key]

        return renderObjectSchema({
          name: key,
          properties: ref.properties,
          description: obj.description,
          isArray: true,
        })
      } else if (obj.items.type) {
        return renderSimple(obj.items.type, { ...obj.items, description: obj.description }, true)
      }
    } else {
      return (<div></div>)
    }
  }

  const renderProperty = (propertyDef) => {
    if (propertyDef.$ref) {
      const definitionName = cleanRef(propertyDef.$ref)
      const definition = definitions[definitionName]
      if (!definition) {
        return (<span>Unknown definition: {definitionName}</span>)
      } else {
        return renderObject({
          ...definition,
          description: !DEFINITIONS_TO_NOT_SHOW_DESCRIPTIONS.includes(definitionName) && propertyDef.description,
        }, definitionName)
      }
    } else {
      const type = propertyDef.type

      switch (type) {
        case 'string':
        case 'integer':
        case 'boolean':
          return renderSimple(type, propertyDef)
        case 'object': return renderObject(propertyDef)
        case 'array': return renderArray(propertyDef)
        default: return (<span>Unknown type: {type}</span>)
      }
    }
  }

  const getRefsFromTag = (tag) => {
    const result = Object.values(data.paths).flatMap(p => Object.values(p)).filter(entryPoint => entryPoint.tags && entryPoint.tags.includes(tag))
      .flatMap(entryPoint => {
        const responseSchemas = Object.values(entryPoint.responses).filter(response => response.schema && response.schema.$ref).map(response => response.schema.$ref)
        const requestSchemas = entryPoint.parameters.filter(param => param.in === 'body')
          .filter(requestBody => requestBody.schema && (requestBody.schema.$ref || (requestBody.schema.items && requestBody.schema.items.$ref)))
          .map(requestBody => {
            if (requestBody.schema.items && requestBody.schema.items.$ref) {
              return requestBody.schema.items.$ref
            } else {
              return requestBody.schema.$ref
            }
          })

        return [
          ...responseSchemas,
          ...requestSchemas,
        ]
      }).map(cleanRef)

    return uniq(result)
  }

  const keys = (forTag ? getRefsFromTag(forTag) : Object.keys(definitions)).filter(name => exclusions ? !exclusions.includes(name) : true)
  if (sort) {
    keys.sort()
  }

  return (
    <div className="spectrum-Accordion" role="region" css={css`
    .spectrum-Accordion-itemHeader {
      text-transform: none;
      font-size: var(--spectrum-global-dimension-font-size-100);
    }

    .spectrum-Table-cell {
      .spectrum-Accordion-itemHeader {
        padding-top: 0;
        padding-bottom: 0;
      }

      .spectrum-Accordion-item {
        border-bottom-style: none;
      }

      .spectrum-Accordion-itemContent {
        padding-top: var(--spectrum-accordion-item-title-padding-y);
      }
    }
  `}>
        {keys.map(name => renderObject(definitions[name], name, true))}
    </div>
  )
}

ModelDefinitions.propTypes = {
  data: PropTypes.shape({
    paths: PropTypes.object.isRequired,
    definitions: PropTypes.object.isRequired,
  }).isRequired,
  defaultOpen: PropTypes.arrayOf(PropTypes.string),
  exclusions: PropTypes.arrayOf(PropTypes.string),
  forTag: PropTypes.string,
  sort: PropTypes.bool,
}

export default ModelDefinitions
