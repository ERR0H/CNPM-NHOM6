const express = require('express');
const bcrypt = require('bcryptjs');

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

  if (email === 'admin@example.com' && password === 'adminPass123') {
        res.json({ success: true, role: 'admin' });
    } else {
        res.json({ success: false, message: 'Sai tài khoản hoặc mật khẩu' });
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

module.exports = router;

