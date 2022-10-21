import Axios from "./caller.service";

let getAllComments = () => {
    return Axios.get('/comments')
}

let getOneComment = (cid) => {
    return Axios.get('/comments'+cid)
}

let createComment = () => {
    return Axios.put('/comments')
}

let updateComment = (cid) => {
    return Axios.patch('/comments'+cid)
}

let deleteComment = (cid) => {
    return Axios.delete('/comments'+cid)
}

export const commentService = {
    getAllComments, getOneComment, createComment, updateComment, deleteComment
}