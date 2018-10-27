var override_queryfields = [ 
{
	name : 'wfl_status',
	queryexpression : "t1.wfl_status = ${@wfl_status}"
},

];

override();

var add_datafilters = [ {
	name : 'check_flag',
	expression : " NVL(T1.reverse_flag,'N')<>'Y' "
} ];

add_datafilter();



