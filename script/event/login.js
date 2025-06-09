document.getElementById('loginForm').addEventListener('submit', function(event) {

    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (email === '' || password === '') {
        alert("Vui lòng nhập đầy đủ email/tên đăng nhập và mật khẩu.");
        return;
    }

    // Gửi yêu cầu POST đến máy chủ
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    })

    .then(response => response.json())

    .then(data => {
        if (data.success) {
            // Chuyển hướng đến trang quản lý nếu đăng nhập thành công
            if (data.role === 'admin') {
                window.location.href = '../../source/pages/admin.html';
            }
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
});
