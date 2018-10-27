-- ----------------------------
-- func_clear
-- ----------------------------
begin
sys_function_assign_pkg.func_clear(p_func_code =>'WIDGET-WFL');
sys_function_assign_pkg.func_clear('ACP510');
sys_function_assign_pkg.func_clear(p_func_code =>'WIDGET-WFL-MESSAGE');
sys_function_assign_pkg.func_clear(p_func_code =>'WIDGET-CALCULATOR');
sys_function_assign_pkg.func_clear(p_func_code =>'WIDGET-ASSET-COUNT');
sys_function_assign_pkg.func_clear(p_func_code =>'WIDGET-ASSET-INFO');
sys_function_assign_pkg.func_clear(p_func_code =>'WIDGET-CONT-CF-CNY');
sys_function_assign_pkg.func_clear(p_func_code =>'WIDGET-CONT-CF-USD');
sys_function_assign_pkg.func_clear(p_func_code =>'WIDGET-CONT-COUNT-NEW');
sys_function_assign_pkg.func_clear(p_func_code =>'WIDGET-CONT-PRJ');
sys_function_assign_pkg.func_clear(p_func_code =>'WIDGET-CONT-PRJ-PRO');
sys_function_assign_pkg.func_clear(p_func_code =>'WIDGET-CONT-RECENT');
sys_function_assign_pkg.func_clear(p_func_code =>'WIDGET-CSH-COUNT');
sys_function_assign_pkg.func_clear(p_func_code =>'WIDGET-CSH-COUNT-LINE');
sys_function_assign_pkg.func_clear(p_func_code =>'WIDGET-GOQUERY-FUND');
end;