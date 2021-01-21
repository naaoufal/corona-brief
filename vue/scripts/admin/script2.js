// $(document).ready(function(){
//     var url = "https://api.covid19api.com/summary";
//     $.getJSON(url, (data) => {
//         console.log(data);
//         var total_cases = data.Global.NewConfirmed;
//         console.log(total_cases);
//     })

const { stat } = require("fs");

  
//   });

const url = "https://api.covid19api.com/summary";
const tbodyTable = document.querySelector('#coronaStat');
  // fetch Data in home page :
function coronaData() {
    fetch(url).then(res => {
        if(!res.ok){
            throw Error("ERROR");
        }
        return res.json();
    }).then( data => {
        console.log(data);
        const html = 
            `
                <tbody>
                  <tr>
                    <td>${data.Global.NewConfirmed}</td>
                    <td>${data.Global.NewDeaths}</td>
                    <td>${data.Global.NewRecovered}</td>
                    <td>${data.Global.TotalConfirmed}</td>
                    <td>${data.Global.TotalDeaths}</td>
                    <td>${data.Global.TotalRecovered}</td>
                  </tr>
                </tbody>
            `;
        tbodyTable.innerHTML = html;
    }).catch(error => {
        console.log(error);
    });
}


// recall for fetch function :
coronaData();