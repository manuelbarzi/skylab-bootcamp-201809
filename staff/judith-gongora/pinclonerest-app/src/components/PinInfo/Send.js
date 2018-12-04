import React, { Component } from 'react'
import './PinInfo.sass'

class Send extends Component {
    state = { link: false, url:`http://localhost:3000/#/pin/${this.props.id}` }

    handleLink = () => {
        if(!this.state.link) this.setState({ link: true })
        else this.setState({ link: false})
    }

    render() {
        return <section className="container__share">
            <span>Share this Pin</span>
            {!this.state.link ? <div onClick={this.handleLink} className='icon-hover-send'>
                <svg width="44" height="44" viewBox="0 0 36 36" version="1.1">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><circle fill="#EFEFEF" cx="18" cy="18" r="18"></circle><g id="Icons/link" transform="translate(9.000000, 9.000000)" fill="#8E8E8E" fillRule="nonzero"><path d="M15.75075,5.43075 L12.711,8.46975 L11.916,7.67475 L12.42,7.17075 C12.8595,6.732 12.8595,6.0195 12.42,5.58 C11.9805,5.14125 11.268,5.14125 10.82925,5.58 L10.326,6.084 L9.53025,5.289 L12.56925,2.25 L15.75075,5.43075 Z M8.46975,12.71175 L5.43075,15.75075 L2.24925,12.57 L5.289,9.53025 L6.08325,10.32525 L5.58,10.82925 C5.14125,11.26875 5.14125,11.9805 5.58,12.42 C6.01875,12.8595 6.732,12.85875 7.17075,12.42 L7.674,11.916 L8.46975,12.71175 Z M10.97925,0.65925 L7.9395,3.69825 C7.06125,4.5765 7.06125,6.00075 7.9395,6.87975 L8.73525,7.67475 L7.674,8.73525 L6.879,7.9395 C6.00075,7.06125 4.5765,7.06125 3.69825,7.9395 L0.65925,10.9785 C-0.21975,11.8575 -0.21975,13.28175 0.65925,14.16 L3.84,17.3415 C4.71825,18.21975 6.1425,18.21975 7.02075,17.3415 L10.0605,14.3025 C10.93875,13.4235 10.93875,11.99925 10.0605,11.121 L9.2655,10.32525 L10.326,9.2655 L11.121,10.0605 C11.99925,10.93875 13.4235,10.93875 14.30175,10.0605 L17.34075,7.0215 C18.21975,6.14325 18.21975,4.719 17.34075,3.84 L14.16,0.65925 C13.28175,-0.21975 11.8575,-0.21975 10.97925,0.65925 Z" id="path-1"></path></g></g>
                </svg>
            </div> : 
            <div className='share__group'>
                <input className='input__share' type='text' defaultValue={this.state.url} /> <button onClick={this.handleLink}>X</button>
            </div>}
        </section>
    }
}

export default Send