var override_queryfields = [ 

{
	name : 'lease_start_date_from',
	queryexpression : "t1.lease_start_date between to_date(${@lease_start_date_from},'yyyy-mm-dd') and nvl(to_date(${@lease_start_date_to},'yyyy-mm-dd'),t1.lease_start_date)"
},
{
	name : 'lease_start_date_to',
	queryexpression : "t1.lease_start_date between nvl(to_date(${@lease_start_date_from},'yyyy-mm-dd'),t1.lease_start_date) and to_date(${@lease_start_date_to},'yyyy-mm-dd')"
},
{
	name : 'overdue_times_from',
	queryexpression : "t1.overdue_times >= ${@overdue_times_from}"
},
{
	name : 'overdue_times_to',
	queryexpression : "t1.overdue_times <= ${@overdue_times_to}"
},

{
	name : 'division',
	queryexpression : "t1.division =  ${@division}"
},
{
	name : 'division_not',
	queryexpression : "t1.OVERDUE_TIMES > 0"
}
];

override();
