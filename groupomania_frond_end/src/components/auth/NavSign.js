import React from 'react';
import { NavLink } from 'react-router-dom';

import './navsign.css'

const NavSign = () => {
    return (
        <nav className='nav-sign_container'>
            <ul>
                <li>
                    <NavLink to='/auth/sign-up' className={({isActive}) => isActive ? 'enable_nav-sign_btns' : 'disable_nav-sign_btns'}>
                        Inscription
                    </NavLink> 
                </li>
                <li>
                    <NavLink to='/auth/sign-in' className={({isActive}) => isActive ? 'enable_nav-sign_btns' : 'disable_nav-sign_btns'}>
                        Connexion
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavSign;