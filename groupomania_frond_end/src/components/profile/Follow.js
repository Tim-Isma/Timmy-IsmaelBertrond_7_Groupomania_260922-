import React from 'react';
//import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './follow.css'

const Follow = () => {

    //const [follow, setFollow] = useState('')

    /*
    useEffect(() => {

    }, [])
    */

    const handleFollow = () => {
        console.log('follow')
    }

    return (
            <section className='section_follow'>
                <div className='follow-btn_container'>
                    <button onClick={handleFollow} className='follow-btn'>
                        <i className="fas fa-user-plus"></i>
                        Follow
                    </button>
                </div>
                <ul>
                    <li><Link to='/admin/follower'>Follower:</Link></li>
                    <li><Link to='/admin/following'>Following:</Link></li>
                </ul>
            </section>
    );
};

export default Follow;