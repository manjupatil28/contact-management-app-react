import { ADD_CONTACT, EDIT_CONTACT, REMOVE_CONTACT } from './actionTypes';

// Set the initial state of the reducer with contacts retrieved from localStorage, or an empty array if there are no saved contacts
const initialState = {
  contacts: JSON.parse(localStorage.getItem("contacts")) || []
};

// Define the reducer function that will handle different actions and update the state accordingly
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTACT: {
      // Check if any required fields are missing
      let flag = 0;
      if (action.payload.first_name === "" || action.payload.last_name === "" || action.payload.mob === "") {
        alert('Required Input Missing');
        flag = 1;
      } else {
        // Check if a contact with the same name already exists in the state
        state.contacts.forEach((el) => {
          if (el.first_name === action.payload.first_name && el.last_name === action.payload.last_name) {
            alert('Name Already Exists In Contacts');
            flag = 1;
          }
        });
      }
      // If no errors were found, add the new contact to the state and localStorage
      if (!flag) {
        alert('Contact Saved Successfully');
        let updatedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
        updatedContacts.push({ id: state.contacts.length + 1, ...action.payload });
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        window.location.href = window.location.origin;
        return {
          ...state,
          contacts: [...updatedContacts],
        };
      }
    }
    case REMOVE_CONTACT: {
      // Remove the contact with the given ID from the state and localStorage
      let Contacts = JSON.parse(localStorage.getItem("contacts"));
      let updatedContacts = Contacts.filter((el) => el.id !== action.payload.id);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      return {
        ...state,
        contacts: [...updatedContacts]
      };
    }
    case EDIT_CONTACT: {
      // Check if any required fields are missing
      if (action.payload.first_name === "" || action.payload.last_name === "" || action.payload.mob === "") {
        alert('Input fields can not be Empty');
        return state;
      } else {
        // Check if a contact with the same name already exists in the state
        let flag = 0;
        let Contacts = JSON.parse(localStorage.getItem("contacts"));
        Contacts.forEach((el) => {
          if (el.id !== action.payload.id && el.first_name === action.payload.first_name && el.last_name === action.payload.last_name) {
            alert("Name already exists");
            flag = 1;
            return state;
          }
        });
        // If no errors were found, update the contact in the state and localStorage
        if (!flag) {
          let updatedContacts = Contacts.map((el) => {
            if (el.id === action.payload.id) {
              return el = { ...action.payload };
            } else {
              return el;
            }
          });
          localStorage.setItem("contacts", JSON.stringify(updatedContacts));
          alert('Contact has been updated');
          window.location.href = window.location.origin;
          return {
            ...state,
            contacts: state.contacts.map((el) => {
              if (el.id === action.payload.id) {
                return el = { ...action.payload };
              } else {
                return el;
              }
            }),
          };
        }
      }
    }
    // If the action type is not recognized, return the current state
    default:
      return state;
  }
}
