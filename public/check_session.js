async function checkSession() {
    try {
        const userResponse = await fetch('/check-session');
        const businessResponse = await fetch('/check-business-session');

        // Kiểm tra session người dùng
        if (userResponse.ok) {
            const userMessage = await userResponse.text();
            console.log(`Session người dùng hợp lệ: ${userMessage}`);
        } else if (userResponse.status === 401) {
            console.warn('Session người dùng không tồn tại hoặc đã hết hạn.');
        } else {
            console.error('Lỗi không xác định khi kiểm tra session người dùng.');
        }

        // Kiểm tra session doanh nghiệp
        if (businessResponse.ok) {
            const businessMessage = await businessResponse.text();
            console.log(`Session doanh nghiệp hợp lệ: ${businessMessage}`);
        } else if (businessResponse.status === 401) {
            console.warn('Session doanh nghiệp không tồn tại hoặc đã hết hạn.');
        } else {
            console.error('Lỗi không xác định khi kiểm tra session doanh nghiệp.');
        }

        // Logic điều hướng nếu không có session nào hợp lệ
        if (!userResponse.ok && !businessResponse.ok) {
            alert('Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.');
            window.location.href = '/us-log-in'; // Hoặc chuyển đến `/business-login` tùy loại tài khoản
        }
    } catch (err) {
        console.error('Lỗi khi kiểm tra session:', err);
    }
}

// Kiểm tra session định kỳ
setInterval(() => {
    checkSession();
}, 5*60000); // 60 giây
