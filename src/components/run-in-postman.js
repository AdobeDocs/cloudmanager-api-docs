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
import Safe from 'react-safe'

const RunInPostman = ({ collectionId, param }) => {
  return (
        <Fragment>
            <div className="postman-run-button"
                 data-postman-action="collection/import"
                 data-postman-var-1={collectionId}
                 data-postman-param={param}></div>
            <Safe.script>{
                `(function (p,o,s,t,m,a,n) {
                    !p[s] && (p[s] = function () { (p[t] || (p[t] = [])).push(arguments); });
                    !o.getElementById(s+t) && o.getElementsByTagName("head")[0].appendChild((
                      (n = o.createElement("script")),
                      (n.id = s+t), (n.async = 1), (n.src = m), n
                    ));
                  }(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js"));`
            }</Safe.script>
        </Fragment>
  )
}

RunInPostman.propTypes = {
  collectionId: PropTypes.string.isRequired,
  param: PropTypes.string.isRequired,
}

export default RunInPostman
