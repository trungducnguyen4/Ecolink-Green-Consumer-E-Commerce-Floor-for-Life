/*==============================================================*/
/* DBMS name:      Microsoft SQL Server 2008                    */
/* Created on:     28/10/2024 1:59:26 PM                        */
/*==============================================================*/


if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('BAIVIETNGUOIBAN') and o.name = 'FK_BAIVIETN_TAO_NGUOIBAN')
alter table BAIVIETNGUOIBAN
   drop constraint FK_BAIVIETN_TAO_NGUOIBAN
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('BINHLUAN') and o.name = 'FK_BINHLUAN_BINHLUAN_BAIVIETN')
alter table BINHLUAN
   drop constraint FK_BINHLUAN_BINHLUAN_BAIVIETN
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('BINHLUAN') and o.name = 'FK_BINHLUAN_BINHLUAN2_NGUOIDUN')
alter table BINHLUAN
   drop constraint FK_BINHLUAN_BINHLUAN2_NGUOIDUN
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('CTDH') and o.name = 'FK_CTDH_CTDH_DONHANG')
alter table CTDH
   drop constraint FK_CTDH_CTDH_DONHANG
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('CTDH') and o.name = 'FK_CTDH_CTDH2_SANPHAM')
alter table CTDH
   drop constraint FK_CTDH_CTDH2_SANPHAM
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('CT_DDX') and o.name = 'FK_CT_DDX_CT_DDX_SANPHAM')
alter table CT_DDX
   drop constraint FK_CT_DDX_CT_DDX_SANPHAM
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('CT_DDX') and o.name = 'FK_CT_DDX_CT_DDX2_DACDIEMX')
alter table CT_DDX
   drop constraint FK_CT_DDX_CT_DDX2_DACDIEMX
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DANHGIASANPHAM') and o.name = 'FK_DANHGIAS_DANHGIASA_NGUOIDUN')
alter table DANHGIASANPHAM
   drop constraint FK_DANHGIAS_DANHGIASA_NGUOIDUN
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DANHGIASANPHAM') and o.name = 'FK_DANHGIAS_DANHGIASA_SANPHAM')
alter table DANHGIASANPHAM
   drop constraint FK_DANHGIAS_DANHGIASA_SANPHAM
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DONHANG') and o.name = 'FK_DONHANG_CHO_PHUONGTH')
alter table DONHANG
   drop constraint FK_DONHANG_CHO_PHUONGTH
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DONHANG') and o.name = 'FK_DONHANG_CUA_PHUONGTH')
alter table DONHANG
   drop constraint FK_DONHANG_CUA_PHUONGTH
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('DONHANG') and o.name = 'FK_DONHANG_MUA_NGUOIDUN')
alter table DONHANG
   drop constraint FK_DONHANG_MUA_NGUOIDUN
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('GIOHANG') and o.name = 'FK_GIOHANG_CO_NGUOIDUN')
alter table GIOHANG
   drop constraint FK_GIOHANG_CO_NGUOIDUN
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('KHUYENMAI') and o.name = 'FK_KHUYENMA_TAO_RA_NGUOIBAN')
alter table KHUYENMAI
   drop constraint FK_KHUYENMA_TAO_RA_NGUOIBAN
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NGUOIBAN') and o.name = 'FK_NGUOIBAN_LA2_NGUOIDUN')
alter table NGUOIBAN
   drop constraint FK_NGUOIBAN_LA2_NGUOIDUN
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('NGUOIDUNG') and o.name = 'FK_NGUOIDUN_LA_NGUOIBAN')
alter table NGUOIDUNG
   drop constraint FK_NGUOIDUN_LA_NGUOIBAN
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('SANPHAM') and o.name = 'FK_SANPHAM_THUOC_NHOMSANP')
alter table SANPHAM
   drop constraint FK_SANPHAM_THUOC_NHOMSANP
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('SANPHAM') and o.name = 'FK_SANPHAM_VE_KHUYENMA')
alter table SANPHAM
   drop constraint FK_SANPHAM_VE_KHUYENMA
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('SANPHAMTRONGGIO') and o.name = 'FK_SANPHAMT_SANPHAMTR_GIOHANG')
alter table SANPHAMTRONGGIO
   drop constraint FK_SANPHAMT_SANPHAMTR_GIOHANG
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('SANPHAMTRONGGIO') and o.name = 'FK_SANPHAMT_SANPHAMTR_SANPHAM')
alter table SANPHAMTRONGGIO
   drop constraint FK_SANPHAMT_SANPHAMTR_SANPHAM
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('BAIVIETNGUOIBAN')
            and   name  = 'TAO_FK'
            and   indid > 0
            and   indid < 255)
   drop index BAIVIETNGUOIBAN.TAO_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('BAIVIETNGUOIBAN')
            and   type = 'U')
   drop table BAIVIETNGUOIBAN
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('BINHLUAN')
            and   name  = 'BINHLUAN_FK'
            and   indid > 0
            and   indid < 255)
   drop index BINHLUAN.BINHLUAN_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('BINHLUAN')
            and   name  = 'BINHLUAN2_FK'
            and   indid > 0
            and   indid < 255)
   drop index BINHLUAN.BINHLUAN2_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('BINHLUAN')
            and   type = 'U')
   drop table BINHLUAN
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('CTDH')
            and   name  = 'CTDH_FK'
            and   indid > 0
            and   indid < 255)
   drop index CTDH.CTDH_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('CTDH')
            and   name  = 'CTDH2_FK'
            and   indid > 0
            and   indid < 255)
   drop index CTDH.CTDH2_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CTDH')
            and   type = 'U')
   drop table CTDH
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('CT_DDX')
            and   name  = 'CT_DDX_FK'
            and   indid > 0
            and   indid < 255)
   drop index CT_DDX.CT_DDX_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('CT_DDX')
            and   name  = 'CT_DDX2_FK'
            and   indid > 0
            and   indid < 255)
   drop index CT_DDX.CT_DDX2_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CT_DDX')
            and   type = 'U')
   drop table CT_DDX
go

if exists (select 1
            from  sysobjects
           where  id = object_id('DACDIEMXANH')
            and   type = 'U')
   drop table DACDIEMXANH
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DANHGIASANPHAM')
            and   name  = 'DANHGIASANPHAM_FK'
            and   indid > 0
            and   indid < 255)
   drop index DANHGIASANPHAM.DANHGIASANPHAM_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DANHGIASANPHAM')
            and   name  = 'DANHGIASANPHAM2_FK'
            and   indid > 0
            and   indid < 255)
   drop index DANHGIASANPHAM.DANHGIASANPHAM2_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('DANHGIASANPHAM')
            and   type = 'U')
   drop table DANHGIASANPHAM
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DONHANG')
            and   name  = 'CHO_FK'
            and   indid > 0
            and   indid < 255)
   drop index DONHANG.CHO_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DONHANG')
            and   name  = 'CUA_FK'
            and   indid > 0
            and   indid < 255)
   drop index DONHANG.CUA_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('DONHANG')
            and   name  = 'MUA_FK'
            and   indid > 0
            and   indid < 255)
   drop index DONHANG.MUA_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('DONHANG')
            and   type = 'U')
   drop table DONHANG
go

if exists (select 1
            from  sysobjects
           where  id = object_id('GIOHANG')
            and   type = 'U')
   drop table GIOHANG
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('KHUYENMAI')
            and   name  = 'TAO_RA_FK'
            and   indid > 0
            and   indid < 255)
   drop index KHUYENMAI.TAO_RA_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('KHUYENMAI')
            and   type = 'U')
   drop table KHUYENMAI
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NGUOIBAN')
            and   name  = 'LA2_FK'
            and   indid > 0
            and   indid < 255)
   drop index NGUOIBAN.LA2_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NGUOIBAN')
            and   type = 'U')
   drop table NGUOIBAN
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('NGUOIDUNG')
            and   name  = 'LA_FK'
            and   indid > 0
            and   indid < 255)
   drop index NGUOIDUNG.LA_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NGUOIDUNG')
            and   type = 'U')
   drop table NGUOIDUNG
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NHOMSANPHAM')
            and   type = 'U')
   drop table NHOMSANPHAM
go

if exists (select 1
            from  sysobjects
           where  id = object_id('PHUONGTHUCTHANHTOAN')
            and   type = 'U')
   drop table PHUONGTHUCTHANHTOAN
go

if exists (select 1
            from  sysobjects
           where  id = object_id('PHUONGTHUCVANCHUYEN')
            and   type = 'U')
   drop table PHUONGTHUCVANCHUYEN
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('SANPHAM')
            and   name  = 'VE_FK'
            and   indid > 0
            and   indid < 255)
   drop index SANPHAM.VE_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('SANPHAM')
            and   name  = 'THUOC_FK'
            and   indid > 0
            and   indid < 255)
   drop index SANPHAM.THUOC_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('SANPHAM')
            and   type = 'U')
   drop table SANPHAM
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('SANPHAMTRONGGIO')
            and   name  = 'SANPHAMTRONGGIO_FK'
            and   indid > 0
            and   indid < 255)
   drop index SANPHAMTRONGGIO.SANPHAMTRONGGIO_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('SANPHAMTRONGGIO')
            and   name  = 'SANPHAMTRONGGIO2_FK'
            and   indid > 0
            and   indid < 255)
   drop index SANPHAMTRONGGIO.SANPHAMTRONGGIO2_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('SANPHAMTRONGGIO')
            and   type = 'U')
   drop table SANPHAMTRONGGIO
go

/*==============================================================*/
/* Table: BAIVIETNGUOIBAN                                       */
/*==============================================================*/
create table BAIVIETNGUOIBAN (
   MABAIVIET            nvarchar(20)         not null,
   MANGUOIBAN           nvarchar(20)         not null,
   TIEUDE               nvarchar(200)        null,
   NOIDUNG              text                 null,
   NGAYDANG             datetime             null,
   HIENTHI              bit                  null,
   constraint PK_BAIVIETNGUOIBAN primary key nonclustered (MABAIVIET)
)
go

/*==============================================================*/
/* Index: TAO_FK                                                */
/*==============================================================*/
create index TAO_FK on BAIVIETNGUOIBAN (
MANGUOIBAN ASC
)
go

/*==============================================================*/
/* Table: BINHLUAN                                              */
/*==============================================================*/
create table BINHLUAN (
   MAUSER               nvarchar(20)         not null,
   MABAIVIET            nvarchar(20)         not null,
   NOIDUNG              text                 null,
   constraint PK_BINHLUAN primary key nonclustered (MAUSER, MABAIVIET)
)
go

/*==============================================================*/
/* Index: BINHLUAN2_FK                                          */
/*==============================================================*/
create index BINHLUAN2_FK on BINHLUAN (
MAUSER ASC
)
go

/*==============================================================*/
/* Index: BINHLUAN_FK                                           */
/*==============================================================*/
create index BINHLUAN_FK on BINHLUAN (
MABAIVIET ASC
)
go

/*==============================================================*/
/* Table: CTDH                                                  */
/*==============================================================*/
create table CTDH (
   MASP                 nvarchar(20)         not null,
   MADH                 nvarchar(20)         not null,
   SOLUONGSP            int                  null,
   constraint PK_CTDH primary key nonclustered (MASP, MADH)
)
go

/*==============================================================*/
/* Index: CTDH2_FK                                              */
/*==============================================================*/
create index CTDH2_FK on CTDH (
MASP ASC
)
go

/*==============================================================*/
/* Index: CTDH_FK                                               */
/*==============================================================*/
create index CTDH_FK on CTDH (
MADH ASC
)
go

/*==============================================================*/
/* Table: CT_DDX                                                */
/*==============================================================*/
create table CT_DDX (
   MADDX                nchar(20)            not null,
   MASP                 nvarchar(20)         not null,
   HINHDDX              nvarchar(300)        null,
   COQUANCAP            nvarchar(150)        null,
   constraint PK_CT_DDX primary key nonclustered (MADDX, MASP)
)
go

/*==============================================================*/
/* Index: CT_DDX2_FK                                            */
/*==============================================================*/
create index CT_DDX2_FK on CT_DDX (
MADDX ASC
)
go

/*==============================================================*/
/* Index: CT_DDX_FK                                             */
/*==============================================================*/
create index CT_DDX_FK on CT_DDX (
MASP ASC
)
go

/*==============================================================*/
/* Table: DACDIEMXANH                                           */
/*==============================================================*/
create table DACDIEMXANH (
   MADDX                nchar(20)            not null,
   TENDDX               nvarchar(100)        null,
   MOTADDX              nvarchar(200)        null,
   constraint PK_DACDIEMXANH primary key nonclustered (MADDX)
)
go

/*==============================================================*/
/* Table: DANHGIASANPHAM                                        */
/*==============================================================*/
create table DANHGIASANPHAM (
   MASP                 nvarchar(20)         not null,
   MAUSER               nvarchar(20)         not null,
   DIEMDANHGIA          int                  null,
   NDDANHGIA            text                 null,
   NGAYDANHGIA          datetime             null,
   HINHDANHGIA          nvarchar(300)        null,
   VIDEODANHGIA         nvarchar(300)        null,
   constraint PK_DANHGIASANPHAM primary key nonclustered (MASP, MAUSER)
)
go

/*==============================================================*/
/* Index: DANHGIASANPHAM2_FK                                    */
/*==============================================================*/
create index DANHGIASANPHAM2_FK on DANHGIASANPHAM (
MASP ASC
)
go

/*==============================================================*/
/* Index: DANHGIASANPHAM_FK                                     */
/*==============================================================*/
create index DANHGIASANPHAM_FK on DANHGIASANPHAM (
MAUSER ASC
)
go

/*==============================================================*/
/* Table: DONHANG                                               */
/*==============================================================*/
create table DONHANG (
   MADH                 nvarchar(20)         not null,
   MAUSER               nvarchar(20)         not null,
   MAPTVC               nvarchar(20)         not null,
   MAPTTT               nchar(20)            not null,
   NGAYDATHANG          datetime             null,
   TONGTIEN             int                  null,
   TRANGTHAIDH          nvarchar(30)         null,
   constraint PK_DONHANG primary key nonclustered (MADH)
)
go

/*==============================================================*/
/* Index: MUA_FK                                                */
/*==============================================================*/
create index MUA_FK on DONHANG (
MAUSER ASC
)
go

/*==============================================================*/
/* Index: CUA_FK                                                */
/*==============================================================*/
create index CUA_FK on DONHANG (
MAPTVC ASC
)
go

/*==============================================================*/
/* Index: CHO_FK                                                */
/*==============================================================*/
create index CHO_FK on DONHANG (
MAPTTT ASC
)
go

/*==============================================================*/
/* Table: GIOHANG                                               */
/*==============================================================*/
create table GIOHANG (
   MAUSER               nvarchar(20)         not null,
   MAGIOHANG            nvarchar(20)         not null,
   NGAYTAOGIO           datetime             null,
   constraint PK_GIOHANG primary key nonclustered (MAUSER, MAGIOHANG)
)
go

/*==============================================================*/
/* Table: KHUYENMAI                                             */
/*==============================================================*/
create table KHUYENMAI (
   MAKM                 nvarchar(20)         not null,
   MANGUOIBAN           nvarchar(20)         not null,
   TENKM                nvarchar(50)         null,
   NOIDUNGKM            nvarchar(100)        null,
   GIAMGIA              float                null,
   TGIAKM               float                null,
   DKAPDUNG             nvarchar(400)        null,
   NGAYBATDAU           datetime             null,
   NGAYKETTHUC          datetime             null,
   constraint PK_KHUYENMAI primary key nonclustered (MAKM)
)
go

/*==============================================================*/
/* Index: TAO_RA_FK                                             */
/*==============================================================*/
create index TAO_RA_FK on KHUYENMAI (
MANGUOIBAN ASC
)
go

/*==============================================================*/
/* Table: NGUOIBAN                                              */
/*==============================================================*/
create table NGUOIBAN (
   MANGUOIBAN           nvarchar(20)         not null,
   MAUSER               nvarchar(20)         not null,
   TENCUAHANG           nvarchar(100)        null,
   MOTACH               text                 null,
   NGAYTAOCH            datetime             null,
   TTCUAHANG            nvarchar(50)         null,
   constraint PK_NGUOIBAN primary key nonclustered (MANGUOIBAN)
)
go

/*==============================================================*/
/* Index: LA2_FK                                                */
/*==============================================================*/
create index LA2_FK on NGUOIBAN (
MAUSER ASC
)
go

/*==============================================================*/
/* Table: NGUOIDUNG                                             */
/*==============================================================*/
create table NGUOIDUNG (
   MAUSER               nvarchar(20)         not null,
   MANGUOIBAN           nvarchar(20)         null,
   HOUSER               nvarchar(50)         null,
   TENUSER              nvarchar(30)         null,
   TENDANGNHAP          nvarchar(50)         null,
   MATKHAU              nvarchar(20)         null,
   NGUOIMUA             bit                  null,
   NGAYTAO              datetime             null,
   TTUSER               nvarchar(50)         null,
   SODIENTHOAI          nvarchar(15)         null,
   DIACHI               nvarchar(150)        null,
   EMAIL                nvarchar(100)        null,
   constraint PK_NGUOIDUNG primary key nonclustered (MAUSER)
)
go

/*==============================================================*/
/* Index: LA_FK                                                 */
/*==============================================================*/
create index LA_FK on NGUOIDUNG (
MANGUOIBAN ASC
)
go

/*==============================================================*/
/* Table: NHOMSANPHAM                                           */
/*==============================================================*/
create table NHOMSANPHAM (
   MANHOMSP             nvarchar(20)         not null,
   TENNHOMSP            nvarchar(100)        null,
   MOTA                 text                 null,
   constraint PK_NHOMSANPHAM primary key nonclustered (MANHOMSP)
)
go

/*==============================================================*/
/* Table: PHUONGTHUCTHANHTOAN                                   */
/*==============================================================*/
create table PHUONGTHUCTHANHTOAN (
   MAPTTT               nchar(20)            not null,
   TENPTTT              nvarchar(100)        null,
   MOTAPTTT             nvarchar(300)        null,
   constraint PK_PHUONGTHUCTHANHTOAN primary key nonclustered (MAPTTT)
)
go

/*==============================================================*/
/* Table: PHUONGTHUCVANCHUYEN                                   */
/*==============================================================*/
create table PHUONGTHUCVANCHUYEN (
   MAPTVC               nvarchar(20)         not null,
   TENPTVC              nvarchar(50)         null,
   PHIVC                int                  null,
   THOIGIANGH           nvarchar(50)         null,
   constraint PK_PHUONGTHUCVANCHUYEN primary key nonclustered (MAPTVC)
)
go

/*==============================================================*/
/* Table: SANPHAM                                               */
/*==============================================================*/
create table SANPHAM (
   MASP                 nvarchar(20)         not null,
   MANHOMSP             nvarchar(20)         not null,
   MAKM                 nvarchar(20)         not null,
   TENSP                nvarchar(100)        null,
   XUATXU               text                 null,
   DGBAN                int                  null,
   SOLUONGTON           int                  null,
   CONHANG              bit                  null,
   NSX                  datetime             null,
   HSD                  datetime             null,
   MOTACH               text                 null,
   HINH                 nvarchar(100)        null,
   constraint PK_SANPHAM primary key nonclustered (MASP)
)
go

/*==============================================================*/
/* Index: THUOC_FK                                              */
/*==============================================================*/
create index THUOC_FK on SANPHAM (
MANHOMSP ASC
)
go

/*==============================================================*/
/* Index: VE_FK                                                 */
/*==============================================================*/
create index VE_FK on SANPHAM (
MAKM ASC
)
go

/*==============================================================*/
/* Table: SANPHAMTRONGGIO                                       */
/*==============================================================*/
create table SANPHAMTRONGGIO (
   MASP                 nvarchar(20)         not null,
   MAUSER               nvarchar(20)         not null,
   MAGIOHANG            nvarchar(20)         not null,
   SOLUONGSPTRONGGIO    int                  null,
   constraint PK_SANPHAMTRONGGIO primary key nonclustered (MASP, MAUSER, MAGIOHANG)
)
go

/*==============================================================*/
/* Index: SANPHAMTRONGGIO2_FK                                   */
/*==============================================================*/
create index SANPHAMTRONGGIO2_FK on SANPHAMTRONGGIO (
MASP ASC
)
go

/*==============================================================*/
/* Index: SANPHAMTRONGGIO_FK                                    */
/*==============================================================*/
create index SANPHAMTRONGGIO_FK on SANPHAMTRONGGIO (
MAUSER ASC,
MAGIOHANG ASC
)
go

alter table BAIVIETNGUOIBAN
   add constraint FK_BAIVIETN_TAO_NGUOIBAN foreign key (MANGUOIBAN)
      references NGUOIBAN (MANGUOIBAN)
go

alter table BINHLUAN
   add constraint FK_BINHLUAN_BINHLUAN_BAIVIETN foreign key (MABAIVIET)
      references BAIVIETNGUOIBAN (MABAIVIET)
go

alter table BINHLUAN
   add constraint FK_BINHLUAN_BINHLUAN2_NGUOIDUN foreign key (MAUSER)
      references NGUOIDUNG (MAUSER)
go

alter table CTDH
   add constraint FK_CTDH_CTDH_DONHANG foreign key (MADH)
      references DONHANG (MADH)
go

alter table CTDH
   add constraint FK_CTDH_CTDH2_SANPHAM foreign key (MASP)
      references SANPHAM (MASP)
go

alter table CT_DDX
   add constraint FK_CT_DDX_CT_DDX_SANPHAM foreign key (MASP)
      references SANPHAM (MASP)
go

alter table CT_DDX
   add constraint FK_CT_DDX_CT_DDX2_DACDIEMX foreign key (MADDX)
      references DACDIEMXANH (MADDX)
go

alter table DANHGIASANPHAM
   add constraint FK_DANHGIAS_DANHGIASA_NGUOIDUN foreign key (MAUSER)
      references NGUOIDUNG (MAUSER)
go

alter table DANHGIASANPHAM
   add constraint FK_DANHGIAS_DANHGIASA_SANPHAM foreign key (MASP)
      references SANPHAM (MASP)
go

alter table DONHANG
   add constraint FK_DONHANG_CHO_PHUONGTH foreign key (MAPTTT)
      references PHUONGTHUCTHANHTOAN (MAPTTT)
go

alter table DONHANG
   add constraint FK_DONHANG_CUA_PHUONGTH foreign key (MAPTVC)
      references PHUONGTHUCVANCHUYEN (MAPTVC)
go

alter table DONHANG
   add constraint FK_DONHANG_MUA_NGUOIDUN foreign key (MAUSER)
      references NGUOIDUNG (MAUSER)
go

alter table GIOHANG
   add constraint FK_GIOHANG_CO_NGUOIDUN foreign key (MAUSER)
      references NGUOIDUNG (MAUSER)
go

alter table KHUYENMAI
   add constraint FK_KHUYENMA_TAO_RA_NGUOIBAN foreign key (MANGUOIBAN)
      references NGUOIBAN (MANGUOIBAN)
go

alter table NGUOIBAN
   add constraint FK_NGUOIBAN_LA2_NGUOIDUN foreign key (MAUSER)
      references NGUOIDUNG (MAUSER)
go

alter table NGUOIDUNG
   add constraint FK_NGUOIDUN_LA_NGUOIBAN foreign key (MANGUOIBAN)
      references NGUOIBAN (MANGUOIBAN)
go

alter table SANPHAM
   add constraint FK_SANPHAM_THUOC_NHOMSANP foreign key (MANHOMSP)
      references NHOMSANPHAM (MANHOMSP)
go

alter table SANPHAM
   add constraint FK_SANPHAM_VE_KHUYENMA foreign key (MAKM)
      references KHUYENMAI (MAKM)
go

alter table SANPHAMTRONGGIO
   add constraint FK_SANPHAMT_SANPHAMTR_GIOHANG foreign key (MAUSER, MAGIOHANG)
      references GIOHANG (MAUSER, MAGIOHANG)
go

alter table SANPHAMTRONGGIO
   add constraint FK_SANPHAMT_SANPHAMTR_SANPHAM foreign key (MASP)
      references SANPHAM (MASP)
go

