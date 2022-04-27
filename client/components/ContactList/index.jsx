import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import ContactCard from '../ContactCard';
import request from '../../utils/request';
import Spinner from '../Spinner';

const ContactList = () => {
    // State to Store and Display the contact in the front end.
    const [contacts, setContacts] = useState([]);
    // Loading State For the Contan
    const [loading, setLoading] = useState(true);
    // Fetch the Contacts from the API on component mount.
    useEffect(() => {
        setLoading(true);
        async function getContacts() {
            const response = await request({
                url: '/api/phone/number',
            });
            setLoading(false);
            setContacts(response);
        }
        getContacts();
    }, []);
    // Render the Contact List.
    return (
        <Container>
            {
                loading && (<Spinner />)
            }
            {
                contacts.map((contact) => <ContactCard key={contact.email} {...contact}/>)
            }
        </Container>
    );
};

export default ContactList;
