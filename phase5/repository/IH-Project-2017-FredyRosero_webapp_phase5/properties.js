'use strict'
class Properties extends Array
{

    findAttribute(attr,x)
    {
        return this.find(p => p[attr] === x);
    }
    
    linearFunction (x,attr,initial,final) 
    {
        return LinearFunction (this,x,attr,initial,final) 
    }    
}
