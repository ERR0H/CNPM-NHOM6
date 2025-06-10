const sqlite3 = require('sqlite3').verbose();

const fs = require('fs');

// Kết nối đến CSDL
const db = new sqlite3.Database('./data/shop.db', (err) => {
    if (err) {
        console.error('Lỗi kết nối CSDL:', err.message);
    } else {
        console.log('Kết nối thành công!');
    }
});

/*
// TAO BANG products
db.run(`CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT,
    price REAL,
    brand TEXT,
    model TEXT
)`);
*/

/*
// TAO BANG users
db.run(`CREATE TABLE IF NOT EXISTS users (
    sdt TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    address TEXT
)`);
*/

/*
// Tạo bảng orders
db.run(`CREATE TABLE IF NOT EXISTS orders (
    id_order TEXT PRIMARY KEY,
    sdt TEXT,
    order_date TEXT,
    total REAL,
    status TEXT,

    FOREIGN KEY (sdt) REFERENCES users(sdt)
)`);
// doc file JSON
const rawData = fs.readFileSync('./data/orders.json');
const orders = JSON.parse(rawData);
// Chèn dữ liệu vào database từ file JSON
orders.forEach(order => {
    db.run('INSERT INTO orders (id_order, sdt, order_date, total, status) VALUES (?, ?, ?, ?, ?)', 
    [order.id_order, order.sdt, order.order_date, order.total, order.status], 
    function(err) {
        if (err) {
            console.error('Lỗi:', err.message);
        } else {
            console.log(`Thêm đơn hàng thành công với ID: ${this.lastID}`);
        }
    });
});
*/

/*
// Tạo bảng order_details
db.run(`CREATE TABLE IF NOT EXISTS order_details (
    id TEXT,
    id_order TEXT,
    quantity INTEGER,
    price REAL,

    FOREIGN KEY (id_order) REFERENCES orders(id_order),
    FOREIGN KEY (id) REFERENCES products(id)
)`);

// doc file JSON
const rawData = fs.readFileSync('./data/order_details.json');
const orderDetails = JSON.parse(rawData);
// Chèn dữ liệu vào database từ file JSON
orderDetails.forEach(detail => {
    db.run('INSERT INTO order_details (id, id_order, quantity, price) VALUES (?, ?, ?, ?)', 
    [detail.id, detail.id_order, detail.quantity, detail.price], 
    function(err) {
        if (err) {
            console.error('Lỗi:', err.message);
        } else {
            console.log(`Thêm chi tiết đơn hàng thành công với ID: ${this.lastID}`);
        }
    });
});
*/
/*
// Đọc file JSON
const rawData = fs.readFileSync('./data/products.json');
const products = JSON.parse(rawData);

// Chèn dữ liệu vào database tu file JSON
products.forEach(product => {
    db.run('INSERT INTO products (id, name, price, brand, model) VALUES (?, ?, ?, ?, ?)', 
    [product.id, product.name, product.price, product.brand, product.model], 
    function(err) {
        if (err) {
            console.error('Lỗi:', err.message);
        } else {
            console.log(`Thêm sản phẩm thành công với ID: ${this.lastID}`);
        }
    });
});
*/

/*
//doc file JSON
const rawData = fs.readFileSync('./data/customers.json');
const customers = JSON.parse(rawData);
// Chèn dữ liệu vào database từ file JSON
customers.forEach(customer => {
    db.run('INSERT INTO users (sdt, name, email, address) VALUES (?, ?, ?, ?)', 
    [customer.sdt, customer.name, customer.email, customer.address], 
    function(err) {
        if (err) {
            console.error('Lỗi:', err.message);
        } else {
            console.log(`Thêm khách hàng thành công với SĐT: ${this.lastID}`);
        }
    });
});
*/


db.all("SELECT * FROM order_details", [], (err, rows) => {
    if (err) {
        console.error('Lỗi:', err.message);
    } else {
        console.table(rows);
    }
});


// Đóng kết nối CSDL khi không cần thiết
db.close((err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Đã đóng kết nối CSDL!');
    }
});