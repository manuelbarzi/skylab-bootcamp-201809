import React, { Component } from 'react'
import Navbar from './Navbar'
import Error from './Error'

class Register extends Component {
    state = { name: '', surname: '', username: '', password: '' }

    handleNameChange = event => {
        const name = event.target.value

        this.setState({ name })
    }

    handleSurnameChange = event => {
        const surname = event.target.value

        this.setState({ surname })
    }

    handleUsernameChange = event => {
        const username = event.target.value

        this.setState({ username })
    }

    handlePasswordChange = event => {
        const password = event.target.value

        this.setState({ password })
    }

    handleSubmit = event => {
        event.preventDefault()

        const { name, surname, username, password } = this.state

        this.props.onRegister(name, surname, username, password)
    }

    render() {
        return <div className="background">
            <Navbar />
            <form className="form-reg" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Name" onChange={this.handleNameChange} />
                <input type="text" placeholder="Surname" onChange={this.handleSurnameChange} />
                <input type="text" placeholder="Username" onChange={this.handleUsernameChange} />
                <input type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                <button type="submit">Register</button> 
            </form>
            <a className="back" href="#" onClick={this.props.onGoBack}>back</a>
            {this.props.error && <Error className="error" message={this.props.error} />}
        </div>
    }
}

export default Register