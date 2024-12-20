
      //XU LY THEO DOI
      // Bộ lưu trạng thái các người bán đã theo dõi (client-side)
      const followedSellers = new Set();

      // Hàm toggle (bật/tắt) theo dõi
      function toggleFollowSeller(event, sellerId) {
          event.preventDefault(); // Ngăn điều hướng mặc định

          // Xác định nút hiện tại và icon theo dõi
          const followButton = event.target.closest('.follow-button');
          const followIcon = followButton.querySelector('.follow-icon');

          // Kiểm tra trạng thái theo dõi hiện tại
          if (followedSellers.has(sellerId)) {
              // Nếu đang theo dõi, hủy theo dõi
              followIcon.style.display = 'none';
              followButton.classList.remove('following');
              followButton.textContent = 'Theo dõi ';
              followButton.appendChild(followIcon); // Đảm bảo icon vẫn ở cuối
              followedSellers.delete(sellerId); // Xóa khỏi danh sách theo dõi

              // Gửi yêu cầu hủy theo dõi đến server
              unfollowSeller(sellerId);
          } else {
              // Nếu chưa theo dõi, bật theo dõi
              followIcon.style.display = 'inline';
              followButton.classList.add('following');
              followButton.textContent = 'Đang theo dõi ';
              followButton.appendChild(followIcon); // Đảm bảo icon vẫn ở cuối
              followedSellers.add(sellerId); // Thêm vào danh sách theo dõi

              // Gửi yêu cầu theo dõi đến server
              followSeller(sellerId);
          }
      }

// Hàm gửi yêu cầu theo dõi tới server
function followSeller(sellerId) {
    fetch('/api/follow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sellerId: sellerId }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log(`Đang theo dõi người bán với ID: ${sellerId}`);
        } else {
            console.error('Không thể theo dõi người bán');
        }
    })
    .catch(error => {
        console.error('Lỗi khi gửi yêu cầu theo dõi:', error);
    });
}

// Hàm gửi yêu cầu hủy theo dõi tới server
function unfollowSeller(sellerId) {
    fetch('/api/unfollow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sellerId: sellerId }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log(`Đã hủy theo dõi người bán với ID: ${sellerId}`);
        } else {
            console.error('Không thể hủy theo dõi người bán');
        }
    })
    .catch(error => {
        console.error('Lỗi khi gửi yêu cầu hủy theo dõi:', error);
    });
}

      // Xu ly an bai post
      function closePost(postId) {
          // Tìm bài viết dựa trên ID
          const postElement = document.querySelector(`.blog-post-1[data-post-id="${postId}"]`);
          if (postElement) {
              // Ẩn bài viết bằng cách thêm class hoặc xóa khỏi DOM
              postElement.style.display = 'none'; // Ẩn bài viết
              // postElement.remove(); // Hoặc xóa bài viết khỏi DOM
          }
      }



      // Xu ly dong - mo popup
      const input = document.querySelector('.blog-input');
      const popup = document.getElementById('createPostPopup');
      const overlay = document.getElementById('overlay');
      const closeIcon = document.getElementById('close-icon');

      // Hiển thị popup và overlay khi click vào input
        input.addEventListener('click', async () => {
            try {
                // Gửi yêu cầu đến server để kiểm tra trạng thái đăng nhập người dùng
                const response = await fetch('/check-login-status');

                if (response.status === 401) {
                    // Nếu chưa đăng nhập, hiển thị thông báo
                    alert('Bạn cần đăng nhập để sử dụng tính năng này.');
                } else {
                    // Nếu đã đăng nhập, hiển thị popup
                    popup.classList.add('active-popup');
                    overlay.classList.add('active-popup');
                }
            } catch (error) {
                console.error('Lỗi khi kiểm tra đăng nhập:', error);
            }
        });


     
      // Đóng popup khi click vào icon đóng
      closeIcon.addEventListener('click', () => {
          popup.classList.remove('active-popup');
          overlay.classList.remove('active-popup');
      });

      // Đóng popup khi click vào overlay
      overlay.addEventListener('click', () => {
          popup.classList.remove('active-popup');
          overlay.classList.remove('active-popup');
      });




      function postContent(postId) {
          // Lấy nội dung từ textarea
          const contentInput = document.getElementById("contentInput").value;

          // Thay thế ký tự xuống dòng (\n) bằng <br>
          const formattedContent = contentInput.replace(/\n/g, "<br>");

          // Lấy thẻ có id="content-" + postId
          const contentDisplay = document.getElementById("content-" + postId);
          if (contentDisplay) {
              // Gắn nội dung đã định dạng vào thẻ
              contentDisplay.innerHTML = formattedContent;
          }
      }

      // Gọi hàm với id cụ thể của mỗi bài viết
      postContent('<%= forum.MaPost %>');


      // Xử lý cho "Xem thêm" khi bài viết quá dài
      function showFullContent(postId) {
          const contentElement = document.getElementById(`content-${postId}`);
          if (contentElement) {
              // Lấy nội dung đầy đủ từ thuộc tính data
              const fullContent = contentElement.getAttribute("data-full-content");
              if (fullContent) {
                  contentElement.textContent = fullContent; // Hiển thị nội dung đầy đủ
              }
          }

          // Ẩn nút "Xem thêm"
          const button = document.querySelector(`button[data-post-id="${postId}"]`);
          if (button) {
              button.style.display = "none";
          }
      }




      // XU LY SU KIEN ADD HAGTAG #EVENT
      function addHashtagToTextarea() {
        const textarea = document.getElementById('contentInput');
        
        // Thêm hashtag #event vào vị trí con trỏ
        const cursorPosition = textarea.selectionStart; // Lấy vị trí con trỏ hiện tại
        const textBefore = textarea.value.substring(0, cursorPosition);
        const textAfter = textarea.value.substring(cursorPosition);

        // Chèn hashtag vào nội dung của textarea
        textarea.value = textBefore + '#event' + textAfter;

        // Đặt lại con trỏ sau nội dung vừa chèn
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = cursorPosition + '#event'.length;
      }

      // XU LY SU KIEN ACTIVE AUDIENCE
      // Lấy tất cả các mục trong danh sách
      const listItems = document.querySelectorAll('.list li');
      const privacyIcon = document.querySelector('.content .privacy i:first-child');
      const privacyText = document.querySelector('.content .privacy span');

      // Xử lý sự kiện click
      listItems.forEach(item => {
        item.addEventListener('click', () => {
          // Xóa trạng thái 'active' khỏi các mục
          listItems.forEach(i => i.classList.remove('active'));

          // Thêm 'active' cho mục được click
          item.classList.add('active');

          // Lấy icon (class) từ thẻ <i> và text từ thẻ <p>
          const newIcon = item.querySelector('.icon i').className; // Lấy class của <i>
          const newText = item.querySelector('.details p').textContent; // Lấy nội dung của <p>

          // Cập nhật icon và text trong phần hiển thị
          privacyIcon.className = newIcon; // Thay đổi class của icon
          privacyText.textContent = newText; // Thay đổi nội dung text
        });
      });





      // XU LY HIEN THI EMOJI
      // Hàm để hiển thị hoặc ẩn bảng emoji
      function toggleEmojiPicker() {
          const emojiPicker = document.getElementById("emojiPicker");
          const displayStyle = emojiPicker.style.display;

          // Chuyển đổi giữa hiển thị và ẩn bảng emoji
          emojiPicker.style.display = displayStyle === "block" ? "none" : "block";
      }

      // Hàm để chọn emoji và chèn vào textarea
      function selectEmoji(emoji) {
      const contentInput = document.getElementById("contentInput");
      contentInput.value += emoji; // Thêm emoji vào cuối văn bản hiện tại trong textarea

      // Đóng bảng emoji sau khi chọn
      document.getElementById("emojiPicker").style.display = "none";
    }


      // XU LY LIKE ACTION
    // Hàm xử lý khi người dùng click vào Like
    async function toggleLike(spanElement) {
    const postId = spanElement.getAttribute('data-post-id'); // Lấy ID bài viết từ data attribute
    const disLikeIcon = spanElement.querySelector('.dis-like-icon');
    const likeIcon = spanElement.querySelector('.like-icon');
    const likeCountSpan = spanElement.closest('.blog-post-react').previousElementSibling.querySelector('.blog-post-react-like-num');
    
    let likeCount = parseInt(likeCountSpan.textContent) || 0;
    const isLike = disLikeIcon.style.display === 'inline'; // Kiểm tra trạng thái like (hiển thị like icon hay chưa)

    // Cập nhật giao diện (ẩn/hiện icon và cập nhật số lượt thích)
    if (isLike) {
        disLikeIcon.style.display = 'none';
        likeIcon.style.display = 'inline';
        likeCount++;
    } else {
        likeIcon.style.display = 'none';
        disLikeIcon.style.display = 'inline';
        likeCount = Math.max(0, likeCount - 1);
    }

    // Cập nhật số lượt thích trên giao diện
    likeCountSpan.textContent = `${likeCount} Thích`;

    // Gửi yêu cầu POST tới server để cập nhật trạng thái like cho bài viết
    try {
        const response = await fetch('/api/updateLike', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId: postId,
                like: isLike // true nếu like, false nếu unlike
            })
        });

        const data = await response.json();
        if (!data.success) {
            console.error('Cập nhật like thất bại:', data.message);
        }
    } catch (error) {
        console.error('Lỗi kết nối:', error);
    }
}

      // Hàm gửi yêu cầu "like/unlike" lên server
    function sendLikeRequest(postId, isLike) {
      fetch(`/updateLike?postId=${postId}&like=${isLike}`, {
          method: 'POST'
      })
      .then(response => response.json())
      .then(data => {
          if (!data.success) {
              console.error('Không thể cập nhật trạng thái like:', data.message);
          }
      })
      .catch(error => console.error('Lỗi:', error));
  }
      
      // Hàm hiển thị khung chèn ảnh/video
    function showMediaUpload() {
      // Hiển thị khung chèn ảnh/video nhưng không kích hoạt input file
      const mediaUpload = document.getElementById('mediaUpload');
      mediaUpload.style.display = 'block';

      // Tăng chiều cao của thẻ cha .container-createPost
      const container = document.querySelector('.container-createPost');
      container.style.height = '600px'; // Thay đổi chiều cao từ 400px lên 600px
      }

    // Hàm xử lý khi người dùng click vào camera icon
    function triggerFileInput(type) {
      // Hiển thị khung chèn ảnh/video
      document.getElementById('mediaUpload').style.display = 'block';

      // Tăng chiều cao của thẻ cha .container-createPost
      const container = document.querySelector('.container-createPost');
      container.style.height = '600px'; // Thay đổi chiều cao từ 400px lên 600px

      // Kích hoạt sự kiện click trên input file (chỉ khi click vào camera)
      document.getElementById('fileInput').click();
    }

    function handleFileSelect(event) {
        const file = event.target.files[0]; // Lấy file từ input
        const imagePreviewContainer = document.getElementById('imagePreviewContainer'); // Container preview
        const imagePreview = document.getElementById('imagePreview'); // Thẻ <img> để hiển thị ảnh
        const mediaUpload = document.querySelector('.media-upload'); // Phần tử mediaUpload

        if (file) {
            const reader = new FileReader();

            reader.onload = function(e) {
                // Đặt nguồn của ảnh là dữ liệu đã đọc
                imagePreview.src = e.target.result;

                // Hiển thị container preview và ẩn media-upload
                imagePreviewContainer.style.display = 'block';
                mediaUpload.style.display = 'none';
            };

            reader.readAsDataURL(file); // Đọc file dưới dạng URL
        } else {
            // Nếu không có file, hiển thị lại media-upload và ẩn preview
            imagePreviewContainer.style.display = 'none';
            mediaUpload.style.display = 'flex';
        }
    }




      // Lấy các phần tử DOM
      const uploadIcon = document.getElementById('uploadIcon');
      const fileInput = document.getElementById('fileInput');

      // Thêm sự kiện click vào biểu tượng tải lên
      uploadIcon.addEventListener('click', () => {
        // Kích hoạt input file khi người dùng nhấn vào biểu tượng camera
        triggerFileInput();
      });

      // Lắng nghe sự kiện khi người dùng chọn file
      fileInput.addEventListener('change', handleFileSelect);


      // Xử lý hiện pop-up
      document.addEventListener('DOMContentLoaded', () => {
      const input = document.querySelector('.blog-input');
      const popup = document.getElementById('createPostPopup');
      const overlay = document.getElementById('overlay');

    //   // Hiển thị popup và overlay khi click vào input
    //   input.addEventListener('click', () => {
    //     popup.classList.add('active-popup');
    //     overlay.classList.add('active-popup');
    //   });

    //   // Ẩn popup và overlay khi click vào overlay
    //   overlay.addEventListener('click', () => {
    //     popup.classList.remove('active-popup');
    //     overlay.classList.remove('active-popup');
    //   });
    // });


      const container = document.querySelector(".container-createPost"),
      privacy = container.querySelector(".post .privacy"),
      arrowBack = container.querySelector(".audience .arrow-back");
      privacy.addEventListener("click", () => {
        container.classList.add("active");
      });
      arrowBack.addEventListener("click", () => {
        container.classList.remove("active");
      });

     
    
      
    
    



    // Hàm hiển thị bài viết mới
    // Hàm hiển thị bài viết mới lên đầu
    function addNewPost(post) {
    const postList = document.querySelector('#postList');
    const newPost = document.createElement('div');
    newPost.className = 'blog-post-1';
    newPost.innerHTML = `
        <div class="blog-post-item-1">
            <img 
                class="header-service-item-avatar-img" 
                src="${post.AnhLogo || '../image/avatar.jpg'}" 
                alt="Avatar" 
                style="margin-left: 20px;">
            <span class="blog-post-contact-name">
                <a href="#">${post.TenCuaHang}</a>
                <a href="#" style="padding-left: 30px; color: rgb(30, 30, 204);">
                    Theo dõi 
                    <i class="fa-solid fa-circle-check" style="margin-left: 3px;"></i>
                </a>
            </span>
            <div class="blog-noidung">${post.NoiDung}</div>
            ${post.Video ? `
                <div class="blog-post-video">
                    <iframe width="100%" height="315" src="${post.Video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            ` : post.HinhAnh ? `
                <div class="blog-post-image">
                    <img class="blog-post-img" src="${post.HinhAnh}" alt="Post Image">
                </div>
            ` : ''}
            <div class="blog-post-react-count">
                <div class="blog-post-react-count-sp">
                    <i class="fa-solid fa-heart" style="color: red;"></i>
                    <i class="fa-solid fa-thumbs-up" style="color: blue;"></i>
                    <i class="fa-regular fa-face-smile" style="color: orange;"></i>
                </div>
                <div class="blog-post-react-count-num">
                    <span>${post.SoLuotThich || 0} Thích</span>
                    <span style="margin-left: 15px;">${post.SoLuotBinhLuan || 0} Bình luận</span>
                </div>
            </div>
            <div class="blog-post-react row" style="padding-top: 10px;">
                <span class="blog-post-react-like col-md-6">
                    <i class="fa-regular fa-heart" style="padding-right: 10px;"></i>Like
                </span>
                <span class="blog-post-react-cmt col-md-6">
                    <i class="fa-regular fa-comment" style="padding-right: 10px;"></i>Comment
                </span>
            </div>
        </div>
    `;
        // Thêm bài viết mới vào đầu danh sách
        postList.prepend(newPost);
}});


