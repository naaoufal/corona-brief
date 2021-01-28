const selectCountry = document.querySelector('#countries');
const testDiv = document.querySelector('#testing');
const countryStat = document.querySelector('#dataCountry');
const tbodyTable = document.querySelector('#coronaStat');
const formCountries = document.querySelector('#countries');
// const graphBtn = document.querySelector('#graphShow');
const showGraphCountries = document.querySelector('#showCountries');
const mapping = document.querySelector('#mapp');


function fetchData() {

    // fetch global corona data :
    fetch("https://api.covid19api.com/summary").then(res => {
        return res.json()
    }).then(data => {
        //console.log(data.Global.NewConfirmed);
        const html = 
            `
            <td>${data.Global.NewConfirmed}</td>
            <td>${data.Global.NewDeaths}</td>
            <td>${data.Global.NewRecovered}</td>
            <td>${data.Global.TotalConfirmed}</td>
            <td>${data.Global.TotalDeaths}</td>
            <td>${data.Global.TotalRecovered}</td>
            `;
        tbodyTable.innerHTML = html;
    });
}

// graph data for all countries :
var countryArr = [];
var confirmedArr = [];
var deathsArr = [];
var recovredArr = [];
$("#showCountries").click(function () {
    fetch("https://api.covid19api.com/summary").then(res => {
        return res.json();
    }).then( data => {
        //console.log(data.Countries);
        data.Countries.forEach(country => {
        console.log(country.TotalConfirmed);

            // show chart by country :
            
            countryArr.push(country.Country);
            confirmedArr.push(country.TotalConfirmed);
            deathsArr.push(country.TotalDeaths);
            recovredArr.push(country.TotalRecovered);

            var mychart = document.getElementById('myChart').getContext('2d');
            var chart = new Chart(mychart, {
                type : 'line',
                data : {
                    labels : countryArr,
                    datasets : [
                        {
                            label : "Total Confirmed",
                            data : confirmedArr,
                            backgroundColor : "gray",
                            minBarLength : 100,
                        },
                        {
                            label : "Total Deaths",
                            data : deathsArr,
                            backgroundColor : "red",
                            minBarLength : 100,
                        },
                        {
                            label : "Total Recovred",
                            data : recovredArr,
                            backgroundColor : "green",
                            minBarLength : 100,
                        }
                    ]
                },
                option : {}
            })
        })
    })
})

// recall for fetch function :
fetchData();

function fetchCountries() {
    // fetch data for all countries :
    fetch("https://api.covid19api.com/countries").then(res => {
        if(!res.ok){
            throw Error("ERROR");
        }
        return res.json();
    }).then( data => {
        data.forEach(country => {
            console.log(country.Slug);
            $("#countries").append(`<option value=${country.Slug} id="opt">${country.Slug}</option>`);
        });
    }).catch(error => {
        console.log(error);
    });
}

// Jquery for coutry section
$("#countries").click(function() {
    var e = document.getElementById("countries");
    var country = e.value
    

    const url = "https://api.covid19api.com/dayone/country";
    // fetch data for each country :
    fetch(`${url}/${country}`).then(res => {
        return res.json();
    }).then(data => {
        var arrActive = [];
        var arrConfirmed = [];
        var arrDeaths = [];
        var arrRecovred = [];
        var arrDates = [];
        data.slice(0, 90).map(country => {
            arrActive.push(country.Active);
            arrConfirmed.push(country.Confirmed);
            arrDeaths.push(country.Deaths);
            arrRecovred.push(country.Recovered);
            arrDates.push(country.Date);
            // show map of each country:
            var html1 = `<iframe src="http://maps.google.com/maps?q=${data[0].Lat},${data[0].Lon}&z=16&output=embed" style="width:100%;height:578px;" id="frame"></iframe>`;
            mapping.innerHTML = html1;
            // draw a graph for each counrty :
            var mychart = document.getElementById('myChart1').getContext('2d');
            var chart = new Chart(mychart, {
                type : 'line',
                data : {
                    labels : arrDates,
                    datasets : [
                        {
                            label : "Total Confirmed",
                            data : arrConfirmed,
                            backgroundColor : "gray",
                            minBarLength : 100,
                        },
                        {
                            label : "Total Deaths",
                            data : arrDeaths,
                            backgroundColor : "red",
                            minBarLength : 100,
                        },
                        {
                            label : "Total Recovred",
                            data : arrRecovred,
                            backgroundColor : "green",
                            minBarLength : 100,
                        },
                        {
                            label : "Total Active",
                            data : arrRecovred,
                            backgroundColor : "orange",
                            minBarLength : 100,
                        }
                    ]
                },
                option : {}
            })
            
            $('#dataCountry').append(`
                <tr>
                    <td id="name">${country.Country}</td>
                    <td>${country.CountryCode}</td>
                    <td>${country.Confirmed}</td>
                    <td>${country.Deaths}</td>
                    <td>${country.Recovered}</td>
                    <td id="allDates">${country.Date}</td>
                </tr>
        `)
        }).join();
    });
});