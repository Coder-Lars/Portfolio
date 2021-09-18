//Login Page

//Html Objects
const input_username = document.querySelector('#login-input-username');
const input_password = document.querySelector('#login-input-password');
const btn_login = document.querySelector('#login-btn-submit');
const text_error = document.querySelector('#error-text');
const animation_load = document.querySelector('.loadBox');
const content = document.querySelector('.content');

//Variables

//Eventlisteners
btn_login.addEventListener('click', login);

//Functions
function login(event) {
    event.preventDefault();

    if (input_username.value != "" && input_password.value != "") {

        //Check if user exists...
        startLoading();
        checkUser(input_username.value, input_password.value).then(responseData => {
            console.log(responseData);
            if (!responseData) {
                text_error.style.display = 'block';
                endLoading();
                return;
            }

            //Store Inputs
            localStorage.setItem("USERNAME", input_username.value);
            localStorage.setItem("PASSWORD", input_password.value);
            localStorage.setItem("LOGEDIN", "true");

            //Open contacts page
            open('../Contacts/page_contact_list.html', '_self');
        });
        

        
    }
}

function startLoading() {
    animation_load.style.display = 'flex';
    content.style.pointerEvents = 'none';
}

function endLoading() {
    animation_load.style.display = 'none';
    content.style.pointerEvents = 'all'
}

function checkUser(inner_username, inner_password) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        //Localhost
        xhr.open('POST', 'http://192.168.178.57:8080/checkUser');

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
