// https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg
console.log('hello');
const header = document.getElementsByClassName('header')[0];
const content = document.getElementsByClassName('content')[0];
const cartPage = document.getElementsByClassName('cartPage')[0];
const cart = document.getElementById('cart');
const products = document.getElementsByClassName('products')[0];
const itemSection = document.getElementsByClassName('itemSection')[0];
const priceSection = document.getElementsByClassName('priceSection')[0];
console.log("fdfsd",products);

console.log('content',content);
console.log('header',header);
window.onload = renderElements;
let cartItem =[];
async function renderElements(){
    const data =await fetch('https://fakestoreapi.com/products');
    
    const response = await data.json();
    renderProducts(response);
    // console.log('response',response);
}
let totalPrice =0;
function renderProducts(response)
{
    response.map(renderItems);
}
function renderItems(items){

    // console.log(items);
     const divParent = document.createElement('div');
     divParent.className = 'item';
     const image = document.createElement('img');
     image.setAttribute('src',items.image);
    //  image.setAttribute('width','25%');
     image.className="image";
     divParent.appendChild(image);
    //  console.log(divParent);
    
    // console.log(content);
    const title = document.createElement('p');
    title.innerText = items.title;
    title.classList.add('title');
    divParent.appendChild(title);
    const description = document.createElement('p');
    description.innerText = items.description;
    divParent.appendChild(description);
    const price = document.createElement('p');
    price.innerText = "₹"+items.price;
    
    divParent.appendChild(price);
    const button1=document.createElement('button');
    button1.innerText='add';
    divParent.appendChild(button1);
    button1.addEventListener('click',addItem);
    const button2=document.createElement('button');
    button2.innerText='remove';
    button2.addEventListener('click',removeItem);
    divParent.appendChild(button2);
    divParent.setAttribute('id',items.id);
    divParent.setAttribute('class','itemContainer');
    content.appendChild(divParent);

}

function addItem(e){
    console.log(e);
    const prodItem = e.target.parentElement;
    console.log(prodItem);
    // const newdiv ={...prodItem};
    const newdiv = prodItem.cloneNode(true);
    const gid = newdiv.getAttribute('id');
    newdiv.setAttribute('id',gid+"_new");
    newdiv.childNodes[2].remove();
    
    let prices = newdiv.childNodes[2].innerText.substr(1);
    
    prices=parseFloat(prices,3);
    totalPrice+=prices;
    console.log("bhow bhow", prices);
    newdiv.classList.add('purchase');
    console.log('newdiv',newdiv);
    cartItem.unshift(newdiv);
    console.log("array check",cartItem[0]);
    
}
function removeItem(e) {
    const prodItem = e.target.parentElement;
    const idToRemove = prodItem.getAttribute('id');
    const indexToRemove = cartItem.findIndex(item => item.getAttribute('id') === idToRemove);

    if (indexToRemove !== -1) {
        cartItem.splice(indexToRemove, 1);
        prodItem.remove(); // Remove the product from the cart display
        console.log('Removed from cart:', idToRemove);
    }
}
// function addItem(e){
//     console.log(e);
//     cartItem.unshift(e.target.parentElement);
//     console.log(cartItem[0]);
// }
cart.addEventListener('click',renderCartItems);
function renderCartItems(){
    cartPage.classList.remove('inactive');
    content.classList.add('inactive');
    cartItem.map(renderPurchasedProducts);
    const para1 = document.createElement('p');
    priceSection.innerHTML='';
    const diviii = document.createElement('div');
    diviii.innerText = 'Total price';
    diviii.classList.add('diviii');
    priceSection.appendChild(diviii);
    para1.innerText = totalPrice;
    priceSection.appendChild(para1);
   
    
}
function renderPurchasedProducts(products1){
    
    
    itemSection.appendChild(products1);
}
console.log('produ',products);
products.addEventListener('click',renderHome);
function renderHome(){
    console.log(' keep going');
    cartPage.classList.add('inactive');
    content.classList.remove('inactive');
}

 