import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedIn'
class Navbar extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        loggedIn: ''
    }
    componentDidMount = () => {
        console.log(this.props.logged)
        this.setState({
            loggedIn: this.props.logged
        })


    }
    render() {
        return (
            <SignedInLinks />
        )

    }
}

export default Navbar