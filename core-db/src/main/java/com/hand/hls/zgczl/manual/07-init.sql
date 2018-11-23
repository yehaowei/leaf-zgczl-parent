-- 更新首页服务lview
delete from sys_service sv where sv.service_name = 'user_role_home_page.lview';
update sys_service s set s.SERVICE_NAME = 'user_role_home_page.lview'  where s.TITLE = '首页';