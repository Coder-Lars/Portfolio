//New Contact

//html objects
const content = document.querySelector('.content');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const adress = document.querySelector('#adress');
const telephone = document.querySelector('#telephone');
const submitButton = document.querySelector('.btn-submit');
const loadingBox = document.querySelector('.loadBox');
const errorText = document.querySelector('#error-text');

//Eventlisteners
window.addEventListener('load', () => {
    //Check if user is loged in
    if (localStorage.getItem("LOGEDIN") == "true") {
         //Get localstorage
         const l_username = localStorage.getItem('USERNAME');
         const l_password = localStorage.getItem('PASSWORD');
    }
    else {
        document.body.innerHTML = "Error";
        open('../Auth/page_login.html', '_self')
    }
});

submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    startLoading();

    if (firstName.value == "" || lastName.vlaue == "" || adress.value == "" || telephone.value == "") {
        errorText.style.display = 'block';
        endLoading();
        return;
    }

    addContact().then(result => {
        endLoading();
        open('page_contact_list.html', '_self');
    })
});

function addContact() {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://192.168.178.57:8080/contact');

        xhr.responseType = 'json';

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            resolve(xhr.response);
        };

        const data = {
            user: {
                username: localStorage.getItem('USERNAME'),
                password: localStorage.getItem('PASSWORD')
            },

            contact: {
                username: localStorage.getItem('USERNAME'),
                firstName: firstName.value,
                lastName: lastName.value,
                address: adress.value,
                telephone: telephone.value
            }
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