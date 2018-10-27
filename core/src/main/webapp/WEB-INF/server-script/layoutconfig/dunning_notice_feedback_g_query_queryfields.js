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
	name : 'division',
	queryexpression : "t1.division    =  ${@division} "
},
{
	name : 'division_not',
	queryexpression : "t1.division not  in ${:@division_not} "
},
{
	name : 'send_feedback',
	queryexpression : "t1.send_feedback =  decode(${@send_feedback},'Y','Y','N','N','ALL',t1.send_feedback)"
},
{
	name : 'cancel_flag',
	queryexpression : "t1.cancel_flag =  decode(${@cancel_flag},'Y','Y','N','N','ALL',t1.cancel_flag)"
}

];

override();
