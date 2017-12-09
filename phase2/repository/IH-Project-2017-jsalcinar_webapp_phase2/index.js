const DATASET_QUERY_FORMAT = "https://data.cityofnewyork.us/resource/6qzy-b4x8.json";

var statesIDs = Object.keys(DATASETS_API_SERIES_ID);

function getDataFromURL(URL){
    var data = $.get(URL, function(){
        console.log(URL)
    })
        .done( function(){
            //Success
            //console.log(data);
            DATASETS_API_SERIES_ID[data.responseJSON.request.series_id].push(data.responseJSON.series[0].data);
        })
        .fail( function(error){
            console.error(error);
        })
}

function updateAllDatasets(){
    for ( var statesID of statesIDs){
        var URL = DATASETS_QUERY_FORMAT + statesID;
        getDataFromURL(URL);
    }
}

function updateTable(){
    tableReference = $("#mainTableBody")[0];
    var newRow, co2Amount, state;
    
    for ( var statesID of statesIDs){
        newRow = tableReference.insertRow(tableReference.rows.length);
        state = newRow.insertCell[0];
        co2Amount = newRow.insertCell(1);
        state.inerHTML = DATASETS_API_SERIES_ID[statesID][0]
        co2Amount.innerHTML = DATASETS_API_SERIES_ID[statesID][2][0][1];
    }
}

$(document).ready( function(){
    $("#getDataButton").on("click", updateAllDatasets);
    $("#updateTableButton").on("click", updateTable);
})