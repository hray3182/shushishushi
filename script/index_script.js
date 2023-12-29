import { menuData } from "./menu.js"; 

// 創建單個菜單項目的 HTML
function createMenuItem(item) {
    return `
      <div class="sushi-item" data-key="${item.key}">
        <img src="./assets/shushi_img/${item.img_file}" alt="${item.name}">
        <div class="description">${item.name}</div>
        <div class="price">$${item.price}元</div>
      </div>
    `;
}

// 創建整個菜單的 HTML
function createMenu(menuItems) {


    const menuContainer = document.createElement("div");
    menuContainer.className = "menu";

    // 將菜單項目按類別分組
    const itemsByCategory = menuItems.reduce((acc, item) => {
        acc[item.category] = acc[item.category] || [];
        acc[item.category].push(item);
        return acc;
    }, {});

    // 為每個類別創建標題和對應項目
    for (const category in itemsByCategory) {
        const categoryDiv = document.createElement("div");
        categoryDiv.className = "menu-category";
        categoryDiv.innerHTML = `<h2 id="${category}">${category}</h2>`;
        menuContainer.appendChild(categoryDiv);

        itemsByCategory[category].forEach(item => {
            const menuItem = createMenuItem(item);
            menuContainer.insertAdjacentHTML('beforeend', menuItem);
        });
    }

    return menuContainer;
}

// 生成訂購單 Html
function createOrder(item) {
    orderHtml = `
    <div id="add_order">
    <div class="order" data-key="${item.key}">
        <a id="close"><img src="./assets/close.svg" alt=""></a>
        <div class="order-header">
            <h1>${item.name}</h1>
            <img src="./assets/shushi_img/${item.img_file}">
        </div>
        <div class="order-body">
            <ul>
                <li>
                    <input type="checkbox" id="${item.key}-item1" name="辣椒醬">
                    <label for="${item.key}-item1">辣椒醬</label>
                </li>
                <hr>
                <li>
                    <input type="checkbox" id="${item.key}-item2" name="芥末醬">
                    <label for="${item.key}-item2">芥末醬</label>
                </li>
                <hr>
                <li>
                    <input type="checkbox" id="${item.key}-item3" name="薑絲">
                    <label for="${item.key}-item3">薑絲</label>
                </li>
                <hr>
                <li>
                    <input type="checkbox" id="${item.key}-item4" name="醬油">
                    <label for="${item.key}-item4">醬油</label>
                </li>
                <hr>
            </ul>
            <div class="quantity">

                <button id="minus">
                    <img src="./assets/minus.svg" onclick="">
                </button>
                <p id="quantity">1</p>
                <button id="plus">
                    <img src="./assets/plus.svg" onclick="">
                </button>
                
            </div>
            <div id="send-to-cart">
                <button>新增到購物車</button>
            </div>
        </div>
    </div>
</div>
`
    const body = document.querySelector('body');
    body.insertAdjacentHTML('beforeend', orderHtml);
    
    setTimeout(listenClose, 0);
    setTimeout(listenPlusButton, 0);
    setTimeout(listenMinusButton, 0);
    setTimeout(sendToCart, 0);
}

// 創建訂單明細
function createDetial(item, quantity) {
    // <li>蝦仁扇貝天婦羅醬拌烏龍麵(溫) x 1 $130</li>
    let html = `<li>${item.name} x ${quantity} $${item.price * quantity}</li>`
    const ul = document.querySelector("#order-list")
    ul.insertAdjacentHTML('beforeend', html);
    closeOrderForm()
}

// close order form
function closeOrderForm() {
    const addOrder = document.querySelector("#add_order")
    addOrder.remove()

}

// count total
function countTotal() {
}

// 監聽關閉按鈕
function listenClose() {

    const orderCloseBtn = document.querySelector('#close');
    orderCloseBtn.addEventListener('click', function () {
        console.log("test")
        closeOrderForm()
    });
}

// 監聽訂單 plus button
function listenPlusButton() {
    const plus = document.querySelector("#plus")
    const quantity = document.querySelector("#quantity")
    plus.addEventListener('click', function () {
        // get quantity 
        let q = quantity.innerHTML
        q++
        quantity.innerHTML = q
    });
}

// 監聽訂單 minus button
function listenMinusButton() {
    const minus = document.querySelector("#minus")
    const quantity = document.querySelector("#quantity")
    minus.addEventListener('click', function () {
        // get quantity 
        let q = quantity.innerHTML
        if (q > 1 ) {

            q--
            quantity.innerHTML = q
        }
    });
}

// 監聽送出訂單按鈕
function sendToCart() {
    // send-to-cart
    const sendToCart = document.querySelector("#send-to-cart")

    sendToCart.addEventListener('click', function () {


        // get key from document.querySelector("#add_order > div")
        const key = document.querySelector("#add_order > div").dataset.key
        // get item data by key
        const itemData = menuData.menuItems.filter(item => item.key == key)[0];
        // get quantity 
        const q = document.querySelector("#quantity").innerHTML
        createDetial(itemData, q)
    })
}

// 當文檔加載完成後，將菜單添加到 .content 元素中
document.addEventListener('DOMContentLoaded', () => {
    const target = document.querySelector("div.content");
    if (target) {
        const menu = createMenu(menuData);
        target.appendChild(menu);
    } else {
        console.error("未找到類別為 'content' 的 div 元素");
    }
});

// 菜單監聽器
document.addEventListener('DOMContentLoaded', () => {
    // 選擇所有的 .sushi-item 元素
    const sushiItems = document.querySelectorAll('.sushi-item');

    sushiItems.forEach(item => {
        // 為每個元素添加點擊事件監聽器
        item.addEventListener('click', function () {
            // 獲取 data-key 屬性
            const key = this.dataset.key;
            console.log("被點擊的元素的 data-key 是: ", key);
            // get data from menuData filter by key 
            const itemData = menuData.menuItems.filter(item => item.key == key)[0];
            console.log("被點擊的元素的數據是: ", itemData);
            // 在這裡加入其他你想要執行的操作
            createOrder(itemData);    

        });
    });
});


