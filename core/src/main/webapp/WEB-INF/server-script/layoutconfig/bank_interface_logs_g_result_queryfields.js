var override_queryfields = [ 

{
	name : 'response_time',
	queryexpression : "substr(t1.response_time,0,10) = ${@response_time}"
},

{
	name : 'request_time',
	queryexpression : "substr(t1.request_time,0,10) = ${@request_time}"
}

];

override();
