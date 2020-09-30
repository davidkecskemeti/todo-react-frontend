class ListTodosComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos:
                [
                    {id: 1, description: 'Learn to Dance', done: false, targetDate: new Date()},
                    {id: 2, description: 'Become an Expoert at React', done: false, targetDate: new Date()},
                    {id: 3, description: 'Visit home', done: false, targetDate: new Date()}
                ]
        }
    }

    render() {
        return (
            <div>
                <h1>List Todos</h1>
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
                                    <td>{todo.targetDate.toString()}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListTodosComponent