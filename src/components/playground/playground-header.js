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
import { css } from '@emotion/react'
import OrgIdSelector from './org-id-selector'
import '@spectrum-css/fieldlabel'
import commonProptypes from './common-proptypes'

const PlaygroundHeader = ({
  adobeIdData,
  accessToken,
  clientId,
  setOrgId,
  profile,
}) => {
  return (
  <div css={css`
    margin-top: var(--spectrum-global-dimension-size-300);
  `}>
    <label className="spectrum-FieldLabel spectrum-FieldLabel--sizeM">Organization</label>
    <OrgIdSelector adobeIdData={adobeIdData} accessToken={accessToken} clientId={clientId} setOrgId={setOrgId} profile={profile} />
  </div>)
}

PlaygroundHeader.propTypes = {
  adobeIdData: commonProptypes.adobeIdData,
  accessToken: commonProptypes.accessToken,
  profile: commonProptypes.profile,
  clientId: PropTypes.string.isRequired,
  setOrgId: PropTypes.func.isRequired,
}

export default PlaygroundHeader
