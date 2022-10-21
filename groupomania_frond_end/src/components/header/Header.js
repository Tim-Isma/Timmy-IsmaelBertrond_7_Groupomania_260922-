import React from 'react';
import { useNavigate } from 'react-router-dom';
import { accountService } from '@/_services/account.service';
import logo from '@/logo/icon-left-font-monochrome-white.svg'
import './header.css'

const Header = () => {
    let navigate = useNavigate()

    const logout = () => {
        accountService.logout()
        navigate('/auth/sign-in')
    }

    return (
            <header>
                <div className='header_container'>
                    <div className='logo_header'>
                        <img src={logo} className='logo' alt='Logo Groupomania' />
                    </div>
                    <div className='log-out_container'>
                        <button className='log-out_btn' onClick={logout}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </button>
                    </div>
                </div>
            </header>
    );
};

export default Header;