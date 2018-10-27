-- ----------------------------
-- 功能定义
-- ----------------------------
begin
SYS_LOAD_SYS_FUNCTION_PKG.sys_function_load('ACP510','应付发票创建','应付发票创建','10','','','modules/acp/ACP510/acp_invoice_condition.lview','ZHS',-1);
SYS_LOAD_SYS_FUNCTION_PKG.sys_function_load('ACP510','应付发票创建','应付发票创建','10','','','modules/acp/ACP510/acp_invoice_condition.lview','US',-1);


sys_function_assign_pkg.func_load('WIDGET-WFL','工作流微件','','F','home_page/WIDGET-WFL/WIDGET-WFL.lview',10,'ZHS');
sys_function_assign_pkg.func_load('WIDGET-WFL-MESSAGE','代办通知微件','','F','home_page/WIDGET-WFL/WIDGET-WFL-MESSAGE.lview',10,'ZHS');
sys_function_assign_pkg.func_load('WIDGET-CALCULATOR','租金计算器','','F','home_page/WIDGET-CALCULATOR/WIDGET-CALCULATOR.lview',10,'ZHS');
sys_function_assign_pkg.func_load('WIDGET-ASSET-COUNT','微件-资产统计','','F','home_page/WIDGET-ASSET/WIDGET-ASSET-COUNT.lview',30,'ZHS');
sys_function_assign_pkg.func_load('WIDGET-ASSET-INFO','微件-资产信息','','F','home_page/WIDGET-ASSET/WIDGET-ASSET-INFO.lview',30,'ZHS');
sys_function_assign_pkg.func_load('WIDGET-CONT-CF-CNY','微件-项目资金流动-人民币','','F','home_page/WIDGET-CONTRACT/WIDGET-CONT-CF-CNY.lview',30,'ZHS');
sys_function_assign_pkg.func_load('WIDGET-CONT-CF-USD','微件-项目资金流动-美元','','F','home_page/WIDGET-CONTRACT/WIDGET-CONT-CF-USD.lview',30,'ZHS');
sys_function_assign_pkg.func_load('WIDGET-CONT-COUNT-NEW','微件-合同类别占比','','F','home_page/WIDGET-CONTRACT/WIDGET-CONT-COUNT-NEW.lview',30,'ZHS');
sys_function_assign_pkg.func_load('WIDGET-CONT-PRJ','微件-我的项目/合同','','F','home_page/WIDGET-CONTRACT/WIDGET-CONT-PRJ.lview',30,'ZHS');
sys_function_assign_pkg.func_load('WIDGET-CONT-PRJ-PRO','微件-我的项目/我的合同-详细','','F','home_page/WIDGET-CONTRACT/WIDGET-CONT-PRJ-PRO.lview',30,'ZHS');
sys_function_assign_pkg.func_load('WIDGET-CONT-RECENT','微件-最近成交','','F','home_page/WIDGET-CONTRACT/WIDGET-CONT-RECENT.lview',30,'ZHS');
sys_function_assign_pkg.func_load('WIDGET-CSH-COUNT','微件-本年回款/放款金额趋势-柱状图','','F','home_page/WIDGET-CSH/WIDGET-CSH-COUNT.lview',30,'ZHS');
sys_function_assign_pkg.func_load('WIDGET-CSH-COUNT-LINE','微件-本年投放金额/回笼金额-折线图','','F','home_page/WIDGET-CSH/WIDGET-CSH-COUNT-LINE.lview',30,'ZHS');
sys_function_assign_pkg.func_load('WIDGET-GOQUERY-FUND','微件-进入资金查询界面按钮','','F','home_page/WIDGET-ASSET/WIDGET-GOQUERY-FUND.lview',30,'ZHS');
end;
