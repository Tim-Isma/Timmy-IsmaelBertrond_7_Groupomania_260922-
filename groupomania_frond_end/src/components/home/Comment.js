import React, { useState } from 'react';

//import { userService } from '@/_services/user.service';
//import { postService } from '@/_services/post.service';
//import { commentService } from '@/_services/comment.service';

import './comment.css'

const Comment = () => {
    //const [user, setUser] = useState([])
    //const [post, setPost] = useState([]);
    const [comment, setComment] = useState('');
    //const [file, setFile] = useState()

    //const flag = useRef(false)

    /* Annule la publication du commantaire */
    const handleCancel = () => {
        setComment('');
    }

    /* Création et envoie du commentaire */
    /*
    const handleComment = () => {
        console.log({comment, userId, postId})
        commentService.createPost({comment, userId, postId})
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err)) 
    }
    */

    return (
        <div className='comment'>
            <div className='comment-text_container'>
                <form>
                    <textarea className='comment-text' 
                        name='comment'
                        id='comment'
                        placeholder='Commenter !'
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                </form>
                <div className='footer-write-comment'>
                    <div className='icon_upload-image'>
                        <label className='icon_upload-image'htmlFor='file'>
                            <i className="fa-solid fa-image"></i>
                        </label>
                        <input
                            type='file'
                            id='file'
                            name='file'
                            accept='.jpg, .jpeg, png'
                        />
                    </div>
                    <div className='post-btns'>
                        { comment ? (
                            <button className='cancel-comment_btn' onClick={handleCancel}>Annuler</button>
                        ) : null}
                      
                        <button className='send-comment_btn'>Envoyer</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;