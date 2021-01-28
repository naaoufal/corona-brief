var remote = window.require('electron').remote;


function clearInput (){

    var userInp = document.getElementById('user');
    var passInp = document.getElementById('pass'); 

    userInp.value = "";
    passInp.value = "";

}

// login for doctors :
function testLogin () {

    var userInp = document.getElementById('user').value;
    var passInp = document.getElementById('pass').value;    
    recovData = {};   

    fetch("https://600607a33698a80017de12d5.mockapi.io/api/v1/doctors").then(res => {
        return res.json();
    }).then( data => {
        //console.log(data);
        recovData = data;
        recovData.map(doctor => {
            
            let username =  doctor.lastname;
            let password = doctor.password;


            if(userInp == username && passInp == password) {
                window.location.href = "doctors.html";
            } else {
                var html = `
                <div class="panel panel-danger">
                    <div class="panel-heading">Erreur</div>
                    <div class="panel-body">Username Or Password is Incorrect</div>
                </div>
                `;
                const err = document.querySelector('#error');
                err.innerHTML = html;

                clearInput();
                
            }

        })
    });
}