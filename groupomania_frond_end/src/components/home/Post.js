import React, { useState } from 'react';
import './post.css'
import iconUploadImages from '@/icons/icon_upload_image.svg'

const Post = () => {
    const [post, setPost] = useState('');
    const [postPicture, setPostPicture] = useState('');
    const [video, setVideo] = useState('');
    //const [file, setFile] = useState()


    const handlePost = () => {

    }

    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]))
    }

    const handleCancel = () => {
        setPost('');
        setPostPicture('');
        setVideo('');
        //setFile('');
    }

    return (
        <div className='post'>
            <div className='post_picture'></div>
            <div className='post_text'>
                <textarea 
                    name='post'
                    id='post'
                    placeholder='Exprimez-vous !'
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                />
                <div className='footer-post'>
                    <div className='icon_upload-image'>
                        <label htmlFor='file'>
                            <img src={iconUploadImages} alt='Icon upload images'/>
                        </label>

                        <input
                            type='file'
                            id='file'
                            name='file'
                            accept='.jpg, .jpeg, png'
                            onChange={(e) => handlePicture(e)}
                        />
                    </div>
                    <div className='post-btns'>
                        { post || postPicture || video.length > 20 ? (
                            <button className='cancel' onClick={handleCancel}>Annuler</button>
                        ) : null}
                      
                        <button className='send' onClick={handlePost}>Envoyer</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;