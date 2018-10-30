var override_queryfields = [ 

{
	name : 'law_dispose_period_from',
	queryexpression : "t1.law_dispose_period between to_date(${@law_dispose_period_from},'yyyy-mm-dd') and nvl(to_date(${@law_dispose_period_to},'yyyy-mm-dd'),t1.law_dispose_period)"
},
{
	name : 'law_dispose_period_to',
	queryexpression : "t1.law_dispose_period between nvl(to_date(${@law_dispose_period_from},'yyyy-mm-dd'),t1.law_dispose_period) and to_date(${@law_dispose_period_to},'yyyy-mm-dd')"
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
