// SHOPPING CART
// SHOPPING CART
// SHOPPING CART
// SHOPPING CART

//initiation of ui components and data array
const searchBar = document.querySelector('.searchBar');
const bestsellerContainer = document.querySelector('.bestseller-flex');
const shopContainer = document.querySelector('.shop-page-container');
const shopCont = document.getElementById('shopCont');
const failedSearchMessage = document.querySelector('.failedSearchMessage');
const pagination_element = document.getElementById('pagination');
const sorting = document.getElementById('sorting');
const radioFilters = document.querySelectorAll('.radioFiltered');
const productContainer = document.querySelector(".products-container");
const checkoutBtn = document.querySelector('.checkoutBtn');
const firstPage = document.querySelector('.first');
const newsletterInput = document.querySelector('.newsletterInput');



//value for when all fruits are displayed
let radioChecked = 0;

let data = [];
let allData = [];
let fruitsArray = [];
let veggiesArray = [];
let bestsellesArray = [];
let perPage;
let width= window.innerWidth;
if(width > 1500) {
    perPage = 8;
}else{
    perPage = 9;
}


//event listener for when sorting type is changed
try{
    sorting.addEventListener('change',function() {

        //if onyl fruit is displayed
       if(radioChecked==1){
        //filtering data array to show only fruit
        const filtered = data.filter( (item) => {
            return item.type.toLowerCase().includes('fruit');
        });
        filteredSelection(filtered)
       }  
       //if only veggie is displayed
       else if(radioChecked==2){
        //filtering data array to show only veggies  
        const filtered = data.filter( (item) => {
            return item.type.toLowerCase().includes('veggie');
        });

        filteredSelection(filtered);
       }
       //when all is displayed
       else{
            filteredSelection(data);
       }   
})
}catch(err){}


//function that is determening what sorting type did we choose
// and calls sorting function to sort the array of data
const filteredSelection = (filteredData) => {
    if(sorting.value =='nameasc'){
        filteredData.sort(GetSortOrder("name")); 
        displayPageNav(perPage,filteredData);
    }
    if(sorting.value =='priceasc'){
        filteredData.sort(GetSortOrder("price")); 
        displayPageNav(perPage,filteredData);
    }
    if(sorting.value =='namedesc'){
        filteredData.sort(GetSortOrderDesc("name")); 
        displayPageNav(perPage,filteredData);
    }
    if(sorting.value =='pricedesc'){
        filteredData.sort(GetSortOrderDesc("price")); 
        displayPageNav(perPage,filteredData);
    }   
}


//event listener for changing of what should we display(all, fruit or veggie)
radioFilters.forEach(radio => {
    radio.addEventListener('change', function(){

        if(radio.value == 'all'){
            displayPageNav(perPage,data);   
        }else{
            if(radio.value == 'fruit'){
                radioChecked = 1;
            }
            if(radio.value == 'veggie'){
                radioChecked = 2;
            }

            const filtered = data.filter( (item) => {
                return item.type.toLowerCase().includes(radio.value);
            });
    
            displayPageNav(perPage,filtered);   
        }     
    })
});


//sorting ascending function
function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
} 

//sorting descending function
function GetSortOrderDesc(prop) {    
    return function(a, b) {    
        if (a[prop] < b[prop]) {    
            return 1;    
        } else if (a[prop] > b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
} 


//fetching data from JSON file with 
const getProducts = async() =>{
    try{
        let result = await fetch("data.json");

        if (result.status!==200){
            throw new Error ('Problem with getting data from json file. Check misspeling!');
        }    
        data = await result.json();
        //making copy of data array
        allData.push(...data);   
    
        //displaying first 3 products in bestsellers container
        for(let i=0; i<data.length;i++){
            if(i<3){
                let card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                <span class="spano"></span>
                <span class="spano"></span>
                <span class="spano"></span>
                <span class="spano"></span>
                <img src="${data[i].img}" alt="${data[i].name}">
                <div class="card-body">
                    <h3>${data[i].name}</h3>
                    <p>${data[i].description}</p>
                    <div class="bottomCard">
                        <p class="priceCardBody"><span class="price">${data[i].price} </span>$ <del>${data[i].previousPrice}$</del><span class="spanKG">(per kg)</span> </p>
                        <div class="CounterNTotal">
                            <span class="addOrSubstract">
                                <span class="minus" onclick="minus(this)">-</span><input min=1 name="test" oninput="validity.valid||(value='');" onchange="changeTotal(this)" type="number" value="1" class="value" ><span class="plus" onclick="plus(this)">+</span> 
                            </span>
                            <span class="totalPrice">Total :<br> <span class="total"> ${data[i].price} </span>$</span>
                        </div>                    
                        <button class="addButton" data-id=${data[i].id}>ADD TO CART</button>
                    </div> 
                </div>`
                 disableNull();
                try{
                    bestsellerContainer.appendChild(card); 
                }catch(err){}
            }    
        }
        //sorting data by name which is default
        data.sort(GetSortOrder("name")); 
        //adding button click functionality
        getButtons();
        //displaying all items 
        displayPageNav(perPage,data);
        
    } catch(error){console.log(error);}
}

//calling function to get products
getProducts();


//seacrh bar functionality, event listener for figuring out if something is typing
try{
    searchBar.addEventListener('keyup', (e) => {

        //this is string that is typed
        const searchString = e.target.value.toLowerCase();
        //filtering data array based on if the string that we are typing is matching items
        const filtered = data.filter( (character) => {
            return character.name.toLowerCase().includes(searchString);
        });
    
    //emptyin containrs
    try{ shopContainer.innerHTML = '';} catch(error){}

    if(searchBar.value == ''){
        displayPageNav(perPage,filtered);
    }else{
        displayFiltered(filtered);
    }
    })
}catch(error){console.log(error);}


//event listener for buy now buttons on first page 
try{
    firstPage.addEventListener('click', function(e){
        if(e.target.classList.contains('my-1')){
            cartItems(allData[6], 1);
            totalCost(allData[6],1); 
            window.location='checkout.html';
        }
        if(e.target.classList.contains('my-2')){
            cartItems(allData[3], 1);
            totalCost(allData[3],1); 
            window.location='checkout.html';
        }
    })
}catch(err){}


//subscribe to newsletter button changing after entering emial adress
document.querySelector('.newsletterForm').addEventListener('submit', function(e){
    if((document.querySelector('.newsletterForm input')).checkValidity() == true){
        newsletterInput.innerHTML = "Thank you for your subcription!";
       
        setTimeout(function(){ 
             newsletterInput.innerHTML = "Subscribe";
             document.querySelector('.newsletterForm input').value='';}, 2400);
    }
    e.preventDefault();
})

//function for displaying items 
const displayFiltered = (filtered) => {

    //pagination not showing
    pagination_element.style.display= 'none';

    filtered.forEach(item => {

        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <span class="spano"></span>
        <span class="spano"></span>
        <span class="spano"></span>
        <span class="spano"></span>
        <img src="${item.img}" alt="${item.name}">
        <div class="card-body">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="bottomCard">
                <p class="priceCardBody"><span class="price">${item.price} </span>$ <del>${item.previousPrice}$</del><span class="spanKG">(per kg)</span> </p>
                <div class="CounterNTotal">
                    <span class="addOrSubstract">
                        <span class="minus" onclick="minus(this)">-</span><input min=1 name="test" oninput="validity.valid||(value='');" onchange="changeTotal(this)" type="number" value="1" class="value" ><span class="plus" onclick="plus(this)">+</span> 
                    </span>
                    <span class="totalPrice">Total :<br> <span class="total"> ${item.price} </span>$</span>
                </div>                    
                <button class="addButton" data-id=${item.id}>ADD TO CART</button>
            </div> 
        </div>`

        disableNull();
        shopContainer.appendChild(card);
        }); 

        displayMessage(); 
        getButtons();
}


//buttons click event
const getButtons = () => {

    let cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function(e){
            if(e.target.classList.contains('addButton')){

                //getting id of button clicked 
                let dataID = e.target.getAttribute('data-id');
                //quantity of product that we want
                let quantity=parseInt( e.target.previousElementSibling.children[0].children[1].value);
            
                cartItems(allData[dataID-1],quantity);
                totalCost(allData[dataID-1],quantity); 
                //showing that the buttton is clicked
                e.target.innerHTML = 'ADDED TO CART <span><i class="fas fa-check"></i></span>';
                e.target.children[0].style.color='#669a66';
            }
            e.preventDefault();
        })
    });    
}


//displaying pagination and calling function for displaying products
const displayPageNav = (perPage,data) => {

    try{
        pagination_element.style.display = 'block';
    }catch(err){}

    //getting number of all elements and making pagination based on that 
    const totalItems = data.length;
    perPage = perPage ? perPage : 1;
    const pages = Math.ceil(totalItems/perPage);

    pagination_element.innerHTML='';
    //filling pagination 
    for(let i = 1; i <= pages; i++) {
        let pagination = document.createElement('a');
        pagination.href= '#filtered';
        pagination.classList.add('pagination-num');
        pagination.innerHTML = `${i}`;
        pagination_element.appendChild(pagination); 
    }
    //displaying items 
    displaySlicedItems(1,perPage,data);
    
    //pagination buttons event listener
    document.querySelectorAll('.pagination-num').forEach(number => {
        number.addEventListener('click', function(){
            displaySlicedItems(number.innerHTML,perPage,data);
        })
    });
    }
      

//displaying items (9 per page) 
const displaySlicedItems = ( page=1, perPage=2,data) => {
    let index, offSet;

    if(page == 1 || page <=0)  {
    index = 0;
    offSet = perPage;
    } else if(page > data.length) {
    index = page - 1;
    offSet = data.length;
    } else {
    index = page * perPage - perPage;
    offSet = index + perPage;
    }
    //slicing items so there are 9 on every page
    let slicedItems = data.slice(index, offSet);

    shopContainer.innerHTML = '';
    
    //filling shop page
    slicedItems.forEach(item => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <span class="spano"></span>
        <span class="spano"></span>
        <span class="spano"></span>
        <span class="spano"></span>
        <img src="${item.img}" alt="${item.name}">
        <div class="card-body">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="bottomCard">
                <p class="priceCardBody"><span class="price">${item.price} </span>$ <del>${item.previousPrice}$</del><span class="spanKG">(per kg)</span> </p>
                <div class="CounterNTotal">
                    <span class="addOrSubstract">
                        <span class="minus" onclick="minus(this)">-</span><input required value="1" min=1 name="test" oninput="validity.valid||(value='');" onchange="changeTotal(this)" type="number" value="1" class="value" ><span class="plus" onclick="plus(this)">+</span> 
                    </span>
                    <span class="totalPrice">Total :<br> <span class="total"> ${item.price} </span>$</span>
                </div>                    
                <button class="addButton" data-id=${item.id}>ADD TO CART</button>
            </div> 
        </div>`

        disableNull();
        shopContainer.appendChild(card);
    });    

    displayMessage(); 
    getButtons();
}
      
//not gigving input to become null
const disableNull = () => {
    const numInputs = document.querySelectorAll('input[type=number]');
    numInputs.forEach(function(input) {

    input.addEventListener('change', function(e) {
        if (e.target.value == '') {
        e.target.value = 1
        }
    })
    })
}

//displating message if there is no items found when searching in search bar
const displayMessage = () => {
 try{
    if(shopContainer.children.length == 0 ) {
        failedSearchMessage.style.display = 'block';
    }else{
        failedSearchMessage.style.display = 'none';
    }
}catch(err){}
}


//figurning number of items in cart 
function onLoadCartTotalItems(){
    
    let itemNumber = parseInt(localStorage.getItem('cartItems'));            

    if(itemNumber){
        try{
            //displaying number of items on cart icon
            document.querySelector('.CartItemsNumber').textContent =itemNumber;
            //displaying number of items inside cart
            document.querySelector('.numberOfItems').innerHTML=`${itemNumber} items`;
        }catch(err){}
        if(itemNumber==1){
            try{
            document.querySelector('.numberOfItems').innerHTML=`${itemNumber} item`;  

            }catch(err){}
        }                   
    }else{
        try{
            document.querySelector('.numberOfItems').innerHTML=`Empty cart`;
        }
        catch(error){} 
    }
}


//when clicked on add button this funcion is called
//and it adds selected item to other items
function cartItems(product,quantity){
    
    let itemNumber = localStorage.getItem('cartItems');
    itemNumber = parseInt(itemNumber); 
    
    //if there is items in the cart alredy calls setItem to add it
    if(itemNumber){
        localStorage.setItem('cartItems',itemNumber+quantity);
        document.querySelector('.CartItemsNumber').textContent =itemNumber+quantity;
    }else{
        //if there is no items in the cart calls setItem to set it as a first item in cart
        localStorage.setItem('cartItems',quantity);
        document.querySelector('.CartItemsNumber').textContent =quantity;
    }  
    //this function adds it to cart
    setItems(product,quantity);
}


//setting added item in localstorage 
function setItems(product,quantity){
    //getting items from localstorage 
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    //if there are items alredy in local storage
    if(cartItems !=null){
        //if there is no item like that in local stroage
        if(cartItems[product.name] == undefined){
            //add it to array of items in cart
            cartItems = {
                ...cartItems,
                [product.name]:product
            }
        }
        //else just increase quantity of that item in the storage
        cartItems[product.name].inCart +=quantity;
    }
    //if there is no items alredy in Local Storage
    else{
        //setting first item in localstorgae
        product.inCart=quantity;
        cartItems = {
            [product.name]:product
        } 
    }
    //changing to JSON format and adding to local storage
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}


//calculating total cost of items in cart
//is also called when clicking on add to cart button
function totalCost(product,quantity){

    let cartTotal = localStorage.getItem('totalCost');

    if(cartTotal !=null){
        cartTotal = parseInt(cartTotal);
        localStorage.setItem("totalCost",cartTotal + product.price*quantity);
    }else{
        localStorage.setItem('totalCost', product.price*quantity);
    }
}

//displaying cart info on cart.html page
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if(cartItems && productContainer ){

        //maping items from cart from local storage and displaying it on the cart page
        Object.values(cartItems).map(item =>{
            let productCon = document.createElement('div');
            productCon.classList.add('productCon');
            productCon.innerHTML = `
                <div class="flex">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="product-info">
                        <h3>${item.name}</h3>
                        <span class="priceProduct">Price: <span> ${item.price}$</span></span>
                        <span class="counter">
                            <span data-id="${item.id}" class="minus">-</span> <span class="value value2">${item.inCart}</span> <span data-id="${item.id}" class="plus" >+</span> 
                        </span>
                        <a class="delButton" data-id="${item.id}" href="#">Remove</a>
                    </div>
                </div>            
            `
            productContainer.appendChild(productCon);                             
        });
        //adding total cost heading
        productContainer.innerHTML+=`
            <h4>Total: <span class="totalPriceInCart">${localStorage.getItem('totalCost')}$</span></h4>
            `
    }
}

//manipulation with item quantity and delete option in cart.html
try{
    //delete button functionality
    productContainer.addEventListener('click',(e)=>{
        if(e.target.classList.contains('delButton')){
            let removingProduct = e.target;
             //getting product id
            let removingProductID = removingProduct.dataset.id;
            //getting that elements in DOM
            let removingProductUI = removingProduct.parentElement.parentElement.parentElement;
            //getting its name
            let removingProductName = removingProduct.parentElement.firstElementChild.innerText;

            let itemNumber = localStorage.getItem('cartItems');
            let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
            localStorage.setItem('cartItems',itemNumber);
            localStorage.setItem("productsInCart",JSON.stringify(cartItems));
            let totalPrice = document.querySelector('.totalPriceInCart');
            let cartTotal = localStorage.getItem('totalCost');

            //calculating total cost
            if(cartTotal !=null){
                cartTotal = parseInt(cartTotal);
                //substracting removing item cost from total cost
                localStorage.setItem("totalCost",cartTotal - cartItems[removingProductName].price * cartItems[removingProductName].inCart);
            }else{
                localStorage.setItem('totalCost', 0);
            }
        
            totalPrice.innerHTML=`${localStorage.getItem('totalCost')}$`;
            //adusting item number in localstorage
            itemNumber-=cartItems[removingProductName].inCart;;
            
            //deleting item from localstorage
            var key=removingProductName;
            delete cartItems[key];

            localStorage.setItem("productsInCart",JSON.stringify(cartItems));
            localStorage.setItem("cartItems",itemNumber);

            //removing from DOM
            productContainer.removeChild(removingProductUI);
            let productCon = document.querySelector('.productCon');
            if (!productContainer.contains(productCon)){
                checkoutBtn.style.display='none';
            }
    
            //setting new values in DOM
            document.querySelector('.CartItemsNumber').textContent =itemNumber;
            document.querySelector('.numberOfItems').innerHTML=`${itemNumber} items`;
            if(itemNumber==1){
                document.querySelector('.numberOfItems').innerHTML=`${itemNumber} item`;  
            }  
            
        }
        // increasing quantity in cart.html
        else if(e.target.classList.contains('plus') || e.target.classList.contains('minus') ){

            let cartTotal = parseInt( localStorage.getItem('totalCost'));
            let itemNumber = parseInt(localStorage.getItem('cartItems'));
            let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
            let removingProductName = e.target.parentElement.parentElement.firstElementChild.innerText;

            //if minus is clicked
            if(e.target.classList.contains('minus')){
                if(e.target.nextElementSibling.innerHTML !=1){
                    itemNumber-=1;
                    cartItems[removingProductName].inCart -=1;
                    cartTotal -=  cartItems[removingProductName].price;
                }
                e.target.nextElementSibling.innerHTML = cartItems[removingProductName].inCart;
                if(itemNumber==1){
                    document.querySelector('.numberOfItems').innerHTML=`${itemNumber} item`;  
                }  
            } 
            //if plus is clicked
            if(e.target.classList.contains('plus')){
                itemNumber+=1;
                cartItems[removingProductName].inCart +=1;
                cartTotal +=  cartItems[removingProductName].price;

                e.target.previousElementSibling.innerHTML = cartItems[removingProductName].inCart;

                if(itemNumber==1){
                    document.querySelector('.numberOfItems').innerHTML=`${itemNumber} item`;  
                }  
            }

            document.querySelector('.totalPriceInCart').innerText = `${cartTotal}$`;
            document.querySelector('.CartItemsNumber').textContent =itemNumber;
            document.querySelector('.numberOfItems').innerHTML=`${itemNumber} items`;
            
            localStorage.setItem("totalCost",cartTotal );
            localStorage.setItem("cartItems", itemNumber);
            localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        }
        
        e.preventDefault();
    });

}catch(error){
}

//showing cart info on last page
const checkout = () => {
    let cartItemss = JSON.parse(localStorage.getItem('productsInCart'));
    let total =JSON.parse(localStorage.getItem('totalCost')); 
    let checkoutContainer = document.querySelector('.checkout-flex1');
    let totalBill = document.querySelector('.totalBill');
    
    try{
        for(let i=0; i<Object.keys(cartItemss).length; i++){ 
            let checkoutItem = document.createElement('div');
            checkoutItem.classList.add('checkoutItem');
            checkoutItem.innerHTML = `
            <img src="${cartItemss[Object.keys(cartItemss)[i]].img}">
            <div class="checkoutNamenPrice">
                <h4> ${cartItemss[Object.keys(cartItemss)[i]].inCart}x ${cartItemss[Object.keys(cartItemss)[i]].name}</h4>
                <p>${cartItemss[Object.keys(cartItemss)[i]].inCart*cartItemss[Object.keys(cartItemss)[i]].price}$</p>
            </div>
            `
            try{
                checkoutContainer.appendChild(checkoutItem);
            }catch(err){}  
    }
    }catch(err){}
    
    try{
        checkoutContainer.appendChild(checkoutItem);
    }catch(err){}  

    try{
        totalBill.innerHTML = `<span> TOTAL: ${total}$</span> <br> (Free Shipping) `;  
    }catch(err){}

    
}

try{
    document.querySelector(".OrderNumber").innerHTML = `Your order ID number is: <span> #${Math.floor(Math.random() * 100000000)} </span>`;
}catch(err){}

//clearing local storage when things are bought
if ( document.URL.includes("end.html") ) {
    localStorage.clear();
}

//subscribe to newsletter button changing after entering emial adress
document.querySelector('.newsletterForm').addEventListener('submit', function(e){
    if((document.querySelector('.newsletterForm input')).checkValidity() == true){
        newsletterInput.innerHTML = "Thank you for your subcription!";
       
        setTimeout(function(){ 
             newsletterInput.innerHTML = "Subscribe";
             document.querySelector('.newsletterForm input').value='';}, 2400);
    }
    e.preventDefault();
})

//bonus page 
try{
    document.querySelector('.bonusform').addEventListener('submit',function(e){
        if(document.getElementById('bonusName').checkValidity() == true && document.getElementById('bonusEmail').checkValidity() == true){
            document.getElementById('bonusName').value='';
            document.getElementById('bonusEmail').value='';
            document.querySelector('.bonuswrapper h2').innerHTML = 'Thank you. We are sending your bonus Promo Code to your Email Adress.<br> Redirecting to Homepage in 3 seconds...';
            document.getElementById('bonusButtonFinish').value = 'THANK YOU';
            document.getElementById('bonusButtonFinish').disabled = true;
    
            setTimeout(() => {
               window.location='index.html'; 
            }, 3000);
        }
    })
}catch(err){}


if ( document.URL.includes("cart.html") ) {
    let isThereAny = JSON.parse(localStorage.getItem('cartItems'));
    if (isThereAny == 0) {
        checkoutBtn.style.display='none';
    }
}

onLoadCartTotalItems();
displayCart();
checkout();







        

















    
