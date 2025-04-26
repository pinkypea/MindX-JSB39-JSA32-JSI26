function updateProductOnCart(productId) {
    db.collection('products').doc(productId).update({
        "onCart": true
    })
    .then(() => {
        console.log("Sản phẩm đã được thêm vào giỏ hàng");
        loadProducts();
    })
    .catch ((error) => {
        console.log("Lỗi không thêm được sản phẩm vào giỏ hàng", error);
    });
}

function loadProducts() {
    const productsContainer = document.querySelector('#products-container');
    productsContainer.innerHTML = ' ';
    db.collection("products").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const product = doc.data();
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
            <img src=${product.image}>
            <p>Name: ${product.name}</p>
            <p>Price: $${product.price}</p>
            <button class="add-to-cart-btn" data-id="${doc.id}">Add to cart</button>`

                productsContainer.appendChild(productElement);
            });
            // Gán sự kiện cho tất cả nút "Add to cart"
            document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const productId = btn.getAttribute('data-id');
                    updateProductOnCart(productId);
                });
            });
        })
        .catch((error) => {
            console.log("Error", error)
        });
}

window.onload = loadProducts;

const userInfor = document.querySelector('#user-infor');
const usernameDisplay = document.querySelector('#username');
const authBtn = document.querySelector('#auth-buttons');

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/v8/firebase.User
      var uid = user.uid;
      db.collection('users').doc(user.uid).get()
      .then((doc) => {
        if (doc.exist){
            const userData = doc.data();
            usernameDisplay.textContent = `Hello ${userData.username}`;
        }
      })
      .catch((error) => {
        console.error("Error getting user data:", error);
      });

      userInfor.style.display = 'flex';
      authBtn.style.display = 'none';
    }
});

// Đăng xuất
const logoutButton = document.querySelector('#logout-button');
logoutButton.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        console.log("User logged out successfully");
        alert("User logged out");
        authBtn.style.display = 'flex';
        userInfor.style.display = 'none';
      }).catch((error) => {
        console.log("Logout error:", error);
      });
});