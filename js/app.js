let items = [
    // new Item("test")
];

let loadItems = () => {
    let htmlItems = "";

    // Order by Id and then by status
    items.sort((a, b) => Number(a.id) - Number(b.id));
    items.sort((a, b) => Number(a.status) - Number(b.status));

    for (const item of items) {
        htmlItems += createItem(item);
    }
    
    document.getElementById("list").innerHTML = htmlItems;  
    document.getElementById("item").focus();
}

let createItem = (item) => {
    let status = item.status ? " item_checked" : "";
    let checkIcon = item.status ? "-fill" : "";
        
    let html = `<div class="item${status}" id=${item.id}>
                    <label class="check_item" onclick="markChecked(this)" id="lbl${item.id}">
                        <i class="bi bi-check-square${checkIcon}" id="chk${item.id}"></i>
                        <span>${item.description}</span>
                    </label>
                    <i class="bi bi-trash icon_del" onclick="delItem(this)" id="del${item.id}"></i>
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

let markChecked = (item) => {
    let id = item.id.replace("lbl", "");
    let itemIndex = items.findIndex(item => item.id == id);
    let icon = document.getElementById(`chk${id}`);

    let div = document.getElementById(id);

    div.classList.toggle("item_checked");
    icon.classList.toggle("bi-check-square-fill");
    icon.classList.toggle("bi-check-square");
    
    if (div.classList.contains("item_checked"))
        items[itemIndex].status = true;
    else
        items[itemIndex].status = false;
    
    loadItems();
}

let delItem = (icon) => {
    let id = icon.id.replace("del", "");
    let deleteIndex = items.findIndex(item => item.id == id);

    items.splice(deleteIndex, 1);
    
    loadItems();
}

