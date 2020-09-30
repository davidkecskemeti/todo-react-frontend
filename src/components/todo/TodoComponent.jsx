import React, {Component} from "react";
import moment from "moment";
import {ErrorMessage, Field, Form, Formik} from "formik";
import TodoDataService from "../../services/todo/TodoDataService";
import AuthenticationService from "../../services/todo/AuthenticationService";

export default class TodoComponent extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
    }

    componentDidMount() {
        if (this.state.id === -1) return

        TodoDataService.retrieveTodo(AuthenticationService.getLoggedInUserName(), this.state.id)
            .then(response => {
                this.setState({
                    description: response.data.description,
                    targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
                })
            })
    }

    validate(values) {
        let errors = {}

        if (!values.description) {
            errors.description = 'Enter a description!'
        } else if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 characters in Description!'
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid target date!'
        }

        return errors;
    }

    onSubmit = (values) => {
        console.log(values)

        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }
        if (this.state.id === -1) {
            TodoDataService.createTodo(AuthenticationService.getLoggedInUserName(), todo)
                .then(() => this.props.history.push(`/todos`))
        } else {
            console.log(this.state.id)
            TodoDataService.updateTodo(AuthenticationService.getLoggedInUserName(), this.state.id, todo)
                .then(() => this.props.history.push(`/todos`))
        }

    }

    render = () => {
        let {description, targetDate} = this.state
        return (
            <div>
                <h1>TODO</h1>
                <div className="container">
                    <Formik
                        initialValues={{
                            description,
                            targetDate
                        }}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        validateOnChange={false}
                        validateOnBlur={false}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>

                                    <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>

                                    <fieldset className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label htmlFor="targetDate">Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"/>
                                    </fieldset>

                                    <button type="submit" className="btn btn-success">Save</button>

                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}