import React from 'react';
import { NavLink } from 'react-router-dom';

import './navsign.css'

const NavSign = () => {
    return (
        <nav className='nav_sign'>
            <ul>
                <li>
                    <NavLink to='/auth/sign-up' className={({isActive}) => isActive ? 'enable_Nav-sign-btns' : 'disable_Nav-sign-btns'}>
                        Inscription
                    </NavLink> 
                </li>
                <li>
                    <NavLink to='/auth/sign-in' className={({isActive}) => isActive ? 'enable_Nav-sign-btns' : 'disable_Nav-sign-btns'}>
                        Connexion
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavSign;