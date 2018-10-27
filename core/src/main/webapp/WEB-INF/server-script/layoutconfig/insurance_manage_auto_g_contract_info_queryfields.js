var override_queryfields = [ 
{
	name : 'contract_number',
	queryexpression : "t1.contract_number LIKE ${@contract_number}"
},
{
	field : 'bp_id_tenant',
	queryoperator : "="
},
{
	field : 'serial_number',
	queryoperator : "like"
} 

];

override();
