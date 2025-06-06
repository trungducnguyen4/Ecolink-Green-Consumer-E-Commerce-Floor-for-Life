

  

/*-----------------------------------------------------------------------------------------------------------------------------------------------*/
//XỬ LÝ TÌM KIẾM SẢN PHẨM

// Lấy tham chiếu đến các phần tử bằng class
const searchInput = document.querySelector(".header-search-input");
const searchButton = document.querySelector(".header-search-icon");
const searchHistoryList = document.querySelector(".header__search-history-list");

// Lắng nghe sự kiện khi người dùng click vào nút tìm kiếm
searchButton.addEventListener("click", performSearch);

// Lắng nghe sự kiện keypress trên ô tìm kiếm
searchInput.addEventListener("keypress", function(event) {
    // Kiểm tra xem phím được nhấn có phải là "Enter" (mã phím 13) không
    if (event.key === "Enter") {
        performSearch();
    }
});

//Thực hiện việc hiển thị giá trị vừa nhập xuống khung lịch sử search
function performSearch() {

    // Lấy giá trị nhập vào từ ô tìm kiếm
    const searchTerm = searchInput.value.trim();

    // Kiểm tra xem giá trị tìm kiếm có tồn tại và không trống
    if (searchTerm !== "") {
        // Tạo một phần tử li mới để thêm vào danh sách lịch sử tìm kiếm
        const searchHistoryItem = document.createElement("li");
        searchHistoryItem.classList.add("header__search-history-item");
        
        // Tạo một liên kết mới và thiết lập nội dung và thuộc tính href
        const searchHistoryLink = document.createElement("a");
        searchHistoryLink.href = "#"; // Đặt href theo đường dẫn bạn muốn hoặc để trống nếu bạn không cần liên kết
        searchHistoryLink.textContent = searchTerm; // Đặt nội dung của liên kết là giá trị tìm kiếm
        
        // Thêm liên kết vào phần tử li
        searchHistoryItem.appendChild(searchHistoryLink);
        
        // Thêm phần tử li vào danh sách lịch sử tìm kiếm
        searchHistoryList.appendChild(searchHistoryItem);

        // Chèn phần tử li vào danh sách lịch sử tìm kiếm
    if (searchHistoryList.firstChild) {
        // Nếu danh sách có phần tử đầu tiên, chèn phần tử li vào trước phần tử đầu tiên
        searchHistoryList.insertBefore(searchHistoryItem, searchHistoryList.firstChild);
    } else {
        // Nếu danh sách rỗng, thêm phần tử li vào cuối danh sách
        searchHistoryList.appendChild(searchHistoryItem);
    }
        // Xóa giá trị trong ô tìm kiếm sau khi thêm vào lịch sử
        searchInput.value = "";

         // Kiểm tra số lượng phần tử trong danh sách lịch sử
         const historyItems = searchHistoryList.querySelectorAll(".header__search-history-item");
         if (historyItems.length > 5) { // Thay đổi ngưỡng theo nhu cầu của bạn
            const lenght = document.querySelector(".header__search-history-list");
             lenght.style.overflowY = "scroll"; // Bật cuộn dọc
             lenght.style.height = "170px"
         }
    }
}




// let slideIndex = 0;
// let slideTimeout;

// // Function to show slides
// function showSlides() {
//   let slides = document.getElementsByClassName("mySlides");

//   for (let i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }

//   slideIndex++;

//   if (slideIndex > slides.length) {
//     slideIndex = 1;
//   }

//   slides[slideIndex - 1].style.display = "block";

//   slideTimeout = setTimeout(showSlides, 2000); // Show next slide after 2 seconds
// }

// // Function to stop the slideshow
// function stopSlides() {
//   clearTimeout(slideTimeout);
// }

// // Play button click event
// document.getElementById("playButton").addEventListener("click", function() {
//   showSlides(); // Start slideshow
//   document.getElementById("playButton").style.display = "none"; // Hide play button
//   document.getElementById("stopButton").style.display = "inline"; // Show stop button
// });

// // Stop button click event
// document.getElementById("stopButton").addEventListener("click", function() {
//   stopSlides(); // Stop slideshow
//   document.getElementById("stopButton").style.display = "none"; // Hide stop button
//   document.getElementById("playButton").style.display = "inline"; // Show play button
// });

// // Automatically start the slideshow when the page loads
// window.onload = function() {
//   showSlides(); // Start slideshow automatically when the page loads
//   document.getElementById("playButton").style.display = "none"; // Hide play button
//   document.getElementById("stopButton").style.display = "inline"; // Show stop button
// };




// Xử lý di chuyển ảnh
const productsRow = document.getElementById('productSlider');
const products = document.querySelectorAll('.main-item-product-sample');
const totalProducts = products.length;
const productsPerPage = 5; // Hiển thị 4 sản phẩm cùng lúc
const productWidth = 178; // 200px + 10px margin
let currentPosition = 0;
let isTransitioning = false; // Trạng thái đang chuyển đổi
// Sao chép các sản phẩm đầu vào cuối danh sách để tạo vòng lặp
function cloneProducts() {
    for (let i = 0; i < productsPerPage; i++) {
        const clone = products[i].cloneNode(true);
        productsRow.appendChild(clone);
    }
}
cloneProducts();

function updatePosition() {
    // Cập nhật vị trí của dãy sản phẩm
    productsRow.style.transition = 'transform 0.5s ease-in-out';
    productsRow.style.transform = `translateX(${-currentPosition * productWidth}px)`;
}

function moveLeft() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentPosition > 0) {
        currentPosition--;
    } else {
        // Nếu đã ở vị trí đầu, dịch chuyển đến vị trí sao chép cuối
        currentPosition = totalProducts;
        productsRow.style.transition = 'none'; // Tắt hiệu ứng để dịch nhanh
        productsRow.style.transform = `translateX(${-currentPosition * productWidth}px)`;
        
        setTimeout(() => {
            // Sau đó dịch chuyển tiếp đến vị trí trước sao chép
            currentPosition = totalProducts - 1;
            updatePosition();
        }, 20); // Delay một chút để không thấy sự thay đổi đột ngột
    }

    updatePosition();
    setTimeout(() => isTransitioning = false, 500); // Sau khi chuyển xong, cho phép tiếp tục (500ms là thời gian chuyển hiệu ứng)
}

function moveRight() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentPosition++;
    
    updatePosition();

    // Nếu đến vị trí cuối (sản phẩm sao chép), quay lại sản phẩm đầu tiên
    if (currentPosition === totalProducts) {
        setTimeout(() => {
            productsRow.style.transition = 'none'; // Tắt hiệu ứng để quay lại vị trí đầu
            currentPosition = 0;
            productsRow.style.transform = `translateX(0px)`;
        }, 500); // Delay một chút để kết thúc hiệu ứng trước khi quay lại đầu
    }

    setTimeout(() => isTransitioning = false, 500); // Sau khi chuyển xong, cho phép tiếp tục
}

// Xử lý khi bấm nút "left"
document.getElementById('leftBtn').addEventListener('click', function() {
    moveLeft();
});

// Xử lý khi bấm nút "right"
document.getElementById('rightBtn').addEventListener('click', function() {
    moveRight();
});