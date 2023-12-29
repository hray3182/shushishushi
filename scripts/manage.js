import { menuData } from "./menu.js";

console.log(menuData)

function createItems(data) {
//     <tr data-key="1">
//     <td class="img"><img src="./assets/shushi_img/1b6b817b-85b9-4303-b29d-4a01f6e6a65b.jpg"></td>
//     <td class="name">鰻魚握壽司</td>
//     <td class="catregory">握壽司</td>
//     <td class="price">100</td>
// </tr>
    const items = [];

    for (let i = 0; i < data.length; i++) {
        const item = document.createElement("tr");
        item.setAttribute("data-key", data[i].id);
        item.innerHTML = `
            <td class="img"><img src="./assets/shushi_img/${data[i].img_file}"></td>
            <td class="name">${data[i].name}</td>
            <td class="catregory">${data[i].category}</td>
            <td class="price">${data[i].price}</td>
        `;
        items.push(item);
    }
    // return html 
    return items;
}

// 當文檔加載完成後，將菜單添加到 .table 元素中
document.addEventListener('DOMContentLoaded', () => {
    const target = document.querySelector("table");
    if (target) {
        const menu = createItems(menuData);
        target.append(...menu);
    } else {
        console.error("未找到類別為 'content' 的 div 元素");
    }
});