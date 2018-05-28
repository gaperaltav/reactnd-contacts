import React, { Component } from 'react';
import ContactsList from './ContactsList';
import * as ContactsApi from './utils/ContactsAPI'

class App extends Component {

  state = {
    contacts: []
  }

  componentDidMount = () => {
    this.initContacts()
  }

  initContacts = () => {
    ContactsApi
      .getAll()
      .then(contacts => this.setState({ contacts }))
  }

  removeContact = (contact) => {
    ContactsApi
      .remove(contact)
      .then(() => this.initContacts())
  }

  render() {
    return (
      <div>
        <ContactsList
          onDeleteContact={this.removeContact}
          contacts={this.state.contacts} />
      </div>
    );
  }
}

export default App;
