INSERT INTO DacDiemXanh (MaDDX, TenDDX, MoTaDDX)
VALUES 
('DD01', N'Nguyên liệu thân thiện với môi trường', 
        N'Sử dụng nguyên liệu tái chế, tái sử dụng, hoặc có nguồn gốc từ thiên nhiên, như tre, giấy tái chế, hay nhựa sinh học. Không chứa các hóa chất độc hại như BPA, formaldehyde, hay kim loại nặng.'),
('DD02', N'Tiết kiệm năng lượng', 
        N'Quá trình sản xuất tiêu tốn ít năng lượng hơn so với các sản phẩm thông thường. Sản phẩm tiết kiệm năng lượng trong quá trình sử dụng, chẳng hạn như bóng đèn LED hoặc thiết bị điện tử có hiệu suất cao.'),
('DD03', N'Khả năng tái chế hoặc phân hủy sinh học', 
        N'Có thể tái chế hoàn toàn sau khi sử dụng hoặc phân hủy tự nhiên trong môi trường mà không gây ô nhiễm.'),
('DD04', N'Giảm phát thải trong sản xuất và sử dụng', 
        N'Sản phẩm giúp giảm phát thải khí nhà kính hoặc các chất gây ô nhiễm khác, chẳng hạn như xe chạy bằng năng lượng tái tạo (xe điện).'),
('DD05', N'Thúc đẩy sức khỏe và an toàn', 
        N'Không gây hại cho người sử dụng hoặc môi trường, ví dụ: mỹ phẩm không chứa hóa chất độc hại hoặc thực phẩm hữu cơ không dùng thuốc trừ sâu.'),
('DD06', N'Đóng gói bền vững', 
        N'Sử dụng bao bì tối giản, làm từ vật liệu tái chế hoặc dễ tái chế.'),
('DD07', N'Tăng tuổi thọ sử dụng', 
        N'Sản phẩm bền hơn, ít phải thay thế, từ đó giảm tiêu thụ nguyên liệu và rác thải.');



INSERT INTO SanPham(MaSP, MaNhomSP, MaNguoiBan, TenSP, SoLuongTon, DGBanMacDinh, HinhChinh, Mota)
VALUES 
('SP01000001', 'TP', 'CH001', N'Xà lách rocket (arugula) hữu cơ 1kg', 1000, 210000, '1.jpg', NULL),
('SP01000002', 'TP', 'CH001', N'Bông cải trắng 1kg', 1000, 60000, '2.jpg', NULL),
('SP01000003', 'TP', 'CH001', N'Bắp cải hữu cơ 1kg', 1000, 42500, '3.jpg', N'Chứng nhận/ Canh tác: Chứng nhận hữu cơ Việt Nam. Xuất xứ: Trang trại tại Đơn Dương, Lâm Đồng, Việt Nam. Công dụng: Bắp cải được ví như "thần dược của người nghèo"...'),
('SP01000004', 'TP', 'CH001', N'Bắp cải tím 1kg', 1000, 115000, '4.jpg', NULL),
('SP01000005', 'TP', 'CH001', N'Bắp ngọt hữu cơ 1kg', 1000, 47500, '5.jpg', N'Chứng nhận/Canh tác: Chứng nhận hữu cơ USDA/Chứng nhận EU...'),
('SP01000006', 'TP', 'CH001', N'Bí đỏ hữu cơ 1kg', 1000, 47500, '6.jpg', N'Chứng nhận/ Canh tác: Chứng nhận UDSA/Chứng nhận EU...'),
('SP01000007', 'TP', 'CH001', N'Bó xôi hữu cơ 1kg', 1000, 125000, '7.jpg', NULL),
('SP01000008', 'TP', 'CH001', N'Cà chua giống Hà Lan hữu cơ 1kg', 1000, 44000, '8.jpg', N'Tiêu chuẩn/Chứng nhận: chứng nhận TCHC Việt Nam...'),
('SP01000009', 'TP', 'CH001', N'Cà rốt hữu cơ - CU841314 1kg', 1000, 55000, '9.jpg', N'Tiêu chuẩn/Chứng nhận: chứng nhận TCHC Việt Nam...'),
('SP01000010', 'TP', 'CH001', N'Cải bẹ xanh 1kg', 1000, 25000, '10.jpg', N'Chứng nhận/Canh tác: Canh tác theo hướng hữu cơ. Trang trại không sử dụng phân bón hóa học...')
;

INSERT INTO SanPham(MaSP, MaNhomSP, MaNguoiBan, TenSP, SoLuongTon, DGBanMacDinh, HinhChinh, Mota)
VALUES 
('SP01000011', 'TP', 'CH001', N'Cải ngọt bẹ trắng 1kg', 1000, 25500, '11.jpg', NULL),
('SP01000012', 'TP', 'CH001', N'Cải thảo hữu cơ 1kg', 1000, 85000, '12.jpg', NULL),
('SP01000013', 'TP', 'CH001', N'Cải xoăn (kale) hữu cơ 1kg', 1000, 210000, '13.jpg', 
 N'Chứng nhận/ Canh tác: Canh tác theo hướng hữu cơ - Quá trình canh tác hoàn toàn không sử dụng phân bón hóa học, thuốc diệt cỏ, thuốc bảo vệ thực vật và chất kích thích tăng trưởng.
Xuất xứ: Trang trại tại Xuân Thành, Lâm Đồng, Việt Nam.
Công dụng: Kale được ví là siêu thực phẩm với những công dụng tuyệt vời của nó: ít calo - giúp kiểm soát cân nặng, có đặc tính thanh lọc, giàu vitamin A, K - giúp giảm xơ vữa động mạch, giàu folate - giúp phát triển não bộ, giàu chất xơ, giàu sắt nên có thể thay thế nguồn thịt bò.
Gợi ý sử dụng: Cải kale phù hợp với các món nước ép, sinh tố, salad, nếu canh tôm,...
Hướng dẫn bảo quản: Bảo quản trong ngăn mát tủ lạnh.
Hạn sử dụng: 2-3 ngày tùy điều kiện bảo quản. Kale có thể bảo quản được lâu hơn khi cấp đông.'),
('SP01000014', 'TP', 'CH001', N'Chanh hữu cơ 1kg', 1000, 48000, '14.jpg',
 N'Chứng nhận/ Canh tác: Chứng nhận hữu cơ 
Xuất xứ: Trang trại tại Gia Lai
Công dụng: Chanh không hạt, mọng nước và rất thơm. Là loại quả được xếp vào bảng những loại quả tốt nhất cho sức khỏe. Chanh có chứa nhiều khoáng chất như vitamin C, pectin, nhóm vitamin B, chất chống oxy hóa, kali và calcium... có lợi cho cơ thể con người. Loại quả này đóng vai trò quan trọng trong cải thiện chất lượng da và hỗ trợ tiêu hóa.
Gợi ý sử dụng: Chanh được dùng với nhiều công dụng như làm gia vị; nước giải khát; tẩy rửa vết bẩn trên quần áo hoặc khử mùi trong tủ lạnh…
Hướng dẫn bảo quản: Bảo quản trong ngăn mát tủ lạnh.
Hạn sử dụng: 3 - 6 ngày tùy điều kiện bảo quản.'),
('SP01000015', 'TP', 'CH001', N'Dưa hấu hữu cơ 1kg', 1000, 125000, '15.jpg', NULL),
('SP01000016', 'TP', 'CH001', N'Dưa leo hữu cơ 1kg', 1000, 50000, '16.jpg',
 N'Chứng nhận/ Canh tác: Chứng nhận hữu cơ USDA/ Chứng nhận hữu cơ EU
Công dụng: Dưa leo có vị ngọt, tính lạnh, có hàm lượng nước cao nên hiệu quả trong việc thanh nhiệt, giải độc cũng như cung cấp nước cho cơ thể. Dưa leo còn nhiều vitamin và khoáng chất như vitamin C, vitamin K, magie, kali, mangan... Đặc biệt, dưa leo giàu vitamin B complex, gồm B1, B5, B7, có tác dụng giúp thư giãn hệ thần kinh và hỗ trợ giảm tác động của stress. 
Gợi ý sử dụng: Dưa leo được dùng trực tiếp, hay trong các món xào, gỏi, salad, đắp mặt nạ hoặc ép làm nước giải khát.
Hướng dẫn bảo quản: Bảo quản trong ngăn mát tủ lạnh.
Hạn sử dụng: 3 - 4 ngày tùy điều kiện bảo quản.'),
('SP01000017', 'TP', 'CH001', N'Ổi hữu cơ 1kg', 1000, 99000, '17.jpg',
 N'Chứng nhận/ Canh tác: 
Xuất xứ: 
Công dụng: Ổi rất giàu các chất chống oxy hóa, vitamin C, kali và chất xơ. Chất xơ có thể làm giảm lượng cholesterol xấu, góp phần cải thiện các bệnh lý về tim mạch, hỗ trợ và cải thiện hệ thống tiêu hóa. Các chất chống oxy hóa trong ổi có thể bảo vệ làn da khỏi các vấn đề lão hóa. Ngoài ra, vitamin A và C cũng góp phần giúp da săn chắc, chống việc hình thành nếp nhăn, tăng cường chức năng của hệ thống miễn dịch.
Gợi ý sử dụng: Ăn trực tiếp, làm nước ép, salad
Hướng dẫn bảo quản: Bảo quản trong ngăn mát tủ lạnh.
Hạn sử dụng: 3 - 6 ngày tùy điều kiện bảo quản.'),
('SP01000018', 'TP', 'CH001', N'Việt quất hữu cơ Rainier 1kg', 1000, 179000, '18.jpg', NULL),
('SP01000019', 'TP', 'CH001', N'Hạt điều bóc vỏ lụa hữu cơ Organica 1kg', 1000, 256000, '19.jpg', NULL),
('SP01000020', 'TP', 'CH001', N'Kỷ tử hữu cơ Organica 1kg', 1000, 233700, '20.jpg', NULL);


INSERT INTO SanPham (MaSP, MaNhomSP, MaNguoiBan, TenSP, SoLuongTon, DGBanMacDinh, HinhChinh, MoTa)
VALUES
('SP01000021', 'TP', 'CH001', N'Táo tàu hữu cơ Organica 1kg', 1000, 256000, '21.jpg', NULL),
('SP01000022', 'TP', 'CH001', N'Khoai tây hữu cơ 1kg', 1000, 42000, '22.jpg', N'Xuất xứ: Trang trại tại Lạc Dương, Lâm Đồng, Việt Nam. Công dụng: Ngoài hàm lượng nước cao, khoai tây còn rất giàu carbohydrate và hàm lượng cao protein cũng như chất xơ giúp tiêu hoá dễ. Các vitamin C, vitamin B6, kali, magie, kẽm và photpho có trong khoai tây tốt cho da cũng như cần thiết hằng ngày cho cơ thể, giúp phòng chống cảm lạnh... Gợi ý sử dụng: Khoai tây có vỏ hồng, da mịn nhẵn, mắt củ nông dễ gọt vỏ hao ít. Ruột củ vàng sáng, bở, mềm ngọt, thơm và không bị khái. Rất thích hợp luộc, xào, nấu, chiên. Hướng dẫn bảo quản: Bảo quản khoai tây lành mạnh ở nơi khô, tối như tầng hầm, gầm tủ bếp. Sau khi đã chọn lọc các củ khoai tây, đặt chúng ở một nơi không tiếp xúc với ánh sáng và độ ẩm, bởi những thứ này có thể khiến khoai tây mọc mầm hoặc thối rữa. Bạn cũng cần để khoai tây ở nơi thông thoáng. Hạn sử dụng: 3 - 6 ngày tùy điều kiện bảo quản.'),
('SP05000023', 'MP', 'CH005', N'Dầu tẩy trang hoa hồng 310ml',  1000, 345000, '23.jpg', N'Dầu tẩy trang hoa hồng giúp làm sạch sâu lớp trang điểm, bụi bẩn và dầu thừa, dưỡng ẩm mà không để lại cảm giác nhờn rít khó chịu.'),
('SP05000024', 'MP', 'CH005', N'Gel rửa mặt cà phê Đắk Lắk 310ml',  1000, 295000,'24.jpg', N'Với công thức dịu nhẹ không chứa sulfate, gel rửa mặt cà phê Đắk Lắk có khả năng làm sạch hiệu quả mà không gây khô da, mang lại cảm giác sảng khoái cùng một làn da tươi mới, sạch thoáng và trông tràn đầy sinh lực để bắt đầu một ngày mới.'),
('SP05000025', 'MP', 'CH005', N'Nước sen Hậu Giang 310ml',  1000, 295000,'25.jpg', N'Khai thác sức mạnh từ những đoá sen tinh khiết từ vùng đất Hậu Giang kết hợp cùng các hoạt chất khoa học tiên tiến gồm Madecassoside, vitamin B5, B12, Beta-glucan (prebiotic) và Sweetone® (chiết xuất quả ngũ vị tử), nước sen Hậu Giang dịu lành giúp bảo vệ hàng rào độ ẩm của làn da nhạy cảm, giảm mẩn đỏ và ngứa do khô ráp, mang lại cho làn da một cảm giác nhẹ nhàng, êm ái như được vỗ về.'),
('SP05000026', 'MP', 'CH005', N'Sữa chống nắng bí đao 15ml',  1000, 120000,'26.jpg', N'Kết hợp các màng lọc thế hệ mới, chiết xuất bí đao, Synoxyl AZ và Melanin, sữa chống nắng bí đao giúp bảo vệ da trước tia UVA, UVB và ánh sáng năng lượng cao nhìn thấy được.'),
('SP05000027', 'MP', 'CH005', N'Xịt khoáng nghệ Hưng Yên 130ml',  1000, 215000,'27.jpg', N'Một lớp sương mịn từ chiết xuất củ nghệ, muối khoáng kết hợp cùng enzym SOD, EGCG và các axit amin sẽ bao phủ làn da giúp cấp ẩm tức thời, giúp làm sáng, chống oxi hóa mạnh mẽ và bảo vệ da khỏi các tác nhân gây hại từ môi trường.'),
('SP05000028', 'MP', 'CH005', N'Gel tắm khuynh diệp & bạc hà 500ml', 1000, 245000, '28.jpg', N'Vận dụng liệu pháp mùi hương từ tinh dầu khuynh diệp, bạc hà, kết hợp với vitamin B5 và hoạt chất dưỡng ẩm Betaine, Gel tắm sẽ làm sạch nhẹ nhàng và giữ cho làn da cơ thể luôn mềm mại, đồng thời giúp thư giãn, giải tỏa căng thẳng và mang lại một tinh thần thông suốt.'),
('SP05000029', 'MP', 'CH005', N'Sáp dưỡng ẩm đa năng sen Hậu Giang 30ml', 1000, 195000, '29.jpg', N'Hướng đến mục tiêu chung chăm sóc trẻ em vùng cao cùng UNESCO - CEP trong chương trình “Ửng Hồng Không Ửng Đỏ”, Cocoon chính thức giới thiệu phiên bản giới hạn của sản phẩm Sáp Dưỡng Đa Năng Sen Hậu Giang. Bao bì của sản phẩm phiên bản giới hạn trên sử dụng nguồn tranh vẽ từ Em’s - một dự án cộng đồng của UNESCO-CEP hướng tới việc phát triển khả năng sáng tạo nghệ thuật của trẻ em, thanh thiếu niên Việt Nam.'),
('SP05000030', 'MP', 'CH005', N'Dầu gội bưởi không sulfate 500ml', 1000, 395000, '30.jpg', N'Từ tinh dầu vỏ bưởi Việt Nam truyền thống kết hợp với vitamin B5, hoạt chất dưỡng ẩm Xylishine™ cùng công thức dịu nhẹ không chứa sulfate, dầu gội bưởi giúp làm sạch tóc và giảm gãy rụng, mang lại mái tóc đen dày, chắc khoẻ và mượt mà.');

INSERT INTO SanPham (MaSP, MaNhomSP, MaNguoiBan, TenSP, SoLuongTon, DGBanMacDinh, HinhChinh, MoTa)
VALUES 
('SP05000031', 'MP', 'CH005', N'Nước tẩy trang bí đao 500ml', 1000, 295000, 
 '31.jpg',
 N'Làn da dầu và mụn rất nhạy cảm nên cần được thiết kế một loại nước tẩy trang phù hợp. Với công nghệ Micellar, nước tẩy trang bí đao giúp làm sạch hiệu quả lớp trang điểm, bụi bẩn và dầu thừa, mang lại làn da sạch hoàn toàn và dịu nhẹ.'),
('SP05000032', 'MP', 'CH005', N'Mặt nạ nghệ Hưng Yên 30ml', 1000, 145000, 
 '32.jpg',
 N'Mặt nạ từ tinh bột nghệ giàu Curcuminoid kết hợp với Vitamin B3 và chiết xuất yến mạch rất phù hợp cho làn da xỉn màu và có nhiều vết thâm. Sau khi rửa đi lớp mặt nạ, bạn sẽ nhìn thấy một làn da tươi mới, sáng rạng rỡ và đều màu.'),
('SP06000033', 'Khac', 'CH006', N'Neverfull – túi dệt nhiều ngăn', 1000, 590000, 
 '33.jpg',
 N'Chiếc túi này được dệt nên từ những chiếc bao nylon mà bạn dùng hàng ngày, với sự kỳ công và tỉ mỉ nhiều công đoạn: cắt sợi – phối màu – se sợi – dệt nên vải. Nay đã được cải tiến với phần quai xách đẹp hơn, chắc hơn. Túi chứa nhiều đồ hơn, đứng form hơn'),
('SP06000034', 'Khac', 'CH006', N'Tote – True Colors – Red', 1000, 219000, 
 '34.jpg',
 N'Túi tote thời trang sáng tạo từ nylon, xử lý gia nhiệt. Sản phẩm được thiết kế với tinh thần Zero waste, hướng đến thời trang bền vững, thân thiện với môi trường, là quà tặng eco phù hợp.'),
('SP06000035', 'Khac', 'CH006', N'Beach tote', 1000, 300000, 
 '35.jpg',
 N'Từ vụn của sản phẩm nylon dệt và từ những nylon không phù hợp để dệt, Limloop tiếp tục nghiên cứu giải pháp để tái chế, làm sao triệt để sử dụng 100% Nylon được thu gom về.'),
('SP06000036', 'Khac', 'CH006', N'Túi Mini', 1000, 99000, 
 '36.jpg',
 N'80% băng rôn sau khi sử dụng bị thải ra môi trường, và chưa có cách nào để tái chế như giấy, pin,… Do đó, Limloop nỗ lực nghiên cứu để có thể tái sử dụng lại Băng rôn, bằng cách cho Băng rôn một hình hài mới – Những chiếc túi xách thời trang. Với tính chất đặc biệt, hoa văn mỗi chiếc túi là độc nhất, không lặp lại.'),
('SP06000037', 'Khac', 'CH006', N'Túi Tote Banner', 1000, 129000, 
 N'37.jpg',
 N'80% băng rôn sau khi sử dụng bị thải ra môi trường, và chưa có cách nào để tái chế như giấy, pin,… Do đó, Limloop nỗ lực nghiên cứu để có thể tái sử dụng lại Băng rôn, bằng cách cho Băng rôn một hình hài mới – Những chiếc túi xách thời trang. Với tính chất độc đáo, mỗi chiếc túi gần như sẽ là hoa văn duy nhất, không lặp lại.'),
('SP06000038', 'Khac', 'CH006', N'Túi Laptop', 1000, 439000, 
 '38.jpg',
 N'Túi đựng Laptop nhà Limloop sẽ bảo vệ chiếc máy tính của bạn nhờ thiết kế rộng rãi và có miếng mút lót cứng cáp bên trong, quai đeo chắc chắn, độ rộng vừa phải giúp bạn dễ dàng cầm nắm. Không những thế, túi đựng Laptop nhà Limloop sẽ còn là người bạn đồng hành lý tưởng cho công việc và cuộc sống hằng ngày của bạn.'),
('SP06000039', 'Khac', 'CH006', 'Minibook tote', 1000, 400000, 
 '39.jpg',
 N'Túi đeo thời trang sáng tạo từ nylon, xử lý gia nhiệt tạo thành bức tranh đại dương xanh. Sản phẩm được thiết kế với tinh thần Zero waste, hướng đến thời trang bền vững, thân thiện với môi trường, là quà tặng eco phù hợp.'),
('SP06000040', 'Khac', 'CH006', N'Tote – True Colors – Bird', 1000, 219000, 
 '40.jpg',
 N'Túi tote thời trang sáng tạo từ nylon, xử lý gia nhiệt. Sản phẩm được thiết kế với tinh thần Zero waste, hướng đến thời trang bền vững, thân thiện với môi trường, là quà tặng eco phù hợp.');

INSERT INTO SanPham (MaSP, MaNhomSP, MaNguoiBan, TenSP, SoLuongTon, DGBanMacDinh, HinhChinh, MoTa) VALUES
('SP06000041', 'Khac', 'CH006', N'Banana bag', 1000, 380000, '41.jpg', 
    N'Sản phẩm banana bag mùa hè mang hoạ tiết đại dương xanh mát, thiết kế dáng túi hình quả chuối kèm quai đeo, khả năng chứa đựng lớn, là item được các tín đồ thời trang ưa chuộng cho mùa hè bởi sự trẻ trung và năng động.'),
('SP06000042', 'Khac', 'CH006', N'Tote – True Colors – Blue', 1000, 219000, '42.jpg', 
    N'Túi tote thời trang sáng tạo từ nylon, xử lý gia nhiệt. Sản phẩm được thiết kế với tinh thần Zero waste, hướng đến thời trang bền vững, thân thiện với môi trường, là quà tặng eco phù hợp.'),
('SP07000043', 'Khac', 'CH007', N'Nước Dưa Lưới Vị Nguyên Bản', 1000, 25000, '43.jpg', 
    N'Nước dưa lưới tươi mát, giữ nguyên vị tự nhiên và bổ dưỡng.'),
('SP07000044', 'Khac', 'CH007', N'Măng Rừng Khô DannyGreen - Dried Bamboo Shoots 500g', 1000, 100000, '44.jpg', 
    N'Măng rừng khô DannyGreen giàu chất dinh dưỡng, thích hợp cho các món hầm hoặc xào.'),
('SP07000045', 'Khac', 'CH007', N'Chôm chôm sấy dẻo Dried Rambutan 1kg', 1000, 120000, '45.jpg', 
    N'Chôm chôm sấy dẻo giữ nguyên hương vị ngọt thanh, phù hợp làm quà tặng hoặc ăn nhẹ.'),
('SP08000046', 'TP', 'CH008', N'Tinh chất Yến sào Khánh Hòa Sanvinest túi 25ml - TC516', 1000, 38000, '46.jpg', 
    N'Sản phẩm bổ dưỡng từ yến sào Khánh Hòa, hỗ trợ sức khỏe toàn diện.'),
('SP08000047', 'TP', 'CH008', N'Tinh chất Yến sào Khánh Hòa Sanvinest túi 25ml - TC515', 1000, 38000, '47.jpg', 
    N'Yến sào nguyên chất, giúp tăng cường đề kháng và bồi bổ cơ thể.'),
('SP08000048','TP', 'CH008', N'Tinh chất Yến sào Khánh Hòa Sanvinest túi 25ml - TC513', 1000, 38000, '48.jpg', 
    N'Yến sào chất lượng cao từ Khánh Hòa, cung cấp dinh dưỡng cho sức khỏe.'),
('SP08000049', 'TP', 'CH008', N'Tinh chất Yến sào Khánh Hòa Sanvinest túi 25ml - TC512', 1000, 38000, '49.jpg', 
    N'Sản phẩm yến sào tiện lợi, thích hợp cho mọi lứa tuổi.'),
('SP08000050', 'TP', 'CH008', N'Tinh chất Yến sào Khánh Hòa Sanvinest dành cho trẻ em hộp quà tặng 5 túi 25ml - TC511H05', 1000, 190000, '50.jpg', 
    N'Bộ sản phẩm yến sào đặc biệt dành cho trẻ em, giúp tăng cường sức khỏe và trí tuệ.');

INSERT INTO SanPham (MaSP, MaNhomSP, MaNguoiBan, TenSP, SoLuongTon, DGBanMacDinh, HinhChinh, MoTa)
VALUES ('SP08000051', 'TP', 'CH008', N'Tinh chất Yến sào Khánh Hòa Sanvinest dành cho người cao tuổi hộp 5 túi 25ml- TC512H05', 1000, 190000, '51.jpg', NULL);

INSERT INTO SanPham (MaSP, MaNhomSP, MaNguoiBan, TenSP, SoLuongTon, DGBanMacDinh, HinhChinh, MoTa)
VALUES
('SP08000052', 'TP', 'CH008', N'Tinh chất Yến sào Khánh Hòa Sanvinest dành cho mọi lứa tuổi hộp 5 túi 25ml - TC513H05', 1000, 190000, '52.jpg', NULL),
('SP08000053', 'TP', 'CH008', N'Tinh chất Yến sào Khánh Hòa Sanvinest dành cho người cao tuổi không đường hộp 5 túi 25ml TC515H05', 1000, 190000, '53.jpg', NULL),
('SP08000054', 'TP', 'CH008', N'Tinh chất Yến sào Khánh Hòa Sanvinest không đường hộp 5 túi 25ml TC516H05', 1000, 190000, '54.jpg', NULL),
('SP08000055', 'TP', 'CH008', N'Tinh chất Yến sào Khánh Hòa Sanvinest dành cho trẻ em hộp quà tặng 10 túi 25ml - TC511H10', 1000, 380000, '55.jpg', NULL),
('SP08000056', 'TP', 'CH008', N'Tinh chất Yến sào Khánh Hòa Sanvinest dành cho người cao tuổi hộp 10 túi 25ml- TC512H10', 1000, 380000, '56.jpg', NULL),
('SP09000057', 'GD', 'CH009', N'Khăn giấy sợi tre Fudo 12 cuộn', 1000, 143000, '57.jpg', N'Giấy tre Fudo có đặc tính dai mềm mịn và có chức năng kháng khuẩn từ sợi tre tự nhiên. Khả năng thấm nước, thấm dầu vượt trội, không bị nát giấy. Đặc biệt, khăn giấy Fudo không dùng chất tẩy trắng, không tạo mùi, không bụi vụn, không hóa chất, không kích ứng, phù hợp với tiêu chí sản xuất bền vững với môi trường, phù hợp cho trẻ em và phụ nữ vốn có làn da nhạy cảm, mang lại cảm giác dễ chịu, thoải mái cho người dùng. Thành phần: 100% bột sợi tre nguyên chất. Thành phần sợi tre có kháng khuẩn tự nhiên, thoáng khí, không có hại. Được khử trùng linh hoạt, đạt tiêu chuẩn của FDA và chứng nhận hợp quy Việt Nam. Quy cách: 130 tờ x 3 lớp, 190mm x 152mm. Hạn sử dụng: In trên bao bì. Gợi ý sử dụng: Mở bao bì, sử dụng từng tờ. Sử dụng phù hợp cho mẹ và bé, người viêm mũi dị ứng. Dùng gói thực phẩm, thấm dầu, thấm nước, lau mặt, lau trái cây, lau vệ sinh. Hướng dẫn bảo quản: Bảo quản nơi khô ráo, thoáng mát. Để bao bì xa tầm tay trẻ em. Xuất xứ - Chứng nhận: Sản phẩm được sản xuất tại Trung Quốc và đạt chứng nhận an toàn theo tiêu chuẩn của FDA - Cục quản lý dược và thực phẩm Hoa Kỳ.'),
('SP09000058', 'GD', 'CH009', N'Túi khăn giấy bỏ túi', 1000, 45000, '58.jpg', N'Khăn giấy bỏ túi Fudo® TISSUEPocket™ với thành phần 100% sợi tre, không chỉ mang lại sự mềm mại và mịn màng mà còn đảm bảo an toàn tuyệt đối cho sức khỏe của bạn và người thân. Khăn giấy bỏ túi Fudo® TISSUEPocket™ là người bạn đồng hành đáng tin cậy của bạn, luôn sẵn sàng trong túi xách, ví hoặc túi quần. Với kích thước nhỏ gọn, bạn có thể dễ dàng mang theo khăn giấy này bất kể bạn đang ở đâu. Với khả năng thấm hút tuyệt vời, khăn giấy mini Fudo® TISSUEPocket™ giúp bạn dễ dàng lau khô và làm sạch tất cả các vết bẩn và ẩm ướt. Bạn không cần phải lo lắng về việc bụi giấy vụn bám trên da, vì chất liệu cao cấp của giấy ví Fudo giúp giảm thiểu tối đa sự phát tán bụi. Hãy trải nghiệm sự mềm mại và sạch sẽ của khăn giấy Fudo® TISSUEPocket™, mang lại cho bạn cảm giác thoải mái và tươi mới mỗi khi sử dụng. Vì sao khăn giấy tre Fudo® là sản phẩm bền vững với tương lai? Cây tre, với khả năng tái tạo nhanh chóng chỉ sau 2-3 năm, trái ngược với các loại gỗ mất hàng chục năm để trưởng thành, giúp giảm bớt đáng kể nạn chặt phá rừng tự nhiên. Đặc biệt, trên cùng một diện tích đất, cây tre cung cấp khối lượng nguyên liệu lớn hơn nhiều, do quá trình tái sinh diễn ra nhanh hơn và liên tục. Điều này tạo điều kiện cho việc sản xuất bền vững, khi có thể thu hoạch nhiều hơn mà không cần tăng diện tích canh tác hay phá hủy môi trường sống tự nhiên. Thêm vào đó, bộ rễ của tre giữ đất chắc chẽ, tạo nên mạng lưới dày đặc giúp chống xói mòn hiệu quả. Trong quá trình thu hoạch, không cần phá hủy bộ rễ này, giúp đất giữ được sự màu mỡ và cấu trúc cần thiết để hỗ trợ đa dạng sinh học. Khăn giấy tre Fudo®, với nguyên liệu thu được từ các khu rừng tre đạt chuẩn FSC, đảm bảo quy trình chuẩn mực từ nguồn gốc, đưa ra thị trường sản phẩm chất lượng cao và thân thiện với môi trường, là minh chứng sống động cho một tương lai xanh sạch hơn. Chọn Khăn Giấy Tre Fudo® không chỉ đảm bảo an toàn và thoải mái trong việc chăm sóc cá nhân, mà còn là cam kết với hành động bảo vệ "lá phổi xanh" của Trái Đất. Bạn đang góp phần vào một chu trình sản xuất tiêu dùng bền vững - cho bản thân, gia đình và cả hành tinh.'),
('SP09000059', 'GD', 'CH009', N'2 Túi khăn giấy vệ sinh cuộn không lõi', 1000, 180000, '59.jpg', N'Giấy cuộn không lõi Fudo® TISSUERolls™ với thành phần 100% sợi tre, không chỉ mang lại sự mềm mại và mịn màng mà còn đảm bảo an toàn tuyệt đối cho sức khỏe của bạn và người thân. Bạn đã bao giờ trải qua cảm giác lau giấy vệ sinh nhưng vừa chạm nước ướt đã bị rách?. Đừng lo, từ giờ bạn đã có thể gạt bỏ những phiền toái đó khi sử dụng giấy vệ sinh cao cấp cuộn không lõi Fudo® TISSUERolls™. Đặc điểm nổi bật so với các loại giấy vệ sinh khác trên thị trường: Mang lại cho bạn cảm giác dễ chịu, thoải mái và tiết kiệm. Giấy vệ sinh cuộn lớn không lõi giúp bạn có thể sử dụng cho các nhu cầu khác như chăm sóc cá nhân hay lau dọn mà không hề phản cảm, đảm bảo lịch sự khi có khách ghé nhà so với loại giấy cuộn vệ sinh có lõi. Sản xuất từ thành phần tự nhiên an toàn cho người sử dụng: không tẩy trắng, không tạo mùi, không bụi vụn, không hoá chất, không kích ứng,... Giấy tre Fudo® có đặc tính siêu mềm, siêu mịn. Phôi giấy được khử trùng linh hoạt, đạt tiêu chuẩn FDA và chứng nhận hợp quy Việt Nam. Đặc biệt khi thấm nước sẽ dai hơn các loại giấy mềm thông thường, khó bị rách. Rất tiện lợi. Sản phẩm dùng được cả cho mẹ và bé, gói thực phẩm, thấm dầu, thấm nước, lau mặt, lau trái cây, lau vệ sinh đều có thể sử dụng. Vì sao khăn giấy tre Fudo® là sản phẩm bền vững với tương lai? Cây tre, với khả năng tái tạo nhanh chóng chỉ sau 2-3 năm, trái ngược với các loại gỗ mất hàng chục năm để trưởng thành, giúp giảm bớt đáng kể nạn chặt phá rừng tự nhiên. Đặc biệt, trên cùng một diện tích đất, cây tre cung cấp khối lượng nguyên liệu lớn hơn nhiều, do quá trình tái sinh diễn ra nhanh hơn và liên tục. Điều này tạo điều kiện cho việc sản xuất bền vững, khi có thể thu hoạch nhiều hơn mà không cần tăng diện tích canh tác hay phá hủy môi trường sống tự nhiên. Thêm vào đó, bộ rễ của tre giữ đất chắc chẽ, tạo nên mạng lưới dày đặc giúp chống xói mòn hiệu quả. Trong quá trình thu hoạch, không cần phá hủy bộ rễ này, giúp đất giữ được sự màu mỡ và cấu trúc cần thiết để hỗ trợ đa dạng sinh học. Khăn giấy tre Fudo®, với nguyên liệu thu được từ các khu rừng tre đạt chuẩn FSC, đảm bảo quy trình chuẩn mực từ nguồn gốc, đưa ra thị trường sản phẩm chất lượng cao và thân thiện với môi trường, là minh chứng sống động cho một tương lai xanh sạch hơn.');

INSERT INTO SanPham (MaSP, MaNhomSP, MaNguoiBan, TenSP, SoLuongTon, DGBanMacDinh, HinhChinh, MoTa)
VALUES 
('SP10000060', 'GD', 'CH0010', N'All-in-One Gift- Trọn bộ Xà Bông Đa Năng', 1000, 149000, '60.jpg', 
N'Sản phẩm có thể dùng để tắm, gội đầu, rửa mặt, rửa tay.

3 trong 1: Tẩy tế bào chết toàn thân, làm sạch & cung cấp dưỡng chất cho da.
Mùi hương rất nhẹ tự nhiên 100%. 
Sản phẩm được làm bằng tay từ các nguyên liệu tự nhiên 100% , cơ chế dưỡng khỏe da, trắng lên mà không gây hại.
Thành phần chính bao gồm xác dừa và các loại chất dưỡng như tinh dầu dừa, dầu thầu dầu, tinh dầu ỏai hương, tinh dầu cam.
COCOVIE  là thương hiệu mỹ phẩm hữu cơ, sản xuất tại Việt Nam đã xuất khẩu đến các quốc gia như Mỹ, Úc. 
Khay gáo dừa làm từ dừa do bàn tay của các nghệ nhân tài hoa đẹp bền muôn năm.'),
 
('SP10000061', 'MP', 'CH0010', N'Tinh Chất Dưỡng Tóc Dày Khoẻ - Hương Hoa', 1000, 149000, '61.jpg', 
N'Tinh Chất Dưỡng Tóc Dày Khoẻ Cocovie - Liệu trình cho mái tóc dày khoẻ tự nhiên.

✔️Được làm từ nguyên liệu tự nhiên.
✔️Bao bì nhựa tái chế.
✔️Sử dụng sản phẩm Cocovie vừa an toàn vừa góp phần bảo vệ môi trường.

Hướng dẫn sử dụng: Mỗi ngày dùng 2-3 giọt Dầu Dừa Dưỡng Tóc COCOVIE để massage vào da đầu, giúp tóc mọc nhanh hơn.

Bước 1: Dành 1 phút để massage da đầu và phần tóc gãy rụng với 8-12 giọt tinh chất.
Bước 2: Ủ tóc để tinh chất thẩm thấu vào da đầu trong khoảng 15 phút hoặc lâu hơn.
Bước 3: Gội sạch với nước.
Lưu ý:
Chỉ ủ một lượng vừa đủ để không bết dính.
Tuỳ theo cơ địa tự nhiên của bạn, tóc con sẽ bắt đầu mọc trở lại trong vòng từ 1-3 tháng.
Không dùng cho tóc dầu, da dầu.
Thành phần: Cocos Nucifera Oil, Fragrance, Citrus Grandis Peel Oil.'),

('SP11000062', 'MP', 'CH0011', N'Tinh Dầu Dừa Dưỡng Da Cam Chanh 50ml', 1000, 99000, '62.jpg', 
N'TINH DẦU DỪA DƯỠNG DA CAM-CHANH.

Giải độc tố cho da & dưỡng ẩm.

HDSD: Dùng trực tiếp trên da mặt và cơ thể.

Tinh dầu dừa cam-chanh Cocovie là sự hoà quyện thuần khiết của tinh dầu dừa và tinh dầu cam & chanh giúp nuôi dưỡng, tái tạo và bảo vệ da khỏi những tác nhân có hại từ môi trường. 
Tinh dầu cam chanh giàu Vitamin C, hỗ trợ hình thành Collagen tự nhiên cho da, giữ da luôn trẻ đẹp.
Chỉ với 1 sản phẩm nhỏ gọn bỏ túi bạn thoả thích massage, tẩy trang, dưỡng da khoẻ, dưỡng tóc bóng mượt.

✔️Sản xuất theo tiêu chuẩn GMP & đạt chứng nhận organic USDA an toàn cho sức khoẻ.
✔️Tinh dầu dừa được ép tươi trong vòng 2 tiếng sau khi thu hoạch, đảm bảo giữ trọn dưỡng chất thiên nhiên.
✔️Sản phẩm 100% thiên nhiên, không dùng chất bảo quản.
✔️Chai thuỷ tinh thân thiện môi trường, giúp bảo quản tinh dầu tốt.'),

('SP11000063', 'MP', 'CH0011', N'Tinh Dầu Dừa Dưỡng Da Nguyên Chất 100ml', 1000, 119000, '63.jpg', 
N'TINH DẦU DỪA DƯỠNG DA NGUYÊN CHẤT.

HDSD: Dùng trực tiếp trên da mặt và cơ thể.

Được chiết xuất 100% từ trái dừa tươi vùng Mekong, giúp nuôi dưỡng, tái tạo và bảo vệ da khỏi những tác nhân có hại từ môi trường.

Chỉ với 1 sản phẩm nhỏ gọn bỏ túi bạn thoả thích massage, tẩy trang, dưỡng da khoẻ, dưỡng tóc bóng mượt.

✔️Sản xuất theo tiêu chuẩn GMP & đạt chứng nhận organic USDA an toàn cho sức khoẻ.
✔️Tinh dầu dừa được ép tươi trong vòng 2 tiếng sau khi thu hoạch, đảm bảo giữ trọn dưỡng chất thiên nhiên.
✔️Sản phẩm 100% thiên nhiên, không dùng chất bảo quản.
✔️Chai thuỷ tinh thân thiện môi trường, giúp bảo quản tinh dầu tốt.'),

('SP11000064', 'TP', 'CH0011', N'Dầu Dừa Nấu Ăn Thực Dưỡng 450 ml', 1000, 109000, '64.jpg', 
N'Dầu dừa nấu ăn thực dưỡng Cocovie.

Hấp thụ thức ăn tốt hơn.
Khi chiên xào với nhiệt độ cao không thay đổi cấu trúc hoá học và không sinh ra độc tố gây hại cho sức khoẻ.
Giàu Acid Lauric: hỗ trợ quá trình tiêu hoá, tạo cảm giác nhẹ bụng.
Điểm bốc khói cao: giúp món ăn an toàn khi chiên ở nhiệt độ cao.
Không Tinh Luyện: bảo vệ sức khoẻ, giảm nguy cơ ung thư.

HDSD: Dùng để chiên xào nấu nướng.'),

('SP11000065', 'TP', 'CH0011', N'Tinh Dầu Dừa Thượng Hạng - 1000ml', 1000, 269000, '65.jpg', 
N'Tinh dầu dừa thượng hạng Cocovie.

Giữ bụng thon đẹp.
Chuyển hoá thành năng lượng nhanh mà không tích tụ mỡ như những loại chất béo khác.
Sản phẩm dùng tốt nhất cho người ăn kiêng, ăn sạch, người tập thể thao, người béo phì hoặc người lớn tuổi- trẻ em ăn uống khó tiêu.

Giàu Acid Lauric: hỗ trợ quá trình tiêu hoá, tạo cảm giác nhẹ bụng.
Ép lạnh: bảo toàn dưỡng chất thiên nhiên.
Không chất bảo quản: an toàn cho sức khoẻ, có thể uống trực tiếp.

HDSD: Uống trực tiếp hoặc trộn với Salad.'),

('SP11000066', 'GD', 'CH0011', N'Khay Gáo Dừa COCOVIE', 1000, 29000, '66.jpg', 
N'Khay gáo dừa làm từ dừa dùng lâu năm vẫn sạch đẹp.
✔️ Thành phần tự nhiên thân thiện với môi trường.
✔️ Hướng dẫn sử dụng: Đặt xà bông lên khay gáo dừa trang trí phòng tắm hoặc bồn rửa mặt, sạch, đẹp và tiện lợi.'),
('SP12000067', 'MP', 'CH0012', N'Serum dưỡng tóc thảo mộc bưởi hà thủ ô Xanh Farm - Chăm sóc tóc, kích mọc tóc, bóng mượt', 
1000, 130000, 
'67.jpg', 
N'SERUM DƯỠNG TÓC XANH FARM - BƯỞI, HÀ THỦ Ô
Thành phần: Biotin, Kẽm, vitamin A, C, E, B5, Collagen, keratin, Chiết xuất vỏ bưởi, chiết xuất cây đậu vàng, chiết xuất hương thảo, chiết xuất đinh lăng, chiết xuất hà thủ ô.
Công dụng:
+ Giúp làm khoẻ chân tóc, giúp mọc tóc nhanh hơn
+ Ngăn ngừa tóc gãy rụng và giúp tóc mềm mại hơn
+ Giúp phục hồi tóc hư tổn, khô xơ, chẻ ngọn
+ Cung cấp dưỡng chất giúp tóc chắc khoẻ tự nhiên
Mùi hương: Không phải mùi bưởi hay mùi thảo mộc. Sản phẩm không sử dụng hương liệu.
Hướng dẫn sử dụng:
- Cách 1: Ủ tóc để mọc tóc: nhỏ vài giọt, để 20–30p rồi gội.
- Cách 2: Dưỡng tóc sau gội, thoa serum lên thân & ngọn tóc.'),
('SP12000068', 'MP', 'CH0012', N'Xanh Farm - Dầu gội thảo mộc bưởi non - Giảm rụng tóc, kích thích mọc tóc, Chăm Sóc Tóc hư tổn', 
1000, 210000, 
'68.jpg', 
N'THÀNH PHẦN: Vỏ bưởi non, bồ kết, hương nhu, chanh tươi, cỏ mần trầu, sả, núc nác, ngũ sắc, tang bạch bì, lá neem, vitamin b5...
CÔNG DỤNG:
► Kích thích mọc tóc, giảm tóc gãy rụng.
► Phục hồi tóc hư tổn do hóa chất, giảm gàu, nấm da đầu.
HƯỚNG DẪN SỬ DỤNG:
- Thấm ướt tóc, dùng 5ml sản phẩm, massage nhẹ, xả sạch.
- Dùng 3 lần/tuần hoặc hàng ngày tùy tình trạng tóc.
- Kết hợp dầu xả bưởi non để đạt hiệu quả tối ưu.
BẢO QUẢN:
Nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.'),
('SP12000069', 'MP', 'CH0012', N'Xanh Farm - Dầu xả thảo mộc bưởi non - Hỗ trợ giảm rụng tóc, kích thích mọc tóc, Chăm Sóc Tóc hư tổn', 1000, 180000, 
 N'69.jpg', 
 N'DẦU XẢ THẢO MỘC BƯỞI NON: Dung tích: 330ml. Thành phần: Shea Butter (Bơ hạt mỡ), Mango Butter (Bơ xoài), Avocado Oil (Dầu quả bơ), Olive Oil (Dầu oliu), Tinh dầu bưởi, Dầu Argan, Coconut Oil, Redensly, Vitamin E, Alastomer Gel, Amitose R, Zemea Propanediol, Behentrimonium Chloride. Công dụng: ► Làm mượt tóc, giúp phục hồi tóc khô xơ, hư tổn và dưỡng ẩm cho tóc. ► Hỗ trợ giảm gãy rụng, đẩy nhanh quá trình sinh trưởng của tóc mới. ► Thành phần thiên nhiên giúp nuôi dưỡng mái tóc mềm mượt, bồng bềnh hơn. Hướng dẫn sử dụng: ...');

 insert into SanPham (MaSP, MaNhomSP, MaNguoiBan, TenSP, SoLuongTon, DGBanMacDinh, HinhChinh, MoTa) values
('SP12000070', 'MP', 'CH0012', N'Xanh Farm - Dầu xả thảo mộc Gừng tươi trắc bá diệp - Hỗ trợ giảm rụng tóc, chăm sóc tóc hư tổn', 1000, 180000, '70.jpg', N'Thành phần: Water, Glycerin, Argania Spinosa Kernel Oil (Dầu Argan), ... (xem hướng dẫn sử dụng ở trên).'),
('SP12000071', 'MP', 'CH0012', N'Xanh Farm - Dầu gội thảo mộc Gừng tươi trắc bá diệp - Giảm gàu ngứa, kích thích mọc tóc, giảm rụng tóc', 1000, 230000, '71.jpg', N'Thành phần: Chiết xuất Gừng tươi, Trắc bá diệp, Bồ kết, ... (xem hướng dẫn sử dụng ở trên).'),
('SP13000072', 'TP', 'CH0013', N'Dầu dừa cooking oil VIETCOCO - chai 1 Lít', 1000, 63000, '72.jpg', N'Công nghệ tinh luyện hàng đầu cho chất lượng vượt trội. Dung size: chai PET 1 lít. Quy cách thùng: 12 chai/thùng.'),
('SP13000073', 'TP', 'CH0013', N'Dầu dừa tinh khiết Premium Organic VIETCOCO - 500ml', 1000, 95000, '73.jpg', N'Hoàn toàn tinh khiết và thơm mùi dừa tươi nguyên. Dung tích: 500ml. Quy cách: 24 chai/1 thùng.'),
('SP13000074', 'TP', 'CH0013', N'Dầu dừa cooking oil Vietcoco - chai 2 lít', 1000, 121000, '74.jpg', null),
('SP13000075', 'TP', 'CH0013', N'Nước cốt dừa tươi Premium Organic VIETCOCO - Lon 400ml', 1000, 34900, '75.jpg', N'Từ nguyên liệu hữu cơ hoàn toàn tươi sạch. Dung size: Lon nắp giựt 400ml. Quy cách: 24 lon/thùng.');


 insert into SanPham (MaSP, MaNhomSP, MaNguoiBan, TenSP, SoLuongTon, DGBanMacDinh, HinhChinh, MoTa) values
('SP13000076', 'TP', 'CH0013', N'Bột dừa Premium Organic Vietcoco 500g', 1000, 70000, '76.jpg', N'Thay thế bột mì trong một số công thức làm bánh. Nguyên liệu làm bánh: Donut vị dừa, bánh bông lan bột dừa, bánh mì vị dừa, bánh xèo'),
('SP13000077', 'TP', 'CH0013', N'Nước Màu Dừa Vietcoco 150g', 1000, 28000, '77.jpg', null),
('SP13000078', 'TP', 'CH0013', N'Dầu dừa tinh khiết Premium Organic VIETCOCO - 1000ml', 1000, 185000, '78.jpg', N'Hoàn toàn tinh khiết và thơm mùi dừa tươi nguyên. Dung tích: chai 1 Lít. Quy cách: 12 chai/1 thùng'),
('SP13000079', 'TP', 'CH0013', N'Dầu dừatinh khiết Premium Organic VIETCOCO - 250ml', 1000, 49000, '79.jpg', N'Hoàn toàn tinh khiết và thơm mùi dừa tươi nguyên. Dung tích: 250ml. Quy cách: 24 chai/1 thùng'),
('SP13000080', 'TP', 'CH0013', N'Combo 6 hộp Nước dừa tươi chanh muối VIETCOCO - Hộp giấy 330ml', 1000, 95400, '80.jpg', N'Vị ngọt thanh mát đến từ trái cây vùng nhiệt đới. Dung size: hộp giấy Tetra prisma 330ml. Quy cách: 12 hộp/thùng'),
('SP13000081', 'TP', 'DN0013', N'Combo 6 hộp Nước dừa tươi VIETCOCO - Hộp giấy 330ml', 1000, 89400, '81.jpg', N'Thanh mát, ngọt lành từ dừa tự nhiên. Dung size:hộp giấy Tetra pak 330ml. Quy cách: 12 hộp/thùng'),
('SP13000082', 'TP', 'DN0013', N'Combo 6 hộp Nước dừa tươi Premium Organic VIETCOCO - Hộp giấy 330ml', 1000, 119400, '82.jpg', N'Được sản xuất từ nguồn nguyên liệu dừa Organic trồng theo phương pháp hữu cơ...'),
('SP13000083', 'TP', 'DN0013', N'Sữa Dừa Premium Organic VIETCOCO - Hộp giấy 330ml', 1000, 19900, '83.jpg', N'Từ nguôn nguyên liệu dừa hữu cơ chọn lọc tại bến tre, Sản phẩm sữa dừa hữu cơ Vietcoco Organic vượt qua những tiêu chuẩn gắt gao...');


INSERT INTO PhienBanSanPham (MaPhienBan, MaSP, MaKM, XuatXu, KichThuoc, MauSac, KhoiLuong, DonGiaBan, SoLuongTon, AnhPhienBan)
VALUES
('PB0101', 'SP01000002', 'KM01', 'VN', NULL, NULL, NULL, 210000, 1000, NULL),
('PB0201', 'SP01000002', 'KM01', 'VN', NULL, NULL, NULL, 60000, 1000, NULL),
('PB0301', 'SP01000003', 'KM01', 'VN', NULL, NULL, NULL, 42500, 1000, NULL),
('PB0401', 'SP01000004', 'KM01', 'VN', NULL, NULL, NULL, 115000, 1000, NULL),
('PB0501', 'SP01000005', 'KM01', 'VN', NULL, NULL, NULL, 47500, 1000, NULL),
('PB0601', 'SP01000006', 'KM01', 'VN', NULL, NULL, NULL, 47500, 1000, NULL),
('PB0701', 'SP01000007', 'KM01', 'VN', NULL, NULL, NULL, 125000, 1000, NULL),
('PB0801', 'SP01000008', 'KM01', 'VN', NULL, NULL, NULL, 44000, 1000, NULL),
('PB0901', 'SP01000009', 'KM01', 'VN', NULL, NULL, NULL, 55000, 1000, NULL),
('PB1001', 'SP01000010', 'KM01', 'VN', NULL, NULL, NULL, 25000, 1000, NULL),
('PB1101', 'SP01000011', 'KM01', 'VN', NULL, NULL, NULL, 25500, 1000, NULL),
('PB1201', 'SP01000012', 'KM01', 'VN', NULL, NULL, NULL, 85000, 1000, NULL),
('PB1301', 'SP01000013', 'KM01', 'VN', NULL, NULL, NULL, 210000, 1000, NULL),
('PB1401', 'SP01000014', 'KM01', 'VN', NULL, NULL, NULL, 48000, 1000, NULL),
('PB1501', 'SP01000015', 'KM01', 'VN', NULL, NULL, NULL, 125000, 1000, NULL),
('PB1601', 'SP01000016', 'KM01', 'VN', NULL, NULL, NULL, 50000, 1000, NULL),
('PB1701', 'SP01000017', 'KM01', 'VN', NULL, NULL, NULL, 99000, 1000, NULL),
('PB1801', 'SP01000018', 'KM01', 'VN', NULL, NULL, NULL, 179000, 1000, NULL),
('PB1901', 'SP01000019', 'KM01', 'VN', NULL, NULL, NULL, 256000, 1000, NULL),
('PB2001', 'SP01000020', 'KM01', 'VN', NULL, NULL, NULL, 233700, 1000, NULL),
('PB2101', 'SP01000021', 'KM01', 'VN', NULL, NULL, NULL, 256000, 1000, NULL),
('PB2201', 'SP01000022', 'KM01', 'VN', NULL, NULL, NULL, 42000, 1000, NULL),
('PB2301', 'SP05000023', 'KM01', 'VN', NULL, NULL, NULL, 345000, 1000, NULL),
('PB2401', 'SP05000024', 'KM01', 'VN', NULL, NULL, NULL, 295000, 1000, NULL),
('PB2501', 'SP05000025', 'KM01', 'VN', NULL, NULL, NULL, 295000, 1000, NULL),
('PB2601', 'SP05000026', 'KM01', 'VN', NULL, NULL, NULL, 120000, 1000, NULL),
('PB2701', 'SP05000027', 'KM01', 'VN', NULL, NULL, NULL, 215000, 1000, NULL),
('PB2801', 'SP05000028', 'KM01', 'VN', NULL, NULL, NULL, 245000, 1000, NULL),
('PB2901', 'SP05000029', 'KM01', 'VN', NULL, NULL, NULL, 195000, 1000, NULL),
('PB3001', 'SP05000030', 'KM01', 'VN', NULL, NULL, NULL, 395000, 1000, NULL),
('PB3101', 'SP05000031', 'KM01', 'VN', NULL, NULL, NULL, 295000, 1000, NULL),
('PB3201', 'SP05000032', 'KM01', 'VN', NULL, NULL, NULL, 145000, 1000, NULL),
('PB3301', 'SP06000033', 'KM01', 'VN', NULL, NULL, NULL, 590000, 1000, NULL),
('PB3401', 'SP06000034', 'KM01', 'VN', NULL, NULL, NULL, 219000, 1000, NULL),
('PB3501', 'SP06000035', 'KM01', 'VN', NULL, NULL, NULL, 300000, 1000, NULL),
('PB3601', 'SP06000036', 'KM01', 'VN', NULL, NULL, NULL, 99000, 1000, NULL),
('PB3701', 'SP06000037', 'KM01', 'VN', NULL, NULL, NULL, 129000, 1000, NULL),
('PB3801', 'SP06000038', 'KM01', 'VN', NULL, NULL, NULL, 439000, 1000, NULL),
('PB3901', 'SP06000039', 'KM01', 'VN', NULL, NULL, NULL, 400000, 1000, NULL),
('PB4001', 'SP06000040', 'KM01', 'VN', NULL, NULL, NULL, 219000, 1000, NULL),
('PB4101', 'SP06000041', 'KM01', 'VN', NULL, NULL, NULL, 380000, 1000, NULL);


INSERT INTO PhienBanSanPham (MaPhienBan, MaSP, MaKM, XuatXu, KichThuoc, MauSac, KhoiLuong, DonGiaBan, SoLuongTon, AnhPhienBan)
VALUES 
('PB4201', 'SP06000042', 'KM01', 'VN', NULL, NULL, NULL, 219000, 1000, NULL),
('PB4301', 'SP07000043', 'KM01', 'VN', NULL, NULL, NULL, 25000, 1000, NULL),
('PB4401', 'SP07000044', 'KM01', 'VN', NULL, NULL, NULL, 100000, 1000, NULL),
('PB4501', 'SP07000045', 'KM01', 'VN', NULL, NULL, NULL, 120000, 1000, NULL),
('PB4601', 'SP08000046', 'KM01', 'VN', NULL, NULL, NULL, 38000, 1000, NULL),
('PB4701', 'SP08000047', 'KM01', 'VN', NULL, NULL, NULL, 38000, 1000, NULL),
('PB4801', 'SP08000048', 'KM01', 'VN', NULL, NULL, NULL, 38000, 1000, NULL),
('PB4901', 'SP08000049', 'KM01', 'VN', NULL, NULL, NULL, 38000, 1000, NULL),
('PB5001', 'SP08000050', 'KM01', 'VN', NULL, NULL, NULL, 190000, 1000, NULL),
('PB5101', 'SP08000051', 'KM01', 'VN', NULL, NULL, NULL, 190000, 1000, NULL),
('PB5201', 'SP08000052', 'KM01', 'VN', NULL, NULL, NULL, 190000, 1000, NULL),
('PB5301', 'SP08000053', 'KM01', 'VN', NULL, NULL, NULL, 190000, 1000, NULL),
('PB5401', 'SP08000054', 'KM01', 'VN', NULL, NULL, NULL, 190000, 1000, NULL),
('PB5501', 'SP08000055', 'KM01', 'VN', NULL, NULL, NULL, 380000, 1000, NULL),
('PB5601', 'SP08000056', 'KM01', 'VN', NULL, NULL, NULL, 380000, 1000, NULL),
('PB5701', 'SP09000057', 'KM01', 'VN', NULL, NULL, NULL, 143000, 1000, NULL),
('PB5801', 'SP09000058', 'KM01', 'VN', NULL, NULL, NULL, 45000, 1000, NULL),
('PB5901', 'SP09000059', 'KM01', 'VN', NULL, NULL, NULL, 180000, 1000, NULL),
('PB6001', 'SP10000060', 'KM01', 'VN', '25ml', NULL, NULL, 149000, 1000, NULL),
('PB6101', 'SP10000061', 'KM01', 'VN', '25ml', NULL, NULL, 149000, 1000, NULL),
('PB6201', 'SP11000062', 'KM01', 'VN', '25ml', NULL, NULL, 99000, 1000, NULL),
('PB6301', 'SP11000063', 'KM01', 'VN', '25ml', NULL, NULL, 119000, 1000, NULL),
('PB6401', 'SP11000064', 'KM01', 'VN', '25mlx5', NULL, NULL, 109000, 1000, NULL),
('PB6501', 'SP11000065', 'KM01', 'VN', '25mlx5', NULL, NULL, 269000, 1000, NULL),
('PB6601', 'SP11000066', 'KM01', 'VN', '25mlx5', NULL, NULL, 29000, 1000, NULL),
('PB6701', 'SP12000067', 'KM01', 'VN', '25mlx5', NULL, NULL, 130000, 1000, NULL),
('PB6801', 'SP12000068', 'KM01', 'VN', '25mlx5', NULL, NULL, 210000, 1000, NULL),
('PB6901', 'SP12000069', 'KM01', 'VN', '25mlx10', NULL, NULL, 180000, 1000, NULL),
('PB7001', 'SP12000070', 'KM01', 'VN', '25mlx10', NULL, NULL, 180000, 1000, NULL),
('PB7101', 'SP12000071', 'KM01', 'VN', '190mm x 152mm', NULL, NULL, 230000, 1000, NULL),
('PB7201', 'SP13000072', 'KM01', 'VN', '205mmx205mm', NULL, NULL, 63000, 1000, NULL),
('PB7301', 'SP13000073', 'KM01', 'VN', '405mmx210mm', NULL, NULL, 95000, 1000, NULL),
('PB7401', 'SP13000074', 'KM01', 'VN', '4cmx6cm', NULL, NULL, 121000, 1000, NULL),
('PB7501', 'SP13000075', 'KM01', 'VN', NULL, NULL, NULL, 34900, 1000, NULL),
('PB7601', 'SP13000076', 'KM01', 'VN', '50ml', NULL, NULL, 70000, 1000, NULL),
('PB7701', 'SP13000077', 'KM01', 'VN', '100ml', NULL, NULL, 28000, 1000, NULL),
('PB7801', 'SP13000078', 'KM01', 'VN', '450ml', NULL, NULL, 185000, 1000, NULL),
('PB7901', 'SP13000079', 'KM01', 'VN', '1000ml', NULL, NULL, 49000, 1000, NULL),
('PB8001', 'SP13000080', 'KM01', 'VN', NULL, NULL, NULL, 95400, 1000, NULL),
('PB8101', 'SP13000081', 'KM01', 'VN', '500ml', NULL, NULL, 89400, 1000, NULL),
('PB8201', 'SP13000082', 'KM01', 'VN', '500ml', NULL, NULL, 119400, 1000, NULL),
('PB8301', 'SP13000083', 'KM01', 'VN', '330ml', NULL, NULL, 19900, 1000, NULL);