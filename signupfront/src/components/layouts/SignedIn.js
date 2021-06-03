import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { Redirect } from 'react-router'
import {
    Container, Col, Form,
    FormGroup, Label, Input, CardGroup,
    Button,
    FormText,
} from 'reactstrap';

class SignedInLinks extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        logged: 'Login'
    }
    handleLogout = () => {
        localStorage.clear();
        this.setState({
            loged: "Login"
        })


    }

    render() {

        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/home" className="navbar-brand">Home</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/show" className="nav-link">View</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/signup" className="nav-link">Sign Up</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/new" className="nav-link">New Post</Link>
                        </li>
                        <Form inline>


                        </Form>
                    </ul>
                </div>
            </nav>
        )

    }
}

export default SignedInLinks