import Axios from "./caller.service";

let getAllComments = () => {
    return Axios.get('/comments')
}

let getOneComment = () => {
    return Axios.get('/comments/me')
}

let createComment = (comment) => {
    return Axios.put('/comments', comment)
}

let updateComment = () => {
    return Axios.patch('/comments/me')
}

let deleteComment = () => {
    return Axios.delete('/comments/me')
}

export const commentService = {
    getAllComments, getOneComment, createComment, updateComment, deleteComment
}