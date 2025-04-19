function loadCartProducts() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';

    db.collection('products').where('onCart', '==', true).get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                cartContainer.innerHTML = '<p>Giỏ hàng của bạn đang trống.</p>';
                return;
            }

            querySnapshot.forEach((doc) => {
                const product = doc.data();
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <img src="${product.image}" width="100" />
                    <p><strong>${product.name}</strong></p>
                    <p>Price: $${product.price}</p>
                `;
                cartContainer.appendChild(productElement);
            });
        })
        .catch((error) => {
            console.error('Lỗi khi lấy sản phẩm trong giỏ hàng: ', error);
            cartContainer.innerHTML = '<p>Không thể tải giỏ hàng.</p>';
        });
}

window.onload = loadCartProducts;

const userInfo = document.getElementById('user-info');
const usernameDisplay = document.getElementById('username');
const logoutBtn = document.getElementById('logout-btn');
const authBtn = document.getElementById('auth-buttons');

// Listen for user authentication state changes
auth.onAuthStateChanged(user => {
    console.log("User status changed:", user);
    if (user) {
        // Lấy thông tin user từ Firestore
        db.collection('users').doc(user.uid).get()
            .then((doc) => {
                if (doc.exists) {
                    const userData = doc.data();
                    usernameDisplay.textContent = `Hello ${userData.username}`;
                }
            })
            .catch((error) => {
                console.error("Error getting user data: ", error);
            });

        userInfo.style.display = 'flex';
        authBtn.style.display = 'none';
    } 
    // else {
    //     authButtons.style.display = 'flex';
    //     userInfo.style.display = 'none';
    // }
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => {
        console.log('User logged out');
        alert('User logged out');
        authBtn.style.display = 'flex';
        userInfo.style.display = 'none';
    })
    .catch((error) => {
        console.error('Logout error:', error);
    });
});