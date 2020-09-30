import React, {Component} from "react";
import {BrowserRouter as Router, Link, NavLink, Route, Switch} from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute";
import LoginComponent from "./LoginComponent";
import ListTodosComponent from "./ListTodosComponent";
import HeaderComponent from "./HeaderComponenet";
import ErrorComponent from "./ErrorComponent";
import WelcomeComponent from "./WelcomeComponent";
import FooterComponent from "./FooterComponent";
import LogoutComponent from "./LogoutComponent";

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <div>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" exact component={LoginComponent}/>
                            <Route path="/logout" exact component={LogoutComponent}/>
                            <AuthenticatedRoute path="/welcome/:name" exact component={WelcomeComponent}/>
                            <AuthenticatedRoute path="/todos" exact component={ListTodosComponent}/>
                            <Route component={ErrorComponent}/>
                        </Switch>
                        <FooterComponent/>
                    </div>
                </Router>
            </div>
        )
    }
}

export default TodoApp