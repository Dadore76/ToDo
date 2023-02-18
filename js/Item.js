class Item {
    static contItems = 0;

    constructor(obj) {
        this._id = ++Item.contItems;

        if (typeof (obj) === "string") {
            this._description = obj;
            this._status = false;
        }
        else {
            this._description = obj._description;    
            this._status = obj._status;    
        }
    }

    get id() {
        return this._id;
    }

    get description() {
        return this._description;
    }

    set description(description) {
        this._description = description;
    }

    get status() {
        return this._status;
    }

    set status(status) {
        this._status = status;
    }
}