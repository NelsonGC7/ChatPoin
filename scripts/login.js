

const input = {
    user: document.getElementById('user'),
    password: document.getElementById('pass')
}
function validarPass(pass) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(pass);
}
const send  = document.getElementById('send');
const newCount = document.getElementById('new');

newCount.addEventListener('click',(e)=>{
    e.preventDefault()
    window.location.href = 'http://127.0.0.1:5500/schemas/rejister.html'

})

send.addEventListener('click',(e)=>{
    e.preventDefault()
    const newUsuario = {
        userName: input.user.value,
        password: input.password.value
    }
    console.log(newUsuario)
    if(validarPass(input.password.value) && input.user.value.length > 0){
        axios.get('http://localhost:5000/users',newUsuario)
        .then(res=>{
            console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })
        
    }else{
        input.password.style.border= "1px red solid"
        setTimeout(()=>{
            input.password.style.border= "none" 
        },800)
    }
})