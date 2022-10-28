import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { userService } from '@/_services/user.service';
import { postService } from '@/_services/post.service';

import './post.css'

const Post = () => {
    const [user, setUser] = useState([])
    const [post, setPost] = useState('')
     //const [file, setFile] = useState()

    const flag = useRef(false)
    let navigate = useNavigate()

     /* Information de l'utilisateur */
     useEffect(() => {
        if(flag.current === false) {
            userService.getOneUser()
                .then(res => {
                    console.log(res.data)
                    setUser(res.data)
                })       
                .catch(err => console.log(err))
        }

        return () => flag.current = true
    }, [])

    /* Le userId */
    let userId = user._id
  
    let pictureUser = user.profilePicture

    /* Annule la publication du post */
    const handleCancel = () => {
        setPost('')
    }

    /* Création et envoie du post */
    const handlePost = () => {
        console.log({post, userId})
        postService.createPost({post, userId})
            .then(res => {
                console.log(res)
                navigate('/admin/home') 
            })
            .catch(err => console.log(err))  
    }

    return (
        <div className='post'>
            <div className='post_picture'>
                <img src={pictureUser} alt='User-profile-img'/>
            </div>
            <div className='post_text'>
                <textarea 
                    name='post'
                    id='post'
                    placeholder='Exprimez-vous !'
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                />
                <div className='footer-write-post'>
                    <div className='icon_upload-image'>
                        <label htmlFor='file'>
                            <i className="fa-solid fa-download"></i>
                        </label>
        
                        <input
                            type='file'
                            id='file'
                            name='file'
                            accept='.jpg, .jpeg, png'
                        />
                    </div>
                    <div className='post-btns'>
                        { post ? (
                            <button className='cancel-post_btn' onClick={handleCancel}>Annuler</button>
                        ) : null}
                      
                        <button className='send-post_btn' onClick={handlePost}>Envoyer</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;