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

const ModelDefinitions = ({ data, exclusions, defaultOpen }) => {
  const definitions = data.definitions

  const renderString = (propertyDef) => {
    const { description } = propertyDef
    const constantValue = propertyDef.const
    return (
        <div>
            <code className="spectrum-Code spectrum-Code--sizeS" style={{ display: 'block' }}><strong>string</strong></code>
            {description}
            {constantValue
              ? (
                <span style={{ display: 'block' }}>Constant Value:&nbsp;
                  <code className="spectrum-Code spectrum-Code--sizeS">{constantValue}</code>
                </span>
                )
              : ''}
        </div>
    )
  }

  const renderObject = (obj, name) => {
    let className = 'spectrum-Accordion-item'
    if (!name || (defaultOpen && defaultOpen.includes(name))) {
      className += ' is-open'
    }

    return (
        <div className={className} role="presentation">

            <h3 className="spectrum-Accordion-itemHeading">
            <button className="spectrum-Accordion-itemHeader" type="button" id="spectrum-accordion-item-0-header" aria-controls="spectrum-accordion-item-0-content" aria-expanded="true">
                {name || 'Schema'}
            </button>
            <svg className="spectrum-Icon spectrum-UIIcon-ChevronRight100 spectrum-Accordion-itemIndicator" focusable="false" aria-hidden="true">
              <path
                d="M4.5 13.25a1.094 1.094 0 01-.773-1.868L8.109 7 3.727 2.618A1.094 1.094 0 015.273 1.07l5.157 5.156a1.094 1.094 0 010 1.546L5.273 12.93a1.091 1.091 0 01-.773.321z"
                className="spectrum-UIIcon--large"></path>
              <path
                d="M3 9.95a.875.875 0 01-.615-1.498L5.88 5 2.385 1.547A.875.875 0 013.615.302L7.74 4.377a.876.876 0 010 1.246L3.615 9.698A.872.872 0 013 9.95z"
                className="spectrum-UIIcon--medium"></path>
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

  const filteredNames = Object.keys(definitions).filter(name => exclusions ? !exclusions.includes(name) : true)

  return (
    <div className="spectrum-Accordion" role="region">
        {filteredNames.map(name => renderObject(definitions[name], name))}
    </div>
  )
}

ModelDefinitions.propTypes = {
  data: PropTypes.shape({
    definitions: PropTypes.object.isRequired,
  }).isRequired,
  defaultOpen: PropTypes.arrayOf(PropTypes.string),
  exclusions: PropTypes.arrayOf(PropTypes.string),
}

export default ModelDefinitions
