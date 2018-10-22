import React, { Component } from 'react'
import logic from '../logic'
import { Route, withRouter, Redirect } from 'react-router-dom'

class Navbar extends Component {


    render() {
        return <nav className="navbar">

            <image className="header_background">
                <div className="navbar_buttons">
                    <button onClick={this.props.onLoginClick}>Login</button>
                    <button onClick={this.props.onRegisterClick}>Register</button>
                </div>
                <div className="header">
                <image className="logo"></image>
                </div>
            </image>

        </nav>
    }

}

export default Navbar