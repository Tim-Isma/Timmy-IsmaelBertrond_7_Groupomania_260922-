import React, {useState} from 'react';

import Comment from '@/components/home/Comment';
import { postService } from '@/_services/post.service';

const PostCard = ({post, marcel}) => {
    const [editPost, setEditPost] = useState(true)
    const [commentBtn, setCommentBtn] = useState(false)
    const [nbLike, setNbLike] = useState(post.likes)

    const handleEditPost = () => {
        setEditPost(!editPost)
    };

    const handleLike = () => {
        postService.likePost(post._id, marcel._id)
            .then(res => {
                console.log(res)
                if(res.data.message === "You like this post !"){
                    setNbLike(current => current+1)
                }else{
                    setNbLike(current => current-1)
                }                
            })
            .catch(err => console.log(err))
        
    };
    const handleComment = () => {}
    const handleDislike = () => {}
    const handleDeletePost = () => {}

    return (
        <div>
            <div className='posts'>
                <div className='post-user_container'>
                    <div>
                        {editPost ? <p className='post-sent'>{post.post}</p> :
                        <form className='form-post'>
                            <label htmlFor='post'>
                                <textarea 
                                    type='text'
                                    name='post'
                                    id='post'
                                    //nChange={onChange}
                                    //value={posts.post} 
                                />
                            </label>
                        </form>
                        }
                    </div>
                </div>
                <div className='footer-post_container'>
                    <button className='edit-post_btn' value={editPost} onClick={handleEditPost}>
                        <i className="fas fa-user-edit"></i>
                    </button>
                    <button className='like-post_btn' onClick={handleLike}>
                        <i className="fa-regular fa-thumbs-up"></i>
                        {nbLike}
                    </button>
                    <button className='comment_btn' onClick={() => handleComment(post)}>
                        commenter
                    </button>
                    <button className='dislike-post_btn' onClick={handleDislike}>
                        <i className="fa-regular fa-thumbs-down"></i>
                        {post.dislikes}
                    </button>
                    <button className='trash-post_container' onClick={handleDeletePost}>
                        <i className="fa-regular fa-trash-can"></i>
                    </button>
                </div>
                <div className='comment-home'>
                    { commentBtn ? 
                    <Comment/>
                    : null}
                </div>
            </div>
        </div>
    );
};

export default PostCard;