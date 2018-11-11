import React, { Component } from 'react'
import Selector from './Selector';

class InputForm extends Component {
    state = {
        text: '',
        status: 'TODO'
    }

    handleInput = event => {
        const text = event.target.value

        this.setState({ text })
    }

    handleSubmit = event => {
        event.preventDefault()

        this.props.onSubmit(this.state.text, this.state.status)

        this.setState({ text: '' })
    }

    getStatusFromSelector = status => {

        this.setState({ status })
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <input value={this.state.text} placeholder="Write text here..." onChange={this.handleInput} />

            <Selector noMove={true} getStatusFromSelector={this.getStatusFromSelector} />
            <button type="submit"><i className="fas fa-plus"></i></button>
        </form>
    }
}

export default InputForm