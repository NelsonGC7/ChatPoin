const input = {
    user: document.getElementById('inTex'),
    correo: document.getElementById('inCorreo'),
    password: document.getElementById('inPass')
}
const send  = document.getElementById('send');
const ya = document.getElementById('ya');
ya.addEventListener('click',(e)=>{
    e.preventDefault()
    window.location.href = 'http://127.0.0.1:5500/schemas/login.html'

})

function validarEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
function validarPass(pass) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(pass);
}
send.addEventListener('click',(e)=>{
    e.preventDefault()
    console.log(send)
    if(validarEmail(input.correo.value)){
        console.log(input.password.value)
    }else{
        input.correo.style.border= "1px red solid"
        setTimeout(()=>{
            input.correo.style.border= "none" 
        },800)
    }
    if(validarPass(input.password.value)){
        console.log(input.password.value)
    }else{
        input.password.style.border= "1px red solid"
        setTimeout(()=>{
            input.password.style.border= "none" 
        },800)
    }
})