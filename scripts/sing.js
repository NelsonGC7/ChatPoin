let user;
let password;
let password_afirm;

function values(event) {
    event.preventDefault(); 

    user = document.getElementById('user').value;
    password = document.getElementById('password').value;
    password_afirm = document.getElementById('password_afirm').value;

    if (password === password_afirm) {
        alert('Valido');
        console.log("Datos antes de enviar:", { user, password }); 
        sendPostRequest(); 
    } else {
        alert('Log Error');
    }
}

function sendPostRequest() {
    const newUser = {
        name: user,
        password: password
    };

    console.log("Datos a enviar:", JSON.stringify(newUser)); 

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(newUser),
        redirect: "follow"
    };

    fetch("https://getusersingin-default-rtdb.firebaseio.com/users.json", requestOptions)
        .then(response => {
            console.log("Estado de la respuesta:", response.status);
            return response.json();
        })
        .then(result => console.log("Resultado del POST:", result))
        .catch(error => console.error('Error:', error));
}
