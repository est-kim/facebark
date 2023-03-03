import React, { useEffect, useState } from 'react';
import { useToken } from './Authentication';


function FollowingList() {
    const [accountId, setAccountId] = useState("");
    const [following, setFollowing] = useState([]);
    const [token] = useToken();
    console.log("this is the token:", token);


    useEffect(() => {
        async function getAccountId() {
            const url = `http://localhost:8000/api/things`;
            // const response = await fetch(url);
            const response = await fetch(url, { method: "GET", headers: { Authorization: `Bearer ${token}` } });
            if (response.ok) {
                const data = await response.json();
                setAccountId(data)
            }
        }
        getAccountId();
    }, [token]);


    useEffect(() => {
        async function getAccountsFollowing() {
            const url = `http://localhost:8000/following/${accountId}`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setFollowing(data)
            }
        }
        getAccountsFollowing();
    }, [accountId, token]);


    return (
        <>
        <h1>Dogs you're following:</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {following.map(account => {
                    return (
                        <tr key={account.id}>
                            <td>{ account.name }</td>
                            <td>{ account.image_url }</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </>
    );
}

export default FollowingList;
