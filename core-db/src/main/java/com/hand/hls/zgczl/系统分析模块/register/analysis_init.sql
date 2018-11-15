begin
-- ----------------------------
-- 页面注册
-- ----------------------------
sys_function_assign_pkg.service_load('modules/ana/ANA001/ana_error_logs.lview','日志分析',0,1,0);
sys_function_assign_pkg.service_load('modules/ana/ANA001/ana_error_logs_detail.lview','日志异常信息',0,1,0);
--controller注册
sys_function_assign_pkg.service_load('sys/user/queryForLov','用户查询',0,1,0);
sys_function_assign_pkg.service_load('analysis/log/queryList','日志查询',0,1,0);
sys_function_assign_pkg.service_load('analysis/log/queryById','单条日志查询',0,1,0);
-- ----------------------------
-- 功能定义
-- ----------------------------
sys_function_assign_pkg.func_load('ANA001','日志分析','','F','modules/ana/ANA001/ana_error_logs.lview','10','ZHS');
sys_function_assign_pkg.func_load('ANA001','日志分析','','F','modules/ana/ANA001/ana_error_logs.lview','10','US');


-- ----------------------------
-- 分配页面
-- ----------------------------
sys_function_assign_pkg.func_service_load('ANA001','sys/user/queryForLov');
sys_function_assign_pkg.func_service_load('ANA001','analysis/log/queryList');
sys_function_assign_pkg.func_service_load('ANA001','analysis/log/queryById');
-- ----------------------------
-- 创建菜单
-- ----------------------------
SYS_LOAD_SYS_FUNCTION_GRP_PKG.SYS_FUNCTION_GROUP_LOAD(p_function_group_code=>'ANALY',p_function_group_level=>1,p_language_code=>'ZHS',p_function_group_name=>'系统分析',p_description=>'系统分析',p_enabled_flag=>'Y',P_USER_ID=>-1);
SYS_LOAD_SYS_FUNCTION_GRP_PKG.SYS_FUNCTION_GROUP_LOAD(p_function_group_code=>'ANA',p_function_group_level=>2,p_language_code=>'ZHS',p_function_group_name=>'系统分析',p_description=>'系统分析',p_enabled_flag=>'Y',P_USER_ID=>-1);

--菜单分配功能
SYS_LOAD_SYS_FUNCTION_GRP_PKG.SYS_FUNCTION_GROUP_ITEM_LOAD(p_function_group_code=>'ANA',p_function_code=>'ANA001',p_enabled_flag=>'Y',P_USER_ID=>-1);

-- ----------------------------
-- 角色分配菜单
-- ----------------------------
SYS_LOAD_SYS_DATA_PKG.load_role_function_group(p_role_code=>'ADMIN',p_function_group_code=>'ANALY',p_layout_sequence=>20,p_enabled_flag=>'Y',p_parent_function_group_code=>'ANALY',p_parent_layout_sequence=>20,P_USER_ID=>-1);
SYS_LOAD_SYS_DATA_PKG.load_role_function_group(p_role_code=>'ADMIN',p_function_group_code=>'ANA',p_layout_sequence=>10,p_enabled_flag=>'Y',p_parent_function_group_code=>'ANALY',p_parent_layout_sequence=>20,P_USER_ID=>-1);
end;