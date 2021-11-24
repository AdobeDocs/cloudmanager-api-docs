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

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Epoch = ({ addition }) => {
  const value = Math.floor((addition + Date.now()) / 1000)
  return (
        <Fragment>
            {value}
        </Fragment>
  )
}

Epoch.propTypes = {
  addition: PropTypes.number.isRequired,
}

export default Epoch
