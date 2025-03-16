// Hàm không có giá trị trả về
function say_hello(name) {
    console.log("Hello", name);
}

let my_name = "Messi";
say_hello(my_name);

// Hàm có giá trị trả về
function get_average(a, b, c){
    let sum = a + b + c;
    let average = sum / 3;
    return average;
}

let result = get_average(10, 50, 20);
console.log(result);

// Viết lại 2 hàm bên trên theo arrow function
// let say_hello = (name) => console.log("Xin chào", name);
// let get_average = (a, b, c) => (a + b + c) / 3;

// Template literals cho phép nhúng biến vào string
let firstName = "Kiên";
let middleName = "Trung";
let lastName = "Đào";

let fullName = `${lastName} ${middleName} ${firstName}`;
console.log(fullName);

const product = "Laptop";
const price = 1600000000;
const VAT = 0.1;
const totalPrice = price + price * VAT;
const order = `Sản phẩm: ${product}
Giá: ${price} VND
Thuế VAT: ${VAT * 100}%
Tổng thanh toán: ${totalPrice}`;
console.log(order);

// Array method
// array = mảng
let students = ["Long", "Sơn", "Bách", "Đạt"];
// Duyệt mảng
for (let i = 0; i < students.length; i++){
    console.log(students[i]);
}

// Thêm phần tử mới vào cuối mảng
students.push("Kiên");
// for (let i = 0; i < students.length; i++){
//     console.log(students[i]);
// }

// Xoá phần tử
students.pop(); // xoá phần tử ở cuối mảng
students.shift(); // xoá phần tử ở đầu mảng
for (let i = 0; i < students.length; i++){
    console.log(students[i]);
}

students.sort();
for (let i = 0; i < students.length; i++){
    console.log(students[i]);
}

// Map method in array
let numbers = [1, 2, 3, 4, 5];
let mapMethod = numbers.map((num) => num + 2);
console.log(mapMethod);

// Filter method in array
let filterMethod = numbers.filter((num) => num > 2);
console.log(filterMethod);

// Find methond in array
let findMethod = numbers.find((num) => num > 2);
console.log(findMethod);