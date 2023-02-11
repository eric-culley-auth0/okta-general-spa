import { NavLink } from 'react-router-dom';
import { useOktaAuth } from "@okta/okta-react";

const Profile = () => {

    const { oktaAuth, authState } = useOktaAuth();

    const displayUsersName = () => {
        const usersName = authState.idToken.claims.name;
        if (authState && authState.idToken && authState.idToken.claims.name) {
            return `${usersName}'s`
        }
    }

    return (
        <div>
            <h1>{displayUsersName()} Profile</h1>
            <h2>protected route</h2>
            <button><NavLink to="/">back home</NavLink></button>
            {authState && authState.idToken && authState.accessToken &&
            <div>
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
        </div>
    )
}

export default Profile