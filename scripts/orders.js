import { menuData } from "./menu.js";

function padWithLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
  }

function generateRandomOrder() {
    const hour = padWithLeadingZeros(Math.floor(Math.random() * 12) + 1, 2);
    const timezone = (hour > 6 && hour < 12) ? "上午" : "下午";
    const minute = padWithLeadingZeros(Math.floor(Math.random() * 60), 2);
    const time = `${timezone} ${hour}:${minute}`;

    const tableNum = Math.floor(Math.random() * 10) + 1;
    const table = `${tableNum}桌`;

    const itemsNum = Math.floor(Math.random() * 5) + 1;
    const items = [];
    for (let i = 0; i < itemsNum; i++) {
        const item = menuData[Math.floor(Math.random() * menuData.length)];
        items.push(item);
    }
    
    let total = 0

    const trs = items.map(item => {
        const quantity = Math.floor(Math.random() * 5) + 1;
        const subtotal = item.price * quantity
        total += subtotal
        return `
            <tr>
                <td class="name">${item.name}</td>
                <td class="quantity">x${quantity}</td>
                <td class="subtotal">$${subtotal}</td>
            </tr>

        `
    }).join("")

    const html = `
    <div class="order">
    <div class="order-head">
        <a id="time">${time}</a>
        <a id="table">${table}</a>
    </div>
    <div class="order-body">
        <div class="items">
            <table>
                ${trs}
            </table>
        </div>
    </div>
    <div class="total">
    合計: ${total}元
</div>
</div>`

    return html;
}

function createOrder(num) {
    const orders = [];
    for (let i = 0; i < num; i++) {
        const order = generateRandomOrder();
        orders.push(order);
    }
    return orders;
}

function init() {
    const orders = createOrder(16);
    const body = document.querySelector(".orders");
    body.innerHTML = orders.join("");
}

init()