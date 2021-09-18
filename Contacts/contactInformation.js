//Contact information

//Html objects
const content = document.querySelector('.content');
const buttonBack = document.querySelector('.btn-back');
const buttonEdit = document.querySelector('.btn-edit');
const loadingBox = document.querySelector('.loadBox');
const addressText = document.querySelector('#address');
const telText = document.querySelector('#tel');


//Variables
var id = null;


//Event Listeners
window.addEventListener('load', () => {
    startLoading();
    id = localStorage.getItem('CONTACT-ID');

    console.log(id);
    if (id == "" || id == null) {
        open('contacts.html', '_self');
    }

    loadContactInformation().then(result => {
        addressText.innerHTML = result.address;
        telText.innerHTML = result.tel;
    })
    endLoading();
})

buttonBack.addEventListener('click', () => {
    localStorage.setItem('CONTACT-ID', "");
    open('contacts.html', '_self');
})

buttonEdit.addEventListener('click', () => {
    open('editContact.html', '_self');
})

//Functions
function loadContactInformation() {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://192.168.3.239:8080/getContactById');

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