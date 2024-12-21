

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

CREATE TABLE NhomSanPham (
    MaNhomSP nchar(20) PRIMARY KEY,
    TenNhomSP nvarchar(100) NOT NULL UNIQUE, -- Tên nhóm phải duy nhất
    MoTa nvarchar(max)
);

delete SanPham
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
    MaUser nchar(20) Identity(1,1) PRIMARY KEY,
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
    MaSP nchar(20) NOT NULL, -- ID phiên bản sản phẩm
    MaUser nchar(20) NOT NULL, -- ID người dùng đánh giá
    DiemDanhGia int CHECK (DiemDanhGia BETWEEN 1 AND 5), -- Điểm đánh giá từ 1 đến 5
    NDDanhGia text, -- Nội dung đánh giá (có thể để trống)
    NgayDanhGia datetime  DEFAULT GETDATE(), -- Ngày đánh giá, mặc định là ngày hiện tại
    HinhDanhGia nvarchar(300), -- Đường dẫn hình ảnh đánh giá (nếu có)
    VideoDanhGia nvarchar(300), -- Đường dẫn video đánh giá (nếu có)
    PRIMARY KEY (MaSP, MaUser) -- Khóa chính
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
    MaDH nchar(20) PRIMARY KEY,            -- Mã đơn hàng
    MaUser nchar(20) NOT NULL,             -- Mã khách hàng

    NgayDatHang datetime NOT NULL,         -- Ngày đặt hàng
    TongPhiVC decimal(10, 2) DEFAULT 0,    -- Tổng phí vận chuyển (tính từ phí vận chuyển)
    TongGiamGia decimal(10, 2) DEFAULT 0,  -- Tổng giảm giá cho đơn hàng (có thể tính được từ tổng tiền *% giảm)
    TongThanhToan decimal(10, 2) DEFAULT 0,-- Tổng số tiền phải thanh toán (có thể có hoặc không tại tính được từ số lượng nhân đơn giá) (nếu để thì sẽ bị vi phạm dạng chuẩn)
    TrangThai nvarchar(50) NOT NULL,       -- Trạng thái đơn hàng (chờ xác nhận, đang giao, đã nhận)
    FOREIGN KEY (MaUser) REFERENCES NguoiDung(MaUser)
);

CREATE TABLE CTDH (
    MaSP nchar(20) NOT NULL,             -- Mã sản phẩm
    MaDH nchar(20) NOT NULL,             -- Mã đơn hàng
    MaNguoiBan nchar(20) NOT NULL,       -- Mã người bán
    MaPTVC nchar(20) NOT NULL,           -- Mã phương thức vận chuyển
    MaKM nchar(20),                      -- Mã khuyến mãi áp dụng
    SoLuongSP int NOT NULL CHECK (SoLuongSP > 0), -- Số lượng sản phẩm
    DonGia decimal(10, 2) NOT NULL,      -- Đơn giá sản phẩm tại thời điểm mua
    PhiVanChuyen decimal(10, 2) DEFAULT 0, -- Phí vận chuyển cho từng sản phẩm
    GiamGia decimal(10, 2) DEFAULT 0,    -- Số tiền giảm giá
    ThanhTien AS (SoLuongSP * DonGia - GiamGia + PhiVanChuyen), -- Thành tiền
    PRIMARY KEY (MaSP, MaDH),
    FOREIGN KEY (MaSP) REFERENCES SanPham(MaSP),
    FOREIGN KEY (MaDH) REFERENCES DonHang(MaDH),
    FOREIGN KEY (MaNguoiBan) REFERENCES NguoiBan(MaNguoiBan),
    FOREIGN KEY (MaPTVC) REFERENCES PhuongThucVanChuyen(MaPTVC),
    FOREIGN KEY (MaKM) REFERENCES KhuyenMai(MaKM)
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

Create TABLE BaiPost (
    MaPost INT IDENTITY(1,1) PRIMARY KEY, 
    TenPost nvarchar(255), 
    NoiDung nvarchar(max), 
    ThoiGianDang datetime DEFAULT GETDATE(), 
    TenDangNhap nvarchar(50),
	LoaiNguoiDang nvarchar(20),
    SoLuotThich int DEFAULT 0, 
    SoLuotBinhLuan int DEFAULT 0,
    HinhAnh nvarchar(500), 
    Video nvarchar(500),
    TrangThai bit DEFAULT 1,
);


CREATE TABLE BinhLuan (
    TenDangNhap nvarchar(50),
    MaPost nchar(20) NOT NULL, -- Bài viết được bình luận
    NoiDung text , -- Nội dung bình luận
    NgayBinhLuan datetime DEFAULT GETDATE(), -- Ngày bình luận
    PRIMARY KEY (TenDangNhap, MaPost)
);

CREATE TABLE Chat (
    MaNguoiBan nchar(20) NOT NULL, -- Người bán tham gia chat
    MaUser int NOT NULL, -- Người dùng tham gia chat
    NoiDung text , -- Nội dung tin nhắn
    ThoiGian datetime  DEFAULT GETDATE(), -- Thời gian gửi tin nhắn
    PRIMARY KEY (MaNguoiBan, MaUser) -- Đảm bảo duy nhất cho mỗi tin nhắn
);

-- TABLE "Trang thai bai viet"
Go
Create TABLE TrangThai (
    MaTrangThai nchar(20) PRIMARY KEY,
    TenTrangThai NVARCHAR(50) NOT NULL -- Ví d?: Ðã dang, Ch? duy?t, B?n nháp
);
--TABLE "Danh muc Blog"
Go
CREATE TABLE DanhMucBlog (
    MaDanhMuc nchar(20) PRIMARY KEY,
    TenDanhMuc NVARCHAR(100) NOT NULL,
    MoTa NVARCHAR(255)
);
-- TABLE "BÀI BLOG"
Go
CREATE TABLE BaiBlog (
    MaBaiBlog int IDENTITY(1,1) PRIMARY KEY, 
    TieuDe NVARCHAR(200) NOT NULL,          
    NoiDung NVARCHAR(MAX) NOT NULL,
	AnhBia nvarchar(500),
    MaDanhMuc NCHAR(20),                         
    MaTrangThai NCHAR(20),                        
    MaNguoiBan NCHAR(20),                   
    NgayTao DATETIME DEFAULT GETDATE(),    
    NgayCapNhat DATETIME DEFAULT GETDATE(),
	Nguon nvarchar(255),
    FOREIGN KEY (MaDanhMuc) REFERENCES DanhMucBlog(MaDanhMuc), 
    FOREIGN KEY (MaNguoiBan) REFERENCES NguoiBan(MaNguoiBan),  
    FOREIGN KEY (MaTrangThai) REFERENCES TrangThai(MaTrangThai) 
);


--Follow
CREATE TABLE Follow (
    TenDangNhap nvarchar(50) Not null,
    TenDangNhapDuocTheoDoi nvarchar(50) NOT NULL,  -- Mã người bán bị theo dõi (Followed Seller ID)
    NgayTheoDoi DATETIME DEFAULT GETDATE(),  -- Ngày theo dõi
    PRIMARY KEY (TenDangNhap , TenDangNhapDuocTheoDoi),
   );


select * from SanPham
-- Insert vào GioHang
INSERT INTO GioHang (MaUser, MaGioHang, NgayTaoGio)
VALUES ('1', 'GH01000001', GETDATE());
alter table BaiBlog
add Nguon nvarchar(255); -- Cột Nguon để lưu thông tin nguồn

--Follow
CREATE TABLE Follow (
    MaNguoiBan nchar(20) NOT NULL,  -- Mã người bán (Seller ID)
    MaNguoiBanTheoDoi nchar(20) NOT NULL,  -- Mã người bán bị theo dõi (Followed Seller ID)
    NgayTheoDoi DATETIME DEFAULT GETDATE(),  -- Ngày theo dõi
    PRIMARY KEY (MaNguoiBan, MaNguoiBanTheoDoi),
    FOREIGN KEY (MaNguoiBan) REFERENCES NguoiBan(MaNguoiBan),  -- Liên kết đến bảng người bán
    FOREIGN KEY (MaNguoiBanTheoDoi) REFERENCES NguoiBan(MaNguoiBan)  -- Liên kết đến bảng người bán
);
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

SELECT name
FROM sys.key_constraints
WHERE type = 'PK' AND OBJECT_NAME(parent_object_id) = 'DanhGiaSanPham';

ALTER TABLE DanhGiaSanPham
DROP CONSTRAINT PK__DanhGiaS__4278A45738770D27;

ALTER TABLE DanhGiaSanPham
ADD MaDH nchar(20)
select * from DanhGiaSanPham
