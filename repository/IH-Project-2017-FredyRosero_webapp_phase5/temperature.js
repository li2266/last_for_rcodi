class Temperature {
    constructor(value, lat, lng, date) {
        this.value = value;
        this.lat = lat;
        this.lng = lng;
        this.position = {lat: lat, lng: lng}
        this.date = date;        
    }
}
Propertie.prototype.toString = function() { return '['+this.value+']:'+this.position + ", "+this.date+". " };