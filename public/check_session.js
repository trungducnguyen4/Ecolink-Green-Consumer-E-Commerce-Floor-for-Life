async function checkSession() {
    try {
        const response = await fetch('/check-session');
        if (!response.ok) {
            alert('Phiên đăng nhập đã hết hạn, bạn sẽ được chuyển đến trang đăng nhập.');
            window.location.href = '/us-log-in'; // Chuyển hướng về trang đăng nhập
        }
    } catch (err) {
        console.error('Lỗi kiểm tra session:', err);
    }
}

// Kiểm tra session mỗi 1 phút
setInterval(checkSession, 60000); // 60 giây
