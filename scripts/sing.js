let user;
let password;
let password_afirm;
function values(){

    password = document.getElementById('password').value;
    password_afirm = document.getElementById('password_afirm').value;
    if(password === password_afirm){
        alert('valido')
    }else if(password != password_afirm){
        alert('Log Error')
    }

}