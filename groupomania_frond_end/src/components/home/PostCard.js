import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { postService } from '@/_services/post.service';

import './postcard.css'

const PostCard = ({post, user}) => {
    const [editPost, setEditPost] = useState(true)
    const [udPost, setUdPost] = useState(post)
    //const [deletePost, setDeletePost] = useState(post)
    const [nbLike, setNbLike] = useState(post.likes)
    const [nbDislike, setNbDislike] = useState(post.dislikes)

    let navigate = useNavigate()

    /******************** Edit Post ************************/

    const handleEditPost = () => {
        setEditPost(!editPost)
    };

    /******************** Annule la publication du Post ************************/

    const handleCancelPost = (e) => {
        setUdPost('')
     
    }

    /******************** Liker ************************/

    const handleLike = () => {
        postService.likePost(post._id, user._id)
            .then(res => {
                console.log(res)
                if(res.data.message === "You like this post !") {
                    setNbLike(current => current+1)
                }else{
                    setNbLike(current => current-1)
                }                
            })
            .catch(err => console.log(err))
    };

    /******************** Disliker ************************/

    const handleDislike = () => {
        postService.dislikePost(post._id, user._id)
            .then(res => {
                console.log(res)
                if(res.data.message === "You dislike this post !") {
                    setNbDislike(current => current+1)
                }else{
                    setNbDislike(current => current-1)
                }                
            })
            .catch(err => console.log(err))
    }

    /******************** Modifier le Post ************************/

    const onChange = (e) => {
        setUdPost({
            ...udPost,
            [e.target.name]: e.target.value
        })
    }

    const submitUpdatePost = (e) => {
        e.preventDefault()
        postService.updatePost(post._id, post.userId, udPost.post)
            .then(res => {
                console.log(res)
                setEditPost(true)               
            })
            .catch(err => console.log(err))
    }

    /******************** Supprimer le Post ************************/
    //let userId = user._id

    const handleDeletePost = () => {
        console.log(udPost._id, udPost.userId)
        console.log(post._id, post.userId)
        console.log(udPost)
        postService.deletePost(udPost)
            .then(res => {
                console.log(res)
                //setDeletePost((current) => current.filter(user => user.id !== userId))
                navigate('/admin/home')              
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div className='posts'>
                <div className='posts_container'>
                    {editPost ? <p className='post_sent'>{post.post}</p> :
                        <form onSubmit={submitUpdatePost} className='form-post_edit'>
                            <label htmlFor='post'>
                                <textarea className='post-display'
                                    type='text'
                                    name='post'
                                    onChange={onChange}
                                    value={udPost.post} 
                                ></textarea>
                            </label>
                            <div className='footer_post-edit'>
                                <div className='icon_upload-image'>
                                    <label htmlFor='file'>
                                        <i className="fa-solid fa-download"></i>
                                    </label>
                                    <input
                                        type='file'
                                        id='file'
                                        name='image'
                                        accept='.jpg, .jpeg, png'
                                    />
                                </div>
                                <div className='post-update_btns'>
                                    { udPost ? (
                                        <button className='cancel-post_btn' onClick={handleCancelPost}>Annuler</button>
                                    ) : null}
                
                                    <button className='update-post_btn'>Modifier</button>
                                </div>
                            </div>
                        </form>
                    }  
                </div>
                <div className='footer-post_container'>
                    <button className='edit-post_btn' value={editPost} onClick={handleEditPost}>
                        <i className="fas fa-user-edit"></i>
                    </button>
                    <button className='like-post_btn' onClick={handleLike}>
                        <i className="fa-regular fa-thumbs-up"></i>
                        {nbLike}
                    </button>
                    <button className='dislike-post_btn' onClick={handleDislike}>
                        <i className="fa-regular fa-thumbs-down"></i>
                        {nbDislike}
                    </button>
                    <button className='trash-post_container' onClick={() => handleDeletePost(udPost)}>
                        <i className="fa-regular fa-trash-can"></i>
                    </button>
                </div>
                
            </div>
        </div>
    );
};

export default PostCard;