const input = {
    user: document.getElementById('user'),
    password: document.getElementById('pass')
}
function validarPass(pass) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(pass);
}
const send  = document.getElementById('send');

send.addEventListener('click',(e)=>{
    e.preventDefault()
    if(validarPass(input.password.value) && input.user.value.length > 0){
        fetch('http://localhost:3001/users')
        .then(res=>res.json())
        .then(data=>console.log(data))
        
    }else{
        input.password.style.border= "1px red solid"
        setTimeout(()=>{
            input.password.style.border= "none" 
        },800)
    }
})