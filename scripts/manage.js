import { menuData } from "./menu.js";


function createItems(data) {
    const items = [];

    for (let i = 0; i < data.length; i++) {
        const item = document.createElement("tr");
        item.setAttribute("data-key", data[i].key);
        item.innerHTML = `
            <td class="img"><img src="./assets/shushi_img/${data[i].img_file}"></td>
            <td class="name">${data[i].name}</td>
            <td class="catregory">${data[i].category}</td>
            <td class="price">${data[i].price}</td>
            <td class="operation">
                <a class="icon edit"><img  src="./assets/edit.svg" alt=""></a>
                <a class="icon delete"><img  src="./assets/delete.svg" alt=""></a>
            </td>
        `;
        items.push(item);
    }
    // return html 
    return items;
}

function handleDelete() {
    console.log("delete")
}

function handleEdit() {
    console.log("edit")
}

function handleAdd() {

}

function deleleteListener() {
    // a.icon.delete
    const deleteButtons = document.querySelectorAll("a.icon.delete");
    deleteButtons.forEach(button => {
        button.addEventListener("click", handleDelete);
    })
}

function editListener() {
    // a.icon.edit
    const editButtons = document.querySelectorAll("a.icon.edit");
    editButtons.forEach(button => {
        button.addEventListener("click", handleEdit);
    })
}

// 當文檔加載完成後，將菜單添加到 .table 元素中
document.addEventListener('DOMContentLoaded', () => {
    const target = document.querySelector("table");
    if (target) {
        const menu = createItems(menuData);
        target.append(...menu);

        deleleteListener()
        editListener()

    } else {
        console.error("未找到類別為 'table' 的 div 元素");
    }
});



