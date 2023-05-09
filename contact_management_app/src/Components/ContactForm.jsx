import { useState } from 'react';
import { useDispatch } from "react-redux";
import { addContact } from '../Redux/action';

function ContactForm() {

    // useDispatch hook to access dispatch function
    const dispatch = useDispatch()

    // useState hook to manage form state
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        mob: "",
        status: "active"
    })

    // function to handle form input changes
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // function to handle form submission
    function handleSave() {
        // dispatch addContact action with current form state as payload
        dispatch(addContact(form));
    }

    // JSX code for the contact form
    return (
        <div className="w-1/2 mx-auto my-4 pt-16">
            <h2 className="text-2xl mb-4">Create Contact</h2>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="first-name">
                    First Name
                </label>
                <input
                    className="w-full border border-purple-900 p-2 rounded-md"
                    id="first-name"
                    type="text"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="last-name">
                    Last Name
                </label>
                <input
                    className="w-full border border-purple-900 p-2 rounded-md"
                    id="last-name"
                    type="text"
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="last-name">
                    Mobile Number
                </label>
                <input
                    className="w-full border border-purple-900 p-2 rounded-md"
                    id="last-name"
                    type="number"
                    name="mob"
                    min='10'
                    max='10'
                    value={form.mob}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="status">
                    Status
                </label>
                <select
                    className="w-full border border-purple-900 p-2 rounded-md"
                    id="status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                >
                    <option value={'active'}>Active</option>
                    <option value={"inactive"}>Inactive</option>
                </select>
            </div>
            <button
                className="bg-purple-900 hover:bg-purple-700 text-white p-2 rounded-md"
                onClick={handleSave}
            >
                Save Contact
            </button>
        </div>
    );
}

export default ContactForm;
