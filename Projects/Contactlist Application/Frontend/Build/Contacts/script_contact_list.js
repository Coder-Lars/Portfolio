//Contacts Page

//Classes
class contact {
    constructor(username, firstName, lastName, address, telephone, id) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.telephone = telephone;
        this.id = id;

        //Create Html Objects
        this.initialize();
    }

    initialize() {
        //Main Div
        const tr = document.createElement('tr');

        //Letter Icon
        const letter = document.createElement('td');
        letter.classList.add('letter-icon');
        letter.innerText = this.firstName.charAt(0).toUpperCase();
        tr.appendChild(letter);

        //Name
        const fullName = document.createElement('td');
        fullName.innerText = this.firstName + " " + this.lastName;
        fullName.classList.add('td-name');
        tr.appendChild(fullName);

        //Telepohone
        const tel = document.createElement('td');
        tel.innerText = this.telephone;
        tel.classList.add('td-tel');
        tr.appendChild(tel);

        //Email
        const email = document.createElement('td');
        email.innerText = this.address;
        email.classList.add('td-address');
        tr.appendChild(email);

        tr.classList.add(this.id);

        //Asign object to variable
        this.htmlObject = tr;

        //Eventlistener for contact-div
        tr.addEventListener('click', (event) => {
            contactInformation(event);
        });
    }
}

//Html Objects
const contact_table_body = document.querySelector('#table-body');
const logoutButton = document.querySelector('#logout-btn');
const newContactButton = document.querySelector('#addContact');
const text_no_contacts = document.querySelector('.no-contacts');

const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#btn-search');

const fab_btn_new_contact = document.querySelector('#fab-add-contact');
const animation_load = document.querySelector('.loadBox');
const content = document.querySelector('.content');

//Variables
var contactList = [];

//Eventlisteners
logoutButton.addEventListener('click', logout);
searchButton.addEventListener('click', search);
searchInput.addEventListener('input', search);
newContactButton.addEventListener('click', addNewContact);
fab_btn_new_contact.addEventListener('click', addNewContact);
document.addEventListener('click', e => {
    const isDropdownButton = e.target.matches("[data-dropdown-button]");
    if (!isDropdownButton && e.target.closest('[data-dropdown-button]') != null) return;
    let currentDropdown
    if (isDropdownButton) {
        currentDropdown = e.target.closest('[data-dropdown]');
        currentDropdown.classList.toggle('active');
    }

    document.querySelectorAll("[data-dropdown].active").forEach(dropwdown => {
        if (dropwdown === currentDropdown) return
        dropwdown.classList.remove("active")
    })
})

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

    document.querySelector('#profile-btn').innerHTML = localStorage.getItem('USERNAME').charAt(0).toUpperCase();
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
        console.log(contactList);
        //Update html object
        contactList.forEach(contact => {
            contact_table_body.appendChild(contact.htmlObject);
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
        n_list.push(contact.firstName.toUpperCase());
    });
    n_list.sort();
    console.log(n_list);
    n_list.forEach(contact_name => {
        n_contactList.forEach(contactObject => {
            if (contact_name == contactObject.firstName.toUpperCase()) {
                r_list.push(contactObject);
            }
        });
    });
    console.log(r_list);
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
        contact_table_body.innerHTML = "";
        contactList.forEach(contact => {
            
            contact_table_body.appendChild(contact.htmlObject);
            })
        noContact();
        return;
    }

    contact_table_body.innerHTML = "";
    contactList.forEach(contactElement => {
        if (contactElement.firstName.toLowerCase() == searchInput.value.toLowerCase() || contactElement.lastName.toLowerCase() == searchInput.value.toLowerCase()  || searchInput.value.toLowerCase() == contactElement.firstName.toLowerCase() + " " + contactElement.lastName.toLowerCase()) {
            contact_table_body.appendChild(contactElement.htmlObject);
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
    inner_contact = event.target;
    if (inner_contact.classList.contains("td-address") || inner_contact.classList.contains("td-name") || inner_contact.classList.contains("td-tel") || inner_contact.classList.contains("letter-icon")) {
        inner_contact = inner_contact.parentElement;
    }  
    
    const object = {
        name: inner_contact.childNodes[1].innerText,
        telephone: inner_contact.childNodes[2].innerText,
        address: inner_contact.childNodes[3].innerText,
        id: inner_contact.classList[0]
    }

    data = JSON.stringify(object);
    console.log("saved");
    localStorage.setItem('CONTACT_INFORMATION', data);
    open('page_contact_information.html', '_self');
}

function noContact() {
    if (contact_table_body.children.length == 0) {
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


