import React from 'react';
//import React, { useState, useEffect } from 'react';

import './like.css'

const Like = () => {
    //const [like, setLike] = useState();

    /*
    useEffect(() => {

    }, [])
    */

    const handleLike = () => {
        console.log('like')  
    }

    return (
        <div>
            <section className='like-btn_container'>
                <button className='like-btn' onClick={handleLike} >
                    <i className="fa-solid fa-heart"></i>
                    Like
                </button>
            </section>
        </div>
    );
};

//id='like' className={like ? 'enable-like' : 'disable-like'}

export default Like;