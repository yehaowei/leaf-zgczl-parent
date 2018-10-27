
create table SYS_MODULE_FUNCTION
(
  module_function_id     NUMBER not null,
  function_group_id       NUMBER,
  function_code         VARCHAR2(200) default '功能代码' not null,
  enabled_flag          VARCHAR2(1),
  image                 VARCHAR(200),
  object_version_number NUMBER default 1,
  request_id            NUMBER,
  program_id            NUMBER,
  created_by            NUMBER,
  creation_date         DATE default sysdate,
  last_updated_by       NUMBER,
  last_update_date      DATE default sysdate,
  last_update_login     NUMBER
);

alter table SYS_MODULE_FUNCTION
  add constraint SYS_MODULE_FUNCTION_PK primary key (module_function_id);

create sequence SYS_MODULE_FUNCTION_S
minvalue 1
maxvalue 999999999
start with 59
increment by 1
cache 20;


create table SYS_MODULE_HOME_PAGE
(
  home_page_id          NUMBER not null,
  function_group_id               NUMBER,
  function_code         VARCHAR2(200) default '功能代码' not null,
  content               VARCHAR2(4000),
  object_version_number NUMBER default 1,
  request_id            NUMBER,
  program_id            NUMBER,
  created_by            NUMBER,
  creation_date         DATE default sysdate,
  last_updated_by       NUMBER,
  last_update_date      DATE default sysdate,
  last_update_login     NUMBER,
  THEME VARCHAR2 ( 255 ),
	SUBJECT VARCHAR2 ( 255 )
);

alter table SYS_MODULE_HOME_PAGE
  add primary key (home_page_id);
  create sequence SYS_MODULE_HOME_PAGE_S
minvalue 1
maxvalue 999999999
start with 59
increment by 1
cache 20;


create table SYS_ROLE_MODULE_WIDGE
(
  role_module_widge_id  NUMBER not null,
  function_group_id     NUMBER,
  role_id                  NUMBER,
  function_code         VARCHAR2(200) default '功能代码' not null,
  enabled_flag          VARCHAR2(1),
  image                 VARCHAR(200),
  object_version_number NUMBER default 1,
  request_id            NUMBER,
  program_id            NUMBER,
  created_by            NUMBER,
  creation_date         DATE default sysdate,
  last_updated_by       NUMBER,
  last_update_date      DATE default sysdate,
  last_update_login     NUMBER
);

alter table SYS_ROLE_MODULE_WIDGE
  add constraint SYS_ROLE_MODULE_WIDGE_PK primary key (role_module_widge_id);

create sequence SYS_ROLE_MODULE_WIDGE_S
minvalue 1
maxvalue 999999999
start with 59
increment by 1
cache 20;


create table SYS_ROLE_MODULE_HOME_PAGE
(
  home_page_id          NUMBER not null,
  function_group_id               NUMBER,
  role_id               NUMBER,
  function_code         VARCHAR2(200) default '功能代码' not null,
  content               VARCHAR2(4000),
  object_version_number NUMBER default 1,
  request_id            NUMBER,
  program_id            NUMBER,
  created_by            NUMBER,
  creation_date         DATE default sysdate,
  last_updated_by       NUMBER,
  last_update_date      DATE default sysdate,
  last_update_login     NUMBER,
  SUBJECT VARCHAR2(255)
);

alter table SYS_ROLE_MODULE_HOME_PAGE
  add primary key (home_page_id);
  create sequence SYS_ROLE_MODULE_HOME_PAGE_S
minvalue 1
maxvalue 999999999
start with 59
increment by 1
cache 20;

create table SYS_USER_MODULE_HOME_PAGE
(
  home_page_id          NUMBER not null,
  function_group_id               NUMBER,
  user_id               NUMBER,
  function_code         VARCHAR2(200) default '功能代码' not null,
  content               VARCHAR2(4000),
  object_version_number NUMBER default 1,
  request_id            NUMBER,
  program_id            NUMBER,
  created_by            NUMBER,
  creation_date         DATE default sysdate,
  last_updated_by       NUMBER,
  last_update_date      DATE default sysdate,
  last_update_login     NUMBER
);

alter table SYS_USER_MODULE_HOME_PAGE
  add primary key (home_page_id);
  create sequence SYS_USER_MODULE_HOME_PAGE_S
minvalue 1
maxvalue 999999999
start with 59
increment by 1
cache 20;
