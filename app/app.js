/**
 * build the DOM elements needed for each of your products. Either copy and paste your code from the products/cart
 * example OR rewrite the code below before starting to write the JavaScript that will build the DOM nodes needed.
 * Please feel free to use the method in which you clone the template tag OR the method in which you build each DOM node
 * with document.createElement()
 **/ 

/**
 * 
 * Product object using object constructor notation
 * If you choose to define your methods on the prototype as I have,
 * you need to be prepared to tell me why its best practice to do so.
 * 
 * @param {Number} id 
 * @param {String} title 
 * @param {String} description 
 * @param {Number} price 
 * @param {Number} quantityAvailable 
 * @param {String} imgUrl 
 * @param {String} creator 
 */
function Product(id, title, description, price, quantityAvailable, imgUrl, creator) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.quantityAvailable = quantityAvailable;
    this.imgUrl = imgUrl;
    this.creator = creator;
}

Product.prototype.increaseQuantity = function (number) {
    number = typeof number === 'undefined' ? 1 : number;
    this.quantityAvailable += number;
};

Product.prototype.decreaseQuantity = function (number) {
    number = typeof number === 'undefined' ? 1 : number;
    this.quantityAvailable -= number > this.quantityAvailable ? this.quantityAvailable : number;
};

/**
 * Cart Model
 * If you choose to define your methods on the prototype as I have,
 * you need to be prepared to tell me why its best practice to do so.
 */
function Cart() {
    this.lineItems = [];
    this.total = 0;
    this.subtotal = 0;
    this.tax = 1.06;
}

Cart.prototype.calculateSubtotal = function () {
    let productsTotal = this.lineItems.reduce(function (acc, currentProduct){
        return acc += currentProduct.price;
    }, 0);
    this.subtotal = productsTotal;
    console.log(this.subtotal);
};

Cart.prototype.calculateTotal = function () {
    this.total = this.subtotal * this.tax;
    console.log(this.total);
};

Cart.prototype.addProductToCart = function (idToFind) {
    let foundProduct = Database.getProductById(idToFind);
    if (foundProduct !== 'undefined') {
        this.lineItems.push(foundProduct);
    }
    this.calculateSubtotal();
    this.calculateTotal();

};

Cart.prototype.removeProductFromCart = function (idToFind) {
    let foundProduct = Database.getProductById(idToFind);
    this.lineItems = this.lineItems.filter(function(currProduct){
        let keepInCart = currProduct !== foundProduct;
        if (keepInCart === false) {
            product.increaseQuantity();
        }
        return keepInCart;
    });
    this.calculateSubtotal();
    this.calculateTotal();
};


/**
 * MOCK DB & BUILD PRODUCTS
 * Using object literal notation.
 * Notice that methods are not defined on the prototype when using object literal notation
 */

let Database = {
    products: [],
    addNewProduct: function(product) {
        if (product instanceof Product) {
            this.products.push(product);
        }
    },
    removeProduct: function (id) {
        if (typeof id === 'undefined') {
            alert("Sorry, something went wrong. Please contact your developer if the issue continues");
            return;
        }
        this.products = this.products.filter(function(product){
            return product !== id;
        });
    },
    getProductById: function(id) {
        if (typeof id === 'undefined') {
            alert(`Error ${this.getProductById.name}: The product id is undefined`);
            return;
        }
        return this.products.find(function(product) {
            return product.id === id;
        });
    }
};

let desc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

/**
 * Using a disposable array to auto create products. It is disposable because it is not named thus not stored
 * in memory after it is used.
 */

[
    'Buffalo',
    'Jackrabbit',
    'Antelope',
    'Bear',
    'Magpie',
    'Mountain Lion'
].forEach(function(name, i){
    Database.addNewProduct(new Product(i + 1, `Bria's ${name}`, desc, 1000, 1, 'https://bulma.io/images/placeholders/1280x960.png', 'Bria Hammock'));
});

/**
 * CLONE, MODIFY & ADD NEW CARD FOR EACH PRODUCT
 * Notice that I am operating directly on the Database.products array. 
 */

Database.products.forEach(function(product){
    let template = document.getElementById('cardTemplate'),
        clone = document.importNode(template.content, true);
        article = clone.firstElementChild;
    article.id = `product-${product.id}`;
    article.querySelector('.title').innerText = product.title;
    article.querySelector('.price').innerText = `$${product.price.toFixed(2)}`;
    article.querySelector('.author').innerText = product.creator;
    article.querySelector('.content').innerText = product.description;
    article.querySelector('.card-footer-item').dataset.productId = product.id;

    document.getElementById('products').appendChild(article);
});

/**
 * Initialize new Cart
 * Make sure to create a new cart. A cart does not exist until you instantiate it, meaning call 'new Cart()'
 */

const CART = new Cart();

/**
 * Events & Handlers
 */

/**
 * Custom event to be dispatched (or fired, or emitted; they mean the same thing) after we have added a product to
 * our cart. 
 */

let addToCardEvent = new CustomEvent('addedToCart', {
    bubbles: true
});

/**
 * Event listener added to the main.products element that is listening for clicks on any
 * a.card-footer-items that are children of main.products. This is an example of event delegation.
 */
document.getElementById('products').addEventListener('click', function (event){
    //Add Products To Cart
    if (event.target.matches('a.card-footer-item')) {
        let productId = parseInt(event.target.dataset.productId);
        CART.addProductToCart(productId);
        event.target.dispatchEvent(addToCardEvent);
    }
});

/**
 * Event listener added to the document that is listening for our custom event
 */
document.addEventListener('addedToCart', function(event){
    document.getElementById('counter').innerText = CART.lineItems.length;
});


