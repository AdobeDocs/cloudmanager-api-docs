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

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { css } from '@emotion/react'
import classNames from 'classnames'
import { createHashHistory } from 'history'
import { ActionButton } from '@adobe/gatsby-theme-aio/src/components/ActionButton'
import { InlineAlert } from '@adobe/gatsby-theme-aio/src/components/InlineAlert'
import { CodeBlock } from '@adobe/gatsby-theme-aio/src/components/CodeBlock'
import { Heading3 } from '@adobe/gatsby-theme-aio/src/components/Heading'
import { Code } from '@adobe/gatsby-theme-aio/src/components/Code'
import { Divider } from '@adobe/gatsby-theme-aio/src/components/Divider'
import { Accordion, AccordionItem } from '@adobe/gatsby-theme-aio/src/components/Accordion'
import { Tabs, Item as TabsItem, Label as TabsItemLabel, TabsIndicator, positionIndicator } from '@adobe/gatsby-theme-aio/src/components/Tabs'
import debounce from 'lodash.debounce'
import { CM_ENDPOINTS, PROD_CM_ENDPOINT, DEBOUNCE_DELAY } from './constants'
import '@spectrum-css/fieldlabel'
import LinkTable from './link-table'
import commonProptypes from './common-proptypes'
import './playground.css'

const RequestPane = ({
  orgId,
  adobeIdData,
  accessToken,
  clientId,
}) => {
  const [history] = useState(createHashHistory())

  const defaultRequest = {
    method: 'GET',
    path: (history && history.location && history.location.pathname !== '/' && history.location.pathname) || '/api/programs',
  }
  const [request, internalSetRequest] = useState(defaultRequest)
  const [response, setResponse] = useState(null)
  const [requestRunning, setRequestRunning] = useState(false)
  const [error, setError] = useState(false)

  const [endpoint, setEndpoint] = useState(adobeIdData.environment === 'prod' ? CM_ENDPOINTS.prod : CM_ENDPOINTS.stage)
  const [customEndpointShown, setCustomEndpointShow] = useState(false)

  // tabs
  const structuredTab = useRef()
  const rawTab = useRef()
  const requestTab = useRef()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedTabIndicator = useRef()

  const positionSelectedTabIndicator = useCallback((index) => {
    let selectedTab
    switch (index) {
      case 0:
        selectedTab = structuredTab
        break
      case 1:
        selectedTab = rawTab
        break
      case 2:
        selectedTab = requestTab
        break
    }

    if (selectedTab && selectedTab.current && selectedTabIndicator.current) {
      positionIndicator(selectedTabIndicator, selectedTab)
    }
  }, [structuredTab, rawTab, requestTab])

  useEffect(() => {
    positionSelectedTabIndicator(selectedIndex)
  }, [positionSelectedTabIndicator, selectedIndex])

  // requests created through this function always generate history entries
  const setRequest = useCallback((req) => {
    internalSetRequest({
      ...req,
      skipHistoryEntry: false,
    })
  }, [internalSetRequest])

  const makeRequest = useCallback((req, organizationId) => {
    setRequestRunning(true)
    axios({
      url: `https://${endpoint}${req.path}`,
      method: req.method,
      data: (req.body && req.body !== '') ? JSON.parse(req.body) : undefined,
      headers: {
        authorization: `Bearer ${accessToken.token}`,
        'x-api-key': clientId,
        'x-gw-ims-org-id': organizationId,
      },
    }).then(response => {
      setRequestRunning(false)
      setError(false)
      setResponse(response)
    }).catch(error => {
      setRequestRunning(false)
      setError(true)
      setResponse(error.response)
    }).finally(() => {
      if (!req.skipHistoryEntry) {
        history.push(req.path)
      }
    })
  }, [accessToken.token, clientId, endpoint, history])

  useEffect(() => makeRequest(request, orgId), [request, orgId, makeRequest])

  history.listen(({ action, location }) => {
    if (action === 'POP' && location.pathname && location.pathname !== '/' && location.pathname !== request.path) {
      internalSetRequest({
        method: 'GET',
        path: location.pathname,
        skipHistoryEntry: true,
      })
    }
  })

  const stringify = (obj) => `${JSON.stringify(obj, null, 2)}`

  const outputRawResponse = () => {
    const responseBody = response ? stringify(response.data) : ''

    const responseHeaders = response ? Object.keys(response.headers).map(headerName => `${headerName}: ${response.headers[headerName]}`).join('\n') : ''

    return (
      <CodeBlock languages="JSON,TEXT,TEXT"
      theme="light"
      heading1={
        <Heading3>Response Body</Heading3>
      }
      code1={
        <Code className="language-json" theme="light">{responseBody}</Code>
      }
      heading2={
        <Heading3>Response Headers</Heading3>
      }
      code2={
        <Code className="language-text" theme="light">{responseHeaders}</Code>
      } />
    )
  }

  const outputStructuredResponse = () => {
    if (!response || !response.data) {
      return (<div />)
    }

    return outputStructuredData(response.data)
  }

  const outputRequest = () => {
    let requestText = `${request.method} ${request.path}
host: ${endpoint}
x-api-key: YOUR_KEY
x-gw-ims-org-id: ${orgId}
authorization: Bearer YOUR_TOKEN`

    if (request.method === 'PUT' || request.method === 'POST' || request.method === 'PATCH') {
      requestText = `${requestText}
content-type: application/json`
    }
    if (request.body && request.body !== '') {
      requestText = `${requestText}
${request.body}`
    }

    return (<Code className="language-text" theme="light">{requestText}</Code>)
  }

  const outputStructuredData = (data) => {
    const structure = { ...data }
    const links = structure._links || {}
    const embedded = structure._embedded || {}

    delete structure._links
    delete structure._embedded

    const json = stringify(structure)

    return (
      <>
        <Code className="language-json" theme="light">{json}</Code>
        <Accordion>
          <AccordionItem header="Links">
            <LinkTable links={links} setRequest={setRequest} response={data}/>
          </AccordionItem>
          {Object.keys(embedded).map((embeddedName) => {
            const key = `embedded-${embeddedName}`
            const objects = embedded[embeddedName]
            return (
              <AccordionItem header={`Embedded - ${embeddedName}`} key={key}>
                <Accordion>
                {objects.map((embeddedObject, idx) => {
                  return (
                  <AccordionItem key={idx} header={idx.toString()}>
                    {outputStructuredData(embeddedObject)}
                  </AccordionItem>
                  )
                })}
                </Accordion>
              </AccordionItem>
            )
          })}
          </Accordion>
      </>
    )
  }

  const selectTab = (idx) => {
    setSelectedIndex(idx)
    positionSelectedTabIndicator(idx)
  }

  const onEndpointChange = useMemo(() => debounce((event) => setEndpoint(event.target.value), DEBOUNCE_DELAY), [])

  const showCustomEndpoint = () => {
    return (
      <>
        <label htmlFor="endpoint" className="spectrum-FieldLabel spectrum-FieldLabel--sizeM">Endpoint&nbsp;
          <a onClick={() => setCustomEndpointShow(!customEndpointShown)} css={css`
            color: var(--spectrum-global-color-blue-500);
            cursor: pointer;
          `}>{ customEndpointShown ? 'Hide' : 'Show' }</a>
        </label>
        {customEndpointShown && (
        <>
          &nbsp;<div className="spectrum-Textfield cmapi-playground-Textfield--wide">
            <input type="text" name="endpoint" value={endpoint} onChange={onEndpointChange}
              className="spectrum-Textfield-input" />
          </div>&nbsp;
        </>)}
      </>
    )
  }

  const onPathChange = useMemo(() => debounce((event) => setRequest({ method: 'GET', path: event.target.value }), DEBOUNCE_DELAY), [setRequest])

  return (
    <section className="cmapi-playground-request-container" css={css`
      .spectrum-Textfield.cmapi-playground-Textfield--wide {
        width: var(--spectrum-global-dimension-size-5000);
      }
    `}>
      <section className="cmapi-playground-request-header">
        <label htmlFor="path" className="spectrum-FieldLabel spectrum-FieldLabel--sizeM">Path</label>
        <div className="spectrum-Textfield cmapi-playground-Textfield--wide">
          <input type="text" name="path" value={request.path} onChange={onPathChange}
            className="spectrum-Textfield-input" onKeyDown={(e) => e.key === 'Enter' && makeRequest(request, orgId)}
          />
        </div>&nbsp;
        <ActionButton onClick={() => {
          setRequest({
            ...request,
            method: 'GET',
          })
        }} disabled={requestRunning}>Go</ActionButton>&nbsp;
        <ActionButton onClick={() => setRequest({ method: 'GET', path: '/api/programs', body: '' })} disabled={requestRunning}>Reset</ActionButton><br/>
        {endpoint !== PROD_CM_ENDPOINT && showCustomEndpoint()}
      </section>
      <Divider orientation="horizontal" size="M"/>
      {error && <InlineAlert variant="error" text={<span>Unable to execute request. More information may be visible in the browser console.</span>} />}
      <Tabs>
        <TabsItem ref={structuredTab} selected={selectedIndex === 0} onClick={() => selectTab(0)}>
          <TabsItemLabel>Structured Response</TabsItemLabel>
        </TabsItem>
        <TabsItem ref={rawTab} selected={selectedIndex === 1} onClick={() => selectTab(1)}>
          <TabsItemLabel>Raw Response</TabsItemLabel>
        </TabsItem>
        <TabsItem ref={requestTab} selected={selectedIndex === 2} onClick={() => selectTab(2)}>
          <TabsItemLabel>Request</TabsItemLabel>
        </TabsItem>
        <TabsIndicator ref={selectedTabIndicator} />
      </Tabs>
      <section className={classNames('cmapi-playground-response-structured', { 'cmapi-playground-response-hidden': selectedIndex !== 0 })}>{outputStructuredResponse()}</section>
      <section className={classNames('cmapi-playground-response-raw', { 'cmapi-playground-response-hidden': selectedIndex !== 1 })}>{outputRawResponse()}</section>
      <section className={classNames('cmapi-playground-request', { 'cmapi-playground-response-hidden': selectedIndex !== 2 })}>{outputRequest()}</section>
    </section>
  )
}

RequestPane.propTypes = {
  adobeIdData: commonProptypes.adobeIdData,
  accessToken: commonProptypes.accessToken,
  clientId: PropTypes.string.isRequired,
  orgId: PropTypes.string.isRequired,
}

export default RequestPane
