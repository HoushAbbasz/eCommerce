"use strict"

/*gets the elements by their IDs as soon as HTML is loaded so the JS can execute faster*/ 
document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("productGrid");
    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");
    const minPriceInput = document.getElementById("minPrice");
    const maxPriceInput = document.getElementById("maxPrice");
    const ratingFilter = document.getElementById("ratingFilter");
    const categoryFilter = document.getElementById("categoryFilter");

    let allProducts = [];

    // gets the JSON file.
    fetch("../data/items.json")
        // if the JSON is fetched w/o errors processes the JSON into JS objects
        .then(response => response.json())
        .then(data => {
            // adds all of the product JS objects to the allProducts array 
            allProducts = data;
            // creates HTML for each product
            renderProducts(allProducts);
        })
        .catch(error => console.error("Error loading products:", error));



    function renderProducts(products) {
        // performs HTML for each product in the products parameter 
        products.forEach(product => {
            // create a div 
            const productCard = document.createElement("div");
            // makes the div have a product-item class 
            productCard.classList.add("product-item");

            const fullStars = "★★★★★";
            const emptyStars = "☆☆☆☆☆";
            const roundedRating = Math.round(product.rating);

            // concatenates a subset of the full stars with a subset of the empty stars
            const stars = fullStars.slice(0, roundedRating) + emptyStars.slice(0, 5 - roundedRating);

            /* adds inner HTML to each product card (image, price, description, rating, add to cart) */
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <p class="description">${product.description}</p>
                <div class="rating">
                    <span>${stars}</span>
                    <p class="rating-value">(${product.rating.toFixed(1)})</p>
                </div>
                <button class="add-to-cart">Add to Cart</button>
            `;
            // adds the product card with the added inner HTML
            productGrid.appendChild(productCard);
        });
    }

    function applyFilters() {
        // creates a copy of all products 
        let filtered = allProducts.slice();
        
        const searchTerm = searchInput.value.toLowerCase().trim();
        // if the search input is not null
        if (searchTerm) {
            // creates an array of terms by space. ex.) ["this", "example"] = "this example"
            const terms = searchTerm.split(/\s+/); 
            // adds product to filtered array
            filtered = filtered.filter(product => {
                return terms.every(term => {
                    // checks if product name contains term
                    const inName = product.name.toLowerCase().includes(term);
                    // checks if product description contains term
                    const inDesc = product.description.toLowerCase().includes(term);
                    // checks if term is a number and if the product is cheaper than that number
                    const inPrice = !isNaN(term) && product.price <= parseFloat(term);
                    // returns trues/false if it's true then the product gets added to the filtered array
                    return inName || inDesc || inPrice;
                });
            });
        }
    // sets the min/max price, 0 or infinity if not used
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
    // sets filtered products to products between the min and max (inclusively)
    filtered = filtered.filter(product => product.price >= minPrice && product.price <= maxPrice);
    
    // sets a min rating, 0 if not used
    const minRating = parseFloat(ratingFilter.value) || 0;
    // sets products to at or above a certain rating
    filtered = filtered.filter(product => product.rating >= minRating);
    
    // if cateegory filter is not null/empty, return only products in that category 
    const category = categoryFilter.value;
    if (category) {
        filtered = filtered.filter(product => product.category === category);
    }

    // sort the products and render the finalized products with appropriate filters on the screen
    const sorted = sortProducts(filtered, sortSelect.value);
    renderProducts(sorted);
}

    // sorts the product array based on the sortValue
    function sortProducts(products, sortValue) {
        switch(sortValue) {
            // sort alphabettically if a.localeCompare.b is ABC order, b.localeCompare.a is ZYX order
            case "name-asc": return products.sort((a,b) => a.name.localeCompare(b.name));
            case "name-desc": return products.sort((a,b) => b.name.localeCompare(a.name));
            // sort numerically a - b is ascending, b - a is descending
            case "price-asc": return products.sort((a,b) => a.price - b.price);
            case "price-desc": return products.sort((a,b) => b.price - a.price);
            case "rating-asc": return products.sort((a,b) => a.rating - b.rating);
            case "rating-desc": return products.sort((a,b) => b.rating - a.rating);
            default: return products;
        }
    }
    /* adds an event listen to the event listener to all elements in the array and 
    executes the applyFilter function when the event happens. The first checks to see if anything is inputted, the second checks to see if anything is selected/changed */ 
    [searchInput, minPriceInput, maxPriceInput].forEach(el => el.addEventListener("input", applyFilters));
    [ratingFilter, categoryFilter, sortSelect].forEach(el => el.addEventListener("change", applyFilters));
});
