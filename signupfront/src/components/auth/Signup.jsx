import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import {
    Col, Form,
    FormGroup, Label, Input,
    Button,
    FormText,
} from 'reactstrap';
class SignUp extends Component {
    state = {
        fullName: '',
        username: '',
        email: '',
        password: '',
        posts: [],
        signedup: false

    };
    componentDidMount = () => {
        this.getData()

    }

    getData = () => {
        axios.get('http://localhost:4000/app/api')
            .then((Response) => {
                const data = Response.data
                this.setState({ posts: data });


            })
            .catch(() => {
                alert("No data sent");
            })
    }



    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    };
    onSubmit = (event) => {
        event.preventDefault()

        const payload = {
            fullName: this.state.fullName,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password

        };

        axios.post('http://localhost:4000/app/signup', payload)
            .then(Response => console.log(Response.data))


        this.setState({
            fullName: '',
            username: '',
            email: '',
            password: '',
            signedup: true
        })
    };
    render() {
        if (this.state.signedup) {
            return <Redirect to='/signin' />


        }
        return (
            <div className="log">


                <Form className="form" onSubmit={this.onSubmit} >
                    <Col>
                        <FormGroup>
                            <Label>Full Name</Label>
                            <Input
                                type='text'
                                placeholder='Full Name'
                                name="fullName"
                                onChange={this.handleChange}
                                value={this.state.fullName}
                            />

                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input
                                type='text'
                                placeholder='Username'
                                name="username"
                                onChange={this.handleChange}
                                value={this.state.username}
                            />

                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                onChange={this.handleChange}
                                value={this.state.email}
                                placeholder="myemail@email.com"
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                onChange={this.handleChange}
                                value={this.state.password}
                                placeholder="********"
                            />
                        </FormGroup>
                        <FormText><b>{this.state.maybe}</b></FormText>
                    </Col>
                    <div className='container mt-3'>
                        <Button>Submit</Button>
                    </div>
                </Form>

            </div>

        )
    }
}
export default SignUp