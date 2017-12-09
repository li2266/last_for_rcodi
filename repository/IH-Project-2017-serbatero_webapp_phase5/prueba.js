$.get("https://data.cityofnewyork.us/resource/byk8-bdfw.json", {}, function(datas){
    for(var i = 0; i < datas.length; i++){
       
       latitudFireHouses.push(datas[i].latitude);
       longitudFireHouses.push(datas[i].longitude);
       fireHousesNames.push(datas[i].facilityname);    
    }

});