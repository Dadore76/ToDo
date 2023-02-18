var json = localStorage.getItem("itemArray");
let items = [
    // new Item("Hola"),
    // new Item("Mundo"),
    // new Item("Cruel")
];

window.addEventListener("load", () => {
    let newItems = JSON.parse(localStorage.getItem("itemArray"));
    
    for (element of newItems) {
        items.push(new Item(element));
    }

    loadItems();
    
}, false);

let loadItems = () => {
    let htmlItemsToDo = "";
    let htmlItemsDone = "";
    let htmlItemsDoing = "";

    // Order by Id and then by status
    items.sort((a, b) => Number(a.id) - Number(b.id));
    items.sort((a, b) => Number(a.status) - Number(b.status));
    
    for (const item of items) {
        if (item.status === "done") {
            htmlItemsDone += createItem(item);
        }
        else if (item.status === "todo") {
            htmlItemsToDo += createItem(item);
        }
        else {
            htmlItemsDoing += createItem(item);
        }
    }
    
    document.getElementById("list-todo").innerHTML = htmlItemsToDo;  
    document.getElementById("list-doing").innerHTML = htmlItemsDoing;  
    document.getElementById("list-done").innerHTML = htmlItemsDone;  
    document.getElementById("item").focus();
}

let createItem = (item) => {
    let status = item.status === "done" ? " item_checked" : item.status === "doing" ? " item_doing" : "";
    let checkIcon = item.status === "done" || item.status === "doing" ? "-fill" : "";
        
    let html = `<div class="item${status}" id=${item.id}>
                    <label class="check_item" onclick="markChecked(this)" id="lbl${item.id}">
                        <i class="bi bi-check-square${checkIcon}" id="chk${item.id}"></i>
                        <span>${item.description}</span>
                    </label>
                    <i class="bi bi-arrow-counterclockwise icon_ret" onclick="retItem(this)" id="ret${item.id}"></i>
                    <i class="bi bi-trash icon_del" onclick="delItem(this)" id="del${item.id}"></i>
                </div>`;
    return html;
}

let addItem = () => {
    let form = document.forms["form"];
    let newItem = form["item"];

    if (newItem.value !== "") {
        items.push(new Item(newItem.value));
        localStorage.setItem("itemArray", JSON.stringify(items));
        newItem.value = "";
    
        loadItems();
    }
}

let markChecked = (item) => {
    let id = item.id.replace("lbl", "");
    let itemIndex = items.findIndex(item => item.id == id);
    let icon = document.getElementById(`chk${id}`);
    let action = items[itemIndex].status;

    let div = document.getElementById(id);

    if (action === "todo") {
        div.classList.toggle("item_doing");
        icon.classList.toggle("bi-check-square-fill");
        icon.classList.toggle("bi-check-square");
    }
    else {
        div.classList.toggle("item_checked");
        div.classList.toggle("item_doing");
    }
    
    if (div.classList.contains("item_checked"))
        items[itemIndex].status = "done";
    else if (div.classList.contains("item_doing"))
        items[itemIndex].status = "doing";
    else
        items[itemIndex].status = "todo";
    
    localStorage.setItem("itemArray", JSON.stringify(items));

    loadItems();
}

let delItem = (icon) => {
    let id = icon.id.replace("del", "");
    let deleteIndex = items.findIndex(item => item.id == id);

    items.splice(deleteIndex, 1);
    localStorage.setItem("itemArray", JSON.stringify(items));
    
    loadItems();
}

let retItem = (icon) => {
    let id = icon.id.replace("ret", "");
    let returnIndex = items.findIndex(item => item.id == id);

    items[returnIndex].status = "todo"

    localStorage.setItem("itemArray", JSON.stringify(items));
    
    loadItems();
}