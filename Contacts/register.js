//Register Page

//Html Objects
const registerUsernameInput = document.querySelector('#register-input-username');
const registerPasswordInput = document.querySelector('#register-input-password');
const registerButtonSubmit = document.querySelector('#register-btn-submit');
const registerConfirmPasswordInput = document.querySelector('#register-input-confirm-password')
const errorText = document.querySelector('#error-text');
const loadingBox = document.querySelector('.loadBox');
const content = document.querySelector('.content');



//Variables

//Eventlisteners
registerButtonSubmit.addEventListener('click', register);

//Functions
function register(event) {
    event.preventDefault();

    if (registerUsernameInput.value != "" && registerPasswordInput.value != "" && registerConfirmPasswordInput.value != "") {

        startLoading();

        if (registerPasswordInput.value != registerConfirmPasswordInput.value) {
            errorText.innerHTML = 'Both Passwrods must match';
            errorText.style.display = 'block';
            endLoading();
            return;
        }

        //Check if user alredy exists...
        checkUser(registerUsernameInput.value, registerPasswordInput.value).then(responseData => {
            if (responseData) {
                errorText.innerHTML = 'Username alredy exists';
                errorText.style.display = 'block';
                endLoading();
                return;
            }

            //Create new User
            createUser(registerUsernameInput.value, registerPasswordInput.value).then(createResponse => {
                console.log(createResponse);
                //Store Inputs
                localStorage.setItem("USERNAME", registerUsernameInput.value);
                localStorage.setItem("PASSWORD", registerPasswordInput.value);
                localStorage.setItem("LOGEDIN", "true");

                //Open contacts page
                open('contacts.html', '_self');
            })

        })
            
        

        
    }
}

function checkUser(usernameI, passwordI) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://192.168.3.239:8080/checkUsername/' + usernameI);

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
    loadingBox.style.display = 'flex';
    content.style.pointerEvents = 'none';
}

function endLoading() {
    loadingBox.style.display = 'none';
    content.style.pointerEvents = 'all'
}

function createUser(usernameI, passwordI) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://192.168.3.239:8080/user');

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