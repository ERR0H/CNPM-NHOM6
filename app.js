const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/shop.db');


db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS USER (
      sdt CHAR(10) PRIMARY KEY,
      name NVARCHAR(100),
      email NVARCHAR(100),
      diachi NVARCHAR(100)
    )
  `);

  // Chèn dữ liệu
  db.run(
    `INSERT INTO USER (sdt, name, email, diachi) VALUES (?, ?, ?, ?)`,
    ['0000000001', 'Alice', 'alice@example.com', 'Quận 1']
  );

  // Lấy dữ liệu ra xem
  db.all(`SELECT * FROM USER`, (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Danh sách người dùng:");
    console.table(rows);
  });
});

// Đóng database
db.close();
