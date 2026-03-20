function updateProductOnCart(productId) {
    const user = firebase.auth().currentUser;

    // ❌ Chưa đăng nhập
    if (!user) {
        alert("Vui lòng đăng nhập trước khi thêm vào giỏ hàng");
        return;
    }

    // ✅ Đã đăng nhập
    db.collection("products").doc(productId).update({
        onCart: true,
        userId: user.uid // (optional) gắn user vào sản phẩm
    })
    .then(() => {
        alert("Sản phẩm đã được thêm vào giỏ hàng");
    })
    .catch((error) => {
        console.log("Lỗi không thêm được sản phẩm vào giỏ hàng", error);
    });
}

function loadProducts(){
    const products_container = document.querySelector("#products-container");

    db.collection("products").get().then((querySnapshot) => {
        const docs = querySnapshot.docs;

        for (let i = 0; i < docs.length; i++) {
            const doc = docs[i];
            const product = doc.data();

            const productElement = document.createElement("div");
            productElement.classList.add("product");

            productElement.innerHTML = `
                <img src="${product.image}">
                <p>Name: ${product.name}</p>
                <p>Price: ${product.price} VND</p>
                <button class="add-to-cart-btn">Add to cart</button>
            `;

            // ✅ Lấy button trong chính element này
            const button = productElement.querySelector(".add-to-cart-btn");

            button.addEventListener('click', () => {
                updateProductOnCart(doc.id);
            });

            products_container.appendChild(productElement);
        }
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
        if (doc.exists){
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