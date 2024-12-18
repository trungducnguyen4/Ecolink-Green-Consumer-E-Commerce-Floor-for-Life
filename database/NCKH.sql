CREATE TABLE NhomSanPham (
    MaNhomSP nchar(20) PRIMARY KEY,
    TenNhomSP nvarchar(100) NOT NULL UNIQUE, -- Tên nhóm phải duy nhất
    MoTa nvarchar(max)
);


CREATE TABLE SanPham (
    MaSP nchar(20) PRIMARY KEY,
    MaNhomSP nchar(20) , -- Mã nhóm sản phẩm
    MaNguoiBan nchar(20) , -- Mã người bán
    TenSP nvarchar(200) ,
	SoLuongTon int,
    DGBanMacDinh decimal(10, 2) CHECK (DGBanMacDinh >= 0), -- Giá bán không âm
    HinhChinh nvarchar(100),
    MoTa nvarchar(max)
);

CREATE TABLE DacDiemXanh (
    MaDDX nchar(20) PRIMARY KEY,
    TenDDX nvarchar(100) NOT NULL UNIQUE, -- Tên đặc điểm phải duy nhất
    MoTaDDX nvarchar(max)
);


CREATE TABLE CT_DDX (
    MaDDX nchar(20) NOT NULL, -- Mã đặc điểm xanh
    MaNguoiBan nchar(20) NOT NULL, -- Mã sản phẩm
    HinhDDX nvarchar(300), -- Hình minh họa đặc điểm xanh
    CoQuanCap nvarchar(150), -- Cơ quan cấp đặc điểm xanh
    PRIMARY KEY (MaDDX, MaNguoiBan) -- Khóa chính ghép
);

CREATE TABLE DanhGiaSanPham (
    MaSP nchar(20) NOT NULL, -- ID phiên bản sản phẩm
    MaSP nchar(20) NOT NULL, -- ID phiên bản sản phẩm
    MaUser nchar(20) NOT NULL, -- ID người dùng đánh giá
    DiemDanhGia int CHECK (DiemDanhGia BETWEEN 1 AND 5), -- Điểm đánh giá từ 1 đến 5
    NDDanhGia text, -- Nội dung đánh giá (có thể để trống)
    NgayDanhGia datetime  DEFAULT GETDATE(), -- Ngày đánh giá, mặc định là ngày hiện tại
    HinhDanhGia nvarchar(300), -- Đường dẫn hình ảnh đánh giá (nếu có)
    VideoDanhGia nvarchar(300), -- Đường dẫn video đánh giá (nếu có)
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
    Email nvarchar(100),  -- Định dạng email hợp lệ
	Avatar NVARCHAR(300)
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
    PhanTramGiam float CHECK (PhanTramGiam >= 0), -- Phần trăm giảm (>= 0)
    NgayBatDau datetime , -- Ngày bắt đầu
    NgayKetThuc datetime,  -- Ngày kết thúc
	DieuKienGiam decimal(10, 2) --Giá trị đơn hàng tối thiểu để được giảm
);

CREATE TABLE DonHang (
    MaDH nchar(20) PRIMARY KEY,
    MaUser nchar(20) , -- Mã người dùng
    MaPTVC nchar(20) , -- Mã phương thức vận chuyển
    MaPTTT nchar(20) , -- Mã phương thức thanh toán
    MaNguoiBan nchar(20) , -- Mã người bán
    NgayDatHang datetime  DEFAULT GETDATE(),
	MaKM nchar(20),--MaKhuyenMai
	PhanTramGiam float CHECK (PhanTramGiam >= 0), -- Phần trăm giảm (>= 0)
	TongTien decimal(10, 2), --Tổng tiền sau khi trừ khuyến mãi
    TrangThaiDH nvarchar(30)  CHECK (TrangThaiDH IN (N'Chờ xác nhận', N'Chờ lấy hàng', N'Đang giao', N'Đã giao', N'Trả hàng/ Hoàn tiền/ Hủy')),
	YeuCauDacBiet nvarchar(255)--Yêu cầu cho người bán khi mua nếu có
);

CREATE TABLE CTDH (
    MaSP nchar(20) NOT NULL, -- Mã  sản phẩm
    MaDH nchar(20) NOT NULL, -- Mã đơn hàng
    SoLuongSP int NOT NULL CHECK (SoLuongSP > 0), -- Số lượng sản phẩm (> 0)
    PRIMARY KEY (MaSP, MaDH) -- Khóa chính ghép
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
    MaSP nchar(20) NOT NULL, -- Sản phẩm phiên bản
    SoLuongSPTrongGio int  CHECK (SoLuongSPTrongGio > 0), -- Số lượng phải lớn hơn 0
    PRIMARY KEY (MaUser, MaGioHang, MaSP)
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
select * from SanPham
-- Insert vào GioHang
INSERT INTO GioHang (MaUser, MaGioHang, NgayTaoGio)
VALUES ('1', 'GH01000001', GETDATE());

-- Insert sản phẩm vào SanPhamTrongGio
INSERT INTO SanPhamTrongGio (MaUser, MaGioHang, MaSP, SoLuongSPTrongGio)
VALUES ('1', 'GH01000001', 'SP01000001', 2);
select * from SanPham

CREATE PROCEDURE AddToCart
    @MaUser nchar(20),
    @MaSP nchar(20),
    @SoLuong int,
    @ProductPrice decimal(10, 2)
AS
BEGIN
    DECLARE @MaGioHang nchar(20);
    DECLARE @ExistingQuantity int;

    -- Check if the user already has a cart
    SELECT @MaGioHang = MaGioHang
    FROM GioHang
    WHERE MaUser = @MaUser;

    -- If the user does not have a cart, create one
    IF @MaGioHang IS NULL
    BEGIN
        SET @MaGioHang = 'GH' + RIGHT('00000000' + CAST((SELECT ISNULL(MAX(CAST(SUBSTRING(MaGioHang, 3, 8) AS int)), 0) + 1 FROM GioHang) AS varchar), 8);
        INSERT INTO GioHang (MaUser, MaGioHang, NgayTaoGio)
        VALUES (@MaUser, @MaGioHang, GETDATE());
    END

    -- Check if the product is already in the cart
    SELECT @ExistingQuantity = SoLuongSPTrongGio
    FROM SanPhamTrongGio
    WHERE MaUser = @MaUser AND MaGioHang = @MaGioHang AND MaSP = @MaSP;

    -- If the product is already in the cart, update the quantity
    IF @ExistingQuantity IS NOT NULL
    BEGIN
        UPDATE SanPhamTrongGio
        SET SoLuongSPTrongGio = @ExistingQuantity + @SoLuong
        WHERE MaUser = @MaUser AND MaGioHang = @MaGioHang AND MaSP = @MaSP;
    END
    ELSE
    BEGIN
        -- If the product is not in the cart, add it
        INSERT INTO SanPhamTrongGio (MaUser, MaGioHang, MaSP, SoLuongSPTrongGio)
        VALUES (@MaUser, @MaGioHang, @MaSP, @SoLuong);
    END
END;
INSERT INTO NguoiBan (
    MaNguoiBan, TenDangNhap, MatKhau, HoUserCH, TenUserCH, GioiTinh, 
    TenCuaHang, DiaChi, SoDienThoai, Email, MaSoThue, GiayPhepKD, 
    NgayTao, TrangThai, AnhLogo, MoTaCH
)
VALUES (
    N'NB001', 
    N'nguoiban123', 
    N'hashed_password', 
    N'Nguyen', 
    N'An', 
    N'Nam', 
    N'CH Tạp Hóa An Bình', 
    N'123 Đường ABC, Quận 1, TP.HCM', 
    N'0987654321', 
    N'anbinh@gmail.com', 
    N'123456789', 
    N'https://example.com/giayphep.png', 
    GETDATE(), 
    1, 
    N'https://example.com/logo.png', 
    N'Cửa hàng chuyên cung cấp các mặt hàng tạp hóa, nhu yếu phẩm.'
);
INSERT INTO KhuyenMai (
    MaKM, MaNguoiBan, TenKM, NoiDungKM, PhanTramGiam, 
    NgayBatDau, NgayKetThuc, DieuKienGiam
)
VALUES (
    N'KM001',
    N'NB001',
    N'Khuyến mãi Tết 2024',
    N'Giảm 10% cho các đơn hàng từ 500,000 VNĐ trở lên.',
    10,
    '2024-01-01',
    '2024-01-31',
    500000.00
);

INSERT INTO KhuyenMai (
    MaKM, MaNguoiBan, TenKM, NoiDungKM, PhanTramGiam, 
    NgayBatDau, NgayKetThuc, DieuKienGiam
)
VALUES (
    N'KM002',
    N'NB001',
    N'Khuyến mãi Tết 2024',
    N'Giảm 10% cho các đơn hàng từ 500,000 VNĐ trở lên.',
    10,
    '2024-01-01',
    '2024-12-31',
    100000.00
);
select * from KhuyenMai