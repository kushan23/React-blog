import React, { Component } from 'react'
import axios from 'axios'
import EditPost from './edit'
import { Redirect, Route } from 'react-router-dom';
import {
    Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody
} from 'reactstrap';
import '../styles/show.css'
import { Link, useParams } from 'react-router-dom'


class PostShow extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        fullName: '',
        username: '',
        email: '',
        password: '',
        posts: [],
        user: '',
        loggedIn: '',
        edit: ''
    };

    componentDidMount = () => {
        this.getData()
        const log = localStorage.getItem('user');
        if (log) {
            this.setState({
                user: log,
                loggedIn: true
            })
        }
        console.log(this.state.loggedIn)
        console.log(this.state.posts)

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


                console.log("Data has been recieved");

            })
            .catch(() => {
                alert("No data sent");
            })
    }
    displayData = (posts) => {

        if (!posts.length) return null;

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
    Editpost = (data) => {
        // console.log(this.posts.title)
        console.log("helllo");
        let id = data._id
        console.log("id is->" + id);
        localStorage.setItem('id', id)
        this.setState({
            edit: "yes"

        })
        //console.log(data)
        console.log(this.state.edit)

    }
    DeletePost = (data) => {
        // console.log(this.posts.title)
        console.log("deleting LETSGOO");


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

        //window.location.href = '/show';




    }
    handleLogout = () => {
        this.setState({
            user: "",
            loggedIn: false
        })
        localStorage.clear()
        console.log("Bye bye")
    }



    render() {
        if (!this.state.loggedIn) {
            return (
                <div className="container mt-5 col-6">
                    <div className="oops">
                        <h1>Please login to view all your Posts</h1>

                    </div>
                    <div className="link">
                        <button className="btn btn-warning"><Link to='/signin'>Login</Link></button>
                    </div>
                </div>
            )
        }
        if (this.state.edit === "yes") {
            return (
                <Redirect to='/edit'></Redirect>
            )
        }

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
}

export default PostShow