function addDataToResult(results){
	$("#resultdiv ul li").remove();
	$.each(results, function(ind,ele){
		var $thisli = $('<li><p class="resulttitle" >' + ele.name + 
		'</p><p class="resultprice">$' + ele.price + ' / Day</p><p class="resultaddr">'+
		ele.addr2+', '+ele.addr2+', '+ele.addr3+'</p><p class="hid" style="display:none;">'
		+ele.index+'</p></li>').appendTo($("#resultdiv ul"));
		$thisli.on("click", function(obj){
			var str = $(obj.target).parent("li").find(".hid")[0].innerText;
			navigateToMap(str);
		});
	});
}
var results=[];
function sortResult(rs, key){
	for(var i = 0; i < rs.length; i++){
		for(j = i + 1; j < rs.length; j++){
			if(key == "name"){
				if(rs[i][key]>rs[j][key]){
					swap(rs, i, j);
				}
			}
			else{
				if(parseFloat(rs[i][key])>parseFloat(rs[j][key])){
					swap(rs, i, j);
				}
			}
		}
	}
}
function swap(rs, i, j){
	var tmp = rs[i];
	rs[i] = rs[j];
	rs[j] = tmp;
}
function afterDocMapReady(){
	var $resdiv = $("#resultdiv");
	$resdiv.css("height", $("#filterdiv").parent("div").height() - $("#filterdiv").height() - 40 + "px");
	$("#filter-sort").bind("change", function(eve){
		var key = $("#filter-sort").val();
		sortResult(results, key);
		addDataToResult(results);
	});
	$("#filter-search-button").click(function(){
		var name = $("#filter-text").val();
		var min = $("#filter-min-price").val();
		var max = $("#filter-max-price").val();
		var totalDT = getData();
		results = [];
		$.each(totalDT, function(ind,ele){
			if(name.length > 0){
				if(ele.name.indexOf(name) < 0){
					return;
				}
			}
			if(min.length > 0){
				if(ele.price < min){
					return;
				}
			}
			if(max.length > 0){
				if(ele.price > max){
					return;
				}
			}
			ele.index = ind;// the index in originData
			results.push(ele);
		});
		if($("#filter-sort").val() == "safety"){
			sortResult(results,"safety");
		}
		else if($("#filter-sort").val() == "price"){
			sortResult(results,"price");
		}
		else{//sort by name
			sortResult(results,"name");
		}
		addDataToResult(results);
		displayInMap(results);
	});
}