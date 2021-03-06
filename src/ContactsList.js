import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import './index.css';

class ContactList extends Component {

    static propTypes = {
        contacts: propTypes.array.isRequired,
        onDeleteContact: propTypes.func.isRequired
    }

    state = {
        query: ''
    }

    udpateQuery = (queryText) => {
        this.setState({ query: queryText })
    }

    resetQuery = () => {
        this.setState({ query: '' })
    }

    render() {
        const { contacts, onDeleteContact } = this.props;
        const { query } = this.state;
        let showingContacts;

        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            showingContacts = contacts.filter(contact => match.test(contact.name))
        } else {
            showingContacts = contacts
        }

        showingContacts.sort(sortBy('name'))

        return (
            <div className="list-contacts" >
                <div className="list-contacts-top" >
                    <input
                        className="search-contacts"
                        type="text"
                        value={query}
                        onChange={(event) => this.udpateQuery(event.target.value)}
                    />
                    <Link
                        to="/create"
                        className="add-contact"                       
                    > Add Contact  </Link>
                </div>
                <span>
                    {showingContacts.length !== contacts.length && (
                        <div className="showing-contacts" >
                            <span> showing {showingContacts.length} of {contacts.length} </span>
                            <button onClick={this.resetQuery} > Show all </button>
                        </div>
                    )}
                </span>
                <ol className="contact-list" >
                    {showingContacts.map(contact => (
                        <li key={contact.id} className="contact-list-item"  >
                            <div className="contact-avatar" style={{ backgroundImage: `url(${contact.avatarURL})` }} />
                            <div className="contact-details" >
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => onDeleteContact(contact)} className="contact-remove" />
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default ContactList;
