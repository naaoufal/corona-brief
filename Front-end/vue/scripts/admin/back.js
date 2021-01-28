// global variables :
const tbodyTable = document.querySelector('#fetchtable');
const formPost = document.querySelector('.form-class');
const subEdit = document.querySelector('#submitEdit');

// fetch Data in home page :
function fetchData() {
    fetch("https://600607a33698a80017de12d5.mockapi.io/api/v1/doctors").then(res => {
        if(!res.ok){
            throw Error("ERROR");
        }
        return res.json();
    }).then( data => {
        console.log(data);
        data.map(doctor => {
            $('#fetchtable').append(`
              <tr>
                <td>${doctor.id}</td>
                <td class="last-Doc">${doctor.lastname}</td>
                <td class="firstDoc">${doctor.firstname}</td>
                <td class="cinDoc">${doctor.cin}</td>
                <td class="phoneDoc">${doctor.phonenumber}</td>
                <td class="passDoc">${doctor.password}</td>
                <td class="emailDoc">${doctor.email}</td>
                <td>
                    <a data-id=${doctor.id} data-toggle="modal" data-target="#exampleModalCenter" id="edit-class" class="btn btn-primary">Edit</a> 
                    <a data-id=${doctor.id} id="delete-class" class="btn btn-danger">Delete</a>
                </td>
              </tr>
        `)
        }).join();
    }).catch(error => {
        console.log(error);
    });
}


// recall for fetch function :
fetchData();


// Get the value of inputs:
const lastInp = document.getElementById('last');
const firstInp = document.getElementById('first');
const cinInp = document.getElementById('cin');
const phoneInp = document.getElementById('phone');
const passInp = document.getElementById('pass');
const emailInp = document.getElementById('email');

// Add new Doctor :
formPost.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch("https://600607a33698a80017de12d5.mockapi.io/api/v1/doctors", {
        method : 'POST',
        headers : { 'Content-Type' : ' application/json '},
        body : JSON.stringify({
            lastname : lastInp.value,
            firstname : firstInp.value,
            cin : cinInp.value,
            phonenumber : phoneInp.value,
            password : passInp.value,
            email : emailInp.value
        })
    }).then(res => res.json()).then(data => {
        const convArr = [];
        convArr.push(data);
        fetchData(convArr);
        window.location.href = "home.html";
        // location.reload();
    })
});

// delete doctor(s) form the list
tbodyTable.addEventListener('click', (e) => {
    e.preventDefault();

    let pressedDelete = e.target.id == 'delete-class';

    // console.log(pressedEdit);

    const id = e.target.dataset.id;
    const url = "https://600607a33698a80017de12d5.mockapi.io/api/v1/doctors";

    // Delete function for Doctors :
    if(pressedDelete){
        fetch(`${url}/${id}`, {
            method : 'DELETE'
        }).then(res => res.json()).then(() => location.reload());
    }
});

tbodyTable.addEventListener('click', (e) => {
    e.preventDefault();

    let pressedEdit = e.target.id == 'edit-class';

    const id = e.target.dataset.id;
    const url = "https://600607a33698a80017de12d5.mockapi.io/api/v1/doctors";

    // put the values in inputs :
    const lastEdit = document.getElementById('ls');
    const firstEdit = document.getElementById('fr');
    const cinEdit = document.getElementById('cin_edit');
    const phoneEdit = document.getElementById('pn');
    const passEdit = document.getElementById('ps');
    const emailEdit = document.getElementById('em');

        // Edit function for Doctors :
        if(pressedEdit){
            fetch(`${url}/${id}`).then(res => {
                if(!res.ok){
                    throw Error("ERROR");
                }
                return res.json();
            }).then( data => {
                //console.log(data);

                lastEdit.value = data.lastname;
                firstEdit.value = data.firstname;
                cinEdit.value = data.cin;
                phoneEdit.value = data.phonenumber;
                passEdit.value = data.password;
                emailEdit.value = data.email;
            })
        }

        // submit edited data to mockAPI :
        subEdit.addEventListener('click', (e) => {

            //console.log("doctor updated");

            fetch(`${url}/${id}`, {
                method : 'PATCH',
                headers : { 'Content-Type' : ' application/json '},
                body : JSON.stringify({
                    lastname : lastEdit.value,
                    firstname : firstEdit.value,
                    cin : cinEdit.value,
                    phonenumber : phoneEdit.value,
                    password : passEdit.value,
                    email : emailEdit.value
                })
            }).then(res => res.json()).then(() => location.reload());
        })
})
