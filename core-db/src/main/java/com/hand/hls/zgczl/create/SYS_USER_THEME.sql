create table SYS_USER_THEME
(
  sys_user_theme_id     NUMBER not null,
  user_id               NUMBER,
  theme                 VARCHAR2(200) default '主题名称' not null,
  object_version_number NUMBER default 1,
  request_id            NUMBER,
  program_id            NUMBER,
  created_by            NUMBER,
  creation_date         DATE default sysdate,
  last_updated_by       NUMBER,
  last_update_date      DATE default sysdate,
  last_update_login     NUMBER,
  SUBJECT VARCHAR2 ( 200 ) DEFAULT 'HAP'
);

alter table SYS_USER_THEME
  add constraint SYS_USER_THEME_PK primary key (sys_user_theme_id);

create sequence SYS_USER_THEME_S
minvalue 1
maxvalue 999999999
start with 59
increment by 1
cache 20;
