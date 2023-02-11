import { NavLink } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

const NavBar = () => {
    const { oktaAuth, authState } = useOktaAuth();
    const login = async () => oktaAuth.signInWithRedirect();
    const logout = async () => oktaAuth.signOut('/');

    if(!authState) {
        return <div>Loading...</div>;
    } else {
        console.log(authState)
    }
    
    const user = authState?.idToken?.claims.given_name
    return (
        <nav>
            <h1>Okta General SPA</h1>
            <button onClick={login}>login</button>
            <button onClick={logout}>logout</button>
            <button><NavLink to="/protected">protected</NavLink></button>
            {authState && authState.idToken && authState.accessToken &&
            <div>
                <h3>Authenticated!</h3>
                <div id='authenticated-container'>
                    <div className="auth-box" id="claim-container">
                    <p><strong>ID Token</strong></p>
                        {Object.keys(authState.idToken.claims).map((claim, i) => {
                            const excludedClaims = ['ver', 'jti', 'idp', 'nonce', 'at_hash']
                            if (!excludedClaims.includes(claim)) {
                                const token = authState.idToken.claims
                                return (
                                    <p key={i}><strong>{claim}</strong>: {token[claim]}</p>
                                    )
                                } else {
                                    return
                                }
                            })} 
                    </div>
                    <div className="auth-box">
                        <p className="float-right"><strong>Access Token</strong></p>
                        <p>{authState.accessToken.accessToken.toString()}</p>
                    </div>
                </div>
            </div>
            }
        </nav>
    )
}

export default NavBar