import React, { useState, useEffect } from 'react';
import '../../css/people.css';

export default function People() {
    const [Search, setSearch] = useState('');
    const [people, setPeople] = useState([]);
    const [fetchPeople, setFetchPeople] = useState()

    const searchPeople = async (query) => {
        try{
            const response = await fetch(`http://localhost:1000/user/search?q=${query}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const data = await response.json();
            setPeople(data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        const delayBounce = setTimeout(() => {
            if(Search.length >=2){
                searchPeople(Search);
                setFetchPeople(true)
            }
            else{
                setPeople([])
                setFetchPeople(false)
            }
        }, 300)

        return () => clearTimeout(delayBounce);
    }, [Search])

    return (
        <div className="people-page">
            <h2 className="search-heading">🔍 Search People</h2>

            <input
                type="text"
                className="people-search-input"
                placeholder="Type a username..."
                value={Search}
                onChange={e => setSearch(e.target.value)}
            />

            {fetchPeople && (
                <div className="people-results">
                    {people.length === 0 ? (
                        <p className="no-results">No results found</p>
                    ) : (
                        <div className="card-grid">
                            {people.map((p, index) => (
                                <div className="user-full-card" key={index}>
                                    <img
                                        src={`http://localhost:1000${p.profileImage}` || 'https://i.imgur.com/000000.png'}
                                        alt="Profile"
                                        className="user-card-avatar"
                                    />
                                    <div className="user-card-details">
                                        <div className="user-card-header">
                                            <h2 className="username">
                                                {p.username}
                                                {p.isVerified && (
                                                    <img
                                                        src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg"
                                                        alt="Verified"
                                                        className="verified-badge-img"
                                                        title="Verified User"
                                                    />
                                                )}

                                            </h2>
                                            <p className="user-bio">{p.bio || 'No bio provided.'}</p>
                                        </div>

                                        <p className="user-email">📧 {p.email}</p>

                                        {/*<div className="user-stats">*/}
                                        {/*    <span>👍 {p.upvotes?.length || 0}</span>*/}
                                        {/*    <span>👎 {p.downvotes?.length || 0}</span>*/}
                                        {/*    <span>🌟 {p.reputation || 0} reputation</span>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );

}
