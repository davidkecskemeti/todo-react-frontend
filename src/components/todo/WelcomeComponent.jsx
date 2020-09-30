import React, {Component} from "react";
import {Link} from "react-router-dom";
import HelloWorldService from "../../services/todo/HelloWorldService";

export default class WelcomeComponent extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            welcomeMessage: ''
        }
    }

    render = () => {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}.
                    You can manage yout todos <Link to="/todos">here</Link>.
                </div>
                <div className="container">
                    Click here to get a customized welcome message.
                    <button className="btn btn-success" onClick={this.retrieveWelcomeMessage}>Get welcome
                        message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </>
        )
    }

    retrieveWelcomeMessage = () => {
        HelloWorldService.executeHelloWorldBeanPathVariableService(this.props.match.params.name)
            .then(response => this.setState({welcomeMessage: response.data.message}))
            .catch(error => this.handleError(error))
    }

    handleError = (error) => {
        let errorMessage = '';
        if (error.message) errorMessage += error.message
        if (error.response && error.response.data) errorMessage += error.response.data.message
        this.setState({welcomeMessage: errorMessage})
    }
}