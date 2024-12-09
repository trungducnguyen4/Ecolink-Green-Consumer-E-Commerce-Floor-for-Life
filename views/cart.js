window.addEventListener("scroll", function() {
    var totalCostWrap = document.querySelector(".total-cost-wrap");
    var lastProduct = document.querySelector(".product:last-child"); // Giả sử sản phẩm cuối có class là .product

    // Lấy vị trí của sản phẩm cuối
    var lastProductBottom = lastProduct.offsetTop + lastProduct.offsetHeight;

    // Nếu người dùng cuộn tới gần cuối trang
    if (window.scrollY + window.innerHeight >= lastProductBottom) {
        totalCostWrap.classList.remove("fixed");
        totalCostWrap.classList.add("absolute");
    } else {
        totalCostWrap.classList.remove("absolute");
        totalCostWrap.classList.add("fixed");
    }
});
