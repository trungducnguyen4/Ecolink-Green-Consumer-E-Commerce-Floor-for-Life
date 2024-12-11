// Lấy tất cả các phần tử có class "line-infor-item"
const items = document.querySelectorAll('.line-infor-item');

// Thêm sự kiện click cho từng phần tử
items.forEach(item => {
    item.addEventListener('click', function () {
        // Xóa class "line-infor-item-active" khỏi tất cả các phần tử
        items.forEach(i => i.classList.remove('line-infor-item-active'));

        // Thêm class "line-infor-item-active" vào phần tử được nhấn
        this.classList.add('line-infor-item-active');
    });
});


// XỬ LÝ TĂNG GIẢM SẢN PHẨM
function updateQuantity(change) {
    // Lấy giá trị hiện tại của input số lượng
    const quantityInput = document.getElementById('quantity');
    
    // Lấy giá trị hiện tại, chuyển sang kiểu số
    let currentQuantity = parseInt(quantityInput.value);
    
    // Tăng hoặc giảm số lượng
    currentQuantity += change;
    
    // Đảm bảo số lượng không nhỏ hơn 1
    if (currentQuantity < 1) {
        currentQuantity = 1;
    }
    
    // Cập nhật giá trị của input số lượng
    quantityInput.value = currentQuantity;
}


// ĐIỀU HƯỚNG MÔ TẢ - CHỨNG CHỈ XANH
function showContent(contentId) {
    // Ẩn tất cả các phần nội dung
    const sections = document.querySelectorAll('.content-section');
    sections.forEach((section) => {
        section.classList.remove('active');
    });

    // Hiện phần nội dung được chọn
    const selectedSection = document.getElementById(contentId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Cập nhật trạng thái dòng chọn
    const items = document.querySelectorAll('.line-infor-item');
    items.forEach((item) => {
        item.classList.remove('line-infor-item-active');
    });

    // Thêm class active vào mục được chọn
    const activeItem = [...items].find((item) => {
        if (contentId === 'describe') {
            return item.textContent.trim() === 'Mô tả';
        } else if (contentId === 'chungchi') {
            return item.textContent.trim() === 'Chứng chỉ xanh';
        }
        return false;
    });

    if (activeItem) {
        activeItem.classList.add('line-infor-item-active');
    }
}
