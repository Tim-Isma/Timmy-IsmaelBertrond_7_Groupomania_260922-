import React from 'react';
import './follow.css'
import { Link } from 'react-router-dom';

const Follow = () => {
    return (
            <section className='section_follow'>
                <ul>
                    <li><Link to='/admin/follower'>Follower:</Link></li>
                    <li><Link to='/admin/following'>Following:</Link></li>
                </ul>
            </section>
    );
};

export default Follow;