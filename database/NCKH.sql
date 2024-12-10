CREATE TABLE DacDiemXanh (
    MaDDX nchar(20) PRIMARY KEY,
    TenDDX nvarchar(100) NOT NULL UNIQUE, -- Tên đặc điểm phải duy nhất
    MoTaDDX nvarchar(max)
);

CREATE TABLE NhomSanPham (
    MaNhomSP nchar(20) PRIMARY KEY,
    TenNhomSP nvarchar(100) NOT NULL UNIQUE, -- Tên nhóm phải duy nhất
    MoTa nvarchar(max)
);
CREATE TABLE SanPham (
    MaSP nchar(20) PRIMARY KEY,
    MaNhomSP nchar(20) , -- Mã nhóm sản phẩm
    MaNguoiBan nchar(20) , -- Mã người bán
    TenSP nvarchar(100) ,
	Donvitinh nvarchar (20),
    DGBanMacDinh decimal(10, 2) CHECK (DGBanMacDinh >= 0), -- Giá bán không âm
    HinhChinh nvarchar(100),
    MoTa nvarchar(max)
);

CREATE TABLE PhienBanSanPham (
    MaPhienBan nchar(20) PRIMARY KEY,
    MaSP nchar(20) NOT NULL, -- Mã sản phẩm
    MaKM nchar(20), -- Mã khuyến mãi
    XuatXu nvarchar(50),
    KichThuoc nvarchar(30),
    MauSac nvarchar(30),
    KhoiLuong float CHECK (KhoiLuong > 0), -- Khối lượng lớn hơn 0
    DonGiaBan decimal(10, 2) NOT NULL CHECK (DonGiaBan >= 0), -- Giá bán không âm
    SoLuongTon int NOT NULL CHECK (SoLuongTon >= 0), -- Số lượng tồn không âm
    AnhPhienBan nvarchar(200)
);

CREATE TABLE CT_DDX (
    MaDDX nchar(20) NOT NULL, -- Mã đặc điểm xanh
    MaNguoiBan nchar(20) NOT NULL, -- Mã sản phẩm
    HinhDDX nvarchar(300), -- Hình minh họa đặc điểm xanh
    CoQuanCap nvarchar(150), -- Cơ quan cấp đặc điểm xanh
    PRIMARY KEY (MaDDX, MaSP) -- Khóa chính ghép
);
create table NguoiBan (
    MaNguoiBan nchar(20) primary key, -- Mã định danh người bán
    TenDangNhap nvarchar(50) not null unique, -- Tên đăng nhập
    MatKhau nvarchar(100) not null, -- Mật khẩu (cần mã hóa)
    HoUserCH nvarchar(30), -- Họ của đại diện
    TenUserCH nvarchar(30), -- Tên của đại diện
	GioiTinh nvarchar(10), -- Giới tính (Nam, Nữ, Khác)
    TenCuaHang nvarchar(100) not null, -- Tên cửa hàng
    DiaChi nvarchar(100), -- Địa chỉ kinh doanh
    SoDienThoai nvarchar(15), -- Số điện thoại liên hệ
    Email nvarchar(100) unique, -- Email liên hệ
    MaSoThue nchar(20), -- Mã số thuế 
	GiayPhepKD nvarchar(300),--link hình ảnh giấy phép
    NgayTao datetime not null default getdate(), -- Ngày tạo tài khoản
    TrangThai bit not null default 1, -- Trạng thái tài khoản (Hoạt động/Khóa)
	AnhLogo nvarchar(300),
	MoTaCH nvarchar(max) -- Mô tả cửa hàng
);
CREATE TABLE NguoiDung (
    MaUser int Identity(1,1) PRIMARY KEY,
	TenDangNhap nvarchar(50) UNIQUE, -- Tên đăng nhập không trùng lặp
    MatKhau nvarchar(100),
    HoUser nvarchar(50) ,
    TenUser nvarchar(30) ,
	GioiTinh nvarchar(10), -- Giới tính (Nam, Nữ, Khác)
    NgayTao datetime  DEFAULT GETDATE(),
    TinhTrangUser bit DEFAULT 1,
    SoDienThoai nvarchar(15) , -- Định dạng số điện thoại
    DiaChi nvarchar(150),
    Email nvarchar(100)  -- Định dạng email hợp lệ
);
CREATE TABLE DanhGiaSanPham (
    MaPhienBan nchar(20) NOT NULL, -- ID phiên bản sản phẩm
    MaUser nchar(20) NOT NULL, -- ID người dùng đánh giá
    DiemDanhGia int CHECK (DiemDanhGia BETWEEN 1 AND 5), -- Điểm đánh giá từ 1 đến 5
    NDDanhGia text, -- Nội dung đánh giá (có thể để trống)
    NgayDanhGia datetime  DEFAULT GETDATE(), -- Ngày đánh giá, mặc định là ngày hiện tại
    HinhDanhGia nvarchar(300), -- Đường dẫn hình ảnh đánh giá (nếu có)
    VideoDanhGia nvarchar(300), -- Đường dẫn video đánh giá (nếu có)
    PRIMARY KEY (MaPhienBan, MaUser) -- Khóa chính
);




CREATE TABLE PhuongThucVanChuyen (
    MaPTVC nchar(20) PRIMARY KEY, -- Mã phương thức vận chuyển
    TenPTVC nvarchar(50) NOT NULL, -- Tên phương thức
    PhiVC int NOT NULL CHECK (PhiVC >= 0), -- Phí vận chuyển (>= 0)
    ThoiGianGH nvarchar(50) NOT NULL -- Thời gian giao hàng
);

CREATE TABLE PhuongThucThanhToan (
    MaPTTT nchar(20) PRIMARY KEY, -- Mã phương thức thanh toán
    TenPTTT nvarchar(100) NOT NULL, -- Tên phương thức thanh toán
    MoTaPTTT nvarchar(300) -- Mô tả phương thức
);
CREATE TABLE KhuyenMai (
    MaKM nchar(20) PRIMARY KEY, -- Mã khuyến mãi
    MaNguoiBan nchar(20) NOT NULL, -- Mã người bán
    TenKM nvarchar(50) NOT NULL, -- Tên chương trình khuyến mãi
    NoiDungKM nvarchar(400), -- Nội dung chi tiết khuyến mãi
    GiaGiam float CHECK (GiaGiam >= 0), -- Phần trăm giảm (>= 0)
    TienGiam float CHECK (TienGiam >= 0), -- Số tiền giảm trực tiếp (>= 0)
    NgayBatDau datetime , -- Ngày bắt đầu
    NgayKetThuc datetime  -- Ngày kết thúc 
);
CREATE TABLE DonHang (
    MaDH nchar(20) PRIMARY KEY,
    MaUser nchar(20) , -- Mã người dùng
    MaPTVC nchar(20) , -- Mã phương thức vận chuyển
    MaPTTT nchar(20) , -- Mã phương thức thanh toán
    MaNguoiBan nchar(20) , -- Mã người bán
    NgayDatHang datetime  DEFAULT GETDATE(),
    TrangThaiDH nvarchar(30)  CHECK (TrangThaiDH IN (N'Chờ xác nhận', N'Chờ lấy hàng', N'Đang giao', N'Đã giao', N'Trả hàng/ Hoàn tiền/ Hủy'))
);

CREATE TABLE CTDH (
    MaPhienBan nchar(20) NOT NULL, -- Mã phiên bản sản phẩm
    MaDH nchar(20) NOT NULL, -- Mã đơn hàng
    SoLuongSP int NOT NULL CHECK (SoLuongSP > 0), -- Số lượng sản phẩm (> 0)
    PRIMARY KEY (MaPhienBan, MaDH) -- Khóa chính ghép
);

CREATE TABLE GioHang (
    MaUser nchar(20) NOT NULL, -- Mã người dùng
    MaGioHang nchar(20) NOT NULL, -- Mã giỏ hàng
    NgayTaoGio datetime DEFAULT GETDATE(), -- Ngày tạo giỏ, mặc định ngày hiện tại
    PRIMARY KEY (MaUser, MaGioHang) -- Khóa chính ghép
);


CREATE TABLE SanPhamTrongGio (
    MaUser nchar(20) NOT NULL, -- Người sở hữu giỏ hàng
    MaGioHang nchar(20) NOT NULL, -- Giỏ hàng
    MaPhienBan nchar(20) NOT NULL, -- Sản phẩm phiên bản
    SoLuongSPTrongGio int  CHECK (SoLuongSPTrongGio > 0), -- Số lượng phải lớn hơn 0
    PRIMARY KEY (MaUser, MaGioHang, MaPhienBan)
);
CREATE TABLE BaiVietNguoiBan (
    MaBaiViet nchar(20) PRIMARY KEY, -- ID bài viết
    MaNguoiBan nchar(20) , -- Người bán tạo bài viết
    TieuDe nvarchar(200), -- Tiêu đề bài viết
    NoiDung text , -- Nội dung bài viết
    NgayDang datetime  DEFAULT GETDATE(), -- Ngày đăng bài
    HienThi bit DEFAULT 1 -- Trạng thái hiển thị bài viết
);

CREATE TABLE BinhLuan (
    MaUser nchar(20) NOT NULL, -- Người bình luận
    MaBaiViet nchar(20) NOT NULL, -- Bài viết được bình luận
    NoiDung text , -- Nội dung bình luận
    NgayBinhLuan datetime DEFAULT GETDATE(), -- Ngày bình luận
    PRIMARY KEY (MaUser, MaBaiViet)
);
CREATE TABLE Chat (
    MaNguoiBan nchar(20) NOT NULL, -- Người bán tham gia chat
    MaUser nchar(20) NOT NULL, -- Người dùng tham gia chat
    NoiDung text , -- Nội dung tin nhắn
    ThoiGian datetime  DEFAULT GETDATE(), -- Thời gian gửi tin nhắn
    PRIMARY KEY (MaNguoiBan, MaUser) -- Đảm bảo duy nhất cho mỗi tin nhắn
);