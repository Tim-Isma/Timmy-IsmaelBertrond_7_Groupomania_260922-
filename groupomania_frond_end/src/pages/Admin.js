import React, { useState } from 'react';
import Header from '@/components/admin/Header';
import SignIn from '@/components/admin/SignIn';
import SignUp from '@/components/admin/SignUp';
import './admin.css'

const Admin = () => {
    const [signUpModal, setSignUpModal] = useState(true);
    const [signInModal, setSignInModal] = useState(false);

    const handleModals = (e) => {
        if(e.target.id === "register") {
            setSignInModal(false)
            setSignUpModal(true)
        } else if (e.target.id === "login") {
            setSignUpModal(false)
            setSignInModal(true)
        }
    }

    return (
        <div>
        <Header/>
            <div className='sign-form'>
                <div className='form-container'>
                    <ul>
                        <li onClick={handleModals} id='register' className={signUpModal ? 'active-btn' : null}>
                            Inscription
                        </li>
                        <li onClick={handleModals} id='login' className={signInModal ? 'active-btn' : null}>
                            Connexion
                        </li>
                    </ul>
                    {signUpModal && <SignUp/>}
                    {signInModal && <SignIn/>}
                </div>
            </div>
        </div>
    );
};

export default Admin;