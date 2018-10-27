-- ----------------------------
-- service_load
-- ----------------------------
begin
sys_service_pkg.sys_service_load('home_page/WIDGET-WFL/WIDGET-WFL.lview','工作流',1,1,0);
sys_service_pkg.sys_service_load('home_page/WIDGET-WFL/WIDGET-WFL-MESSAGE.lview','代办通知',1,1,0);
sys_service_pkg.sys_service_load('home_page/WIDGET-CALCULATOR/WIDGET-CALCULATOR.lview','租金计算器',1,1,0);
sys_service_pkg.sys_service_load('sys_user_config.lview','用户信息',1,1,0);
sys_service_pkg.sys_service_load('home_page/WIDGET-ASSET/WIDGET-ASSET-INFO.lview','资产信息',1,1,0);

sys_function_assign_pkg.service_load('user_module_home_page.lview','用户角色模块首页',1,1,0);
sys_function_assign_pkg.service_load('modules/sys/SYS870/sys_function_edit.lview','角色模块微件定义',1,1,0);
sys_function_assign_pkg.service_load('modules/sys/SYS870/module_index.lview','角色微件首页',1,1,0);
sys_function_assign_pkg.service_load('home_page/WIDGET-BP/WIDGET-BP-MANAGE.lview','客户管理');
sys_function_assign_pkg.service_load('modules/sys/SYS870/sys_function_edit.lview','微件定义',1,1,0);
sys_function_assign_pkg.service_load('modules/sys/SYS870/sys_function_assign.lview','模块首页',1,1,0);
sys_function_assign_pkg.service_load('modules/sys/SYS870/module_index.lview','模块首页',1,1,0);
sys_function_assign_pkg.service_load('modules/acp/ACP510/acp_invoice_condition.lview','应付发票创建',1,1,0);
sys_function_assign_pkg.service_load('modules/acp/ACP510/acp_invoice_create.lview','发票创建',1,1,0);
sys_function_assign_pkg.service_load('modules/acp/ACP510/acp_invoice_select_cashflow.lview','选择现金流',1,1,0);
sys_function_assign_pkg.service_load('modules/acp/ACP510/acp_invoice_create_invoice.lview','发票创建',1,1,0);
sys_function_assign_pkg.service_load('modules/acp/ACP510/acp_invoice_save_selected.lsc','发票创建-保存选中',1,1,0);
sys_function_assign_pkg.service_load('modules/acp/ACP510/acp_invoice_create.lsc','发票创建-创建',1,1,0);
sys_function_assign_pkg.service_load('home_page/WIDGET-WFL/WIDGET-WFL.lview','工作流微件');
sys_function_assign_pkg.service_load('home_page/WIDGET-WFL/WIDGET-WFL-MESSAGE.lview','代办通知微件');
sys_function_assign_pkg.service_load('home_page/WIDGET-CALCULATOR/WIDGET-CALCULATOR.lview','租金计算器');
sys_function_assign_pkg.service_load('home_page/WIDGET-ASSET/WIDGET-ASSET-COUNT.lview','微件-资产统计');
sys_function_assign_pkg.service_load('home_page/WIDGET-ASSET/WIDGET-ASSET-INFO.lview','微件-资产信息');
sys_function_assign_pkg.service_load('home_page/WIDGET-ASSET/WIDGET-GOQUERY-FUND.lview','微件-进入资金信息查询界面');
sys_function_assign_pkg.service_load('home_page/WIDGET-CONTRACT/WIDGET-CONT-CF-CNY.lview','微件-项目资金流动-人民币');
sys_function_assign_pkg.service_load('home_page/WIDGET-CONTRACT/WIDGET-CONT-CF-USD.lview','微件-项目资金流动-美元');
sys_function_assign_pkg.service_load('home_page/WIDGET-CONTRACT/WIDGET-CONT-COUNT-NEW.lview','微件-合同类别占比');
sys_function_assign_pkg.service_load('home_page/WIDGET-CONTRACT/WIDGET-CONT-PRJ-PRO.lview','微件-我的项目/我的合同-详细');
sys_function_assign_pkg.service_load('home_page/WIDGET-CONTRACT/WIDGET-CONT-PRJ.lview','微件-我的项目/我的合同');
sys_function_assign_pkg.service_load('home_page/WIDGET-CONTRACT/WIDGET-CONT-RECENT.lview','微件-最近成交合同');
sys_function_assign_pkg.service_load('home_page/WIDGET-CSH/WIDGET-CSH-COUNT-LINE.lview','微件-本年投放/回笼金额-折线图');
sys_function_assign_pkg.service_load('home_page/WIDGET-CSH/WIDGET-CSH-COUNT.lview','微件-本年回款/放款金额趋势-柱状图');
sys_function_assign_pkg.service_load('home_page/WIDGET-BP/WIDGET-BP-COUNT.lview','微件-商业伙伴统计');
sys_function_assign_pkg.service_load('home_page/WIDGET-BP/WIDGET-BP-NEW-ADD.lview','微件-最近新增商业伙伴');
sys_function_assign_pkg.service_load('home_page/WIDGET-BP/WIDGET-BP-TREND.lview','微件-商业伙伴动态');
sys_function_assign_pkg.service_load('home_page/WIDGET-CONTRACT/WIDGET-CONT-COUNT.lview','微件-合同统计');
sys_function_assign_pkg.service_load('home_page/WIDGET-CONTRACT/WIDGET-CONT-CHGREQ.lview','微件-合同变更查询');
sys_function_assign_pkg.service_load('home_page/WIDGET-CONTRACT/WIDGET-CONT-CSHREQ.lview','微件-放款申请');
sys_function_assign_pkg.service_load('home_page/WIDGET-CONTRACT/WIDGET-CONT-TREND.lview','微件-合同动态');
sys_function_assign_pkg.service_load('home_page/WIDGET-CONTRACT/WIDGET-CONT-INFO.lview','微件-合同信息');
sys_function_assign_pkg.service_load('home_page/WIDGET-CSH/WIDGET-CSH-REQ.lview','微件-放款申请');
sys_function_assign_pkg.service_load('home_page/WIDGET-CSH/WIDGET-CSH-TRANSACTION.lview','微件-回款查询');
sys_function_assign_pkg.service_load('home_page/WIDGET-PROJECT/WIDGET-PRJ-COUNT.lview','微件-项目统计');
sys_function_assign_pkg.service_load('home_page/WIDGET-PROJECT/WIDGET-PRJ-INFO.lview','微件-项目信息');
sys_function_assign_pkg.service_load('home_page/WIDGET-PROJECT/WIDGET-PRJ-TREND.lview','微件-项目动态');

end;

