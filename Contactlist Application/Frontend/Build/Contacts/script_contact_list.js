//Contacts Page

//Classes
class contact {
    constructor(username, firstName, lastName, adress, telephone, id) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.adress = adress;
        this.telephone = telephone;
        this.id = id;

        this.initialize();
    }

    initialize() {
        const div = document.createElement('div');
        div.classList.add('contact-item');

        const letterDiv = document.createElement('div');
        letterDiv.classList.add('letter-div');
        const letter = document.createElement('p');
        letter.classList.add('letter');
        letter.innerText = this.firstName.charAt(0).toUpperCase();
        letterDiv.appendChild(letter);

        div.appendChild(letterDiv);

        const fullName = document.createElement('p');
        fullName.innerText = this.firstName + " " + this.lastName;
        fullName.classList.add('contact-name');
        div.appendChild(fullName);

        div.classList.add(this.id);

        this.htmlObject = div;

        div.addEventListener('click', (event) => {
            console.log("hello");
            contactInformation(event);
        });
    }
}

//Html Objects
const contactsUl = document.querySelector('#contactList');
const logoutButton = document.querySelector('#logout');
const newContactButton = document.querySelector('#addContact');
const text_no_contacts = document.querySelector('.no-contacts');

const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#btn-search');


const animation_load = document.querySelector('.loadBox');
const content = document.querySelector('.content');

//Variables
var contactList = [];

//Eventlisteners
logoutButton.addEventListener('click', logout);
searchButton.addEventListener('click', search);
searchInput.addEventListener('input', search);
newContactButton.addEventListener('click', addNewContact);

    //OnLoad
window.addEventListener('load', () => {
    //Check if user is loged in
    if (localStorage.getItem("LOGEDIN") == "true") {
         //Get localstorage
         const l_username = localStorage.getItem('USERNAME');
         const l_password = localStorage.getItem('PASSWORD');
        
         loadContacts(l_username, l_password);
    }

    else {
        document.body.innerHTML = "Error";
        open('../Auth/page_login.html', '_self')
    }
});

//Functions
function addNewContact() {
    open('page_new_contact.html', '_self');
}

function loadContacts(email, password) {

    startLoading();

    //Get Contactlist...
    fetchContacts(localStorage.getItem('USERNAME'), localStorage.getItem('PASSWORD')).then(result => {
        result.forEach(i_contact => {
            console.log(i_contact);
            contactList.push(new contact(i_contact.username, i_contact.firstName, i_contact.lastName, i_contact.address, i_contact.telephone, i_contact.id));
        });
        listCheck(contactList);
        contactList = sortContactList(contactList);

        //Update html object
        contactList.forEach(contact => {
            contactsUl.appendChild(contact.htmlObject);
        })
    })
    endLoading();
}

function logout(event) {
    localStorage.clear();
    
    open("../Auth/page_login.html", "_self");
}

function sortContactList(n_contactList) {
    n_list = [];
    r_list = [];
    n_contactList.forEach(contact => {
        n_list.push(contact.firstName);
    });
    n_list.sort();
    n_list.forEach(contact_name => {
        n_contactList.forEach(contactObject => {
            if (contact_name == contactObject.firstName) {
                r_list.push(contactObject);
            }
        });
    });

    return r_list;
    
}

function fetchContacts(usernameI, passwordI) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://192.168.178.57:8080/contacts');

        xhr.responseType = 'json';

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            resolve(xhr.response);
        };

        const data = {
            username: usernameI,
            password: passwordI
        };

        xhr.send(JSON.stringify(data));

    });
    return promise;
}

function search(event) {
    event.preventDefault();

    if (searchInput.value == "") {
        contactsUl.innerHTML = "";
        contactList.forEach(contact => {
            
            contactsUl.appendChild(contact.htmlObject);
            })
        noContact();
        return;
    }

    contactsUl.innerHTML = "";
    contactList.forEach(contactElement => {
        if (contactElement.firstName.toLowerCase() == searchInput.value.toLowerCase() || contactElement.lastName.toLowerCase() == searchInput.value.toLowerCase()  || searchInput.value.toLowerCase() == contactElement.firstName.toLowerCase() + " " + contactElement.lastName.toLowerCase()) {
            contactsUl.appendChild(contactElement.htmlObject);
        }
    });
    noContact();
}

function startLoading() {
    animation_load.style.display = 'flex';
    content.style.pointerEvents = 'none';
}

function endLoading() {
    animation_load.style.display = 'none';
    content.style.pointerEvents = 'all'
}

function contactInformation(event) {
    i_id = event.target.classList[1];
    localStorage.setItem('CONTACT-ID', i_id);
    open('page_contact_information.html', '_self');
}

function noContact() {
    if (contactsUl.children.length == 0) {
        text_no_contacts.style.display = 'block';
    } else {
        text_no_contacts.style.display = 'none';
    }
}

function listCheck(list) {
    if (list.length == 0) {
        text_no_contacts.style.display = 'block';
    } else {
        text_no_contacts.style.display = 'none';
    }
}


