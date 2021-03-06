-- ----------------------------
-- 功能定义
-- ----------------------------
begin
sys_service_pkg.sys_service_load('user_role_home_page.lview','用户首页',1,1,0);
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','user_module_home_page.lview');
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','user_role_home_page.lview');
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','modules/sys/SYS870/sys_function_edit.lview');
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','modules/sys/SYS870/module_index.lview');
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','home_page/WIDGET-WFL/WIDGET-WFL.lview');
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','home_page/WIDGET-WFL/WIDGET-WFL-MESSAGE.lview');
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','home_page/WIDGET-CALCULATOR/WIDGET-CALCULATOR.lview');
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','sys_user_config.lview');
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','home_page/WIDGET-ASSET/WIDGET-ASSET-INFO.lview');
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','home_page/WIDGET-BP/WIDGET-BP-MANAGE.lview');
sys_function_assign_pkg.func_service_load('SYS870','modules/sys/SYS870/sys_function_edit.lview');
sys_function_assign_pkg.func_service_load('SYS870','modules/sys/SYS870/sys_function_group.lview');
sys_function_assign_pkg.func_service_load('SYS870','modules/sys/SYS870/module_index.lview');
sys_function_assign_pkg.func_service_load('ACP510','modules/acp/ACP510/acp_invoice_condition.lview');
sys_function_assign_pkg.func_service_load('ACP510','modules/acp/ACP510/acp_invoice_create.lview');
sys_function_assign_pkg.func_service_load('ACP510','modules/acp/ACP510/acp_invoice_select_cashflow.lview');
sys_function_assign_pkg.func_service_load('ACP510','modules/acp/ACP510/acp_invoice_create_invoice.lview');
sys_function_assign_pkg.func_service_load('ACP510','modules/acp/ACP510/acp_invoice_save_selected.lsc');
sys_function_assign_pkg.func_service_load('ACP510','modules/acp/ACP510/acp_invoice_create.lsc');
sys_function_assign_pkg.func_service_load('WIDGET-WFL','home_page/WIDGET-WFL/WIDGET-WFL.lview' );
sys_function_assign_pkg.func_service_load('WIDGET-WFL','modules/zjwfl/ZJWFL5110/zj_wfl_approve.lview' );
sys_function_assign_pkg.func_service_load('WIDGET-WFL','modules/zjwfl/ZJWFL3040/zj_wfl_my_approved_application_history.lview' );
sys_function_assign_pkg.func_service_load('WIDGET-WFL-MESSAGE','home_page/WIDGET-WFL/WIDGET-WFL-MESSAGE.lview' );
sys_function_assign_pkg.func_service_load('WIDGET-CALCULATOR','home_page/WIDGET-CALCULATOR/WIDGET-CALCULATOR.lview' );
sys_function_assign_pkg.func_service_load('WIDGET-ASSET-COUNT','home_page/WIDGET-ASSET/WIDGET-ASSET-COUNT.lview' );
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','home_page/WIDGET-ASSET/WIDGET-ASSET-COUNT.lview' );
sys_function_assign_pkg.func_service_load('WIDGET-ASSET-INFO','home_page/WIDGET-ASSET/WIDGET-ASSET-INFO.lview' );
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','home_page/WIDGET-ASSET/WIDGET-ASSET-INFO.lview' );
sys_function_assign_pkg.func_service_load('WIDGET-CONT-CF-CNY','home_page/WIDGET-CONTRACT/WIDGET-CONT-CF-CNY.lview' );
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','home_page/WIDGET-CONTRACT/WIDGET-CONT-CF-CNY.lview' );
sys_function_assign_pkg.func_service_load('WIDGET-CONT-CF-USD','home_page/WIDGET-CONTRACT/WIDGET-CONT-CF-USD.lview' );
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','home_page/WIDGET-CONTRACT/WIDGET-CONT-CF-USD.lview' );
sys_function_assign_pkg.func_service_load('WIDGET-CONT-COUNT-NEW','home_page/WIDGET-CONTRACT/WIDGET-CONT-COUNT-NEW.lview' );
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','home_page/WIDGET-CONTRACT/WIDGET-CONT-COUNT-NEW.lview' );
sys_function_assign_pkg.func_service_load('WIDGET-CONT-PRJ','home_page/WIDGET-CONTRACT/WIDGET-CONT-PRJ.lview' );
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','home_page/WIDGET-CONTRACT/WIDGET-CONT-PRJ.lview' );
sys_function_assign_pkg.func_service_load('WIDGET-CONT-PRJ-PRO','home_page/WIDGET-CONTRACT/WIDGET-CONT-PRJ-PRO.lview' );
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','home_page/WIDGET-CONTRACT/WIDGET-CONT-PRJ-PRO.lview' );
sys_function_assign_pkg.func_service_load('WIDGET-CONT-RECENT','home_page/WIDGET-CONTRACT/WIDGET-CONT-RECENT.lview' );
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','home_page/WIDGET-CONTRACT/WIDGET-CONT-RECENT.lview' );
sys_function_assign_pkg.func_service_load('WIDGET-CSH-COUNT','home_page/WIDGET-CSH/WIDGET-CSH-COUNT.lview' );
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','home_page/WIDGET-CSH/WIDGET-CSH-COUNT.lview' );
sys_function_assign_pkg.func_service_load('WIDGET-CSH-COUNT-LINE','home_page/WIDGET-CSH/WIDGET-CSH-COUNT-LINE.lview' );
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','home_page/WIDGET-CSH/WIDGET-CSH-COUNT-LINE.lview' );
sys_function_assign_pkg.func_service_load('WIDGET-GOQUERY-FUND','home_page/WIDGET-ASSET/WIDGET-GOQUERY-FUND.lview' );
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','home_page/WIDGET-ASSET/WIDGET-GOQUERY-FUND.lview' );

-- 2018-10-31 选择主题   
sys_function_assign_pkg.service_load('sys_subject_select.lview','主题选择');
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','sys_subject_select.lview' );

-- 2018-10-31 leaf_main.lview
sys_function_assign_pkg.service_load('leaf_main.lview','leaf_main');
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','leaf_main.lview' );

-- 2018-10-31 leaf_user_role_home_page.lview
sys_function_assign_pkg.service_load('leaf_user_role_home_page.lview','leaf_main');
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','leaf_user_role_home_page.lview' );

-- 2018-10-31 leaf_user_role_home_page.lview
sys_function_assign_pkg.service_load('leaf_user_role_home_page.lview','leaf_main');
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','leaf_user_role_home_page.lview' );

-- 2018-10-31 user_role_home_page.lview
sys_function_assign_pkg.service_load('user_role_home_page.lview','user_role_home_page');
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','user_role_home_page.lview' );

-- 2018-11-26 leaf_wfl_common.lview 首页工作流
sys_function_assign_pkg.service_load('leaf_wfl_common.lview','leaf_wfl_common');
sys_function_assign_pkg.func_service_load('MENU_AND_MAIN','leaf_wfl_common.lview' );

end;