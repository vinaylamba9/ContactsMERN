import React, { useReducer } from "react";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";

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
        id: 1,
        name: "Jill Johnson",
        email: "abc@ass.in",
        phone: "7986-456-123",
        type: "personal"
      },
      {
        id: 1,
        name: "Jill Johnson",
        email: "abc@ass.in",
        phone: "7986-456-123",
        type: "professional"
      }
    ]
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //Add Contact

  //Delete Contact

  //Set Current Contact

  //Clear Current Contact

  //Update Contact

  //Filter Contacts

  //Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
