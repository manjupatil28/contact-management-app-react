import { ADD_CONTACT, EDIT_CONTACT, REMOVE_CONTACT } from './actionTypes';

// Action creator to add a new contact
export const addContact = (payload) => {
  return {
    type: ADD_CONTACT, // specifies the action type as ADD_CONTACT
    payload, // includes the payload in the action object
  };
};

// Action creator to remove a contact
export const removeContact = (id) => {
  return {
    type: REMOVE_CONTACT, // specifies the action type as REMOVE_CONTACT
    payload: {
      id, // includes the ID of the contact to be removed in the payload of the action object
    },
  };
};

// Action creator to edit an existing contact
export const editContact = (payload) => {
  return {
    type: EDIT_CONTACT, // specifies the action type as EDIT_CONTACT
    payload, // includes the payload in the action object
  };
};
