var override_queryfields = [ 
 
{
	name : 'occur_date_from',
	queryexpression : "t1.occur_date >= to_date(${@occur_date_from},'yyyy-mm-dd')"
},
{
	name : 'occur_date_to',
	queryexpression : "t1.occur_date <= to_date(${@occur_date_to},'yyyy-mm-dd')"
} 

];

override();
