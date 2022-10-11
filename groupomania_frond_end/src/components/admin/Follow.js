import React from 'react';
import './follow.css'
import { Link } from 'react-router-dom';

const Follow = () => {
    return (
            <section className='nav_follow'>
                <ul className='links_follow'>
                    <li className='link_follow'><Link to='/follower'>Follower:</Link></li>
                    <li className='link_follow'><Link to='/following'>Following:</Link></li>
                </ul>
            </section>
    );
};

export default Follow;