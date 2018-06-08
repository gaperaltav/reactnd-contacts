import React, { Component } from 'react'
import ContactsList from './ContactsList'
import { Route } from 'react-router-dom'
import * as ContactsApi from './utils/ContactsAPI'
import CreateContact from './CreateContact'

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
      <div className="app" >
        <Route exact path="/" render={() => (
           <ContactsList
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
          />
        )} />
        <Route path="/create" component={CreateContact} />
      </div>
    )
  }
}

export default App;
