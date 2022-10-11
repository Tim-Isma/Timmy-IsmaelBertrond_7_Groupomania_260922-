import React from 'react';
import logo from '@/logo/icon-left-font-monochrome-white.svg'
import './header.css'

const Header = () => {
    return (
            <header>
                <div className='logo_header'>
                    <img src={logo} className='logo' alt='Logo Groupomania' />
                </div>
            </header>
    );
};

export default Header;