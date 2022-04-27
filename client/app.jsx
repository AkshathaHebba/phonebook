import Box from '@mui/material/Box';
import Header from './components/Header';
import ContactList from './components/ContactList';

const App = () => (
    <Box sx={{ flexGrow: 1 }}>
        <Header />
        <ContactList />
    </Box>
);

export default App;
