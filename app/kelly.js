/**
 * build the DOM elements needed for each of your products. Either copy and paste your code from the products/cart
 * example OR rewrite the code below before starting to write the JavaScript that will build the DOM nodes needed.
 * Please feel free to use the method in which you clone the template tag OR the method in which you build each DOM node
 * with document.createElement()
 **/ 

 /**
  * 
  * @param {number} id 
  * @param {string} imageUrl 
  * @param {string} title 
  * @param {number} price 
  * @param {string} author 
  * @param {string} description 
  */

//write for if none available change to sold out, also check on quantity available

cardElement.querySelector('.price').innerText = `$${product.price.toFixed(2)}`  --- goes whereever prices are!! in Card!!

function Product(id, imageUrl, title, price, author, description, quantityAvailable) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.title = title;
    this.price = price;
    this.author = author;
    this.description = description;
    this.quantityAvailable = quantityAvailable;
    this.increaseQuantity = function (number) {
        number = typeof number === 'undefined' ? 1 : number;
        this.increaseQuantity += number;
    };
    this.decreaseQuantity = function (number) {
        number = typeof number === 'undefined' ? 1 : number;
        this.quantityAvailable -= this.quantityAvailable < number ? this.quantityAvailable : number;
    };
 }

function Cart() {
    this.lineItems = [];
    this.total = 0;
    this.subtotal = 0;
    this.tax = 0;
    this.taxRate = 1.06;
    this.calculateSubtotal = function(){
        let productTotal = this.lineItems.reduce(function (acc, currentProduct) {
            return acc += currentProduct.price;
        }, 0);
        this.subtotal = +(productTotal).toFixed(2);
    };
    this.calculateTotal = function() {
        this.total = +(this.subtotal * this.taxRate).toFixed(2);
    };
    this.calculateTax = function() {
        this.tax = +(this.total - this.subtotal).toFixed(2);
    };
    this.addProductToCart = function(product) {
        if (product instanceof Product) {
            this.lineItems.push(product);
        }
        this.calculateSubtotal();
        this.calculateTotal();
        this.calculateTax();
    };
    this.removeProductFromCart = function(id){
        let foundProduct = Database.getProductById(id);
        this.lineItems = this.lineItems.filter(function(product){
            let keepInCart = product !== foundProduct;
            if (keepInCart === false) {
                product.increaseQuantity();
            }
            return keepInCart;
        });
        this.calculateSubtotal();
        this.calculateTotal();
        this.calculateTax();
    }; 
} 

let Database = { 
    products: [],
    addNewProduct: function(product) {
        this.products.push(product);
    },
    getProductById: function(id) {
        return this.products.find(function(product){
            return product.id === id;
        });
    },
};

let alpaca = new Product(1, "/images/alpaca.jpeg", "Friendly Face", 3.99, "Jimmy Johns", "This is a wonderful piece of art. It connects with the viewer on many levels",2);
let llama = new Product(2, "/images/llama.jpeg", "Hello", 75, "M Lee", "Lots and lots of words. You definitely need this",2);
let sheep = new Product(3, "/images/sheep.jpeg", "Who ewe looking at?", 45, "Rosco", "Think ewe have attitude? Think again!!",2);
let cow = new Product(4, "/images/cow.jpg", "Things are Looking Up", 89, "Mrs. Jerry", "More and more words to get you to fall in love with this cow. You know you want it.",2);
let calf = new Product(5, "/images/calf.jpeg", "Ready for Winter", 200, "Mr. Ben", "This shaggy calf just makes you smile.",2);

Database.addNewProduct(alpaca);
Database.addNewProduct(llama);
Database.addNewProduct(sheep);
Database.addNewProduct(cow);
Database.addNewProduct(calf);

// const E = document.createElement;

function buildCard(product) {
    // console.log(E);
    // let article = E("article"),
    //     card = document.createElement("div");
    let article = document.createElement("article"),
        card = document.createElement("div");

    article.id = product.id;
    article.classList.add("column", "is-4");
    card.classList.add("card");

    card.appendChild(buildCardImage(product));
    card.appendChild(buildCardContent(product));
    card.appendChild(buildCardFooter(product));
    article.appendChild(card);

    return article;
}

function buildCardImage(product) {
    let cardImage = document.createElement("div"),
        figure = document.createElement("figure"),
        image = document.createElement('img');

    cardImage.classList.add("card-image");
    figure.classList.add("image", "is-4by4");
    image.src = product.imageUrl;
    image.alt = product.title;

    figure.appendChild(image);
    cardImage.appendChild(figure);

    return cardImage;
}

function buildCardContent(product) {
    let cardContent = document.createElement("div"), 
        title = document.createElement("p"),
        price = document.createElement("p"),
        author = document.createElement("e"),
        content = document.createElement("div");

    cardContent.classList.add("card-content");
    title.classList.add("title");
    price.classList.add("subtitle", "price");
    author.classList.add("subtitle", "author");
    content.classList.add("content");

    title.innerText = product.title;
    price.innerText = `$${product.price}`;
    author.innerText = product.author;
    content.innerText = product.description;

    cardContent.appendChild(title);
    cardContent.appendChild(price);
    cardContent.appendChild(author);
    cardContent.appendChild(content);

    return cardContent;
}

function buildCardFooter(product) {
     let cardFooter = document.createElement("div"),
        cardFooterItem = document.createElement("a");

    cardFooter.classList.add("card-footer");
    cardFooterItem.classList.add("card-footer-item", "sold-out");

    cardFooterItem.innerText = "Add to Cart";

    cardFooterItem.dataset.productId = product.id;

    cardFooter.appendChild(cardFooterItem);

    return cardFooter;
}

Database.products.forEach(function(product){
    document.getElementById("products").appendChild(buildCard(product));
    // document.getElementById(product.id).addEventListener('click', function(event){
        //     if (event.target.matches('a.card-footer-item')) {
            //         console.log(event.target);
            //         cartItems.push(product);
            //         console.log (cartItems);
            //     }
            // });
        // });
});

const CART = new Cart();

document.getElementById('products').addEventListener('click', function(event){
    if (event.target.matches("a.card-footer-item")) {
        let productId = parseInt(event.target.dataset.productId);
        let product = Database.getProductById(productId);
        if (product instanceof Product && product.quantityAvailable > 0) {
            CART.addProductToCart(product);
            product.decreaseQuantity();
            if(product.quantityAvailable === 0) {
                document.getElementById(productId).querySelector(".card-footer-item").innerText = "Sold Out";
                document.getElementById(productId).querySelector(".card-footer-item").style.color = "#f00";
                document.getElementById(productId).querySelector(".card-footer-item").style.cursor = "default";
                
            }
            event.target.dispatchEvent(addToCartEvent);
        }
    }
    console.log(CART);
});

document.addEventListener('addedToCart', function(event){
    document.getElementById('counter').innerText = CART.lineItems.length;
});

let addToCartEvent = new CustomEvent('addedToCart', {
    bubbles: true
});

