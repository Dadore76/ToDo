class Item {
    static contItems = 0;

    constructor(description) {
        this._id = ++Item.contItems;
        this._description = description;
        this._status = false;
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