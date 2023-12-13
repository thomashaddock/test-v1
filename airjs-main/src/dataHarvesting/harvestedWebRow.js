class HarvestedWebRow{
    constructor(data){
        this.location; // = window.location;
        this.id; // = this.location.href
        this.rawData = data;
        this.tensorData;
        this.type = 'row';
    }
}

module.exports.HarvestedWebText = HarvestedWebRow;
