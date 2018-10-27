begin

update sch_task t set t.procedure_name = replace(t.procedure_name,'.svc','.lsc');

update ZJ_WFL_WORKFLOW_SERVICE t set t.service_name = replace(t.service_name,'.screen','.lview');

update sys_service t set t.service_name = replace(t.service_name,'.screen','.lview');

update sys_service t set t.service_name = replace(t.service_name,'.svc','.lsc');

end;
