import React, { Component } from 'react'
import axios from 'axios'
import { useState } from "react";
import { Link } from 'react-router-dom'
import { Redirect, Route } from 'react-router-dom';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
    FormText,
} from 'reactstrap';
class CreatePost extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        username: '',
        title: '',
        description: '',
        body: '',
        loggedIn: '',
        user: 'none',
        submit: false

    };
    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    };
    componentDidMount = () => {
        const log = localStorage.getItem('user')
        if (log) {
            this.setState({ user: log })
            this.setState({ loggedIn: true })
        }
    }
    onSubmit = (event) => {
        event.preventDefault()

        const payload = {
            username: this.state.user,
            title: this.state.title,
            description: this.state.description,
            body: this.state.body



        };

        axios.post('http://localhost:4000/app/new', payload)
            .then(Response => console.log(Response.data))



        this.setState({
            title: '',
            username: '',
            description: '',
            body: '',
            submit: true

        })

    };
    render() {
        if (this.state.user === 'none') {
            return (
                <div className="container mt-5 col-6">
                    <div className="oops">
                        <h1>Please login to create a new Post</h1>

                    </div>
                    <div className="link">
                        <button className="btn btn-warning"><Link to='/signin'>Login</Link></button>
                    </div>
                </div>
            )
        }

        return (
            <div className="log">


                <Form className="form" onSubmit={this.onSubmit} >

                    <Col>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input
                                type='text'
                                placeholder='Username'
                                name="username"
                                onChange={this.handleChange}
                                value={this.state.user}
                            />

                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Title</Label>
                            <Input
                                type='text'
                                placeholder='A good title'
                                name="title"
                                onChange={this.handleChange}
                                value={this.state.title}
                            />

                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input
                                name="description"
                                placeholder='Short Description'
                                onChange={this.handleChange}
                                value={this.state.description}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Body</Label>
                            <Input
                                type="password"
                                name="body"
                                placeholder='Write your thoughts'
                                onChange={this.handleChange}
                                value={this.state.body}
                            />
                        </FormGroup>
                        <FormText><b>{this.state.maybe}</b></FormText>
                    </Col>
                    <div className='container mt-3 '>
                        <Button outline color="danger">Submit</Button>
                    </div>
                </Form>

            </div>

        )
    }
}

export default CreatePost