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

        const fullName = document.createElement('p');
        fullName.innerText = this.firstName + " " + this.lastName;
        fullName.classList.add('contact-name');
        div.appendChild(fullName);

        const mobileNumber = document.createElement('p');
        mobileNumber.innerText = this.telephone;
        div.appendChild(mobileNumber);

        const adress = document.createElement('p');
        adress.innerText = this.adress;
        div.appendChild(adress);
        
        div.classList.add(this.id);

        this.htmlObject = div;

        div.addEventListener('click', (event) => {
            contactInformation(event);
        });
    }
}

//Html Objects
const contactsUl = document.querySelector('#contactList');
const logoutButton = document.querySelector('#logout');
const newContactButton = document.querySelector('#addContact');

const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#btn-search');


const loadingBox = document.querySelector('.loadBox');
const content = document.querySelector('.content');

//Variables
var contactList = [];//[new contact("Lars", "Dietzel", "0176 60424128", "Reginbaldstrße 13A"), new contact("Hans", "Dieter", "0176 60424128", "Reginbaldstrße 13A"), new contact("Karl", "Dietzel", "0176 60424128", "Reginbaldstrße 13A"), new contact("Christiano", "Ronaldo", "0176 60424128", "Reginbaldstrße 13A"), new contact("Peter", "Schmidt", "0176 60424128", "Reginbaldstrße 13A"), new contact("Max", "Mustermann", "0176 60424128", "Reginbaldstrße 13A"), new contact("Leonardo", "Davinci", "0176 60424128", "Reginbaldstrße 13A"),];

//Eventlisteners
logoutButton.addEventListener('click', logout);
searchButton.addEventListener('click', search);
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
        open('login.html', '_self')
    }

       
});



//Functions
function addNewContact() {
    open('newContact.html', '_self');
}

function loadContacts(email, password) {

    startLoading();

    //Get Contactlist...
    fetchContacts(localStorage.getItem('USERNAME'), localStorage.getItem('PASSWORD')).then(result => {
        result.forEach(i_contact => {
            console.log(i_contact);
            contactList.push(new contact(i_contact.username, i_contact.firstName, i_contact.lastName, i_contact.address, i_contact.telephone, i_contact.id));
        });

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
    
    open("login.html", "_self");
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
        xhr.open('POST', 'http://192.168.3.239:8080/contacts');

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
        return;
    }

    contactsUl.innerHTML = "";
    contactList.forEach(contactElement => {
        if (contactElement.firstName.toLowerCase() == searchInput.value.toLowerCase() || contactElement.lastName.toLowerCase() == searchInput.value.toLowerCase()  || searchInput.value.toLowerCase() == contactElement.firstName.toLowerCase() + " " + contactElement.lastName.toLowerCase()) {
            contactsUl.appendChild(contactElement.htmlObject);
        }
    });
}

function startLoading() {
    loadingBox.style.display = 'flex';
    content.style.pointerEvents = 'none';
}

function endLoading() {
    loadingBox.style.display = 'none';
    content.style.pointerEvents = 'all'
}

function contactInformation(event) {
    i_id = event.target.classList[1];
    localStorage.setItem('CONTACT-ID', id);
    open('contactInformation.html', '_self');
}
