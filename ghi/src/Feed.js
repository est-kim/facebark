import React, { useEffect, useState } from 'react';
import { useToken } from './Authentication';


function Feed() {
    const [accountId, setAccountId] = useState("");
    const [statuses, setStatuses] = useState([]);
    const [token] = useToken();


    useEffect(() => {
        async function getAccountId() {
            const url = `${process.env.REACT_APP_FACEBARK_API_HOST}/api/things`;
            const response = await fetch(url, { method: "GET", headers: { Authorization: `Bearer ${token}` } });
            if (response.ok) {
                const data = await response.json();
                setAccountId(data)
            }
        }
        getAccountId();
    }, [token]);


    useEffect(() => {
        async function getStatusesOfAccountsFollowing() {
            const url = `${process.env.REACT_APP_FACEBARK_API_HOST}/feed/${accountId}`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setStatuses(data)
            }
        }
        getStatusesOfAccountsFollowing();
    }, [accountId, token]);
    // });

    return (
        <>
        <h1>Your feed:</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Message</th>
                </tr>
            </thead>
            <tbody>
                {statuses.map(status => {
                    return (
                        <tr key={status.id} value={status.id}>
                        <td>
                            <img src={status.account_image_url}></img> At {
                            new Date(status.time_stamp).toLocaleTimeString("en-US", {
                                hour: '2-digit',
                                minute: '2-digit'
                                })} on {
                            new Date(status.time_stamp).toLocaleDateString("en-US", {
                                month: '2-digit',
                                day: '2-digit',
                                year: '2-digit'
                                })} {status.name} posted "{status.status_text}"
                        </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </>
    );
}

export default Feed;
