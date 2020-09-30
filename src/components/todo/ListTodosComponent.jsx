import React, {Component} from "react";
import TodoDataService from "../../services/todo/TodoDataService";
import AuthenticationService from "../../services/todo/AuthenticationService";
import moment from "moment";

class ListTodosComponent extends Component {

    constructor(props) {
        super()
        this.state = {
            todos: [],
            message: ''
        }

        this.deleteTodoClicker = this.deleteTodoClicker.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this)
        this.updateTodoClick = this.updateTodoClick.bind(this)
    }

    componentDidMount() {
        this.refreshTodos();
    }

    deleteTodoClicker(id) {
        TodoDataService.deleteTodo(AuthenticationService.getLoggedInUserName(), id)
            .then(response => {
                this.setState({message: `Delete of todo ${id} successful`})
                this.refreshTodos()
            })
    }

    addTodoClicked = () => {
        console.log('add todo clicked')
        this.props.history.push(`/todos/-1`)
    }

    updateTodoClick(id) {
        this.props.history.push(`/todos/${id}`)
    }

    refreshTodos() {
        TodoDataService.retrieveAllTodos(AuthenticationService.getLoggedInUserName())
            .then(response => {
                this.setState({todos: response.data})
            })
    }

    render = () => {
        console.log('render')
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-successful">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>description</th>
                            <th>Is completed</th>
                            <th>Target date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.todos.map(todo =>
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done ? 'true' : 'false'}</td>
                                    <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                    <td>
                                        <button className="btn btn-success"
                                                onClick={() => this.updateTodoClick(todo.id)}>Update
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-warning"
                                                onClick={() => this.deleteTodoClicker(todo.id)}>Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default ListTodosComponent