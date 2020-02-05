import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Jill Johnson",
        email: "abc@ass.in",
        phone: "7986-456-123",
        type: "personal"
      },
      {
        id: 2,
        name: "Jill Johnson",
        email: "abc@ass.in",
        phone: "7986-456-123",
        type: "personal"
      },
      {
        id: 3,
        name: "Jill Johnson",
        email: "abc@ass.in",
        phone: "7986-456-123",
        type: "professional"
      }
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //Add Contact
  const addContact = contact => {
    contact.id = uuid.v4(); // assigning a id
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  //Delete Contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  //Set Current Contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //Update Contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  //Filter Contacts
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  //Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact: addContact,
        deleteContact: deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
