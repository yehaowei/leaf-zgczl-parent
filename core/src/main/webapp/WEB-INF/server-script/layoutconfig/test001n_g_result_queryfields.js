var override_queryfields = [ 
{
	name : 'stu_name',
	queryexpression : "t1.stu_name like ${@stu_name}"
},
{
	name : 'birth_date_from',
	queryexpression : "t1.birth_date >= to_date(${@birth_date_from},'YYYY-MM-DD')"
},
{
	name : 'birth_date_to',
	queryexpression : "t1.birth_date <= to_date(${@birth_date_to},'YYYY-MM-DD')"
},

];

override();
