import React, { useState, useEffect, useRef } from 'react';
//import { useNavigate } from 'react-router-dom';

import { userService } from '@/_services/user.service';
import { postService } from '@/_services/post.service';

import './post.css'

const Post = () => {
    const [user, setUser] = useState([])
    const [post, setPost] = useState('')
    const [postPicture, setPostPicture] = useState('')

    const [file, setFile] = useState()

    const flag = useRef(false)
    //let navigate = useNavigate()

/******************** Récupération des informations de l'utilisateur ********************/

     useEffect(() => {
        if(flag.current === false) {
            userService.getOneUser()
                .then(res => {
                    //console.log(res.data)
                    setUser(res.data)
                })       
                .catch(err => console.log(err))
        }

        return () => flag.current = true
    }, [])

/******************** Envoi image ********************/
   

    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
    }
    
/******************** Post ********************/

    /* Le userId */
    //let userId = user._id

    /* Annule la publication du post */
    const handleCancel = () => {
        setPost('')
        setPostPicture('')
    }

    /* Création et envoie du post */
    const handlePost = () => {
        
        if (post || postPicture) {
            const formData = new FormData()
            formData.append('userId', user._id)
            formData.append('post', post)
            formData.append('image', file)

            console.log(formData.get('image'))
            console.log(formData.get('post'))

            
            postService.createPost(formData)
            .then(res => {
                console.log(res)
                window.location.href = '/admin/home'
            })
            .catch(err => console.log(err)) 

        }else{
            alert('veuillez entrer un message !')
        }
    
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
                     { postPicture ?
                    <div className='post-picture'>
                        <p className='description_post-picture'>{post}</p>
                        <img src={postPicture} alt="" />
                    </div>
                      : null
                    }
                </label>
            </form>
            <div className='footer_post'>
                <div className='icon_upload-image'>
                    <label htmlFor='imagep1'>
                        <i className="fa-solid fa-download"></i>
                    </label>
                    <input
                        type='file'
                        id='imagep1'
                        name='imagep1'
                        accept='.jpg, .jpeg, png'
                        onChange={(e) => handlePicture(e)}
                    />
                </div>
                <div className='post-btns'>
                    { post || postPicture ? (
                        <button className='cancel-post_btn' onClick={handleCancel}>Annuler</button>
                    ) : null}
                      
                    <button className='send-post_btn' onClick={handlePost}>Envoyer</button>
                </div>
            </div>
        </div>
    );
};

export default Post;