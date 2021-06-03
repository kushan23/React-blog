import React, { Component } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import "bootstrap/dist/css/bootstrap.min.css"
import Signup from './components/auth/Signup'
import PostShow from './components/posts/show'
import Login from './components/auth/Login'
import CreatePost from './components/posts/create'
import Home from './components/home/user'
import EditPost from './components/posts/edit'
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {
    constructor() {
        super();

        this.state = {
            loggedIn: false,
            user: 'loggedOut'
        }
    }
    componentDidMount() {
        const log = localStorage.getItem('user')
        if (log) {
            this.setState({
                loggedIn: true,
                user: log
            })
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar logged={this.state.user} />
                    <Route exact path='/show'>
                        <Redirect to='/show' />
                    </Route>


                    <Switch>

                        <Route exact path='/signin'>
                            <Login />
                        </Route>
                        <Route exact path='/edit'>
                            <EditPost />
                        </Route>
                        <Route exact path='/home'>
                            <Home />
                        </Route>



                        <Route exact path='/signup'>

                            <Signup logged={this.state.user} />

                        </Route>
                        <Route exact path='/show'
                            render={props => (
                                <PostShow {...props} loggedInStatus={this.state.user} />
                            )}
                        />
                        <Route exact path='/new'>
                            <CreatePost />
                        </Route>


                    </Switch>
                    <br></br>




                </div>
            </BrowserRouter>

        );
    }
}

export default App;
