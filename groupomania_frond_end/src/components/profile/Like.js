import React, { useState } from 'react';
import './like.css'
import iconLike from '@/icons/icon_like_profile.png'

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
                <span onClick={handleLike} id='like' className={like ? 'enable-like' : 'disable-like'}>
                    <img src={iconLike} alt='Icon like'/>
                    Like
                </span>
            </section>
        </div>
    );
};

export default Like;