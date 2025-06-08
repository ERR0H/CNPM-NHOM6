const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
  container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
  container.classList.remove('active');
});

// Đọc tham số URL để hiển thị đúng form
const urlParams = new URLSearchParams(window.location.search);
const formType = urlParams.get('form');

if (formType === 'register') {
  container.classList.add('active'); // Hiện form đăng ký
} else if (formType === 'login') {
  container.classList.remove('active'); // Hiện form đăng nhập
}
