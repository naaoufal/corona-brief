var remote = window.require('electron').remote;


// import("./.env");

username = document.getElementById('user');
password = document.getElementById('pass');
Logbtn = document.getElementById("btn");


// Login Fucntion for Admin !!!
function LogIn() {

    let user = username.value;
    let pass = password.value;

    // Admin Username & Password !!!
    var ad = "admin";
    var ps = "admin";

    // Session Authentification Code !!!
    if(user === ad && pass === ps) {
        window.location.href = "home.html";
        document.write("You Will redirecte into 3 sec");
        setTimeout('Redirect()', 3000);
    } else {
        alert('the username or password are inccorect !!!');
        window.location.href = "index.html";
        document.write("You Will Redirecte Into 3 sec");
        setTimeout('Redirect()', 3000);
    }
}
