import { NavLink } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

const NavBar = () => {
    const { oktaAuth, authState } = useOktaAuth();
    const login = async () => oktaAuth.signInWithRedirect();
    const logout = async () => oktaAuth.signOut('/');

    if(!authState) {
        return <div>Loading...</div>;
    } 
    
    const user = authState?.idToken?.claims.given_name
    return (
        <nav>
            <h1>Okta General SPA</h1>
            <button onClick={login}>login</button>
            <button onClick={logout}>logout</button>
            <button><NavLink to="/auth-required/profile">profile</NavLink></button>
            {authState && authState.idToken && authState.accessToken &&
            <div>
                <h3>Authenticated!</h3>
                <p>User: {authState.idToken.claims.email}</p>
            </div>
            }
        </nav>
    )
}

export default NavBar