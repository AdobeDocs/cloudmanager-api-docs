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

import React, { useEffect, useState, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Picker } from '@adobe/gatsby-theme-aio/src/components/Picker'
import axios from 'axios'
import qs from 'qs'
import { IMS_ENDPOINTS, SERVICE_CODES } from './constants'
import commonProptypes from './common-proptypes'

const LOCAL_STORGAGE_ORG_ID = 'cmplayground.orgId'
const NO_ORG = '-1'

const OrgIdSelector = ({
  adobeIdData,
  accessToken,
  clientId,
  profile,
  setOrgId,
}) => {
  const [orgs, setOrgs] = useState([{
    id: NO_ORG,
    title: 'Loading...',
  }])

  const baseEndpoint = adobeIdData.environment === 'prod' ? IMS_ENDPOINTS.prod : IMS_ENDPOINTS.stage

  const organizationsWithCorrectServiceCode = useMemo(() => profile.projectedProductContext
    ? profile.projectedProductContext.map(ppc => ppc.prodCtx)
      .filter(ctx => SERVICE_CODES.includes(ctx.serviceCode)).map(ctx => ctx.owningEntity)
    : [], [profile])

  const saveAndSetOrgId = useCallback((newOrgId) => {
    if (window.localStorage) {
      window.localStorage.setItem(LOCAL_STORGAGE_ORG_ID, newOrgId)
    }
    setOrgId(newOrgId)
  }, [setOrgId])

  useEffect(() => {
    const query = qs.stringify({
      client_id: clientId,
    })

    axios({
      url: `${baseEndpoint}/ims/organizations/v6?${query}`,
      method: 'GET',
      headers: {
        authorization: `Bearer ${accessToken.token}`,
      },
    }).then(response => {
      const fromApi = response.data.map(org => {
        const fullOrgIdentity = `${org.orgRef.ident}@${org.orgRef.authSrc}`
        return {
          id: fullOrgIdentity,
          title: org.orgName,
          selected: false,
        }
      }).filter(org => organizationsWithCorrectServiceCode.includes(org.id))
      if (fromApi.length > 0) {
        const localStorageOrgId = window.localStorage.getItem(LOCAL_STORGAGE_ORG_ID)
        const localStorageReferenceOrg = localStorageOrgId && fromApi.find(org => org.id === localStorageOrgId)
        if (localStorageReferenceOrg) {
          localStorageReferenceOrg.selected = true
        }

        setOrgs([
          ...fromApi,
        ])
        setOrgId(localStorageReferenceOrg ? localStorageReferenceOrg.id : fromApi[0].id)
      } else {
        setOrgs([{
          id: NO_ORG,
          title: 'No organizations available',
        }])
      }
    })
  }, [accessToken, baseEndpoint, clientId, organizationsWithCorrectServiceCode, setOrgId])

  return (
    <Picker
    items={orgs}
    onChange={(idx) => orgs[idx].id !== NO_ORG && saveAndSetOrgId(orgs[idx].id)}>
  </Picker>
  )
}

OrgIdSelector.propTypes = {
  adobeIdData: commonProptypes.adobeIdData,
  accessToken: commonProptypes.accessToken,
  profile: commonProptypes.profile,
  clientId: PropTypes.string.isRequired,
  setOrgId: PropTypes.func.isRequired,
  orgId: PropTypes.string,
}

export default OrgIdSelector
