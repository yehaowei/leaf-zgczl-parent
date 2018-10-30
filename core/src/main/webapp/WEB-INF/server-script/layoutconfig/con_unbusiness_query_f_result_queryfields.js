var override_queryfields = [ 

{
	name:'unbusiness_contract_number',
	queryexpression:"t1.unbusiness_contract_number like ${@unbusiness_contract_number}"
},                          
                         
{
	name : 'unbusiness_contract_name',
	queryexpression : "t1.unbusiness_contract_name like ${@unbusiness_contract_name}"
},

{
	name : 'party_b',
	queryexpression : "t1.party_b like ${@party_b}"
}

];

override();
