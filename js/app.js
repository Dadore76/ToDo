let items = [
    new Item("test")
];

let loadItems = () => {
    let htmlItems = ""

    for (const item of items) {
        htmlItems += createItem(item);
    }
    
    document.getElementById("list").innerHTML = htmlItems;
    
}

let createItem = (item) => {
    let html = ` <div class="item" id=${item.id}>
                    <i class="bi bi-check-square" id="icon${item.id}" onclick="markChecked(this)"></i>
                    <span>${item.description}</span>
                    <i class="bi bi-trash" id="del${item.id}" onclick="delItem(this)"></i>
                </div>`;
    return html;
}

let addItem = () => {
    let form = document.forms["form"];
    let newItem = form["item"];

    items.push(new Item(newItem.value))
    newItem.value = "";

    loadItems();
}

let markChecked = (icon) => {
    let id = icon.id.replace("icon", "");
    let div = document.getElementById(id);

    div.classList.toggle("item_checked");

    icon.classList.toggle("bi-check-square-fill");
    icon.classList.toggle("bi-check-square");
}

let delItem = (icon) => {
    let id = icon.id.replace("del", "");
    let deleteIndex = items.findIndex(item => item.id == id);

    items.splice(deleteIndex, 1);
    
    loadItems();
}

