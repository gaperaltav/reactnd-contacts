import React, { Component } from 'react';
import propTypes from 'prop-types';
import './index.css';

class ContactList extends Component {

    static propTypes = {
        contacts: propTypes.array.isRequired,
        onDeleteContact: propTypes.func.isRequired
    }

    state = {
        query: ''
    }

    changeSearch(queryText){
        this.setState({
            query: queryText
        })
    }

    render() {
        return (
            <div className="list-contacts" >
                <div className="list-contacts-top" >
                <input 
                    className="search-contacts"
                    onChange={(event) => this.changeSearch(event.target.value)}
                />
                </div>
                <ol className="contact-list" >
                    {this.props.contacts.map(contact => (
                        <li key={contact.id} className="contact-list-item"  >
                            <div className="contact-avatar" style={{ backgroundImage: `url(${contact.avatarURL})` }} />
                            <div className="contact-details" >
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => this.props.onDeleteContact(contact)} className="contact-remove" />
                        </li>
                    ))}
                </ol>
            </div>
        )
    }

}

export default ContactList;
