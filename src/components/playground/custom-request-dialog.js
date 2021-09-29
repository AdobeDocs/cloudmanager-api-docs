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

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'
import { Picker } from '@adobe/gatsby-theme-aio/src/components/Picker'
import '@spectrum-css/buttongroup'

const CustomRequestDialog = ({
  path,
  currentResponse,
  onCancel,
  onSubmit,
}) => {
  const genMethod = (name, selected = false) => {
    return {
      id: name,
      title: name,
      selected,
    }
  }
  // eslint-disable-next-line no-unused-vars
  const [methods, setMethods] = useState([
    genMethod('PUT', true),
    genMethod('POST'),
    genMethod('PATCH'),
    genMethod('DELETE'),
  ])
  const [newRequest, setNewRequest] = useState({
    method: 'PUT',
    path,
    body: JSON.stringify(currentResponse, null, 2),
  })

  const onDialogSubmit = () => {
    onSubmit(newRequest)
  }

  const selectMethod = (idx) => {
    setNewRequest({
      ...newRequest,
      method: methods[idx].id,
    })
  }

  const updatePath = (event) => {
    setNewRequest({
      ...newRequest,
      path: event.target.value,
    })
  }

  const updateBody = (event) => {
    setNewRequest({
      ...newRequest,
      body: event.target.value,
    })
  }

  const clearBody = () => {
    setNewRequest({
      ...newRequest,
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
            <h1 className="spectrum-Dialog-heading">Custom Request</h1>
            <hr className="spectrum-Divider spectrum-Divider--sizeM spectrum-Divider--horizontal spectrum-Dialog-divider" />
            <section className="spectrum-Dialog-content" css={css`
              display: flex;
              flex-direction: column;
            `}>
              <label className="spectrum-FieldLabel spectrum-FieldLabel--sizeM">Method</label>
              <Picker
                items={methods}
                onChange={selectMethod}>
              </Picker>
              <label htmlFor="path" className="spectrum-FieldLabel spectrum-FieldLabel--sizeM">Path</label>
              <div className="spectrum-Textfield" css={css`
                width: 100%;
              `}>
                <input type="text" name="path" className="spectrum-Textfield-input" value={newRequest.path} onChange={updatePath}/>
              </div>
              <label htmlFor="body" className="spectrum-FieldLabel spectrum-FieldLabel--sizeM">Request Body</label>
              <div className="spectrum-Textfield spectrum-Textfield--multiline" css={css`
                width: 100%;
                flex-grow: 1;
              `}>
                <textarea name="body" className="spectrum-Textfield-input" onChange={updateBody}>
                  {newRequest.body}
                </textarea>
              </div>

            </section>
            <div className="spectrum-ButtonGroup spectrum-Dialog-buttonGroup spectrum-Dialog-buttonGroup--noFooter">
              <button className="spectrum-Button spectrum-Button--sizeM spectrum-Button--secondary spectrum-ButtonGroup-item" type="button" onClick={clearBody}>
                <span className="spectrum-Button-label">Clear Body</span>
              </button>
              <button className="spectrum-Button spectrum-Button--sizeM spectrum-Button--secondary spectrum-ButtonGroup-item" type="button" onClick={onCancel}>
                <span className="spectrum-Button-label">Cancel</span>
              </button>
              <button className="spectrum-Button spectrum-Button--sizeM spectrum-Button--primary spectrum-ButtonGroup-item" type="button" onClick={onDialogSubmit}>
                <span className="spectrum-Button-label">Submit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}

CustomRequestDialog.propTypes = {
  path: PropTypes.string.isRequired,
  currentResponse: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default CustomRequestDialog
