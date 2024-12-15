// public/js/popup.js

function showPopup(type, title, text) {
    Swal.fire({
        icon: type,       // 'success' | 'error' | 'warning' | 'info' | 'question'
        title: title,
        text: text,
        showConfirmButton: true
    });
}

// Hàm hiển thị thông báo với kiểu 'success'
function showSuccess(message) {
    showPopup('success', 'Thành công', message);
}

// Hàm hiển thị thông báo với kiểu 'error'
function showError(message) {
    showPopup('error', 'Lỗi', message);
}

// Hàm hiển thị thông báo với kiểu 'warning'
function showWarning(message) {
    showPopup('warning', 'Cảnh báo', message);
}
