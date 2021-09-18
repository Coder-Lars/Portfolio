//Register Page

//Html Objects
const input_username = document.querySelector('#register-input-username');
const input_password = document.querySelector('#register-input-password');
const input_confirm_password = document.querySelector('#register-input-confirm-password')
const btn_register = document.querySelector('#register-btn-submit');
const text_error = document.querySelector('#error-text');
const animation_load = document.querySelector('.loadBox');
const content = document.querySelector('.content');



//Variables

//Eventlisteners
btn_register.addEventListener('click', register);

//Functions
function register(event) {
    event.preventDefault();

    if (input_username.value != "" && input_password.value != "" && input_confirm_password.value != "") {

        startLoading();

        //Check if both passwords match
        if (input_password.value != input_confirm_password.value) {
            text_error.innerHTML = 'Both Passwords must match';
            text_error.style.display = 'block';
            endLoading();
            return;
        }

        //Check if user alredy exists...
        checkUser(input_username.value, input_password.value).then(responseData => {
            if (responseData) {
                text_error.innerHTML = 'Username alredy exists';
                text_error.style.display = 'block';
                endLoading();
                return;
            }

            //Create new User
            createUser(input_username.value, input_password.value).then(createResponse => {
                console.log(createResponse);
                //Store Inputs
                localStorage.setItem("USERNAME", input_username.value);
                localStorage.setItem("PASSWORD", input_password.value);
                localStorage.setItem("LOGEDIN", "true");

                //Open contacts page
                open('../Contacts/page_contact_list.html', '_self');
            })

        })
            
        

        
    }
}

function checkUser(inner_username, inner_password) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://192.168.178.57:8080/checkUsername/' + inner_username);

        xhr.responseType = 'json';

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            resolve(xhr.response);
        };


        xhr.send();

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

function createUser(inner_username, inner_password) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://192.168.178.57:8080/user');

        xhr.responseType = 'json';

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            resolve(xhr.response);
        };

        const data = {
            username: inner_username,
            password: inner_password
        };

        xhr.send(JSON.stringify(data));

    });
    return promise;
}