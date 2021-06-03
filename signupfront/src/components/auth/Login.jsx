import React, { Component } from 'react'
import axios from 'axios'
import {
    Container, Col, Form,
    FormGroup, Label, Input, CardGroup,
    Button,
    FormText,
} from 'reactstrap';
import {
    Card, CardTitle, CardText,
    CardSubtitle, CardBody
} from 'reactstrap';
import '../styles/login.css'
import '../styles/show.css'
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
    state = {
        username: '',
        password: '',
        loggedIn: '',
        posts: [],
        auth: [],
        user: '',
        maybe: '',
        edit: ''
    };
    componentDidMount = () => {
        this.getData()

        const log = localStorage.getItem('user');

        if (log) {
            this.setState({ loggedIn: true })

        }

    }
    handleLogout = () => {
        this.setState({
            user: "",
            loggedIn: false
        })
        localStorage.clear()
        console.log("Bye bye")
    }
    Editpost = (data) => {

        console.log("helllo");
        let id = data._id
        console.log("id is->" + id);
        localStorage.setItem('id', id)
        this.setState({
            edit: "yes"

        })


    }
    DeletePost = (data) => {
        let uId = data._id
        const payload = {
            id: uId

        };
        console.log(payload)


        axios.delete('http://localhost:4000/app/posts/delete', { data: payload })
            .then(Response => console.log("DONE?"))
            .catch((error) => {
                console.log(error)
            })
        this.setState({
            posts: this.state.posts.filter(el => el._id != uId)
        })
    }

    getData = () => {
        const usern = localStorage.getItem('user')
        const payload = {
            username: usern
        }

        axios.post('http://localhost:4000/app/posts', payload)
            .then((Response) => {
                const data = Response.data
                this.setState({ posts: data });
            })
            .catch(() => {
                alert("Server Error");
            })
    }
    displayData = (posts) => {
        return posts.map((posts, index) => (
            <div className="container col-6 mt-5">

                <Card className="bg-dark text-white">

                    <CardBody>
                        <CardTitle tag="h5"><span className="show">{posts.title}</span></CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">{posts.description}</CardSubtitle>
                        <CardText>{posts.body}</CardText>
                        <Button outline color="warning" onClick={() => this.Editpost(posts)}>Edit Post</Button>
                        <Button outline color="danger" onClick={() => this.DeletePost(posts)}>Delete</Button>
                    </CardBody>
                </Card>

            </div>


        ));

    };
    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    };
    submitForm = (event) => {
        event.preventDefault()
        const payload = {
            username: this.state.username,
            password: this.state.password
        };

        axios.post('http://localhost:4000/app/login', payload)
            .then((Response) => {
                if (Response.data === 'Wrong') {
                    this.setState({ maybe: "Incorrect, please try again" })



                }
                else {
                    this.setState({
                        posts: Response.data

                    })
                    this.setState({ loggedIn: true })
                    this.setState({ user: this.state.username })
                    localStorage.setItem('user', this.state.username)
                    this.setState({
                        username: '',
                        password: '',
                        loggedIn: true

                    })
                }
            })
    };
    render() {
        if (this.state.edit === "yes") {
            return (
                <Redirect to='/edit'></Redirect>
            )
        }
        if (this.state.loggedIn) {
            return (
                <div className="container mt-5 col-6">
                    <div className="blog">
                        <CardGroup>
                            {this.displayData(this.state.posts)}
                        </CardGroup>
                        <div className="logout">
                            <Button outline-primary onClick={this.handleLogout}>Logout</Button>
                        </div>
                    </div>
                </div>
            )

        }
        return (
            <div className="log">
                <Container className="App ">
                    <Form className="form" onSubmit={this.submitForm} >
                        <Col>
                            <FormGroup>
                                <Label>User</Label>
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
                                <Label for="examplePassword">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="examplePassword"
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
                </Container>
            </div>

        );
    }
}