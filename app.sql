create database egg_house;

use egg_house;

--- 用户表
create table `user`(
    `id` int not null auto_increment,
    `username` varchar(20) default null comment '用户名',
    `password` varchar(64) default null comment '密码',
    `avatar` text comment '头像',
    `phone` varchar(20) default null comment '电话',
    `sign` varchar(300) default null comment '用户签名',
    `createTime` timestamp default '0000-00-00 00:00:00' comment "创建时间",
    `updateTime` timestamp default '0000-00-00 00:00:00' comment "更新时间",
    primary key(`id`)
) engine=InnoDB auto_increment=1 default charset=utf8 comment="用户表";


--- 民宿表
create table `house` (
    `id` int not null auto_increment,
    `name` varchar(50) default null comment '房屋名称',
    `info` varchar(150) default null comment '房屋简介',
    `addres` varchar(300) default null comment '房屋地址',
    `price` int(5) default null comment '房屋价格',
    `publishTime` timestamp default '0000-00-00 00:00:00' comment '发布时间',
    `cityCode` varchar(10) not null comment '城市编码',
    `showCount` int(5) not null default 0 comment '展示次数',
    `startTime` timestamp default '0000-00-00 00:00:00' comment '开始出租时间',
    `endTime` timestamp default '0000-00-00 00:00:00' comment '出租结束时间',
    primary key(`id`)
) engine=InnoDB auto_increment=1 default charset=utf8 comment="房屋表";

--- 图片表

create table `imgs` (
    `id` int not null auto_increment,
    `url` varchar(500) default null comment '图片地址',
    `houseId` int not null comment '房屋id',
    `createTime` timestamp default '0000-00-00 00:00:00' comment '创建时间',
    primary key(`id`)
) engine=InnoDB auto_increment=1 default charset=utf8 comment="图片表";

--- 评论表
create table `comment` (
    `id` int not null auto_increment,
    `userId`int not null comment '用户表id',
    `houseId`int not null comment '房屋表id',
    `msg` varchar(500) default null comment '评论内容',
    `createTime` timestamp default '0000-00-00 00:00:00' comment '创建时间',
    primary key(`id`)
) engine=InnoDB auto_increment=1 default charset=utf8 comment="评论表";


INSERT INTO `house` VALUES
(8, '东城民宿','东区 靠近地铁','东城区', 100, '2020-08-01 14:20:30', '100001', 1,'2020-8-2 :15:10:10','2020-8-3 :15:10:10'),
(9, '西城民宿','西区 靠近地铁','西区', 300, '2020-08-01 14:20:30', '100001', 1,'2020-8-2 :15:10:10','2020-8-3 :15:10:10'),
(10, '北城民宿','北区 靠近地铁','北区', 200, '2020-08-01 14:20:30', '100001', 1,'2020-8-2 :15:10:10','2020-8-3 :15:10:10'),
(11, '南城民宿','南区 靠近地铁','南区', 100, '2020-08-01 14:20:30', '100001', 0,'2020-8-2 :15:10:10','2020-8-3 :15:10:10'),
(12, '新中民宿','新中区 靠近地铁','新中区', 100, '2020-08-01 14:20:30', '100001', 0, '2020-8-2 :15:10:10','2020-8-3 :15:10:10');


INSERT INTO `imgs` VALUES
(1, 'https://pix8.agoda.net/hotelImages/298/298658/298658_15081411170034272625.png?s=1024x768',1, '2020-08-01 14:20:30'),
(2, 'https://pix8.agoda.net/hotelImages/298/298658/298658_120223135405073.jpg',1, '2020-08-02 14:20:30'),
(3, 'https://pix8.agoda.net/hotelImages/298/298658/298658_15081411170034272625.png',1, '2020-08-03 14:20:30'),
(4, 'https://pix8.agoda.net/hotelImages/298/298658/298658_15081411170034272625.png',2, '2020-08-04 14:20:30');



---订单表

create table `orders` (
    `id` int not null auto_increment,
    `orderNumber` varchar(20) default null comment '订单编号',
    `userId` int not null comment '用户Id',
    `houseId` int not null comment '房屋Id',
    `isPayed` int default 0 comment '是否支付，0表示未支付，1表示支付' ,
    `createTime` timestamp default '0000-00-00 00:00:00' comment '创建时间',
    `updateTime` timestamp default '0000-00-00 00:00:00' comment '更新时间',
    primary key(`id`)
) engine=InnoDB auto_increment=1 default charset=utf8 comment="订单表";