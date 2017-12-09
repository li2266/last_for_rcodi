var noaaUrl = "https://www.ncdc.noaa.gov/cdo-web/api/v2/locations";
var tokenFromNoaa = "HwmqLMavaxPYjnQOSotAIfgTDuATbOxb";

var Noaa = $.get({
    url: noaaUrl,
    headers:{
        token: tokenFromNoaa
    },
    success: function(returnedData) {
        //console.log(returnedData);
    }
});

/********************   Utility Functions   *********************/

function initMap()
{
    mapDiv = document.getElementById('googleMap');
    map = new google.maps.Map(mapDiv, {
        center: NYUcoordenada,
        zoom: 12});
    marker = new google.maps.Marker({
        position: NYUcoordenada,
        map: map,
        title: 'NYU Stern School',
        icon: "https://icon-icons.com/icons2/510/PNG/32/university_icon-icons.com_49967.png"
    });
}


function coordenada(latitud, longitud)
{
    this.lat = latitud;
    this.lng = longitud;
}

function distancia(coordenada)
{
    //Calcula distancia euclideana entre 2 coordenadas
    var aux = Math.pow(NYUcoordenada.lat - coordenada.lat, 2) + Math.pow(NYUcoordenada.lng - coordenada.lng, 2);
    return Math.sqrt(aux);
}


/***************** Data Collect ******************/

function createMarkerAddress()
{
    var coordinates = [];
    var directions = [];
    for (var j = 0; j < 10; j++)
    {
        i = Math.floor((Math.random()*(json.text.length-1)));
        var c1= new coordenada(parseFloat(json.text[i].the_geom.coordinates[1]),parseFloat(json.text[i].the_geom.coordinates[0]));
        var c2;

        if(json.text[i].pre_direct===undefined && json.text[i].post_type===undefined)
        {
            c2 = json.text[i].h_no+"+"+json.text[i].st_name.replace(" ","+");
        }
        else if(json.text[i].pre_direct===undefined )
        {
            c2 = json.text[i].h_no+"+"+json.text[i].st_name.replace(" ","+")+"+"+json.text[i].post_type;
        }
        else if(json.text[i].post_type===undefined )
        {
            c2 = json.text[i].h_no+"+"+json.text[i].pre_direct+"+"+json.text[i].st_name.replace(" ","+");
        }
        else
        {
            c2 = json.text[i].h_no+"+"+json.text[i].pre_direct+"+"+json.text[i].st_name.replace(" ","+")+"+"+json.text[i].post_type;
        }
        coordinates.push(c1);
        directions.push(c2);
    }
    address.c1 = coordinates;
    address.c2 = directions;

}
function apiZillowBase()
{
    arr = {x:"",y:"",z:""};
    for (var i = 0; i< address.c1.length; i++)
    {
        apiZillow(address.c1[i],address.c2[i],apiZillowAux);
    }

}
function apiZillowAux(arr)
{
    console.log("Hola");
    if(arr.x !== "" && arr.x.getElementsByTagName("rentzestimate").length !== 0){
        housesInRent.xml.push(arr.x);
        housesInRent.coordenada.push(arr.y);
        housesInRent.address.push(arr.z);

        housesInRent.marker.push(new google.maps.Marker({
            position: arr.y,
            map: map
        }));

        housesInRent.cost.push(arr.x.getElementsByTagName("rentzestimate")[0].firstChild.innerHTML);
        housesInRent.distance.push(distancia(arr.y));
        console.log(housesInRent);
    }
}
function apiZillow(c1,c2,callback)
{
    arr2 = {x:"",y:"",z:""};
    var xmlhttp7 = new XMLHttpRequest();
    var url = "https://cors-anywhere.herokuapp.com/"+ "http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1g38cz0dtzf_a80zd&address="+c2+"&citystatezip=New+York%2C+NY&rentzestimate=true";
    xmlhttp7.open("GET", url, true);
    xmlhttp7.send();
    xmlhttp7.onreadystatechange = function()
    {
        if (xmlhttp7.readyState === 4 && xmlhttp7.status === 200)
        {
            myHousesRent=xmlhttp7.responseXML;
            //Creo que se me acabaron las peticiones
            if(parseInt(myHousesRent.childNodes[0].childNodes[1].childNodes[1].innerHTML) === 0)
            {
                arr2.x = myHousesRent;
                arr2.y = c1;
                arr2.z = c2;
                callback(arr2);
            }

        }

    };
}


/***************    Code    ********************/

const NYUcoordenada = new coordenada(40.7291, -73.9965);

var map;
var marker;

var url = "https://data.cityofnewyork.us/resource/qxp9-hd2v.json?$where=within_circle(the_geom,40.7291,-73.9965,10000)";


json = {text:""};
var address = {c1:[],c2:[]};
housesInRent ={xml:[],coordenada:[],address:[],marker:[],cost:[],distance:[]};

var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function()
    {
    // Done && susessfull
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
    {
        var text = xmlhttp.responseText;
        json.text=JSON.parse(text);
        createMarkerAddress();
        apiZillowBase();

    }
        };
