begin

update sch_task t set t.procedure_name = replace(t.procedure_name,'.svc','.lsc');

update ZJ_WFL_WORKFLOW_SERVICE t set t.service_name = replace(t.service_name,'.screen','.lview');

update sys_service t set t.service_name = replace(t.service_name,'.screen','.lview');

update sys_service t set t.service_name = replace(t.service_name,'.svc','.lsc');

update HLS_DOC_LAYOUT_TAB t set t.tab_ref_screen = replace(t.tab_ref_screen,'.screen','.lview') WHERE tab_ref_screen is not null ;

update hls_doc_layout_config t set t.FIELD_JAVASCRIPT = replace(t.FIELD_JAVASCRIPT,'Aurora.','Leaf.') ;

end;
