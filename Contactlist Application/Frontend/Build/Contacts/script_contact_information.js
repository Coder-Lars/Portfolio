//Contact information

//Html objects
const content = document.querySelector('.content');
const btn_back = document.querySelector('.btn-back');
const btn_edit = document.querySelector('.btn-edit');
const animation_load = document.querySelector('.loadBox');
const text_address = document.querySelector('#address');
const text_tel = document.querySelector('#tel');
const text_name = document.querySelector('#name-text');
const letter_logo = document.querySelector('#letter-logo')

//Variables



//Event Listeners
window.addEventListener('load', () => {
    startLoading();
    contact = localStorage.getItem('CONTACT_INFORMATION');

    if (contact == "" || contact == null) {
        open('contacts.html', '_self');
    }
    
    contact = JSON.parse(contact)

    text_name.innerHTML = contact.name;
    letter_logo.innerHTML = contact.name.charAt(0).toUpperCase();
    text_tel.innerHTML = contact.telephone;
    text_address.innerHTML = contact.address;


    endLoading();
})

btn_back.addEventListener('click', () => {
    localStorage.setItem('CONTACT_INFORMATION', "");
    open('page_contact_list.html', '_self');
})

btn_edit.addEventListener('click', () => {
    open('page_edit_contact.html', '_self');
})

//Functions


function startLoading() {
    animation_load.style.display = 'flex';
    content.style.pointerEvents = 'none';
}

function endLoading() {
    animation_load.style.display = 'none';
    content.style.pointerEvents = 'all'
}