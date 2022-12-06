import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from "prop-types";
import css from './ContactForm.module.css'


class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };


  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
    
  };


  submitHandler = event => {
    event.preventDefault();
    this.props.addContact({ ...this.state, id: nanoid() });
    this.setState({name: '', number: ''})
  };

  
  render() {
    const {name, number} = this.state
    return (
      <form className={css.form} onSubmit={this.submitHandler}>
        <label className={css.label}>
          <span className={css.name}>Name</span>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={name}
            onChange={this.handleChange}
            required
          />
        </label>

        <label className={css.label}>
        <span className={css.number}>Number</span>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={number}
            onChange={this.handleChange}
            required
          />
          
        </label>
        <button className={css.button}>Add contact</button>
      </form>
    );
  }
}

export default ContactForm;


ContactForm.propTypes = {
  addContact: PropTypes.func,
  submitHandler: PropTypes.func,
  handleChange: PropTypes.func,
  
}