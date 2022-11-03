import React, {useState} from 'react';
//import { useNavigate } from 'react-router-dom';

import { postService } from '@/_services/post.service';
import { accountService } from '@/_services/account.service';

import './postcard.css'

const PostCard = ({post, user, manager}) => {
    const [editPost, setEditPost] = useState(true)
    const [udPost, setUdPost] = useState(post)
    const [udPostPicture, setUdPostPicture] = useState(post.picture)
    const [file, setFile] = useState()
   
    const [nbLike, setNbLike] = useState(post.likes)
    const [nbDislike, setNbDislike] = useState(post.dislikes)

    //let navigate = useNavigate()

/******************** Edit Post ************************/

    const handleEditPost = () => {
        setEditPost(!editPost)
    };

/******************** Annule la publication du Post ************************/

    const handleCancelPost = () => {
        setEditPost(!editPost)
    }

/******************** Liker ************************/

    const handleLike = () => {
        postService.likePost(post._id, user._id)
            .then(res => {
                console.log(res)
                if(res.data.message === "like post !") {
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
                if(res.data.message === "dislike post !") {
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

        const formData = new FormData()
        formData.append('userId', udPost.userId)
        formData.append('post', udPost.post)
        formData.append('image', file)

        console.log(formData.get('userId'))
        console.log(formData.get('image'))
        console.log(formData.get('post'))
        console.log(udPost._id)


        postService.updatePost(udPost._id, formData)
            .then(res => {
                console.log(res)
                window.location.href = '/admin/home' 
                //manager(current => current.filter(p => p._id !== post._id))  
                setEditPost(true)           
            })
            .catch(err => console.log(err))
    }

/******************** Supprimer le Post ************************/

    const handleDeletePost = () => {
        
        postService.deletePost(udPost)
            .then(res => {
                console.log(res)
                //manager(current => current.filter(p => p._id !== post._id))
                window.location.href = '/admin/home'               
            })
            .catch(err => console.log(err))
    }

/******************** Post Picture ************************/

    const handlePicture = (e) => {
        setUdPostPicture(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
    }

    return (
        <div>
            <div className='posts'>
                <div className='posts_container'>
                    {editPost ? <div>
                                    <p className='post_sent'>{post.post}</p>
                                    { udPostPicture ?
                                    <div className='post--img'>
                                        <img src={post.picture} alt="" />
                                    </div>
                                    : null
                                    }
                                </div> :
                        <form onSubmit={submitUpdatePost} className='form-post_edit'>
                            <label htmlFor='post'>
                                <textarea className='post-u'
                                    type='text'
                                    name='post'
                                    onChange={onChange}
                                    value={udPost.post} 
                                ></textarea>
                                 { udPostPicture ?
                                <div className='post--img'>
                                    <img src={udPostPicture} alt="" />
                                </div>
                                : null
                                }
                            </label>
                            <div className='footer_post-edit'>
                                <div className='icon_upload-image'>
                                    <label htmlFor='imagep2'>
                                        <i className="fa-solid fa-download"></i>
                                    </label>
                                    <input
                                        type='file'
                                        id='imagep2'
                                        name='imagep2'
                                        accept='.jpg, .jpeg, .png'
                                        onChange={(e) => handlePicture(e)}
                                    />
                                </div>
                                <div className='post-update_btns'>
                                    { udPost ? (
                                        <button className='cancel-postcard_btn' onClick={handleCancelPost}>Annuler</button>
                                    ) : null}
                
                                    <button className='update-postcard_btn'>Modifier</button>
                                </div>
                            </div>
                        </form>
                    }  
                </div>
                <div className='footer-post_container'>
                    {
                        (user._id === post.userId || accountService.info().role === "chaussette") &&

                    <button className='edit-post_btn' value={editPost} onClick={handleEditPost}>
                        <i className="fas fa-user-edit"></i>
                    </button>
                    }
                    <button className='like-post_btn' onClick={handleLike}>
                        <i className="fa-regular fa-thumbs-up"></i>
                        {nbLike}
                    </button>
                    <button className='dislike-post_btn' onClick={handleDislike}>
                        <i className="fa-regular fa-thumbs-down"></i>
                        {nbDislike}
                    </button>
                    {
                        console.log(accountService.info())
                    }
                    {
                        (user._id === post.userId || accountService.info().role === "chaussette") &&
                    
                        <button className='trash-post_container' onClick={() => handleDeletePost(udPost)}>
                            <i className="fa-regular fa-trash-can"></i>
                        </button>
                    }
                </div>
                
            </div>
        </div>
    );
};

export default PostCard;