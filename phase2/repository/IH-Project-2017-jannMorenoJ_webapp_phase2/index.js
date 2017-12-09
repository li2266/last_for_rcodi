
/*$(document).ready(function () {
  //your code here
    $(function(){
    $("#busqueda").click(function(){
        var text= "";
        $.ajax({
          url: "https://www.quandl.com/api/v3/datasets/ZILLOW/N15706_MRPST.json?api_key=4aY3C_gB1de3eUs1kzTf",
          type:"GET",
          dataType: "JSON",
          success:  function(data){
              //var informacion:
              text += "<tbody>";
              $.each(data.dataset.data, function(i, info){
                     text += "<tr><td>"+info[0]+"</td><td>"+info[1]+"</td></tr>";
                     })
              text +="</tbody>";
              
              
          }
      })
    $("#table").html(text);
})
    
})
});*/
//4aY3C_gB1de3eUs1kzTf quant api key primer dataset de la lista
$(document).ready(function () {
  //your code here
    $("#Search").click(function(){
        var text= "";    
        $.getJSON("https://www.quandl.com/api/v3/datasets/ZILLOW/N15706_MRPST.json?api_key=4aY3C_gB1de3eUs1kzTf",  function(data){
            console.log(data.dataset.data[0][0]);
            for (var c=0; c<5; c++){
                text += "<tr><td>"+data.dataset.data[c][0]+"</td>";
                text += "<td>"+"$ "+data.dataset.data[c][1]+"</td></tr>"
            }
            $("#tbody").html(text);
              })
        /*var items = [];
        var newdata= JSON.parse(data);
        $.each(newdata, function(key){
            items.push("<tr>");
            items.push("<td id=''"+key+"''>"+newdata.dataset.data[key][0]+"</td>");
            items.push("<td id=''"+key+"''>"+newdata.dataset.data[key][1]+"</td>");
            items.push("</tr>");
        })
        $("<tbody/>", {html:items.join("")}).appendTo("table");*/
    })
    
    $("#Clean").click(function(){
        $("#table tbody tr").remove()
    })
    
});