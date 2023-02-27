const contactsOperations = require("./contact.js");
const { Command } = require("commander");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsOperations.listContacts();
      console.table(allContacts);
      break;
    case "get":
      const contact = await contactsOperations.getContactById(id);
      console.log(contact);
      break;
    case "add":
      const addedContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.log(addedContact);
      break;

    case "remove":
      const removeContact = await contactsOperations.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
invokeAction(argv);
