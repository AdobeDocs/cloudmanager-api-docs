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

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'
import '@spectrum-css/buttongroup'
import { parse } from 'uritemplate'

const TemplatedRequestDialog = ({
  path,
  currentResponse,
  onCancel,
  onSubmit,
}) => {
  const parsedTemplate = parse(path)
  const variables = parsedTemplate.expressions.filter(exp => exp.varspecs).map(exp => exp.templateText)

  const [variablesState, setVariablesState] = useState({})
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const missingVariables = variables.filter(variableName => !variablesState[variableName] || variablesState[variableName].trim() === '')
    setIsValid(missingVariables.length === 0)
  }, [variables, variablesState])

  const onDialogSubmit = () => {
    onSubmit({
      method: 'GET',
      path: parsedTemplate.expand(variablesState),
      body: '',
    })
  }

  return (
  <>
    <div onClick={onCancel} css={css`
      z-index: 10;
    `} className="spectrum-Underlay is-open"></div>
    <div className="spectrum-Modal-wrapper is-open" css={css`
        z-index: 11;
      `}>
      <div className="spectrum-Modal is-open">
        <div className="spectrum-Dialog spectrum-Dialog--large spectrum-Dialog--information" role="dialog" tabIndex="-1" aria-modal="true" css={css`
          min-height: 600px;
        `}>
          <div className="spectrum-Dialog-grid">
            <h1 className="spectrum-Dialog-heading">Templated Request</h1>
            <hr className="spectrum-Divider spectrum-Divider--sizeM spectrum-Divider--horizontal spectrum-Dialog-divider" />
            <section className="spectrum-Dialog-content" css={css`
              display: flex;
              flex-direction: column;
            `}>
              {variables.map(variableName => {
                return (
                  <div key={variableName}>
                    <label htmlFor={variableName} className="spectrum-FieldLabel spectrum-FieldLabel--sizeM">{variableName}</label>
                    <div className="spectrum-Textfield" css={css`
                      width: 100%;
                    `}>
                      <input type="text" name={variableName} className="spectrum-Textfield-input" value={variablesState[variableName]} onChange={e => {
                        const newState = { ...variablesState }
                        newState[variableName] = e.target.value
                        setVariablesState(newState)
                      }}/>
                    </div>
                  </div>

                )
              })}
            </section>
            <div className="spectrum-ButtonGroup spectrum-Dialog-buttonGroup spectrum-Dialog-buttonGroup--noFooter">
              <button className="spectrum-Button spectrum-Button--sizeM spectrum-Button--secondary spectrum-ButtonGroup-item" type="button" onClick={onCancel}>
                <span className="spectrum-Button-label">Cancel</span>
              </button>
              <button className="spectrum-Button spectrum-Button--sizeM spectrum-Button--primary spectrum-ButtonGroup-item" type="button" disabled={!isValid} onClick={onDialogSubmit}>
                <span className="spectrum-Button-label">Submit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}

TemplatedRequestDialog.propTypes = {
  path: PropTypes.string.isRequired,
  currentResponse: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default TemplatedRequestDialog
