import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/header/Header';
import Nav from '@/components/header/Nav';
import Post from '@/components/home/Post';
import Comment from '@/components/home/Comment';
import PostCard from '@/components/home/PostCard';

import { userService } from '@/_services/user.service';
import { postService } from '@/_services/post.service';
import { commentService } from '@/_services/comment.service';

import './home.css'

const Home = () => {
    const [user, setUser] = useState([])
    const [editPost, setEditPost] = useState(true)

    const [like, setLike] = useState([])
    const [dislike, setDislike] = useState([])

    const [posts, setPosts] = useState([])
    //const [postOne, setPostOne] = useState([])
    const [comments, setComments] = useState([])
    const [commentBtn, setCommentBtn] = useState(false)

    //const[ updatePost, setUpdatePost] = useState()
    const flag = useRef(false)
    let navigate = useNavigate()
    
/******************** User ********************/

    /* Information utilisateur */
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

    /* Suppression de l'utilisateur */
    const delUser = () => {
        console.log(user)
        userService.deleteUser(user)
            .then(res => {
                console.log(res)
                //setUser((current) => current.filter(user => user.id !== userId))
                navigate('/auth/sign-up')
            })
            .catch(err => console.log(err))
    }

/******************** Post de l'utilisateur ********************/

    /* récupération du ou des post(s) utilisateur */
    useEffect(() => {
        if(flag.current === false) {
            postService.getOnePost()
                .then(res => {
                    console.log(res.data)
                    //setPostOne(res.data)
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
    }, [])

    let userId = user._id
    console.log(userId)

    /*
    const onChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }
    */
    /*
    const onChange = (e) => {
        setPosts({
            ...posts,
            [e.target.name]: e.target.value
        })
    }
    */
    

   /* Modifier son post */
    const handleUpdatePost = () => {
        console.log()
        postService.updatePost()
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }

   /* Suppression de son post */
    const handleDeletePost = () => {
        console.log()
        postService.deletePost()
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }

/******************** Affichage ************************/

    /* Voir tous les posts */
    useEffect(() => {
        if(flag.current === false) {
            postService.getAllPosts()
                .then(res => {
                    console.log(res.data)
                    setPosts(res.data)
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
    }, [])
    
    
    /* Voir tous les commentaires */
    useEffect(() => {
        if(flag.current === false) {
            commentService.getAllComments()
                .then(res => {
                    console.log(res.data)
                    setComments(res.data)
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
    }, [])


    /* Activer l'espace commentaire */
    const handleComment = (post, index) => {
        //if(post) 
        setCommentBtn(true)
        console.log(index +1)
        console.log(post)
        
    }

/******************** Edit Post ************************/

    const handleEditPost = () => {
        setEditPost(!editPost)
    };

/******************** LikePost ************************/

    const handleLike = (post) => {
        console.log(like)
        postService.likePost({post, userId})
            .then(res => {
                console.log(res)
                setLike(res.data)
            })
            .catch(err => console.log(err))
    };

/******************** LikePost ************************/

const handleDislike = (post) => {
    console.log(dislike)
    postService.likePost({post, userId})
        .then(res => {
            console.log(res)
            setDislike(res.data)
        })
        .catch(err => console.log(err))
};

    return (
        <div>
            <Header/>
            <div className='home'>
                <Nav/>
                <div className='home_title'>
                    <h1>Bienvenue {user.firstName} {user.name}</h1>
                </div>
                <div className='delete-btn_container'>
                    <button className='delete-btn' onClick={() => delUser(user)}>
                        <i className="fa-solid fa-user-xmark"></i>
                    </button>
                </div>
            </div>
            <div>
                <div className='home_post'>
                    <Post/>
                </div>
                <div className='post_container'>
                    {
                        posts.map((post, index) => (
                            <PostCard post={post} marcel={user} key={index}/>
                        ))
                    }
            
                    {
                        comments.map(comment => (
                            <div key={comment._id}>
                                <div className='comments'>
                                    <div className='comment-user_container'>
                                        {comment.comment}
                                    </div>
                                    <div className='footer-comment_container'>
                                        <button className='edit-comment_btn' onClick={handleUpdatePost}>
                                            <i className="fas fa-user-edit"></i>
                                        </button>
                                        <button className='like-comment_btn'>
                                            <i className="fa-regular fa-thumbs-up"></i>
                                            {comment.likes}
                                        </button>
        
                                        <button className='dislike-comment_btn'>
                                            <i className="fa-regular fa-thumbs-down"></i>
                                            {comment.dislikes}
                                        </button>
                                        <button className='trash-comment_container' onClick={handleDeletePost}>
                                            <i className="fa-regular fa-trash-can"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>    
        </div>
    );
};

export default Home;