import React from 'react';

import * as ROLES from '../../constants/roles'
import { withAuthorization } from '../Session';

const Admin = () => (
  <div>
    <h1>Admin</h1>
  </div>
);

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default withAuthorization(condition)(Admin);