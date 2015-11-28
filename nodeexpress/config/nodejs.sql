DROP TABLE IF EXISTS `gb_user_info`;
CREATE TABLE `gb_user_info` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `username` varchar(20) NOT NULL default '用户名',
  `realname` varchar(20) NOT NULL COMMENT '真实姓名',
  `passwcrd` char(30) NOT NULL default '',
  `birthday` int(11) NOT NULL COMMENT '',
  `sex` varchar(2) NOT NULL COMMENT '性别',
  `telephone` varchar(11) NOT NULL COMMENT '手机号',
  `email` varchar(40) NOT NULL COMMENT 'Email',
  `area_id` int(11) NOT NULL COMMENT '区域',
  `isenable` tinyint(1) NOT NULL COMMENT '是否可用',
  `add_time` int(11) NOT NULL COMMENT '添加时间',
  `from_type` tinyint(1) NOT NULL COMMENT '来源类型:PC/移动',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息表';

DROP TABLE IF EXISTS `gb_school_info`;
CREATE TABLE `gb_school_info` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `name` varchar(20) NOT NULL default '学校名称',
  `code` varchar(20) NOT NULL COMMENT '学校编码',
  `area_id` int(11) NOT NULL COMMENT '区域',
  `isenable` tinyint(1) NOT NULL COMMENT '是否可用',
  `add_time` int(11) NOT NULL COMMENT '添加时间',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息表';
