var override_queryfields = [ 

{
	name : 'response_time',
	queryexpression : "substr(t1.response_time,0,10) = ${@response_time}"
},

{
	name : 'request_time',
	queryexpression : "substr(t1.request_time,0,10) = ${@request_time}"
},
    {
        name : 'operation_time',
        queryexpression : "substr(t1.operation_time,0,10) = ${@operation_time}"
    },
    {
        name : 'recipname',
        queryexpression : "t1.recipname like '%'||${@recipname}||'%'"
    },
    {
        name : 'recipaccno',
        queryexpression : "t1.recipaccno like '%'||${@recipaccno}||'%'"
    }

];

override();
