var override_queryfields = [ 
{
	field : 'contract_number',
	queryoperator : "like"
},
{
	field : 'short_name',
	queryoperator : "like"
},
{
	name : 'lease_start_date',
	queryexpression : "t1.lease_start_date between to_date(${@lease_start_date},'yyyy-mm-dd') and nvl(to_date(${@lease_start_date_to},'yyyy-mm-dd'),t1.lease_start_date)"
},
{
	name : 'lease_start_date_to',
	queryexpression : "t1.lease_start_date between nvl(to_date(${@lease_start_date},'yyyy-mm-dd'),t1.lease_start_date) and to_date(${@lease_start_date_to},'yyyy-mm-dd')"
},
{
	field : 'lease_item_code',
	queryoperator : "like"
}
];

override();
