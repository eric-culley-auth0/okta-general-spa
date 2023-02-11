import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import HomePage from './components/HomePage'
import Protected from './components/Protected';
import { RequiresAuth } from './components/RequiresAuth';

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
          <Route path="/login/callback" element={<LoginCallback />} />
          <Route path="/protected" element={<RequiresAuth />}>
            <Route path="" element={<Protected />} />
          </Route>
        </Routes>
      </Security>
    </div>
  )
}


export default App;
