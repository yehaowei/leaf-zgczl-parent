var override_queryfields = [ 
{
	name : 'bp_id_tenant',
	queryexpression : "t1.bp_id_tenant =${@bp_id_tenant}"
},
{
	name : 'contract_id',
	queryexpression : "t1.contract_id =${@contract_id}"
},

];

override();
