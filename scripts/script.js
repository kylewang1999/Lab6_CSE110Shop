// Script.js

function setCartCount(){
  if(!localStorage.getItem("cart")){
    localStorage.setItem("cart", new Array(21).join(0))
  }
  let cart_arr = localStorage.getItem("cart").split('');
  let c = 0;
  for(let i=0; i<21; i++){
    if(cart_arr[i]==1){c++;}
  }
  var ct = document.getElementById('cart-count');
  ct.textContent = c;
}


window.addEventListener('DOMContentLoaded', () => {
  // TODO
  let array;
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("fetched", JSON.stringify(data))

      setCartCount();
    })

});

var array = JSON.parse(localStorage.getItem("fetched"));
for (let i=0 ; i<array.length; i++){
  let item = array[i];
  var newProduct = new ProductItem(item);
  let parent = document.getElementById("product-list");
  parent.appendChild(newProduct);
}

var chart = ""
