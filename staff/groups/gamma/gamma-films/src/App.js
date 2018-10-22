import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Home from './components/Home'
import logic from './logic'

class App extends Component {

    handleLoginClick=()=> this.props.history.push('/login')

    handleRegisterClick=()=> this.props.history.push('/register')



    render() {

        return <div className="body">
            <Route exact path="/" render={() => !logic.loggedIn ? <Navbar  onLoginClick={this.handleLoginClick} onRegisterClick={this.handleRegisterClick}/>: <Redirect to="/" />} />

            <Route path="/register" render={() => !logic.loggedIn ? <Register />:<Redirect to="/" />} />

            <Route path="/login" render={() => !logic.loggedIn ? <Login/>: <Redirect to="/" />} />

            {/* <Home /> */}
        </div>
    }
}

export default withRouter(App)
