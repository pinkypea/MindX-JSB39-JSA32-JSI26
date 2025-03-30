function loadProducts() {
    const productsContainer = document.querySelector('#products-container');
    productsContainer.innerHTML = ' ';
    db.collection("products").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const product = doc.data();
                const productElement = document.createElement('div');
                productElement.innerHTML = `
            <img src=${product.image}>
            <p>Name: ${product.name}</p>
            <p>Price: $${product.price}</p>`

                productsContainer.appendChild(productElement);
            });
        })
        .catch((error) => {
            console.log("Error", error)
        });
}

window.onload = loadProducts;