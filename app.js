const express = require('express');
const path = require('path');
const open = require('open').default;
const endpoint = require('./script/endpoint');

const app = express();

app.use(express.json());
app.use(endpoint);

// Phục vụ các file tĩnh trong thư mục source/pages
app.use(express.static(path.join(__dirname)));

// Route mặc định trả về index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  open('http://localhost:3000');
});