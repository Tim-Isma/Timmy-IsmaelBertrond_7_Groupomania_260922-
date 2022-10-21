import Axios from "./caller.service";

let getAllUsers = () => {
    return Axios.get('/users')
}

let getOneUser = () => {
    return Axios.get('/users/me')
}

let createUser = () => {
    return Axios.put('Users')
}

let updateUser = () => {
    return Axios.patch('/users/me')
}

let deleteUser = () => {
    return Axios.delete('/users/me')
}

export const userService = {
    getAllUsers, getOneUser, createUser, updateUser, deleteUser
}