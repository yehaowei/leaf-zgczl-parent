var override_queryfields = [ 
 
 
{
	name : 'overdue_days_from',
	queryexpression : "t1.overdue_days between ${@overdue_days_from} and nvl(${@overdue_days_to},${@overdue_days_from})"
},
{
	name : 'overdue_days_to',
	queryexpression : "t1.overdue_days between ${@overdue_days_from} and nvl(${@overdue_days_to},${@overdue_days_from})"
} 
];

override();
