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
import data from '../data/permissions.json'

const PermissionsTable = () => {
  const createRow = ({ operation, profiles, note, method, path }) => {
    return (
            <Fragment>
                <tr className="spectrum-Table-row">
                    <td className="spectrum-Table-cell"><code>{operation}</code></td>
                    <td className="spectrum-Table-cell">
                        {profiles}
                        {note && (<Fragment><br/><small>{note}</small></Fragment>)}
                    </td>
                </tr>
                <tr className="spectrum-Table-row">
                    <td colSpan="2" className="spectrum-Table-cell" style={{ fontSize: '75%' }}><code>{method} {path}</code></td>
                </tr>
            </Fragment>
    )
  }

  const sorted = [...data].sort((a, b) => a.path.localeCompare(b.path))

  return (
    <table className="spectrum-Table" style={{ marginTop: '2em' }}>
        <thead className="spectrum-Table-head">
            <tr>
                <th className="spectrum-Table-headCell">Operation</th>
                <th className="spectrum-Table-headCell">Product Profile(s)</th>
            </tr>
        </thead>
        <tbody className="spectrum-Table-body">
            {sorted.map(createRow)}
        </tbody>
    </table>
  )
}

export default PermissionsTable
