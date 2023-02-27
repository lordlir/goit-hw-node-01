const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.join(__dirname, "./db/contact.json");

const listContacts = async () => {
  const contact = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contact);
};
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  return contact;
};

async function updateContactList(instance) {
  try {
    fs.writeFile(contactsPath, JSON.stringify(instance, null, 2));
  } catch (error) {
    console.log(error);
  }
}

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  const changedContacts = [...allContacts, newContact];
  updateContactList(changedContacts);
  return newContact;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const changedContacts = allContacts.filter(({ id }) => id !== contactId);
  updateContactList(changedContacts);
  return allContacts.filter(({ id }) => id === contactId);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
