-- ----------------------------
-- 页面注册
-- ----------------------------
begin
sys_function_assign_pkg.service_load('modules/if/IF100/if_sys_interface_header.lview','接口定义',0,1,0);
sys_function_assign_pkg.service_load('modules/if/IF100/if_sys_interface_header_edit.lview','接口编辑',0,1,0);
sys_function_assign_pkg.service_load('modules/if/IF200/if_sys_interface_invoke.lview','接口调用',0,1,0);
sys_function_assign_pkg.service_load('modules/if/IF200/if_sys_interface_inbound_detail.lview','入站请求详情',0,1,0);
sys_function_assign_pkg.service_load('modules/if/IF200/if_sys_interface_outbound_detail.lview','出站请求详情',0,1,0);
sys_function_assign_pkg.service_load('modules/if/IF300/if_sys_oauth_client_details.lview','客户端管理',0,1,0);
sys_function_assign_pkg.service_load('modules/if/IF300/if_sys_oauth_client_details_edit.lview','客户端管理编辑',0,1,0);
sys_function_assign_pkg.service_load('modules/if/IF300/if_sys_oauth_client_grant_type_select.lview','客户端授权类型',0,1,0);
sys_function_assign_pkg.service_load('modules/if/IF300/if_sys_oauth_client_role_select.lview','客户端角色选择',0,1,0);
sys_function_assign_pkg.service_load('modules/if/IF400/if_sys_token_logs.lview','授权管理',0,1,0);

sys_function_assign_pkg.service_load('leaf/interface/queryAllHeader','接口定义',0,1,0);
sys_function_assign_pkg.service_load('leaf/interface/submit','接口定义',0,1,0);
sys_function_assign_pkg.service_load('leaf/interface/addHeader','接口定义',0,1,0);
sys_function_assign_pkg.service_load('leaf/interface/deleteHeader','接口定义',0,1,0);
sys_function_assign_pkg.service_load('leaf/interface/updateHeader','接口定义',0,1,0);
sys_function_assign_pkg.service_load('leaf/interface/getHeaderAndLine','接口定义',0,1,0);
sys_function_assign_pkg.service_load('leaf/interface/getHeaderByHeaderId','接口定义',0,1,0);
sys_function_assign_pkg.service_load('leaf/interface/getHeaderAndLineByLineId','接口定义',0,1,0);
sys_function_assign_pkg.service_load('leaf/interface/getAllHeaderAndLine','接口定义',0,1,0);

sys_function_assign_pkg.service_load('leaf/interface/queryLine','接口定义',0,1,0);
sys_function_assign_pkg.service_load('leaf/interface/insertLine','接口定义',0,1,0);
sys_function_assign_pkg.service_load('leaf/interface/updateLine','接口定义',0,1,0);
sys_function_assign_pkg.service_load('leaf/interface/deleteLine','接口定义',0,1,0);
sys_function_assign_pkg.service_load('leaf/interface/getLinesByHeaderId','接口定义',0,1,0);

sys_function_assign_pkg.service_load('leaf/sys/invoke/querryInbound','调用记录',0,1,0);
sys_function_assign_pkg.service_load('leaf/sys/invoke/querryOutbound','调用记录',0,1,0);

sys_function_assign_pkg.service_load('leaf/sys/client/details/query','客户端管理',0,1,0);
sys_function_assign_pkg.service_load('leaf/sys/client/details/submit','客户端管理',0,1,0);
sys_function_assign_pkg.service_load('leaf/sys/client/details/remove','客户端管理',0,1,0);
sys_function_assign_pkg.service_load('leaf/sys/client/details/updatePassword','客户端管理',0,1,0);
sys_function_assign_pkg.service_load('leaf/sys/client/details/role/query','客户端管理',0,1,0);

sys_function_assign_pkg.service_load('leaf/sys/token/logs/query','授权管理',0,1,0);
sys_function_assign_pkg.service_load('leaf/sys/token/logs/revoke','授权管理',0,1,0);
-- ----------------------------
-- 功能定义
-- ----------------------------
sys_function_assign_pkg.func_load('IF100','接口定义','','F','modules/if/IF100/if_sys_interface_header.lview','10','ZHS');
sys_function_assign_pkg.func_load('IF100','接口定义','','F','modules/if/IF100/if_sys_interface_header.lview','10','US');

sys_function_assign_pkg.func_load('IF200','调用记录','','F','modules/if/IF200/if_sys_interface_invoke.lview','20','ZHS');
sys_function_assign_pkg.func_load('IF200','调用记录','','F','modules/if/IF200/if_sys_interface_invoke.lview','20','US');

sys_function_assign_pkg.func_load('IF300','客户端管理','','F','modules/if/IF300/if_sys_oauth_client_details.lview','30','ZHS');
sys_function_assign_pkg.func_load('IF300','客户端管理','','F','modules/if/IF300/if_sys_oauth_client_details.lview','30','US');

sys_function_assign_pkg.func_load('IF400','授权管理','','F','modules/if/IF400/if_sys_token_logs.lview','40','ZHS');
sys_function_assign_pkg.func_load('IF400','授权管理','','F','modules/if/IF400/if_sys_token_logs.lview','40','US');

-- ----------------------------
-- 分配页面
-- ----------------------------
sys_function_assign_pkg.func_service_load('IF100','leaf/interface/queryAllHeader');
sys_function_assign_pkg.func_service_load('IF100','leaf/interface/submit');
sys_function_assign_pkg.func_service_load('IF100','leaf/interface/addHeader');
sys_function_assign_pkg.func_service_load('IF100','leaf/interface/deleteHeader');
sys_function_assign_pkg.func_service_load('IF100','leaf/interface/updateHeader');
sys_function_assign_pkg.func_service_load('IF100','leaf/interface/getHeaderAndLine');
sys_function_assign_pkg.func_service_load('IF100','leaf/interface/getHeaderByHeaderId');
sys_function_assign_pkg.func_service_load('IF100','leaf/interface/getHeaderAndLineByLineId');
sys_function_assign_pkg.func_service_load('IF100','leaf/interface/getAllHeaderAndLine');
sys_function_assign_pkg.func_service_load('IF100','leaf/interface/queryLine');
sys_function_assign_pkg.func_service_load('IF100','leaf/interface/insertLine');
sys_function_assign_pkg.func_service_load('IF100','leaf/interface/updateLine');
sys_function_assign_pkg.func_service_load('IF100','leaf/interface/deleteLine');
sys_function_assign_pkg.func_service_load('IF100','leaf/interface/getLinesByHeaderId');
sys_function_assign_pkg.func_service_load('IF200','leaf/sys/invoke/querryInbound');
sys_function_assign_pkg.func_service_load('IF200','leaf/sys/invoke/querryOutbound');
sys_function_assign_pkg.func_service_load('IF300','leaf/sys/client/details/query');
sys_function_assign_pkg.func_service_load('IF300','leaf/sys/client/details/submit');
sys_function_assign_pkg.func_service_load('IF300','leaf/sys/client/details/remove');
sys_function_assign_pkg.func_service_load('IF300','leaf/sys/client/details/updatePassword');
sys_function_assign_pkg.func_service_load('IF300','leaf/sys/client/details/role/query');
sys_function_assign_pkg.func_service_load('IF400','leaf/sys/token/logs/query');
sys_function_assign_pkg.func_service_load('IF400','leaf/sys/token/logs/revoke');

-- ----------------------------
-- 创建菜单
-- ----------------------------
SYS_LOAD_SYS_FUNCTION_GRP_PKG.SYS_FUNCTION_GROUP_LOAD(p_function_group_code=>'ITFC',p_function_group_level=>1,p_language_code=>'ZHS',p_function_group_name=>'接口管理',p_description=>'接口管理',p_enabled_flag=>'Y',P_USER_ID=>-1);
SYS_LOAD_SYS_FUNCTION_GRP_PKG.SYS_FUNCTION_GROUP_LOAD(p_function_group_code=>'IFC',p_function_group_level=>2,p_language_code=>'ZHS',p_function_group_name=>'接口管理',p_description=>'接口管理',p_enabled_flag=>'Y',P_USER_ID=>-1);

--菜单分配功能
SYS_LOAD_SYS_FUNCTION_GRP_PKG.SYS_FUNCTION_GROUP_ITEM_LOAD(p_function_group_code=>'IFC',p_function_code=>'IF100',p_enabled_flag=>'Y',P_USER_ID=>-1);
SYS_LOAD_SYS_FUNCTION_GRP_PKG.SYS_FUNCTION_GROUP_ITEM_LOAD(p_function_group_code=>'IFC',p_function_code=>'IF200',p_enabled_flag=>'Y',P_USER_ID=>-1);
SYS_LOAD_SYS_FUNCTION_GRP_PKG.SYS_FUNCTION_GROUP_ITEM_LOAD(p_function_group_code=>'IFC',p_function_code=>'IF300',p_enabled_flag=>'Y',P_USER_ID=>-1);
SYS_LOAD_SYS_FUNCTION_GRP_PKG.SYS_FUNCTION_GROUP_ITEM_LOAD(p_function_group_code=>'IFC',p_function_code=>'IF400',p_enabled_flag=>'Y',P_USER_ID=>-1);

-- ----------------------------
-- 角色分配菜单
-- ----------------------------
SYS_LOAD_SYS_DATA_PKG.load_role_function_group(p_role_code=>'ADMIN',p_function_group_code=>'ITFC',p_layout_sequence=>40,p_enabled_flag=>'Y',p_parent_function_group_code=>'ITFC',p_parent_layout_sequence=>40,P_USER_ID=>-1);
SYS_LOAD_SYS_DATA_PKG.load_role_function_group(p_role_code=>'ADMIN',p_function_group_code=>'IFC',p_layout_sequence=>10,p_enabled_flag=>'Y',p_parent_function_group_code=>'ITFC',p_parent_layout_sequence=>40,P_USER_ID=>-1);
end;