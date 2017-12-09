'use strict'
class Propertie {
    constructor(index,address, position, zillowUrl,rentzestimate) {
        this.index = index;
        this.address = address;
        this.position = position;
        this.zillowUrl= zillowUrl;
        this.rentzestimate = rentzestimate
    }
}
Propertie.prototype.toString = function() { return '['+this.index+']:'+this.zillowUrl + ", $"+this.rentzestimate+"/mo, (" + this.position +"). " };

class Position  {
    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }
}
Position.prototype.toString = function() { return this.lat + ", " + this.lng +"." };