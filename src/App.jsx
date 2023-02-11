import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { SecureRoute, Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import HomePage from './components/HomePage'

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-16396447.okta.com/oauth2/default',
  clientId: '0oa89uw0cnKkVepzQ5d7',
  redirectUri: window.location.origin + '/login/callback'
});

function App() {
  const [count, setCount] = useState(0)

  const navigate = useNavigate();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin), {replace: true});
  };
  

  return (
    <div className="App">
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/protected" element={<div>Protected Route</div>} />
          <Route path="/login/callback" element={<LoginCallback />} />
        </Routes>
      </Security>
    </div>
  )
}


export default App;
