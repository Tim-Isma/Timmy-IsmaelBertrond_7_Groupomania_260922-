import React from 'react';
import './follow.css'
import { Link } from 'react-router-dom';

const Follow = () => {
    return (
            <section className='section_follow'>
                <ul>
                    <li><Link to='/follower'>Follower:</Link></li>
                    <li><Link to='/following'>Following:</Link></li>
                </ul>
            </section>
    );
};

export default Follow;