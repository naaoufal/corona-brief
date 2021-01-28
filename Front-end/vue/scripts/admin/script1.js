var remote = window.require('electron').remote;


function clearInput (){

    var userInp = document.getElementById('user');
    var passInp = document.getElementById('pass'); 

    userInp.value = "";
    passInp.value = "";

}

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
        var html = `
            <div class="panel panel-danger">
                <div class="panel-heading">Erreur</div>
                <div class="panel-body">Username Or Password is Incorrect</div>
            </div>
        `;
        const err = document.querySelector('#error');
        err.innerHTML = html;
                
        //document.write("You Will Redirecte Into 3 sec");
        //setTimeout('Redirect()', 1000);

        clearInput();
    }
}
