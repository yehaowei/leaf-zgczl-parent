var override_queryfields = [
		{
			name : 'bp_code_from',
			queryexpression : "t1.bp_code >= ${@bp_code_from}"
		},
		{
			name : 'bp_code_to',
			queryexpression : "t1.bp_code <= ${@bp_code_to}"
		},
		{
			name : 'bp_id_n',
			queryexpression : "t1.bp_name like '%'|| ${@bp_id_n}||'%'"
		},
		{
			name : 'short_name',
			queryexpression : "t1.extra_nam like '%'|| ${@short_name}||'%'"
		},
		{
			name : 'contract_number',
			queryexpression : "exists (select 1 from con_contract cc where cc.bp_id_tenant = t1.bp_id and cc.contract_number = ${@contract_number})"
		},
		{
			name : 'project_number',
			queryexpression : "exists (select 1 from prj_project cc where cc.bp_id_tenant = t1.bp_id and cc.project_number = ${@project_number})"
		},
		{
			name : 'contract_name',
			queryexpression : "exists (select 1 from con_contract cc where cc.bp_id_tenant = t1.bp_id and cc.contract_name like '%'||${@contract_name}||'%')"
		},
		{
			name : 'project_name',
			queryexpression : "exists (select 1 from prj_project cc where cc.bp_id_tenant = t1.bp_id and cc.project_name like '%'||${@project_name}||'%')"
		} ];
var add_datafilters = [ {
	name : 'datafilter1',
	expression : "(t1.bp_category = 'TENANT')"
} ];

override();
add_datafilter();
