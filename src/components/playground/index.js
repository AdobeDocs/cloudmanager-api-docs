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

import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { Heading1 } from '@adobe/gatsby-theme-aio/src/components/Heading'
import DisabledPlayground from './disabled'
import PlaygroundHeader from './playground-header'
import RequestPane from './request-pane'
import { InlineAlert } from '@adobe/gatsby-theme-aio/src/components/InlineAlert'
import { ActionButton, Text } from '@adobe/gatsby-theme-aio/src/components/ActionButton'
import { Bug } from '@adobe/gatsby-theme-aio/src/components/Icons'
import { ISSUE_URL } from './constants'

const addScript = (url) =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = (val) => resolve(val)
    script.onerror = (err) => reject(err)
    script.onabort = (err) => reject(err)

    document.head.appendChild(script)
  })

const Playground = () => {
  const [ims, setIms] = useState(null)
  const [isLoadingIms, setIsLoadingIms] = useState(true)
  const [clientId, setClientId] = useState(null)
  const [profile, setProfile] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [orgId, setOrgId] = useState(null)

  // Load and initialize IMS
  useEffect(() => {
    const IMS_SRC = process.env.GATSBY_IMS_SRC
    const IMS_CONFIG = process.env.GATSBY_IMS_CONFIG

    if (IMS_SRC && IMS_CONFIG) {
      (async () => {
        try {
          await addScript(`${IMS_SRC}`)
          const IMS_CONFIG_JSON = JSON.parse(IMS_CONFIG)
          setClientId(IMS_CONFIG_JSON.client_id)
          IMS_CONFIG_JSON.onReady = () => {
            setIms(window.adobeIMS)
          }
          window.adobeImsFactory.createIMSLib(IMS_CONFIG_JSON)
          window.adobeIMS.initialize()
        } catch (e) {
          console.error('AIO: IMS error.')
        } finally {
          setIsLoadingIms(false)
        }
      })()
    } else {
      console.warn('AIO: IMS config missing.')
      setIsLoadingIms(false)
    }
  }, [])
  useEffect(() => {
    if (ims && !isLoadingIms) {
      setAccessToken(ims.getAccessToken())
      ims.getProfile().then((profile) => {
        setProfile(profile)
      })
    }
  }, [ims, isLoadingIms])

  const playgroundEnabled = clientId && ims && accessToken

  return (
    <section className="cmapi-playground-wrapper" css={css`
    margin: var(--spectrum-global-dimension-size-300);
    `}>
      <header className="cmapi-playground-header">
        <div css={css`
          display: flex;
          flex-direction: row;
        `}>
          <span css={css`
          flex-grow: 1;
          `}><Heading1 >Cloud Manager API Playground</Heading1></span>
          <ActionButton
          href={ISSUE_URL}
          elementType="a"
          target="_new"
          css={css`
            margin-left: var(--spectrum-global-dimension-size-100);
          `}>
            <Bug />
            <Text>Log an issue</Text>
          </ActionButton>
        </div>
        <p className="spectrum-Body spectrum-Body--sizeS" css={css`
          font-size: inherit !important;
          margin-bottom: inherit !important;
        `}>
          The Cloud Manager API Playground enables authorized users to make API calls to the Cloud Manager API using their current user account. The tabs shown below will
          populate with the API responses allow you to navigate through the API.
        </p>
        <InlineAlert variant="warning" text={<span>The playground is an early access work-in-progress. It may not be fully functional. If you run into issues, please log an issue using the button above.</span>}/>
        {(profile && playgroundEnabled) ? (<PlaygroundHeader adobeIdData={ims.adobeIdData} accessToken={accessToken} clientId={clientId} setOrgId={setOrgId} profile={profile}/>) : (<DisabledPlayground isWaitingForLogin={clientId && ims && !accessToken}/>)}
      </header>
      <section className="cmapi-playground-body">
        {(orgId && playgroundEnabled) ? <RequestPane adobeIdData={ims.adobeIdData} accessToken={accessToken} clientId={clientId} orgId={orgId} /> : <></>}
      </section>
    </section>
  )
}

export default Playground
