import React from 'react';
import { NavLink } from 'react-router-dom';

import './nav.css'

const Nav = () => {


    return (
        <nav className='nav-main_container'>
            <ul>
                <li>
                    <NavLink to='/admin/home' className={({isActive}) => isActive ? 'enable_nav-main_btns' : 'disable_nav-main_btns'}>
                        Accueil
                    </NavLink> 
                </li>
                <li>
                    <NavLink to='/admin/profile' className={({isActive}) => isActive ? 'enable_nav-main_btns' : 'disable_nav-main_btns'}>
                        Votre Profile
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;