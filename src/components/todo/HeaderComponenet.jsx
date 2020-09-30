import React, {Component} from "react";
import AuthenticationService from "../../services/todo/AuthenticationService";
import  {Redirect,Link, NavLink} from "react-router-dom";

export default class HeaderComponent extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loggedOut: false
        }
    }

    logout = () => {
        AuthenticationService.logout()
        this.setState({loggedOut: true})
    }

    render = () => {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        if (this.state.loggedOut) {
            return <Redirect to="/login" push={true}/>
        }

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a className="navbar-brand" href="http://www.davidk.com">DavidK</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/davidk">Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {isUserLoggedIn &&
                        <li><NavLink className="nav-link" to="/logout" onClick={this.logout}>Logout</NavLink></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}