import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useOktaAuth } from "@okta/okta-react";
import axios from 'axios';

const Fetch = () => {

    const [fetchData, setFetchData] = useState([] );

    const { authState } = useOktaAuth();

    const token = authState?.accessToken?.accessToken;

    const fetch = async (aToken) => {
        try {
            const resp = await axios({
                method: 'get', 
                url: 'http://localhost:4000/protected',
                headers: {
                    Authorization: `Bearer ${aToken}`
                }
            })
            setFetchData(resp.data);
        } catch (error) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetch(token)
    }, [])

    return (
        <div>
            <h1>Fetch API Data</h1>
            <h2>protected route</h2>
            <button><NavLink to="/">back home</NavLink></button>
            <h3>Results of fetch to external API:</h3>
            {fetchData && Object.keys(fetchData).map((data, i) => {
                return (
                    <div>{`${data}: ${fetchData[data]}`}</div>
                )
            })}
        </div>
    )
}

export default Fetch