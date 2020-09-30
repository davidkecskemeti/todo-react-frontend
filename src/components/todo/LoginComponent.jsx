import React, { Component } from "react";
import AuthenticationService from "../../services/todo/AuthenticationService";

class LoginComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: 'davidk',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
    }

    render = () => {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {/*<ShowLoginSuccessMessage showSuccessfulMessage={this.state.showSuccessfulMessage}/>*/}
                    {this.state.showSuccessfulMessage && <div>Login successful</div>}
                    Username: <input type="text" name="username" value={this.state.username}
                        onChange={this.handleChange} />
                    Password: <input type="text" name="password" value={this.state.password}
                        onChange={this.handleChange} />
                    <button className="btn btn-successful" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
            //U could put it into a react fragement which is <></> but div is okay as well
        )
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    loginClicked = () => {
        // AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
        //     .then(() => {
        //         AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
        //         this.props.history.push(`/welcome/${this.state.username}`)
        //     })
        //     .catch(() => {
        //         this.setState({ showSuccessfulMessage: false })
        //         this.setState({ hasLoginFailed: true })
        //     })

        AuthenticationService.executejwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token);
                this.props.history.push(`/welcome/${this.state.username}`)
            })
            .catch(() => {
                this.setState({ showSuccessfulMessage: false })
                this.setState({ hasLoginFailed: true })
            })
    }

}

export default LoginComponent