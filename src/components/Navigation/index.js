import React from 'react';
import { Link } from "react-router-dom";

import * as ROUTES from '../constants/routes'

const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.SIGN_IN}>Zaloguj się</Link>
      </li>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Strona główna</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Konto</Link>
      </li>
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;