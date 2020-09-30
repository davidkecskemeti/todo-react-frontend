import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute";
import LoginComponent from "./LoginComponent";
import ListTodosComponent from "./ListTodosComponent";
import HeaderComponent from "./HeaderComponenet";
import ErrorComponent from "./ErrorComponent";
import WelcomeComponent from "./WelcomeComponent";
import FooterComponent from "./FooterComponent";
import TodoComponent from "./TodoComponent";

class TodoApp extends Component {

    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <Router>
                                <>
                                    <HeaderComponent/>
                                    <Switch>
                                        <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                                        <AuthenticatedRoute path="/todos" exact component={ListTodosComponent}/>
                                        <AuthenticatedRoute path="/todos/:id" exact component={TodoComponent}/>
                                        <Route component={ErrorComponent}/>
                                    </Switch>
                                </>
                            </Router>
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>

            </div>
        )
    }
}

export default TodoApp