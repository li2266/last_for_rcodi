'use strict'
//
function sort(array,attr,asc)
{
    return array.concat().sort(function(first, second) {
        return asc ? first[attr] - second[attr] : second[attr] - first[attr];
    });
}

//
function findAttribute(array,attr,x) { 
    return array.find(p => p[attr] === x);
}

//
function LinearFunction (array,x,attr,initial,final) 
{
    var max = sort(array,attr,false)[0][attr];
    var min = sort(array,attr,false)[array.length-1][attr];
    var m = (final - initial)/(max - min);
    var b = initial - m * min;
    var y = m*x + b;
    return y;
};

//
function CurrencyFormat (n) 
{
    return '$' + parseFloat(n, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
};