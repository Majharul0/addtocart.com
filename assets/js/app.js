//For home page or cart page in one page
function showCartPage(){
    document.querySelector('.containerForCart').style.display = "block";
    document.querySelector('.container').style.display = "none";
}
function showHomePage(){
    document.querySelector('.containerForCart').style.display = "none";
    document.querySelector('.container').style.display = "block";
}

//Select Element For Place The Content
const productEl = document.querySelector('#place__products');
const cartEl = document.querySelector('#cartProducts');
const cartItemNum = document.querySelector('#cartItem');
const totalItemEl = document.querySelector('#totalItem');
const totalPriceEl = document.querySelector('#totalPrice');




//call each product from 'product.js' array

var renderproduct = () =>{
    products.forEach((item) =>{

        productEl.innerHTML += `
        <div class="item">
                <img src="${item.imgSrc}" alt="">
        
                <div class="endItem">
                    <div class="text">
                        <p>${item.name}</p>
                        <h1>${'$' + item.price}</h1>
                    </div>
                    <a class="addBtn" onclick="addToCart(${item.id});">
                        <img src="assets/icon/addCart.svg" alt="">
                    </a>
                </div>
                </div>
        `;
    })
}

renderproduct();
// Cart Page Functionality start from here
//Cart Array
let cart = [];
//Add Product To Cart
function  addToCart(id){
    //Condition For Same Product adding in cart array
    if(cart.some((item) => item.id === id)){
        alert("Vai Same Product Disen!!")
    }else{
        const item = products.find((item) => item.id === id);

        cart.push({
            ...item,
            numberOfQuantity:1,
        });

    }
    updateToCart();
}

function updateToCart(){

//add product into cart page
    addProductsToCart();

//add num of cart item
    addCartNumber();

//update product num or price
    updateNumPrice()

}


//Display Total Cart Item In Top
function addCartNumber(){
    cartItemNum.textContent = cart.length;

}

//Add product into cart page which one click user
function addProductsToCart(){
    cartEl.innerHTML = "";
    cart.forEach((item) =>{
    
        cartEl.innerHTML += `
        <div class="item">
                 <div class="product__details">
                       
                       <img src="${item.imgSrc}" alt="">
                         <div class="text">
                          <p>${item.name}</p>
                             <h1>${'$' +  item.price}</h1>
                             </div>
                         </div>
     
                     <div class="quantity">
                     <div class="number">
                     
                    </div>
                    <input type="number" min="1" max="100" step="1" value="${item.numberOfQuantity}" id="my-input" readonly>
                     <div class="steperBtn">
                     <button id="increment" onclick="changeNumberOfQuantity('plus',${item.id})" > <img src="assets/icon/arrow.svg" alt=""> </button>
                     <button id="decrement" onclick="changeNumberOfQuantity('minus',${item.id})"> <img src="assets/icon/arrow-down.svg" alt=""> </button>
     
                     </div>
                     </div>
                         <a href="#" onclick="removeItem(${item.id})"> <img src="assets/icon/delete.svg" alt=""></a>
     
     
             </div>
        `;

    })
}

//For Update Quantity and Price
function updateNumPrice(){
    let itemNumber = 0,
        itemPrice = 0;

        cart.forEach((item) =>{
            itemPrice += item.price * item.numberOfQuantity;
            itemNumber += item.numberOfQuantity;
        });

        totalItemEl.textContent = itemNumber;
        totalPriceEl.textContent = itemPrice.toFixed(2);

}

//For Update Quantity Number
function changeNumberOfQuantity(action,id){
       
     cart = cart.map((item) =>{ 

        let numberOfQuantity = item.numberOfQuantity;

        if(item.id === id){
            if(action === 'minus' && numberOfQuantity > 1){
                numberOfQuantity --;
            }else if(action === 'plus' && numberOfQuantity < item.inStock){
                numberOfQuantity ++;
            }
        }
        
        return {
            ...item,
            numberOfQuantity,
        };

    });
    updateToCart();
  
}

//For remove item from cart page
function removeItem(id){
    cart = cart.filter((item) => item.id != id);
    updateToCart();
}

