async function checkUserSession() {
    try {
        const response = await fetch('/check-session');
        if (response.ok) {
            const message = await response.text();
            console.log(`Session hợp lệ: ${message}`);
        } else if (response.status === 401) {
            alert('Phiên người dùng đã hết hạn. Bạn sẽ được chuyển đến trang đăng nhập.');
            window.location.href = '/us-log-in';
        } else {
            console.error('Lỗi không xác định khi kiểm tra session người dùng.');
        }
    } catch (err) {
        console.error('Lỗi khi kiểm tra session người dùng:', err);
    }
}

async function checkBusinessSession() {
    try {
        const response = await fetch('/check-business-session');
        if (response.ok) {
            const message = await response.text();
            console.log(`Business session hợp lệ: ${message}`);
        } else if (response.status === 401) {
            alert('Phiên doanh nghiệp đã hết hạn. Bạn sẽ được chuyển đến trang đăng nhập.');
            window.location.href = '/business-login';
        } else {
            console.error('Lỗi không xác định khi kiểm tra session doanh nghiệp.');
        }
    } catch (err) {
        console.error('Lỗi khi kiểm tra session doanh nghiệp:', err);
    }
}

// Kiểm tra session định kỳ
setInterval(() => {
    checkUserSession();
    checkBusinessSession();
}, 60000); // 60 giây
