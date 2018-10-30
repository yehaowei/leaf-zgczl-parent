var override_queryfields = [ 

{
	name : 'send_date_from',
	queryexpression : "t1.send_date between to_date(${@send_date_from},'yyyy-mm-dd') and nvl(to_date(${@send_date_to},'yyyy-mm-dd'),t1.send_date)"
},
{
	name : 'send_date_to',
	queryexpression : "t1.send_date between nvl(to_date(${@send_date_from},'yyyy-mm-dd'),t1.send_date) and to_date(${@send_date_to},'yyyy-mm-dd')"
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
