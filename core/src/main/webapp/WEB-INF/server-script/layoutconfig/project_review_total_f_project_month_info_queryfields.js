var override_queryfields = [

{
	name : 'month_date_from',
	queryexpression : "t1.month_date between ${@month_date_from} and nvl(${@month_date_to},t1.month_date)"
}, {
	name : 'month_date_to',
	queryexpression : "t1.month_date between nvl(${@month_date_from},t1.month_date) and ${@month_date_to}"
},

];

override();


