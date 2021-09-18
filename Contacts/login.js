//Login Page

//Html Objects
const loginUsernameInput = document.querySelector('#login-input-username');
const loginPasswordInput = document.querySelector('#login-input-password');
const loginButtonSubmit = document.querySelector('#login-btn-submit');
const errorText = document.querySelector('#error-text');
const loadingBox = document.querySelector('.loadBox');
const content = document.querySelector('.content');

//Variables

//Eventlisteners
loginButtonSubmit.addEventListener('click', login);

//Functions
function login(event) {
    event.preventDefault();

    if (loginUsernameInput.value != "" && loginPasswordInput.value != "") {

        //Check if user exists...
        startLoading();
        checkUser(loginUsernameInput.value, loginPasswordInput.value).then(responseData => {
            console.log(responseData);
            if (!responseData) {
                errorText.style.display = 'block';
                endLoading();
                return;
            }

            //Store Inputs
            localStorage.setItem("USERNAME", loginUsernameInput.value);
            localStorage.setItem("PASSWORD", loginPasswordInput.value);
            localStorage.setItem("LOGEDIN", "true");

            //Open contacts page
            open('contacts.html', '_self');
        });
        

        
    }
}

function startLoading() {
    loadingBox.style.display = 'flex';
    content.style.pointerEvents = 'none';
}

function endLoading() {
    loadingBox.style.display = 'none';
    content.style.pointerEvents = 'all'
}

function checkUser(usernameI, passwordI) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://192.168.3.239:8080/checkUser');

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




















//Contacts Page