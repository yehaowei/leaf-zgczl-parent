var override_queryfields = [ 
{
	name : 'item_detail_id',
	queryexpression : "t1.item_detail_id =${@item_detail_id}"
},
{
	field : 'contract_id',
	queryoperator : "="
},
{
	field : 'contract_name',
	queryoperator : "like"
}

];

override();
