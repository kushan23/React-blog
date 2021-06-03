import React, { Component } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
    FormText,
} from 'reactstrap';
class EditPost extends Component {
    state = {
        username: '',
        title: '',
        description: '',
        body: '',
        loggedIn: '',
        user: '',
        id: ''

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

        this.getData()
        const log = localStorage.getItem('user')
        let id = localStorage.getItem('id')

        console.log(id)
        if (log) {
            this.setState({
                user: log,
                loggedIn: true,
                id: id


            })

        }
    }





    getData = () => {
        let uId = localStorage.getItem('id')

        const payload = {
            id: uId


        }
        axios.post('http://localhost:4000/app/posts/find', payload)
            .then((Response) => {
                const data = Response.data
                const { title, body, description, username } = data[0];
                this.setState({
                    title: title,
                    body: body,
                    description: description,
                    username: username
                })



            })
            .catch(() => {
                alert("No data sent");
            })




    }
    onSubmit = (event) => {
        event.preventDefault()
        let uId = localStorage.getItem('id');

        const payload = {
            username: this.state.username,
            title: this.state.title,
            description: this.state.description,
            body: this.state.body,
            id: uId



        };
        console.log(payload)
        axios.put('http://localhost:4000/app/posts/edit', payload)
            .then(Response => console.log(Response.data))
            .catch((error) => {
                console.log(error)
            })

        window.location.href = '/show';


        //this.setState({
        //  title: '',
        // username: '',
        //description: '',
        // body: ''

        //})
    };

    render() {
        //   let url = this.props.location.search
        // let params = queryString.parse(url)
        //console.log(params);
        //let userId = this.props.match.params.userId;
        //console.log(this.userId)

        if (!this.state.loggedIn) {
            return (
                <div>
                    <h1>Please Login</h1>
                    <Link to='/signin'>Sign In</Link>
                    <br />
                    <Link to='/signup'>Sign Up</Link>
                </div>
            )
        }

        return (
            <div className="log">


                <Form className="form" onSubmit={this.onSubmit} >


                    <Col>
                        <FormGroup>
                            <Label>Title</Label>
                            <Input
                                placeholder='Title'
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
                                type="text"
                                name="body"
                                placeholder='Write your thoughts'
                                onChange={this.handleChange}
                                value={this.state.body}
                            />
                        </FormGroup>
                        <FormText><b>{this.state.maybe}</b></FormText>
                    </Col>
                    <div className='container mt-3 '>
                        <Button outline color="danger">Edit</Button>
                    </div>
                </Form>

            </div>

        )

    }
}


export default EditPost