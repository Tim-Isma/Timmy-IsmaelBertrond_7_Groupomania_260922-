import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { userService } from '@/_services/user.service';
import { postService } from '@/_services/post.service';

import './post.css'

const Post = () => {
    const [user, setUser] = useState([])
    const [post, setPost] = useState('')

    const [file, setFile] = useState('')

    const flag = useRef(false)
    let navigate = useNavigate()

/******************** Récupération des informations de l'utilisateur ********************/

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

/******************** Envoi image ********************/
    /*
    const onChangeFile = (e) => {
        console.log('ici')
        //setImagee(e.target.file[0])
        const reader = new FileReader()
        
        reader.onload = () => {
            if(reader.readyState === 2) {
                setFile({image_profile: reader.result}) 
            }
        }
        reader.readAsDataURL(e.target.files[0])

        setFile({
            ...file,
            [e.target.name]: e.target.files[0]
        })
        
    }
    */
/******************** Post ********************/

    /* Le userId */
    let userId = user._id

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
        <div className='post_container'>
            <form className='form_post'>
                <label htmlFor='post'>
                    <textarea 
                        name='post'
                        id='post'
                        placeholder='Exprimez-vous !'
                        onChange={(e) => setPost(e.target.value)}
                        value={post}
                    ></textarea>
                </label>
            </form>
            <div className='footer_post'>
                <div className='icon_upload-image'>
                    <label htmlFor='file'>
                        <i className="fa-solid fa-download"></i>
                    </label>
                    <input
                        type='file'
                        id='file'
                        name='file'
                        accept='.jpg, .jpeg, png'
                        onChange={(e) => setFile(e.target.files[0])}
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
    );
};

export default Post;