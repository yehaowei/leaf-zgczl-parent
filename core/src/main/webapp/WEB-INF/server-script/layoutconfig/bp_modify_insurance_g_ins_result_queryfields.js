var override_queryfields = [ 

{
	name : 'bp_name',
	queryexpression : "t1.bp_name like ${@bp_name}"
},
{
	field : 'extra_nam',
	queryoperator : "like"
},
{
	name : 'enable_flag',
	queryexpression : "t1.enabled_flag =${@enable_flag}"
},
{
	name : 'bp_code',
	queryexpression : "t1.bp_code like ${@bp_code}"
}

];

override();
