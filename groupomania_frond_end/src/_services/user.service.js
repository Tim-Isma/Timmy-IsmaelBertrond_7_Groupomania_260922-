import Axios from "./caller.service";

let getAllUsers = () => {
    return Axios.get('/users')
}

let getOneUser = () => {
    return Axios.get('/users/me')
}

let createUser = (user) => {
    return Axios.put('/users', user)
}

let updateUser = (id, user) => {
    return Axios.patch('/users/'+id, user)
}

let deleteUser = (user) => {
    return Axios.delete('/users/'+user._id, user)
}

export const userService = {
    getAllUsers, getOneUser, createUser, updateUser, deleteUser
}