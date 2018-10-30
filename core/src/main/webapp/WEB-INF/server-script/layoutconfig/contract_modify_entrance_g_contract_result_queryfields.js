var override_queryfields = [ 
{
	name : 'bp_id',
	queryexpression : "e.bp_id_tenant =${@bp_id}"
},
{
	name : 'bp_name',
	queryexpression : "e.bp_id_tenant_n like ${@bp_name}"
},
{
	name : 'lease_start_date_from',
	queryexpression : "e.lease_start_date between to_date(${@lease_start_date_from},'yyyy-mm-dd') and nvl(to_date(${@lease_start_date_to},'yyyy-mm-dd'),e.lease_start_date)"
},
{
	name : 'lease_start_date_to',
	queryexpression : "e.lease_start_date between nvl(to_date(${@lease_start_date_from},'yyyy-mm-dd'),e.lease_start_date) and to_date(${@lease_start_date_to},'yyyy-mm-dd')"
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
	queryexpression : "e.project_id_n like ${@project_name}"
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
	queryexpression : "e.employee_id_of_manager like ${@employee_name_of_manager}"
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
}

];

override();
