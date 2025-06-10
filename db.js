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


db.all("SELECT * FROM products", [], (err, rows) => {
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