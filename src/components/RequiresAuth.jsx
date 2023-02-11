import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { toRelativeUrl } from '@okta/okta-auth-js';
import { Outlet } from 'react-router-dom';

export const RequiresAuth = () => {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState || !authState?.isAuthenticated) {
    const originalUri = toRelativeUrl(window.location.href, window.location.origin);
    oktaAuth.setOriginalUri(originalUri);
    oktaAuth.signInWithRedirect();

    return (<h3 id='loading-icon'>Loading...</h3>);
  }

  return (<Outlet />);
}