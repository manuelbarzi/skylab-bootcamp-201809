import React, { Component } from 'react'
import './style.css'
import logic from '../../logic'
import Error from '../error/Error'
import swal from 'sweetalert2'

class CreateStory extends Component {
    state = { error: null }

    componentDidMount () {
        logic.retrieveUser()
            .then(({name}) => {
                this.setState({name})
            })
    }

    handleTitleChange = event => {
        const title = event.target.value

        this.setState({ title, error: null })
    }

    handleAudioLanguageChange = event => {
        const audioLanguage = event.target.value

        this.setState({ audioLanguage, error: null })
    }

    handleTextLanguageChange = event => {
        const textLanguage = event.target.value

        this.setState({ textLanguage, error: null })
    }

    handleSubmit = event => {
        event.preventDefault()

        const { title, audioLanguage, textLanguage } = this.state

        try {
            logic.addStory(title, audioLanguage, textLanguage)
                .then(({ storyId }) => {
                    this.setState({ id: storyId, error: null })

                    this.props.onNewStory(storyId)
                })
                .catch(err => {
                    let message
                    switch (err.message) {
                        case `story with title ${this.state.title} already created by user with id ${logic._userId}`:
                            message = `JA HAS CREAT UN CONTE AMB AQUEST TÍTOL`
                            break
                        default:
                            message = err.message
                    }
                    this.setState({ error: message })
                })
        } catch (err) {
            this.setState({ error: `OMPLE TOTS ELS CAMPS PER A CREAR EL CONTE` })
        }
    }

    // handleHelpClick = () => {
    //     swal({
    //         text: `APRETA EL CUBELL D'ESCOMBRARIES SI VOLS ESBORRAR EL CONTE, APRETA EL COHET SI VOLS QUE EL CONTE EL PUGUIN VEURE ALTRES NENS O APRETA EL NEN SI EL VOLS PODER VEURE NOMÉS TU`,
    //         width: 300,
    //         padding: '3em',
    //         confirmButtonText: 'SOM-HI',
    //         confirmButtonColor: '#0097A7'
    //     })
    // }

    handleBackClick = () => {
        this.props.onBackClick()
    }

    render() {
        return <div className='container-create-story'>
            <div className='create-story-header'>
                <h1>CREA UN NOU CONTE</h1>
                {/* <button className="help-create-story" onClick={this.handleHelpClick}><i className="fa fa-question"></i></button> */}
                {/* <button className="back-create-story" onClick={this.handleBackClick}>TORNAR ALS MEUS CONTES</button> */}
            </div>
            <form className="book-details-create" onSubmit={this.handleSubmit}>
                <h3>TÍTOL DEL CONTE</h3>
                <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
                <h3>AUTOR DEL CONTE</h3>
                <input type="text" disabled value={this.state.name} />
                <h3>INIDOMA DE L'AUDIO DEL CONTE</h3>
                <input type="text" value={this.state.audioLanguage} onChange={this.handleAudioLanguageChange} />
                <h3>IDIOMA DEL TEXT DEL CONTE</h3>
                <input type="text" value={this.state.textLanguage} onChange={this.handleTextLanguageChange} />
                <button type="submit">GUARDA</button>
            </form>
            {this.state.error && <Error message={this.state.error} />}
        </div>
    }

}

export default CreateStory