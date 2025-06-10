const express = require('express');
const bcrypt = require('bcryptjs');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/shop.db');

const router = express.Router();


const users = [
  {
    id: 1,
    email: 'admin@example.com',
    username: 'adminuser',
    passwordHash: bcrypt.hashSync('adminPass123', 10), 
    role: 'admin'
  },
  {
    id: 2,
    email: 'user@example.com',
    username: 'normaluser',
    passwordHash: bcrypt.hashSync('userPass123', 10),
    role: 'user'
  }
];

// Endpoint đăng nhập
router.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập đầy đủ email/tên đăng nhập và mật khẩu.' });
  }

  // Tìm người dùng theo email hoặc tên đăng nhập
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() || u.username.toLowerCase() === email.toLowerCase());

  if (!user) {
    return res.status(401).json({ success: false, message: 'Tài khoản không tồn tại.' });
  }

  // Kiểm tra mật khẩu
  if (!bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ success: false, message: 'Sai mật khẩu.' });
  }

  // Đăng nhập thành công
  return res.json({
    success: true,
    message: 'Đăng nhập thành công.',
    role: user.role,
    userId: user.id,
    username: user.username
  });
});

// Lấy tất cả sản phẩm
router.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Lấy chi tiết sản phẩm theo id
router.get('/api/products/:id', (req, res) => {
  db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
    res.json(row);
  });
});


// Thêm sản phẩm mới
router.post('/api/products', (req, res) => {
  const { id, name, price, brand, model } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Tên và giá sản phẩm là bắt buộc.' });
  }

  const sql = 'INSERT INTO products (id, name, price, brand,model) VALUES (?, ?, ?, ?, ?)';
  db.run(sql, [id, name, price, brand, model], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name, price, brand, model});
  });
});
// xoa sản phẩm
router.delete('/api/products/:id', (req, res) => {
  db.run('DELETE FROM products WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});
// Cập nhật sản phẩm
router.put('/api/products/:id', (req, res) => {
  const { name, price, brand, model } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Tên và giá sản phẩm là bắt buộc.' });
  }

  const sql = 'UPDATE products SET name = ?, price = ?, brand = ?, model = ? WHERE id = ?';
  db.run(sql, [name, price, brand, model, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
    res.json({ success: true });
  });
});

// Lấy tất cả người dùng
router.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;

