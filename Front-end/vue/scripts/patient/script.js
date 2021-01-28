const nodemailer = require("nodemailer");
const PDFDocument = require('pdfkit');
const fs = require('fs');

const tbodyTable = document.querySelector('#fetchtable');
const subEdit = document.querySelector('#submitEdit');

//sendmail info

const user = 'projectmailtestyc@gmail.com'
const pass = 'youcode2020'
const from = 'Hosiptal@gmail.com'
const to = 'sketchdotnet@gmail.com'
const subject = 'Nouveau cas positif de COVID-19 détecté'

//REGEX
var name_regex = /([A-Z\sa-z]){1,30}/;
var email_regex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

var phoneregex = /(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}/;
var CIN_regex = /^[A-Z]{1,2}[0-9]{6}/;

function sendMail(user,pass,from,to,subject){

  // Step 1
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: user, // TODO: your gmail account
      pass:pass // TODO: your gmail password
  }
});

// Step 2
let mailOptions = {
  from: from, // TODO: email sender
  to: to, // TODO: email receiver
  subject: subject,
  html:'<br><br>Monsieur, <br> Madame, <br><br><br><br> Un résultat positif à un test de COVID-19 a été déclaré à notre hospitale.'
};

// Step 3
transporter.sendMail(mailOptions, (err, data) => {
  if (err) {
      return console.log('Error occurs');
  }
  return console.log('Email sent!!!');
});
}


//Add patient function
const add =async (e)=>{
    e.preventDefault()

 var inp1 = document.getElementById('fname').value;
 var inp2 = document.getElementById('lname').value;
 var inp3 = document.getElementById('cin').value;
 var inp4 = document.getElementById('email').value;
 var inp5 = document.getElementById('phone').value;

 if(!(inp1.match(name_regex))){
   document.getElementById("fnameval").innerHTML="Invalid name !"
 }else if(!(inp2.match(name_regex))){
  document.getElementById("lnameval").innerHTML="Invalid name !"
 }else if(!(inp3.match(CIN_regex))){
  document.getElementById("cinval").innerHTML="Invalid CIN !"
 }else if(!(inp5.match(phoneregex))){
  document.getElementById("phoneval").innerHTML="Invalid Phone Number !"
 }else if(!(inp4.match(email_regex))){
  document.getElementById("emailval").innerHTML="Invalid email !"
 }else {
  var obj = {fname: '',
     lname: '',
     cin: '',
     email: '',
     phone: ''
}
obj.fname=inp1
obj.lname=inp2
obj.cin=inp3
obj.email=inp4
obj.phone=inp5

 axios.post('http://localhost:3000/patients/', obj)
   .then(function (response) {
     console.log(response);
   })
   .catch(function (error) {
     console.log(error);
   }).then(() => location.reload());
 }
 
 
}




//Get patient function
const getData = () => {
    axios.get('http://localhost:3000/patients/').then(response =>{
       console.log(response.data);
        const html = response.data.map(patient => {

            return `
                <tbody>
                  <tr>
                    <td id="patientid">${patient._id}</td>
                    <td class="last-Doc" id="patientlname">${patient.last_name}</td>
                    <td class="firstDoc">${patient.first_name}</td>
                    <td class="cinDoc">${patient.cin}</td>
                    <td class="phoneDoc">${patient.phone}</td>
                    <td class="emailDoc">${patient.email}</td>
                    <td>
                        <a data-id=${patient._id} data-toggle="modal" data-target="#exampleModalCenter" id="edit-class" class="btn btn-primary">Edit</a> 
                        <a data-id=${patient._id} id="delete-class" class="btn btn-danger">Delete</a>
                    </td>
                    <td>
                       <a data-id=${patient._id} data-toggle="modal" data-target="#exampleModalCenter1" id="test-class" class="btn btn-primary">Begin test</a> 
                    </td>
                    <td>
                       <a  id="printCard" class="btn btn-primary" onclick="generateCardPdf('${patient._id}','${patient.last_name}','${patient.first_name}','${patient.cin}')">Print card</a> 
                    </td>
                  </tr>
                </tbody>
            `;
        }).join();
        tbodyTable.innerHTML = html;
    })
}

//Delete patient function
tbodyTable.addEventListener('click', (e) => {
    e.preventDefault();

    let pressedDelete = e.target.id == 'delete-class';

    const id = e.target.dataset.id;

    // Delete function for Doctors :
    if(pressedDelete){
        axios.delete(`http://localhost:3000/patients//${id}`)
        .then(response => console.log(response.data)).then(() => location.reload());
    }
});




tbodyTable.addEventListener('click', (e) => {
    e.preventDefault();

    let pressedEdit = e.target.id == 'edit-class';
    let subSur = e.target.id == 'test-class';
  

    

    const idTar = e.target.dataset.id;
  

   
    const lastEdit = document.getElementById('elname');
    const firstEdit = document.getElementById('efname');
    const cinEdit = document.getElementById('ecin');
    const phoneEdit = document.getElementById('ephone');
    const emailEdit = document.getElementById('eemail');

        
        if(pressedEdit){
            axios.get(`http://localhost:3000/patients//${idTar}`).then(response =>{
                console.log(response.data);

                lastEdit.value = response.data.last_name;
                firstEdit.value = response.data.first_name;
                cinEdit.value = response.data.cin;
                phoneEdit.value = response.data.phone;
                emailEdit.value = response.data.email;
        
        })
        }
        

        if(subSur){
          
         
          fetch(`http://localhost:3000/patients//${idTar}`).then(res => {
            return res.json();
          }).then(data => {
           

            $('#submitSurvey').click('submit', (e) => {
             
              var testRes = document.getElementById("testResult").value
              var r1 = document.getElementById('r1').checked;
              var r2 = document.getElementById('r2').checked;
              var r3 = document.getElementById('r3').checked;
              var r4 = document.getElementById('r4').checked;
              var r5 = document.getElementById('r5').checked;
              var r6 = document.getElementById('r6').checked;
              var r7 = document.getElementById('r7').checked;
              var r8 = document.getElementById('r8').checked;
              var r9 = document.getElementById('r9').checked;
              var r10 = document.getElementById('r10').checked;
              var r11 = document.getElementById('r11').checked;
              var r12 = document.getElementById('r12').checked;
    
              var surveyObj = {
                idPatient: idTar,
                q1: r1,
                q2: r2,
                q3: r3,
                q4: r4,
                q5: r5,
                q6: r6,
                q7: r7,
                q8: r8,
                q9: r9,
                q10: r10,
                q11: r11,
                q12: r12
              }
    
              var cardObj = {
                idPatient: idTar,
                date : new Date(),
                result : testRes
              }
    
               
    
                axios.post(`http://localhost:3000/surveys/`, surveyObj)
                        .then(function (response) {
                         
                          document.getElementById("survey-add-success").innerHTML='<td  class="success" colspan="2"> <p>Survey Added Succefully ! Please wait 2 sec !</p> </td>'
                        })
                        .catch(function (error) {
                          console.log(error);
                        })
    
                axios.post(`http://localhost:3000/cards/`, cardObj)
                      .then(function (response) {
                        
                        })
                        .catch(function (error) {
                          console.log(error);
                        }).then(() => {
                        if (testRes == "Positive") {
                          sendMail(user,pass,from,to,subject)
                        } 
                      }
                        )
                        .then(() => setTimeout(function(){ location.reload(alert("Added Succesfuly")) }, 4000) )
                         
                        

                        

                        
            })

          })
          
        
        }
        

        subEdit.addEventListener('click', (e) => {

            var obj = {
            fname: '',
            lname: '',
            cin: '',
            email: '',
            phone: ''
            }
            obj.efname=firstEdit.value
            obj.elname=lastEdit.value
            obj.ecin=cinEdit.value
            obj.eemail= emailEdit.value
            obj.ephone=phoneEdit.value

            axios.patch(`http://localhost:3000/patients//${idTar}`, obj)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          }).then(() => location.reload());
        })
})

//boolean to string 
function boolToString(bool){
  if(bool){
    return 'Oui'
  }else {
    return 'Non'
  }

}

async function generateCardPdf(id,fname,lname,cin){
  await axios.get('http://localhost:3000/surveys/findsurveybypatient/'+id).then(survey =>{
     axios.get('http://localhost:3000/cards/findcardbypatient/'+id).then(card =>{

      if (survey.data.length == 0 && card.data.length == 0) {
        alert("Pass Survey first")
        
    } else {
      const pdf = new PDFDocument;
      pdf.pipe(fs.createWriteStream('exportedpdf/'+cin+'.pdf'));
      pdf.fontSize(20)
        .text('Resultat de test Covid-19', { align: 'center' })
        .text('-------------------------------------',{ align: 'center' })
      pdf.fontSize(15)
        .text('Nom : ' + fname, { align: 'left' })
        .text('Prénom : ' + lname, { align: 'left' })
        .text('CIN : ' + cin, { align: 'left' })
        .text('----------------------',{ align: 'center' })
        .text('Resultat de test : ',{ align: 'center' })
        if(card.data[0].test_result == "Positive"){
            pdf.fontSize(15).fillColor('red').text(card.data[0].test_result,{ align: 'center' })
        }else{
            pdf.fontSize(15).fillColor('green').text(card.data[0].test_result,{ align: 'center' })
        }
      pdf.fontSize(15).fillColor('black')
         .text('-------------------------------------',{ align: 'center' })
         .text('Les symptômes :',{ align: 'left' })
         .text('Fièvre (Température mesurée>38°) : '+boolToString(survey.data[0].q1),{ align: 'left' })
         .text('Toux sèch : '+boolToString(survey.data[0].q2),{ align: 'left' })
         .text('Difficultés à respirer : '+boolToString(survey.data[0].q3),{ align: 'left' })
         .text('Maux gorge : '+boolToString(survey.data[0].q4),{ align: 'left' })
         .text('Rhinite : '+boolToString(survey.data[0].q5),{ align: 'left' })
         .text('Douleur dans les muscles(Corbatures) : '+boolToString(survey.data[0].q6),{ align: 'left' })
         .text('Fatigue importante : '+boolToString(survey.data[0].q7),{ align: 'left' })
         .text('Maux de téte : '+boolToString(survey.data[0].q8),{ align: 'left' })
         .text('Diarrhées : '+boolToString(survey.data[0].q9),{ align: 'left' })
         .text('Nausées et/ou Vomissements : '+boolToString(survey.data[0].q10),{ align: 'left' })
         .text("Ansomie(perte de l'odorat) : "+boolToString(survey.data[0].q11),{ align: 'left' })
         .text('Agueusie(perte de gout) : '+boolToString(survey.data[0].q12),{ align: 'left' })

      pdf.end()
      console.log("created");

      var openPdf = '../exportedpdf/'+cin+'.pdf';
      setTimeout(function(){ window.open(openPdf); }, 2000)
      

    }
       })
     })



}





