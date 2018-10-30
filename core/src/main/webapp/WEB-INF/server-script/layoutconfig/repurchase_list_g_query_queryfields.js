var override_queryfields = [ 

{
	name : 'repurchase_date_from',
	queryexpression : "t1.repurchase_date between to_date(${@repurchase_date_from},'yyyy-mm-dd') and nvl(to_date(${@repurchase_date_to},'yyyy-mm-dd'),t1.repurchase_date)"
},
{
	name : 'repurchase_date_to',
	queryexpression : "t1.repurchase_date between nvl(to_date(${@repurchase_date_from},'yyyy-mm-dd'),t1.repurchase_date) and to_date(${@repurchase_date_to},'yyyy-mm-dd')"
},
{
	name : 'contract_num_from',
	queryexpression : "t1.contract_number between ${@contract_num_from} and nvl(${@contract_num_to},${@contract_num_from})"
},
{
	name : 'contract_num_to',
	queryexpression : "t1.contract_number between nvl(${@contract_num_from},${@contract_num_to}) and ${@contract_num_to}"
},


{
	name : 'division',
	queryexpression : "t1.division =  ${@division}"
},
{
	name : 'division_not',
	queryexpression : "t1.division not  in  ${:@division_not}"
}

];

override();
