// product-item.js
class ProductItem extends HTMLElement {
  updateCart(id){
    if(!localStorage.getItem("cart")){
      localStorage.setItem("cart", new Array(21).join(0))
    }

    let cart_arr = localStorage.getItem("cart").split('');
    cart_arr[id] = Number(!Number(cart_arr[id]));
    localStorage.setItem("cart", cart_arr.join(''));
    this.setCartCount();
  }

  setCartCount(){
    let cart_arr = localStorage.getItem("cart").split('');
    let c = 0;
    for(let i=0; i<21; i++){
      if(cart_arr[i]==1){c++;}
    }
    var ct = document.getElementById('cart-count');
    ct.textContent = c;
  }

  constructor(item) {
    var style = document.createElement('style');
    style.textContent = `
.price {
  color: green;
  font-size: 1.8em;
  font-weight: bold;
  margin: 0;
}

.product {
  align-items: center;
  background-color: white;
  border-radius: 5px;
  display: grid;
  grid-template-areas: 
  'image'
  'title'
  'price'
  'add';
  grid-template-rows: 67% 11% 11% 11%;
  height: 450px;
  filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
  margin: 0 30px 30px 0;
  padding: 10px 20px;
  width: 200px;
}

.product > button {
  background-color: rgb(255, 208, 0);
  border: none;
  border-radius: 5px;
  color: black;
  justify-self: center;
  max-height: 35px;
  padding: 8px 20px;
  transition: 0.1s ease all;
}

.product > button:hover {
  background-color: rgb(255, 166, 0);
  cursor: pointer;
  transition: 0.1s ease all;
}

.product > img {
  align-self: center;
  justify-self: center;
  width: 100%;
}

.title {
  font-size: 1.1em;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title:hover {
  font-size: 1.1em;
  margin: 0;
  white-space: wrap;
  overflow: auto;
  text-overflow: unset;
}
    `   
    super();
    this.attachShadow({mode: 'open'});
    
    var product = document.createElement('li');
    product.setAttribute('class','product');

    var img = product.appendChild(document.createElement('img'));
    img.setAttribute('width','200');
    img.setAttribute('alt',item["title"]);
    img.setAttribute('src',item["image"]);

    var title = product.appendChild(document.createElement('p'));
    title.setAttribute('class','title');
    title.textContent = (item["title"]);

    var price = product.appendChild(document.createElement('p'));
    price.setAttribute('class','price');
    price.textContent = ("$"+item["price"]);

    var button = product.appendChild(document.createElement('button'));
    button.textContent = "Add to Cart"

    let id = Number(item['id']);
    if(localStorage.getItem("cart").split('')[id]==1){
      button.textContent="Remove from Cart";
    }else{
      button.textContent="Add to Cart";
    }

    button.addEventListener('click', ()=>{
      var ct = document.getElementById('cart-count');
      if(button.textContent=="Add to Cart"){
        button.textContent="Remove from Cart"
        ct.textContent = Number(ct.textContent)+1;
        this.updateCart(Number(item['id']));
      }else{
        button.textContent="Add to Cart"
        ct.textContent = Number(ct.textContent)-1;
        this.updateCart(Number(item['id']));
      }


    });
    this.shadowRoot.append(style,product);

  }

  


}

customElements.define('product-item', ProductItem);


