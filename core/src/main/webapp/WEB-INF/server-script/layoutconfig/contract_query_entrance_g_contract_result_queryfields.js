var override_queryfields = [ 
{
	name : 'bp_name',
	queryexpression : "t1.bp_id_tenant_n like ${@bp_name}"
},
{
	name : 'bp_id_tenant_n',
	queryexpression : "t1.bp_id_tenant_n like ${@bp_id_tenant_n}"
},
{
	name : 'lease_start_date_from',
	queryexpression : "t1.lease_start_date between to_date(${@lease_start_date_from},'yyyy-mm-dd') and nvl(to_date(${@lease_start_date_to},'yyyy-mm-dd'),t1.lease_start_date)"
},
{
	name : 'lease_start_date_to',
	queryexpression : "t1.lease_start_date between nvl(to_date(${@lease_start_date_from},'yyyy-mm-dd'),t1.lease_start_date) and to_date(${@lease_start_date_to},'yyyy-mm-dd')"
},
{
	name : 'project_name',
	queryexpression : "t1.project_id_n like ${@project_name}"
},
{
	name : 'data_class',
	queryexpression : "t1.data_class in ${:@data_class}"
},
{
	field : 'contract_name',
	queryoperator : "like"
},
{   
	name : 'search_term_1',
	queryexpression : "t1.search_term_1 like ${@search_term_1}"
},
{
	name : 'employee_name_of_manager',
	queryexpression : "t1.employee_id_of_manager like ${@employee_name_of_manager}"
}
];
override();
