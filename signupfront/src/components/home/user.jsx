import React, { Component } from 'react'
import PostShow from '../posts/show';
import '../styles/home.css'


class Home extends Component {
    constructor(props) {
        super(props);

    }
    state = {
        user: 'test'
    }
    componentDidMount = () => {
        const user = localStorage.getItem('user');
        if (user) {
            this.setState({
                user: user
            })
        }
        else {
            this.setState({
                user: ''
            })
        }
    }
    render() {
        if (this.state.user === '') {
            return (
                <div>
                    <div classname="container">
                        <h1 className="wel">Welcome  </h1>
                    </div>
                    <PostShow />
                </div>
            );

        }
        else

            return (

                <div>
                    <div classname="container">
                        <h1 className="wel2">Welcome</h1>
                    </div>


                    <PostShow />
                </div>
            );
    }
}
export default Home