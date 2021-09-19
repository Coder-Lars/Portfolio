//Edit Contact

//Html Objects
const content = document.querySelector('.content');
const input_first_name = document.querySelector('#firstName');
const input_last_name = document.querySelector('#lastName');
const input_address = document.querySelector('#adress');
const input_telepohone = document.querySelector('#telephone');
const btn_submit = document.querySelector('.btn-submit');
const btn_delete = document.querySelector('.btn-delete');
const animation_load = document.querySelector('.loadBox');
const text_error = document.querySelector('#error-text');

//Variables
var id = null;

//Eventlisteners
window.addEventListener('load', () => {
    startLoading();
    contact = localStorage.getItem('CONTACT_INFORMATION');

    if (contact == "" || contact == null) {
        open('page_contact_list.html', '_self');
    }
    contact = JSON.parse(contact)

    input_first_name.value = seperateNames(contact.name)[0];
    input_last_name.value = seperateNames(contact.name)[1];
    input_address.value = contact.address;
    input_telepohone.value = contact.telephone;
    endLoading();
})

btn_submit.addEventListener('click', (event) => {
    event.preventDefault();
    open('page_contact_list.html', "_self");
})

//Functions


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
    animation_load.style.display = 'flex';
    content.style.pointerEvents = 'none';
}

function endLoading() {
    animation_load.style.display = 'none';
    content.style.pointerEvents = 'all'
}

function seperateNames(name) {
    names = name.split(' ');
    return names;
}