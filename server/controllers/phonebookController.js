const { getContacts } = require('../doa/contact-doa');
/**
 * API Handler to Get the Offers
 */
const getPhonebookNumbers = async (req, res) => {
    const contacts = await getContacts();
    res.status(200).json(contacts);
};

module.exports = {
    getPhonebookNumbers,
};
