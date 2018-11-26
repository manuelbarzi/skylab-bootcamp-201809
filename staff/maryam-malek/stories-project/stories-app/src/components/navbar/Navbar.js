import React, { Component } from 'react'
import './style.css'

class Navbar extends Component {

    handleLogoutClick = () => {

        this.props.onLogoutClick()
    }

    handleMyStoriesClick = () => {

        this.props.onMyStoriesClick()
    }

    handleMyFavouritesClick = () => {

        this.props.onFavouritesClick()
    }

    handleRegisterClick = () => {

        this.props.onRegisterClick()
    }

    handleLoginClick = () => {

        this.props.onLoginClick()
    }

    render() {

        return <div>
            {this.props.loggedIn && <div className='navbar-container'>
                <button className='logout-button' onClick={this.handleLogoutClick}>TANCAR SESSIÓ</button>
                <button className='my-stories-button' onClick={this.handleMyStoriesClick}>ELS MEUS CONTES</button>
                <button className='favourit-stories-button' onClick={this.handleMyFavouritesClick}>CONTES PREFERITS</button>
            </div>}
            {!this.props.loggedIn && <div className='navbar-container'>
                <button className='register-button' onClick={this.handleRegisterClick}>REGISTRA'T</button>
                <button className='login-button' onClick={this.handleLoginClick}>INICIA SESSIÓ</button>
            </div>}
        </div>
    }
}

export default Navbar