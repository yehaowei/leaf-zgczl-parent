var override_queryfields = [
  
{
	name: 'bp_name',
	queryexpression: "t1.bp_id_tenant_n = ${@bp_name}"
},

{
	name: 'contract_status_n',
	queryexpression: "t1.contract_status = ${@contract_status_n}"
}

];

override();