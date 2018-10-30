var override_queryfields = [ 
{
	name : 'bp_id_tenant',
	queryexpression : "t1.bp_id_tenant =${@bp_id_tenant}"
},
{
	name : 'law_code',
	queryexpression : "t1.law_code =${@law_code}"
},
{
	name : 'bp_id_tenant_n',
	queryexpression : "t1.bp_id_tenant_n like ${@bp_id_tenant_n}"
},
 
{
	name : 'inception_of_lease_from',
	queryexpression : "t1.inception_of_lease between to_date(${@inception_of_lease_from},'yyyy-mm-dd') and nvl(to_date(${@inception_of_lease_to},'yyyy-mm-dd'),t1.inception_of_lease)"
},
{
	name : 'inception_of_lease_to',
	queryexpression : "t1.inception_of_lease between nvl(to_date(${@inception_of_lease_from},'yyyy-mm-dd'),t1.inception_of_lease) and to_date(${@inception_of_lease_to},'yyyy-mm-dd')"
},
{
	field : 'contract_id',
	queryoperator : "="
},
{
	field : 'contract_number',
	queryoperator : "like"
},
{
	field : 'contract_name',
	queryoperator : "like"
},
{
	field : 'employee_id',
	queryoperator : "="
},
{
	field : 'lease_channel',
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
