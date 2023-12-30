import { menuData } from "./menu.js";


function createItems(data) {
    const items = [];

    for (let i = 0; i < data.length; i++) {
        const item = document.createElement("tr");
        item.setAttribute("data-key", data[i].key);
        item.innerHTML = `
            <td class="img"><img src="${data[i].img_file}"></td>
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
    const key = this.closest("tr").dataset.key;
    const item = menuData.find(item => item.key == key);
    const index = menuData.indexOf(item);
    menuData.splice(index, 1)

    const tr = document.querySelector(`tr[data-key='${key}']`)
    tr.remove()
}

function handleEdit() {
    // get data-key
    const key = this.closest("tr").dataset.key;
    console.log(key)
    const item = menuData.find(item => item.key == key);
    createEditItemLayout(item)


}

const addItemLayout = `
<div class="edit_item" data-key="">
<div class="container">
    <a id="close"><img src="./assets/close.svg" alt=""></a>
    <h1>新增商品</h1>
    <img src="" alt="">
    <hr>
    <div class="form">
        <div class="row">
            <label for="name">品名</label>
            <input name="name" type="text" value="">
        </div>
        <div class="row">
            <label for="price">價格</label>
            <input name="price" type="text" value="">
        </div>
        <div class="row">
            <label for="category">分類</label>
            <input name="category" type="text" value="">
        </div>
        <div class="row">
        <label for="path_to_img">圖片</label>
        <input name="path_to_img" type="text" value="">
    </div>
    </div>

    <div class="bottom">
        <button id="modify_img">預覽圖片</button>
        <button id="confirm-add">確認修改</button>
    </div>

</div>
</div>
`

function handleAdd() {
    const button = document.querySelector("#add_item")
    button.addEventListener('click', function () {
        document.querySelector('body').insertAdjacentHTML('beforeend', addItemLayout);
        setTimeout(listenClose, 0);
        setTimeout(modifyImgListener, 0);
        setTimeout(confirmAdd, 0);
    })
}

function confirmAdd() {
    const button = document.querySelector("#confirm-add")
    button.addEventListener('click', function () {
        const key = menuData.length + 1;
        const name = document.querySelector("input[name='name']").value;
        const price = document.querySelector("input[name='price']").value;
        const category = document.querySelector("input[name='category']").value;
        const img_file = document.querySelector("input[name='path_to_img']").value;
        const item = {
            key: key,
            name: name,
            price: price,
            category: category,
            img_file: img_file
        }
        menuData.push(item)
        const tr = document.createElement("tr");
        tr.setAttribute("data-key", key);
        tr.innerHTML = `
            <td class="img"><img src="${img_file}"></td>
            <td class="name">${name}</td>
            <td class="catregory">${category}</td>
            <td class="price">${price}</td>
            <td class="operation">
                <a class="icon edit"><img  src="./assets/edit.svg" alt=""></a>
                <a class="icon delete"><img  src="./assets/delete.svg" alt=""></a>
            </td>
        `;


        const target = document.querySelector("table");
        target.prepend(tr);
        closeOrderForm()
        deleleteListener()
        editListener()
    })
}


function createEditItemLayout(item) {
    const html = `
    <div class="edit_item" data-key="${item.key}">
    <div class="container">
        <a id="close"><img src="./assets/close.svg" alt=""></a>
        <h1>編輯品項</h1>
        <img src="${item.img_file}" alt="">
        <hr>
        <div class="form">
            <div class="row">
                <label for="name">品名</label>
                <input name="name" type="text" value="${item.name}">
            </div>
            <div class="row">
                <label for="price">價格</label>
                <input name="price" type="text" value="${item.price}">
            </div>
            <div class="row">
                <label for="category">分類</label>
                <input name="category" type="text" value="${item.category}">
            </div>
            <div class="row">
            <label for="path_to_img">圖片</label>
            <input name="path_to_img" type="text" value="${item.img_file}">
        </div>
        </div>

        <div class="bottom">
            <button id="modify_img">修改圖片</button>
            <button id="confirm">確認修改</button>
        </div>

    </div>
</div>
    `
    document.querySelector('body').insertAdjacentHTML('beforeend', html);
    setTimeout(listenClose, 0);
    setTimeout(modifyImgListener, 0);
    setTimeout(confirmListener, 0);
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

function modifyImgListener() {
    const button = document.querySelector("#modify_img")
    button.addEventListener('click', function () {
        const url = document.querySelector("input[name='path_to_img']").value;
        const img = document.querySelector("body > div.edit_item > div > img")
        img.src = url
    })
}

function confirmListener() {
    const button = document.querySelector("#confirm")
    button.addEventListener('click', function () {
        const key = document.querySelector("div.edit_item").dataset.key;
        const item = menuData.find(item => item.key == key);
        const name = document.querySelector("input[name='name']").value;
        const price = document.querySelector("input[name='price']").value;
        const category = document.querySelector("input[name='category']").value;
        const img_file = document.querySelector("input[name='path_to_img']").value;
        item.name = name
        item.price = price
        item.category = category
        item.img_file = img_file
        console.log(item)

        const tr = document.querySelector(`tr[data-key='${key}']`)
        tr.querySelector(".name").textContent = name
        tr.querySelector(".price").textContent = price
        tr.querySelector(".catregory").textContent = category
        tr.querySelector(".img img").src = img_file


        closeOrderForm()
    })
}



// 監聽關閉按鈕
function listenClose() {

    const orderCloseBtn = document.querySelector('#close');
    orderCloseBtn.addEventListener('click', function () {
        closeOrderForm()
    });
}

function closeOrderForm() {
    const editItemLayout = document.querySelector(".edit_item")
    editItemLayout.remove()

}

menuData.forEach(item => {
    item.img_file = `./assets/shushi_img/${item.img_file}`
})

// 當文檔加載完成後，將菜單添加到 .table 元素中
document.addEventListener('DOMContentLoaded', () => {
    const target = document.querySelector("table");
    if (target) {
        const menu = createItems(menuData);
        target.append(...menu);

        deleleteListener()
        editListener()
        handleAdd()

    } else {
        console.error("未找到類別為 'table' 的 div 元素");
    }
});



