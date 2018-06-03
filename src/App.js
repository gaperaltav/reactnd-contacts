import React, { Component } from 'react';
import ContactsList from './ContactsList';
import * as ContactsApi from './utils/ContactsAPI'
import CreateContact from './CreateContact';

class App extends Component {

  state = {
    screen: 'list', // create
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
      <div className="app" >
        {this.state.screen === 'create' && (
          <CreateContact />
        )}
        {this.state.screen === 'list' && (
          <div>
            <ContactsList
              onDeleteContact={this.removeContact}
              contacts={this.state.contacts}
              onNavigate={() => { this.setState({ screen: 'create' }) }}
            />
          </div>
        )}
      </div>
    )
  }
}

export default App;
