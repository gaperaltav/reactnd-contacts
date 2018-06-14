import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ImageInput from './ImageInput'
import serializeForm from 'form-serialize'
import propTypes from 'prop-types'

class CreateContact extends Component {

    static propTypes = {        
        onCreateContact: propTypes.func.isRequired
    }

    handlerSubmit = (e) => {
        e.preventDefault();
        const contact = serializeForm(e.target, { hash: true });
        
        if(this.props.onCreateContact)
            this.props.onCreateContact(contact)
    }

    render() {
        return (
            <div>
                <Link className="close-create-contact" to="/" > go back </Link>
                <form onSubmit={this.handlerSubmit} className="create-contact-form">
                    <ImageInput
                        className="create-contact-avatar-input"
                        name="avatarUrl"
                        maxHeight={64}
                    />
                    <div className="create-contact-details" >
                        <input type="text" name="name" placeholder="Name" />
                        <input type="text" name="email" placeholder="Email" />
                        <button> Add contact</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateContact