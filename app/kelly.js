const E = document.createElement;

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

function Product(id, imageUrl, title, price, author, description) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.title = title;
    this.price = price;
    this.author = author;
    this.description = description;
    this.quantityAvailable = 1;
    this.increaseQuantity = function (number) {
        number = typeof number === 'undefined' ? 1 : number;
        this.increaseQuantity += number;
    };
    this.decreaseQuantity = function (number) {
        number = typeof number === 'undefined' ? 1 : number;
        this.quantityAvailable -= this.quantityAvailable < number ? this.quantityAvailable : number;
    };
 }

 let products = [
    new Product(1, "/images/alpaca.jpeg", "Friendly Face", 3.99, "Jimmy Johns", "This is a wonderful piece of art. It connects with the viewer on many levels"),
    new Product(2, "/images/llama.jpeg", "Hello", 75, "M Lee", "Lots and lots of words. You definitely need this"),
    new Product(3, "/images/sheep.jpeg", "Who ewe looking at?", 45, "Rosco", "Think ewe have attitude? Think again!!"),
    new Product(4, "/images/cow.jpg", "Things are Looking Up", 89, "Mrs. Jerry", "More and more words to get you to fall in love with this cow. You know you want it."),
    new Product(5, "/images/calf.jpeg", "Ready for Winter", 200, "Mr. Ben", "This shaggy calf just makes you smile." )
 ];

 let cartItems = [];

function Cart() {
    this.lineItems = [];
    this.total = 0;
    this.subtotal = 0;
    this.tax = 0;
    this.taxRate = 1.06;
    this.calculateSubtotal = function(){
        let productTotal = this.lineItems.reduce(function (acc, product) {
            return acc += product.price;
        }, 0);
        this.subtotal = productTotal;
    };
    this.calculateTotal = function() {
        this.total = this.subtotal * this.taxRate;
    };
    this.calculateTax = function() {
        this.tax = this.total - this.subtotal
    };
    this.addProductToCart = function(id) {
        let foundProduct = Database.getProductById(id);
        if (foundProduct !== 'undefined') {
            this.lineItems.push(foundProduct)
        }
    };
}


products.forEach(function(product){
    document.getElementById("products").appendChild(buildCard(product));
    document.getElementById(product.id).addEventListener('click', function(event){
        if (event.target.matches('a.card-footer-item')) {
            console.log(event.target);
            cartItems.push(product);
            console.log (cartItems);
        }
    });
});

//add events console.log the events. push events into cart array. create database object rebuild cart object - it will be where we fire custom events. create template as well to see how it works.


// document.getElementById('products').addEventListener('click', function(event){
//     if (event.target.matches("a.card-footer-item")) {
//         console.log("added to cart");
//         console.log(event.target);
//         cartItems.push(product);
//     }
// });


// JASON'S CODE FOR EVENTS
//   set on add to cart it adds to product array in the database

//  document.getElementById('products').addEventListener('click', function(event){
//     if (event.target.matches('a.card-footer-item')) {
//         console.log(event.target);
//     }

//     if (event.target.matches("p.title")) {
//         console.log(`The title of this piece of art is ${product.title}`);
//     }
// });


function buildCard(product) {
    console.log(E);
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
    cardFooterItem.classList.add("card-footer-item");

    cardFooterItem.innerText = "Add to Cart";

    cardFooter.appendChild(cardFooterItem);

    return cardFooter;
}

// inside of forEach


// article.addEventListener('click', function(event){
//     console.log('Hello from the article listener');
//     console.log(event.target);
// });

// article.querySelector('.card-footer-item').addEventListener('click', function(event){
//     event.stopPropagation();
//     console.log("Hello from the button listener");
//     console.log(event);
// });




