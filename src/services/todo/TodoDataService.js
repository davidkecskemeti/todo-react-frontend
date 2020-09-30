import axios from 'axios'
import {JPA_API_URL} from '../../Constants'

class TodoDataService {

    retrieveAllTodos(username) {
        return axios.get(`${JPA_API_URL}/users/${username}/todos`)
    }

    retrieveTodo(username, id) {
        return axios.get(`${JPA_API_URL}/users/${username}/todos/${id}`)
    }

    deleteTodo(name, id) {
        return axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`)
    }

    updateTodo(name, id, todo) {
        return axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`,todo)
    }

    createTodo(name, todo) {
        return axios.post(`${JPA_API_URL}/users/${name}/todos`,todo)
    }
}

export default new TodoDataService()