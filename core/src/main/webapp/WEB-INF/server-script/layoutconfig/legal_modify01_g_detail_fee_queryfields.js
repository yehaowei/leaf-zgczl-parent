var override_queryfields = [ 
{
	name : 'occur_date',
	queryexpression : "t1.occur_date = to_date(${@occur_date},'yyyy-mm-dd')"
},
{
	field : 'contract_id',
	queryoperator : "="
},
{
	name : 'cf_item_q',
	queryexpression : "t1.cf_item = ${@cf_item_q}"
},
{
	field : 'cf_item_n',
	queryoperator : "="
},
{
	name : 'legal_type',
	queryexpression : "t1.process_type = ${@legal_type}"
},
{
	name : 'amount',
	queryexpression : "t1.amount = ${@amount}"
},
{
	name : 'return_amount',
	queryexpression : "t1.return_amount = ${@return_amount}"
}

];

override();
