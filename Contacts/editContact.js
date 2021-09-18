//Edit Contact

//Html Objects
const content = document.querySelector('.content');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const adress = document.querySelector('#adress');
const telephone = document.querySelector('#telephone');
const submitButton = document.querySelector('.btn-submit');
const deleteButton = document.querySelector('.btn-delete');
const loadingBox = document.querySelector('.loadBox');
const errorText = document.querySelector('#error-text');

//Variables
var id = null;

//Eventlisteners
window.addEventListener('load', () => {
    startLoading();
    id = localStorage.getItem('CONTACT-ID');

    if (id == "" || id == null) {
        open('contacts.html', '_self');
    }

    loadContactInformation().then(result => {
        firstName.value = result.firstName;
        lastName.value = result.lastName;
        address.value = result.address;
        telephone.value = result.telephone;
    })

    endLoading();
})

submitButton.addEventListener('click', () => {
    updateContact();
})

//Functions


function loadContactInformation() {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://192.168.3.239:8080/contact');

        xhr.responseType = 'json';

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            resolve(xhr.response);
        };

        const data = {
            username: localStorage.getItem('USERNAME'),
            password: localStorage.getItem('PASSWORD'),
            id: id
        };

        xhr.send(JSON.stringify(data));

    });
    return promise;
}

function updateContact() {
    localStorage.setItem('CONTACT-ID', "");
    open('contacts.html', '_self');
}

function deleteContact() {
    startLoading();
    deleteRequest().then(result => {
        return;
    })
    localStorage.setItem('CONTACT-ID', "");
    open('contacts.html', '_self');
}

function deleteRequest() {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', 'http://192.168.3.239:8080/contact');

        xhr.responseType = 'json';

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            resolve(xhr.response);
        };

        const data = {
            username: localStorage.getItem('USERNAME'),
            password: localStorage.getItem('PASSWORD'),
            id: id
        };

        xhr.send(JSON.stringify(data));

    });
    return promise;
}

function startLoading() {
    loadingBox.style.display = 'flex';
    content.style.pointerEvents = 'none';
}

function endLoading() {
    loadingBox.style.display = 'none';
    content.style.pointerEvents = 'all'
}