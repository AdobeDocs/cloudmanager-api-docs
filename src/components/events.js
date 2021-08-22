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

import data from '../../swagger-specs/events.yaml'

const Events = () => {
  const definitions = data.definitions

  const renderString = (propertyDef) => {
    const { description } = propertyDef
    const constantValue = propertyDef.const
    return (
        <div>
            <code className="spectrum-Code spectrum-Code--sizeS" style={{ display: 'block' }}><strong>string</strong></code>
            {constantValue
              ? (
                <code className="spectrum-Code spectrum-Code--sizeS" style={{ display: 'block' }}>const: {constantValue}</code>
                )
              : ''}
            {description}
        </div>
    )
  }

  const renderObject = (obj, name) => {
    return (
        <div className="spectrum-Accordion-item is-open" role="presentation">

            <h3 className="spectrum-Accordion-itemHeading">
            <button className="spectrum-Accordion-itemHeader" type="button" id="spectrum-accordion-item-0-header" aria-controls="spectrum-accordion-item-0-content" aria-expanded="true">
                {name || 'Schema'}
            </button>
            <svg className="spectrum-Icon spectrum-UIIcon-ChevronRight100 spectrum-Accordion-itemIndicator" focusable="false" aria-hidden="true">
                <use xlinkHref="#spectrum-css-icon-Chevron100" />
            </svg>
            </h3>

            <div className="spectrum-Accordion-itemContent" role="region" id="spectrum-accordion-item-0-content" aria-labelledby="spectrum-accordion-item-0-header">
                <table className="spectrum-Table">
                    <tbody className="spectrum-Table-body">
                    {Object.keys(obj.properties).map(propName => {
                      const propertyDef = obj.properties[propName]
                      return (
                            <tr className="spectrum-Table-row" key={propName}>
                                <td className="spectrum-Table-cell"><code className="spectrum-Code spectrum-Code--sizeS">{propName}</code></td>
                                <td className="spectrum-Table-cell">{renderProperty(propertyDef)}</td>
                            </tr>
                      )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
  }

  const renderProperty = (propertyDef) => {
    if (propertyDef.$ref) {
      const definitionName = propertyDef.$ref.substring('#/definitions/'.length)
      const definition = definitions[definitionName]
      if (!definition) {
        return (<span>Unknown definition: {definitionName}</span>)
      } else {
        return renderObject(definition, definitionName)
      }
    } else {
      const type = propertyDef.type

      switch (type) {
        case 'string': return renderString(propertyDef)
        case 'object': return renderObject(propertyDef)
        default: return (<span>Unknown type: {type}</span>)
      }
    }
  }

  return (
    <div className="spectrum-Accordion" role="region">
        {Object.keys(definitions).map(name => renderObject(definitions[name], name))}
    </div>
  )
}

export default Events
