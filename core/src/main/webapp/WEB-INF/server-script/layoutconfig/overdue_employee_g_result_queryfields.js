var override_queryfields = [ 

{
	name : 'send_date_from',
	queryexpression : "(trunc(t1.send_date) >= to_date(${@send_date_from},'yyyy-mm-dd')  or t1.send_date  is null)"
},
{
	name : 'send_date_to',
	queryexpression : "(trunc(t1.send_date) <= to_date(${@send_date_to},'yyyy-mm-dd') or t1.send_date  is null)"
},
{
	name : 'contract_id',
	queryexpression : "t1.contract_id = ${@contract_id} "
},
{
	name : 'employee_id',
	queryexpression : "t1.employee_id = ${@employee_id} "
}
 

];

override();
