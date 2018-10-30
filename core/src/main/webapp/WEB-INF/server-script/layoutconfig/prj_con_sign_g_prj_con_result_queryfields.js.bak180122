var override_queryfields = [ 
{
	name : 'bp_id',
	queryexpression : "t1.bp_id_tenant =${@bp_id}"
},
{
	name : 'bp_name',
	queryexpression : "t1.bp_id_tenant_n like ${@bp_name}"
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
	field : 'project_id',
	queryoperator : "="
},
{
	field : 'employee_id',
	queryoperator : "="
},
{
	name : 'project_name',
	queryexpression : "t1.project_id_n like ${@project_name}"
},
{
	field : 'contract_id',
	queryoperator : "="
},
{
	field : 'contract_name',
	queryoperator : "like"
},
{
	name : 'employee_name_of_manager',
	queryexpression : "t1.employee_id_of_manager like ${@employee_name_of_manager}"
},
{
	field : 'lease_organization',
	queryoperator : "="
},
{
	field : 'lease_channel',
	queryoperator : "="
},
{
	field : 'contract_status',
	queryoperator : "="
},
{
	field : 'division',
	queryoperator : "="
},
{
	field : 'document_type',
	queryoperator : "="
},
{
	field : 'business_type',
	queryoperator : "="
},
{
	name : 'data_class',
	queryexpression : "t1.data_class=${@data_class}"
},
{
	name : 'contract_number',
	queryexpression : "t1.contract_number like ${@contract_number}"
},
{
	name : 'project_number',
	queryexpression : "t1.project_number like ${@project_number}"
},
{
	name : 'user_status',
	queryexpression : "t1.user_status_1 in ('APPROVED') and t1.contract_status in ('NEW') and t1.user_status_2 in ('NEW','APPROVED_RETURN')"
}

];

override();
