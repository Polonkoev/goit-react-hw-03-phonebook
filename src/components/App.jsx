
import { Component } from 'react';
import PropTypes from "prop-types";
import { ContactList } from './ContactList/ContactList';
import {Filter} from './Filter/Filter'
import ContactForm from './ContactForm/ContactForm';
import css from './App.module.css'

class App extends Component {
  state = {
    contacts: [{id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'}],
    
    filter: '',
  };

  componentDidMount(){
    const savedContacts = localStorage.getItem('contacts')
    if (savedContacts) {
      this.setState({contacts: JSON.parse(savedContacts)})
    }
  }

componentDidUpdate(prevProps, prevState){
  const {contacts} = this.state
if(prevState.contacts !== contacts){
  localStorage.setItem('contacts', JSON.stringify(contacts))
}
}


  addContact = newContact => {
    const findContact = this.state.contacts.find(contact => contact.name.toLocaleLowerCase() === newContact.name.toLocaleLowerCase()) 
    if (findContact){
    
      alert (`${newContact.name} is already in contacts`)
    }
    else{
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));}
    
  };

  handleFilter=(event)=>{
    
    this.setState({filter: event.target.value})
    this.renderContacts()
  }
  
  renderContacts = () => {
    const renderedContacts = this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.trim().toLowerCase());
    });
    return renderedContacts
    
  };
  deleteContact=(data)=>{
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== data),
    }));
    

   
}


  render() {
    const { contacts, filter } = this.state;
    return (
      <><div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm  contacts={contacts}  addContact={this.addContact} handleChange={this.handleChange}/>
      
        
        <h2 className={css.contacts}>Contacts</h2>
        
        <Filter contacts={contacts} filter={filter} onChange={this.handleFilter}/>
        
        <ContactList 
        
        contactList={this.renderContacts()}
        deleteContact={this.deleteContact}
         
        />
        </div>
      </>
    );
  }
}

App.propTypes = {
  addContact: PropTypes.func,
  handleFilter: PropTypes.func,
  renderContacts: PropTypes.func,
  deleteContact: PropTypes.func,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  )
}

export default App;
