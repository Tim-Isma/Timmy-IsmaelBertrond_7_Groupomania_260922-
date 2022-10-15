import React, { useState } from 'react';
import './like.css'

const Like = () => {
    const [like, setLike] = useState();

    const handleLike = (e) => {
        if(e.target.id === 'like') {
            setLike(false)
            setLike(true)
        }
    }

    return (
        <div>
            <section className='section_like'>
                <span onClick={handleLike} id='like' className={like ? 'enable-like' : 'disable-like'}>Like</span>
            </section>
        </div>
    );
};

export default Like;